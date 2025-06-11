import { Rectangle, Vec2 } from '@square3/square3';
import type { Body } from './body';
import type { RayHitList } from './rayHitList';

const MAX_BODIES = 6;
const MAX_DEPTH = 8;

/**
 * Quad tree node used for spatial partitioning.
 */
export class QuadNode {
  /**
   * The depth of the node in the quadtree.
   */
  depth: number;

  /**
   * The bounds of the node.
   */
  bounds: Rectangle;

  /**
   * The list of bodies in the node.
   */
  bodies: Body[];

  /**
   * The list of subnodes.
   */
  nodes: QuadNode[];

  /**
   * The list of indexes.
   */
  private indexList: number[];

  /**
   * The pool of quadtree nodes for reuse.
   */
  private static pool: QuadNode[] = [];

  /**
   * Retrieves a QuadNode from the pool or creates a new one if the pool is empty.
   * @param depth - The depth of the node in the quadtree.
   * @param x - The x-coordinate of the node's bounds.
   * @param y - The y-coordinate of the node's bounds.
   * @param width - The width of the node's bounds.
   * @param height - The height of the node's bounds.
   * @returns A QuadNode instance.
   */
  static get(depth: number, x: number, y: number, width: number, height: number): QuadNode {
    const node = QuadNode.pool.pop();
    if (node) {
      node.reset(depth, x, y, width, height);

      return node;
    }

    return new QuadNode(depth, x, y, width, height);
  }

  /**
   * Creates an instance of QuadNode.
   * @param depth - The depth of the node in the quadtree.
   * @param x - The x-coordinate of the node's bounds.
   * @param y - The y-coordinate of the node's bounds.
   * @param width - The width of the node's bounds.
   * @param height - The height of the node's bounds.
   */
  constructor(depth: number, x: number, y: number, width: number, height: number) {
    this.depth = depth;
    this.bounds = new Rectangle(x, y, width, height);
    this.bodies = [];
    this.nodes = [];
    this.indexList = [];
  }

  /**
   * Inserts a body into the quadtree node. If the node exceeds the maximum number of bodies,
   * it splits into subnodes and redistributes the bodies.
   * @param body - The body to insert.
   */
  insert(body: Body): void {
    if (this.nodes.length > 0) {
      const index = this.getIndex(body.bounds);
      if (index === -1) {
        this.getIndexes(body.bounds, this.indexList);
        for (const i of this.indexList) {
          this.nodes[i].insert(body);
        }
      } else {
        this.nodes[index].insert(body);
      }

      return;
    }

    this.bodies.push(body);

    if (this.bodies.length > MAX_BODIES && this.depth < MAX_DEPTH) {
      this.split();

      while (this.bodies.length > 0) {
        const b = this.bodies.pop();
        if (!b) {
          continue;
        }

        const index = this.getIndex(b.bounds);

        if (index === -1) {
          this.getIndexes(b.bounds, this.indexList);
          for (const i of this.indexList) {
            this.nodes[i].insert(b);
          }
        } else {
          this.nodes[index].insert(b);
        }
      }
    }
  }

  /**
   * Resets the node to its initial state with new bounds and depth.
   * @param depth - The new depth of the node.
   * @param x - The new x-coordinate of the node's bounds.
   * @param y - The new y-coordinate of the node's bounds.
   * @param width - The new width of the node's bounds.
   * @param height - The new height of the node's bounds.
   */
  reset(depth: number, x: number, y: number, width: number, height: number): void {
    this.depth = depth;
    this.bounds.set(x, y, width, height);
    this.bodies.length = 0;
    this.nodes.length = 0;
    this.indexList.length = 0;
  }

  /**
   * Puts the node back into the pool for reuse.
   */
  put(): void {
    QuadNode.pool.push(this);
  }

  /**
   * Clears the node and its subnodes, putting them back into the pool.
   */
  clear(): void {
    this.bodies.length = 0;

    for (const node of this.nodes) {
      node.clear();
      node.put();
    }

    this.nodes.length = 0;
  }

  /**
   * Retrieves the bounds of all quadtree nodes and adds them to the provided list.
   * @param list - The list to store the bounds.
   */
  getQuadBounds(list: Rectangle[]): void {
    for (let i = 0; i < this.nodes.length; i++) {
      this.nodes[i].getQuadBounds(list);
    }

    list.push(this.bounds);
  }

