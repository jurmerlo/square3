import {
  Color,
  type EmitHandler,
  Emitter,
  type EmitterOnParams,
  type Graphics,
  Rectangle,
  type Size,
  Vec2,
  type XY,
  clamp,
} from '@square3/square3';
import type { Body } from './body';
import { TOUCHING } from './constants';
import { Interaction, type InteractionType } from './interaction';
import { QuadTree } from './quadTree';
import type { RayHitList } from './rayHitList';
import { bodiesIntersect, separate } from './resolver';

/**
 * Helper type to draw raycasts when debug drawing.
 */
type RayDraw = {
  /**
   * The start of the ray.
   */
  origin: Vec2;

  /**
   * The end of the ray.
   */
  target: Vec2;

  /**
   * Has the ray hit a body.
   */
  hit: boolean;
};

/**
 * The physics world creation options.
 */
export type WorldOptions = {
  /**
   * The top left position of the world.
   */
  position?: XY;

  /**
   * The world size.
   */
  size: Size;

  /**
   * Physics iterations per step.
   */
  iterations?: number;

  /**
   * The world gravity.
   */
  gravity?: XY;
};

export type CollisionEvents = {
  triggerStart: [body1: Body, body2: Body];
  triggerStay: [body1: Body, body2: Body];
  triggerEnd: [body1: Body, body2: Body];
  collisionStart: [body1: Body, body2: Body];
  collisionStay: [body1: Body, body2: Body];
  collisionEnd: [body1: Body, body2: Body];
};

const BOUNDS_COLOR = new Color(0.4, 0.4, 0.4);
const BODY_COLOR = new Color(0, 0.5, 0.8);
const STATIC_BODY_COLOR = new Color(0, 0.8, 0);
const RAY_COLOR = new Color(1, 0.5, 0);
const RAY_HIT_COLOR = new Color(1, 1, 0);

/**
 * Class representing the physics world.
 */
export class World {
  /**
   * Indicates if rays should be drawn for debugging.
   */
  drawRays = false;

  /**
   * Indicates if the quadtree should be shown for debugging.
   */
  showQuadTree = false;

  /**
   * Number of physics iterations per step.
   */
  iterations = 8;

  /**
   * The gravity applied to bodies in the world.
   */
  gravity: Vec2;

  /**
   * The list of bodies in the world.
   */
  bodies: Body[] = [];

  /**
   * Bodies retrieved from the quad tree.
   */
  private treeList: Body[] = [];

  /**
   * Interactions per step.
   */
  private interactions: Interaction[] = [];

  /**
   * The world bounds.
   */
  private bounds: Rectangle;

  /**
   * The quadtree for the world.
   */
  private tree: QuadTree;

  /**
   * The debug draw ray list.
   */
  private debugRays: RayDraw[] = [];

  private emitter: Emitter<CollisionEvents> = new Emitter();

  /**
   * Creates a new World instance.
   * @param options - The world creation options.
   */
  constructor(options: WorldOptions) {
    this.bounds = new Rectangle(
      options.position?.x ?? 0,
      options.position?.y ?? 0,
      options.size.width,
      options.size.height,
    );
    this.gravity = new Vec2(0, 0);
    if (options.gravity) {
      this.gravity.set(options.gravity.x, options.gravity.y);
    }

    this.tree = new QuadTree(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height);
  }

  on<K extends keyof CollisionEvents>(params: EmitterOnParams<CollisionEvents, K>): EmitHandler {
    return this.emitter.on(params);
  }

  off<K extends keyof CollisionEvents>(event: K, handler: EmitHandler): void {
    this.emitter.off(event, handler);
  }

  /**
   * Adds a body to the world.
   * @param body - The body to add.
   */
  addBody(body: Body): void {
    this.bodies.push(body);
  }

  /**
   * Removes a body from the world.
   * @param body - The body to remove.
   */
  removeBody(body: Body): void {
    const index = this.bodies.indexOf(body);
    if (index !== -1) {
      this.bodies.splice(index, 1);
    }
  }

