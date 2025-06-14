import { Rectangle, type Vec2 } from '@square3/square3';
import type { Body } from './body.js';
import { QuadNode } from './quadNode.js';
import { RayHitList } from './rayHitList.js';

/**
 * QuadTree class for spatial partitioning.
 */
export class QuadTree {
  /**
   * The bounds of the quadtree.
   */
  bounds: Rectangle;

  /**
   * The root node of the quadtree.
   */
  root: QuadNode;

  /**
   * Reusable hitlist.
   */
  private hits: RayHitList;

  /**
   * Creates a new QuadTree instance.
   * @param x - The x-coordinate of the quadtree bounds.
   * @param y - The y-coordinate of the quadtree bounds.
   * @param width - The width of the quadtree bounds.
   * @param height - The height of the quadtree bounds.
   */
  constructor(x: number, y: number, width: number, height: number) {
    this.bounds = new Rectangle(x, y, width, height);
    this.root = QuadNode.get(0, x, y, width, height);
    this.hits = new RayHitList();
  }

  /**
   * Inserts a body into the quadtree.
   * @param body - The body to insert.
   */
  insert(body: Body): void {
    this.root.insert(body);
  }

  /**
   * Retrieves a list of bodies that intersect with the given body.
   * @param body - The body to check for intersections.
   * @param out - An optional array to store the results.
   * @returns An array of intersecting bodies.
   */
  getBodyList(body: Body, out?: Body[]): Body[] {
    const result = out ?? [];
    this.root.getBodyList(body, result);
    return result;
  }

  /**
   * Retrieves a list of ray hits along a line from origin to target.
   * @param origin - The starting point of the line.
   * @param target - The ending point of the line.
   * @param out - An optional RayHitList to store the results.
   * @returns A RayHitList of hits along the line.
   */
  getLineHitList(origin: Vec2, target: Vec2, out?: RayHitList): RayHitList {
    const result = out ?? this.hits;
    result.clear();

    this.root.getLineHitList(origin, target, result);

    return result;
  }

  /**
   * Retrieves the bounds of all nodes in the quadtree.
   * @param out - An optional array to store the results.
   * @returns An array of rectangles representing the bounds of the nodes.
   */
  getTreeBounds(out?: Rectangle[]): Rectangle[] {
    const result = out ?? [];
    this.root.getQuadBounds(result);

    return result;
  }

  /**
   * Clears the quadtree.
   */
  clear(): void {
    this.root.clear();
    this.root.reset(1, this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height);
  }

  /**
   * Updates the bounds of the quadtree.
   * @param x - The new x-coordinate of the bounds.
   * @param y - The new y-coordinate of the bounds.
   * @param width - The new width of the bounds.
   * @param height - The new height of the bounds.
   */
  updateBounds(x: number, y: number, width: number, height: number): void {
    this.bounds.set(x, y, width, height);
    this.root.clear();
    this.root.reset(1, x, y, width, height);
  }

  /**
   * Updates the position of the quadtree.
   * @param x - The new x-coordinate of the position.
   * @param y - The new y-coordinate of the position.
   */
  updatePosition(x: number, y: number): void {
    this.bounds.x = x;
    this.bounds.y = y;
    this.root.clear();
    this.root.reset(1, x, y, this.bounds.width, this.bounds.height);
  }
}