  /**
   * Retrieves a list of ray hits along a line from origin to target.
   * @param origin - The starting point of the line.
   * @param target - The ending point of the line.
   * @param results - The list to store the ray hits.
   */
  getLineHitList(origin: Vec2, target: Vec2, results: RayHitList): void {
    if (this.nodes.length > 0) {
      this.getLineIndexes(origin, target, this.indexList);
      for (const index of this.indexList) {
        this.nodes[index].getLineHitList(origin, target, results);
      }
    } else {
      const hitPos = Vec2.get();
      for (const body of this.bodies) {
        if (body.bounds.intersectsLine(origin, target, hitPos)) {
          results.insert(origin, hitPos, body);
        }
      }
      hitPos.put();
    }
  }

  /**
   * Retrieves a list of bodies that intersect with the given body.
   * @param body - The body to check for intersections.
   * @param list - The list to store the intersecting bodies.
   */
  getBodyList(body: Body, list: Body[]): void {
    const index = this.getIndex(body.bounds);
    if (this.nodes.length > 0) {
      if (index === -1) {
        this.getIndexes(body.bounds, this.indexList);
        for (const i of this.indexList) {
          this.nodes[i].getBodyList(body, list);
        }
      } else {
        this.nodes[index].getBodyList(body, list);
      }
    } else {
      for (const other of this.bodies) {
        if (body !== other) {
          list.push(other);
        }
      }
    }
  }

  /**
   * Retrieves the indexes of subnodes that intersect with the line from origin to target.
   * @param origin - The starting point of the line.
   * @param target - The ending point of the line.
   * @param list - The list to store the indexes.
   */
  private getLineIndexes(origin: Vec2, target: Vec2, list: number[]): void {
    while (list.length > 0) {
      list.pop();
    }

    for (let i = 0; i < this.bodies.length; i++) {
      const bounds = this.bodies[i].bounds;
      if (
        bounds.intersectsLine(origin, target) ||
        bounds.hasPoint(origin.x, origin.y) ||
        bounds.hasPoint(target.x, target.y)
      ) {
        list.push(i);
      }
    }
  }

  /**
   * Retrieves the indexes of subnodes that intersect with the given bounds.
   * @param colliderBounds - The bounds to check for intersections.
   * @param list - The list to store the indexes.
   */
  private getIndexes(colliderBounds: Rectangle, list: number[]): void {
    while (list.length > 0) {
      list.pop();
    }

    for (let i = 0; i < this.nodes.length; i++) {
      if (colliderBounds.intersects(this.nodes[i].bounds)) {
        list.push(i);
      }
    }
  }

  /**
   * Retrieves the index of the subnode that fully contains the given bounds.
   * @param colliderBounds - The bounds to check.
   * @returns The index of the subnode, or -1 if no subnode fully contains the bounds.
   */
  private getIndex(colliderBounds: Rectangle): number {
    let index = -1;

    const middleX = this.bounds.x + this.bounds.width / 2;
    const middleY = this.bounds.y + this.bounds.height / 2;

    const top = colliderBounds.y + colliderBounds.height < middleY;
    const bottom = colliderBounds.y > middleY;
    const left = colliderBounds.x + colliderBounds.width < middleX;
    const right = colliderBounds.x > middleX;

    if (left) {
      if (top) {
        index = 0;
      } else if (bottom) {
        index = 2;
      }
    } else if (right) {
      if (top) {
        index = 1;
      } else if (bottom) {
        index = 3;
      }
    }

    return index;
  }

  /**
   * Splits the node into four subnodes.
   */
  private split(): void {
    const halfWidth = this.bounds.width / 2;
    const halfHeight = this.bounds.height / 2;
    const x = this.bounds.x;
    const y = this.bounds.y;
    const nextDepth = this.depth + 1;

    this.nodes.push(QuadNode.get(nextDepth, x, y, halfWidth, halfHeight));
    this.nodes.push(QuadNode.get(nextDepth, x + halfWidth, y, halfWidth, halfHeight));
    this.nodes.push(QuadNode.get(nextDepth, x, y + halfHeight, halfWidth, halfHeight));
    this.nodes.push(QuadNode.get(nextDepth, x + halfWidth, y + halfHeight, halfWidth, halfHeight));
  }
}