  /**
   * Updates the physics world.
   * @param dt - The delta time since the last update.
   */
  update(dt: number): void {
    if (this.debugRays.length > 1000) {
      this.debugRays.length = 0;
    }

    this.tree.clear();

    for (const body of this.bodies) {
      if (body.active) {
        // Update is/was triggered/colliding.
        this.updatePastInteractions(body);
        body.wasTouching.value = body.touching.value;
        body.touching.value = TOUCHING.NONE;
        body.lastPos.x = body.bounds.x;
        body.lastPos.y = body.bounds.y;

        // Update the position and velocity if the body is within the world bounds.
        if (this.bounds.intersects(body.bounds)) {
          if (body.bodyType !== 'static') {
            if (body.bodyType === 'dynamic') {
              if (body.useGravity) {
                body.velocity.x += body.acceleration.x + this.gravity.x;
                body.velocity.y += body.acceleration.y + this.gravity.y;
              }

              if (body.velocity.x > 0) {
                body.velocity.x -= body.drag.x;
              } else if (body.velocity.x < 0) {
                body.velocity.x += body.drag.x;
              }

              if (body.velocity.y > 0) {
                body.velocity.y -= body.drag.y;
              } else if (body.velocity.y < 0) {
                body.velocity.y += body.drag.y;
              }

              if (body.maxVelocity.x !== 0) {
                body.velocity.x = clamp(body.velocity.x, -body.maxVelocity.x, body.maxVelocity.x);
              }

              if (body.maxVelocity.y !== 0) {
                body.velocity.y = clamp(body.velocity.y, -body.maxVelocity.y, body.maxVelocity.y);
              }
            }
            body.bounds.x += body.velocity.x * dt;
            body.bounds.y += body.velocity.y * dt;
          }
          this.tree.insert(body);
        }
      }
    }

    // Resolve the collisions.
    for (let i = 0; i < this.iterations; i++) {
      for (const body of this.bodies) {
        if (body.active) {
          while (this.treeList.length > 0) {
            this.treeList.pop();
          }
          this.tree.getBodyList(body, this.treeList);
          for (const body2 of this.treeList) {
            this.checkCollisions(body, body2);
          }
        }
      }
    }

    // Update body interactions that ended this step.
    for (const body of this.bodies) {
      if (body.active) {
        for (const body2 of body.wasCollidingWith) {
          if (!body.isCollidingWith.includes(body2)) {
            if (!this.hasInteraction('collisionEnd', body, body2)) {
              this.interactions.push(Interaction.get('collisionEnd', body, body2));
            }
          }
        }

        for (const body2 of body.wasTriggeredBy) {
          if (!body.isTriggeredBy.includes(body2)) {
            if (!this.hasInteraction('triggerEnd', body, body2)) {
              this.interactions.push(Interaction.get('triggerEnd', body, body2));
            }
          }
        }
      }
    }

    // Emit all physics interactions that happened this step.
    while (this.interactions.length > 0) {
      const interaction = this.interactions.pop();
      if (interaction) {
        this.emitter.emit(interaction.type, interaction.body1, interaction.body2);
        interaction.put();
      }
    }
  }

  /**
   * Draws the physics world for debugging.
   */
  draw(graphics: Graphics): void {
    if (this.showQuadTree) {
      graphics.color.copyFrom(BOUNDS_COLOR);
      graphics.drawRect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height, 2);

      const quads = this.tree.getTreeBounds();
      for (const quad of quads) {
        graphics.drawRect(quad.x, quad.y, quad.width, quad.height, 2);
      }
    }

    for (const body of this.bodies) {
      if (body.active) {
        const bounds = body.bounds;
        const color = body.bodyType === 'static' ? STATIC_BODY_COLOR : BODY_COLOR;
        graphics.color.copyFrom(color);
        graphics.drawRect(bounds.x, bounds.y, bounds.width, bounds.height);
      }
    }

    if (this.drawRays) {
      for (const ray of this.debugRays) {
        const color = ray.hit ? RAY_HIT_COLOR : RAY_COLOR;
        graphics.color.copyFrom(color);
        graphics.drawLine(ray.origin.x, ray.origin.y, ray.target.x, ray.target.y, 'center');
      }
      this.debugRays.length = 0;
    }
  }

  /**
   * Performs a raycast in the world.
   * @param origin - The origin point of the ray.
   * @param target - The target point of the ray.
   * @param tags - Optional tags to filter the hits.
   * @param out - Optional RayHitList to store the results.
   * @returns A RayHitList of hits along the ray.
   */
  raycast(origin: Vec2, target: Vec2, tags?: string[], out?: RayHitList): RayHitList {
    const result = this.tree.getLineHitList(origin, target, out);

    if (result.count() > 0 && tags) {
      result.filterOnTags(tags);
    }

    if (this.drawRays) {
      const ray: RayDraw = { origin, target, hit: result.count() > 0 };
      this.debugRays.push(ray);
    }

    return result;
  }

  /**
   * Gets the position of the world.
   * @returns The x and y coordinates of the world.
   */
  getPosition(out?: Vec2): Vec2 {
    const result = out ?? Vec2.get();
    result.set(this.bounds.x, this.bounds.y);

    return result;
  }

  /**
   * Gets the size of the world.
   * @returns The width and height of the world.
   */
  getSize(out?: Vec2): Vec2 {
    const result = out ?? Vec2.get();
    result.set(this.bounds.width, this.bounds.height);

    return result;
  }

  /**
   * Sets the position of the world.
   * @param x - The new x-coordinate of the world.
   * @param y - The new y-coordinate of the world.
   */
  setPositions(x: number, y: number): void {
    this.bounds.x = x;
    this.bounds.y = y;
    this.tree.updatePosition(x, y);
  }

  /**
   * Sets the size of the world.
   * @param width - The new width of the world.
   * @param height - The new height of the world.
   */
  setSize(width: number, height: number): void {
    this.bounds.width = width;
    this.bounds.height = height;
    this.tree.updateBounds(this.bounds.x, this.bounds.y, width, height);
  }

  destroy(): void {
    this.emitter.clear();
  }

  /**
   * Check if an interaction between two bodies is already in the list. To make sure we don't emit duplicate interactions.
   * @param type - The interaction type.
   * @param body1 - The first body.
   * @param body2 - The second body.
   * @returns True if the interaction already exists.
   */
  private hasInteraction(type: InteractionType, body1: Body, body2: Body): boolean {
    for (let i = 0; i < this.interactions.length; i++) {
      const interaction = this.interactions[i];
      if (
        interaction.type === type &&
        (interaction.body1 === body1 || interaction.body1 === body2) &&
        (interaction.body2 === body2 || interaction.body2 === body1)
      ) {
        return true;
      }
    }

    return false;
  }

  /**
   * Update the interactions lists from the previous step.
   * @param body The body to update.
   */
  private updatePastInteractions(body: Body): void {
    while (body.wasCollidingWith.length > 0) {
      body.wasCollidingWith.pop();
    }

    while (body.wasTriggeredBy.length > 0) {
      body.wasTriggeredBy.pop();
    }

    while (body.isCollidingWith.length > 0) {
      const other = body.isCollidingWith.pop();
      if (other) {
        body.wasCollidingWith.push(other);
      }
    }

    while (body.isTriggeredBy.length > 0) {
      const other = body.isTriggeredBy.pop();
      if (other) {
        body.wasTriggeredBy.push(other);
      }
    }
  }

  /**
   * Check if two bodies collided, resolve the collision, and update the interactions.
   * @param body1 - The first body.
   * @param body2 - The second body.
   */
  private checkCollisions(body1: Body, body2: Body): void {
    if (body2.groups.has(body1.masks.value) && body1.groups.has(body2.masks.value) && bodiesIntersect(body1, body2)) {
      // if (Bits.has(body1.mask, body2.group) && Bits.has(body2.mask, body1.group) && bodiesIntersect(body1, body2)) {
      if (body1.bodyType === 'dynamic' && !body1.isSensor && !body2.isSensor) {
        separate(body1, body2);
        if (!body1.wasCollidingWith.includes(body2)) {
          if (!this.hasInteraction('collisionStart', body1, body2)) {
            this.interactions.push(Interaction.get('collisionStart', body1, body2));
          }
        } else {
          if (!this.hasInteraction('collisionStay', body1, body2)) {
            this.interactions.push(Interaction.get('collisionStay', body1, body2));
          }
        }

        if (!body1.isCollidingWith.includes(body2)) {
          body1.isCollidingWith.push(body2);
        }
      } else if (body1.isSensor && !body2.isSensor) {
        if (!body1.wasTriggeredBy.includes(body2)) {
          if (!this.hasInteraction('triggerStart', body1, body2)) {
            this.interactions.push(Interaction.get('triggerStart', body1, body2));
          }
        } else {
          if (!this.hasInteraction('triggerStay', body1, body2)) {
            this.interactions.push(Interaction.get('triggerStay', body1, body2));
          }
        }

        if (!body1.isTriggeredBy.includes(body2)) {
          body1.isTriggeredBy.push(body2);
        }
      } else if (body2.isSensor && !body1.isSensor) {
        if (!body2.wasTriggeredBy.includes(body1)) {
          if (!this.hasInteraction('triggerStart', body2, body1)) {
            this.interactions.push(Interaction.get('triggerStart', body2, body1));
          }
        } else {
          if (!this.hasInteraction('triggerStay', body2, body1)) {
            this.interactions.push(Interaction.get('triggerStay', body2, body1));
          }
        }

        if (!body2.isTriggeredBy.includes(body1)) {
          body2.isTriggeredBy.push(body1);
        }
      }
    }
  }
}
