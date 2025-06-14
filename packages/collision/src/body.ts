import { Bitset, Rectangle, type Size, Vec2, type XY } from '@square3/square3';
import { COLLIDING_SIDES, COLLISION_GROUPS } from './constants.js';

/**
 * The type of a physics body. Determines how the body behaves in the simulation.
 * - `dynamic`: The body is affected by forces and collisions.
 * - `kinematic`: The body is not affected by forces but can collide with other bodies.
 * - `static`: The body is not affected by forces or collisions, but dynamic bodies collide with it.
 */
export type BodyType = 'dynamic' | 'kinematic' | 'static';

/**
 * Options for configuring a physics body.
 */
export type BodyOptions = {
  /**
   * Indicates if the body is active in the simulation.
   */
  active?: boolean;

  /**
   * The type of the body, which determines its behavior in the simulation.
   */
  bodyType?: BodyType;

  /**
   * If true, the body will act as a sensor and will not collide.
   */
  isSensor?: boolean;

  /**
   * The initial position of the body in the simulation.
   */
  position?: XY;

  /**
   * The size of the body.
   */
  size?: Size;

  /**
   * The bounce factor of the body, determining how much it bounces after a collision. Between 0 and 1.
   */
  bounce?: number;

  /**
   * If true, the body will be affected by gravity.
   */
  useGravity?: boolean;

  /**
   * The collision group of the body, used to determine which bodies it can collide with.
   */
  groups?: Bitset;

  /**
   * The collision mask of the body, used to filter collisions with other bodies.
   */
  masks?: Bitset;

  /**
   * A bitmask indicating which collision groups the body can collide with.
   */
  canCollide?: Bitset;

  /**
   * The drag force applied to the body, reducing its velocity over time.
   */
  drag?: XY;

  /**
   * The initial velocity of the body.
   */
  velocity?: XY;

  /**
   * The acceleration applied to the body.
   */
  acceleration?: XY;

  /**
   * The maximum velocity the body can reach.
   */
  maxVelocity?: XY;

  /**
   * The offset of the body's position, used for fine-tuning its placement.
   */
  offset?: XY;

  /**
   * An array of tags associated with the body, used for identification or categorization.
   */
  tags?: string[];

  /**
   * Custom user data associated with the body.
   */
  userData?: unknown;

  /**
   * The mass of the body, used for physics calculations.
   */
  mass?: number;
};

/**
 * Represents a physical body in the collision system.
 */
export class Body {
  /**
   * Indicates if the body is active.
   */
  active: boolean;

  /**
   * The type of the body (e.g., dynamic, static).
   */
  bodyType: BodyType;

  /**
   * Indicates if the body is a sensor.
   */
  isSensor: boolean;

  /**
   * The bounding rectangle of the body.
   */
  bounds: Rectangle;

  /**
   * The last position of the body.
   */
  lastPos: Vec2;

  /**
   * The bounce factor of the body.
   */
  bounce: number;

  /**
   * Indicates if gravity affects the body.
   */
  useGravity: boolean;

  /**
   * The collision group of the body.
   */
  groups: Bitset;

  /**
   * The collision mask of the body.
   */
  masks: Bitset;

  /**
   * The sides the body can collide with.
   */
  canCollide: Bitset;

  /**
   * The drag force applied to the body.
   */
  drag: Vec2;

  /**
   * The velocity of the body.
   */
  velocity: Vec2;

  /**
   * The acceleration of the body.
   */
  acceleration: Vec2;

  /**
   * The maximum velocity of the body.
   */
  maxVelocity: Vec2;

  /**
   * The offset of the body.
   */
  offset: Vec2;

  /**
   * The tags associated with the body.
   */
  tags: string[];

  /**
   * User-defined data associated with the body.
   */
  userData: unknown;

  /**
   * The sides the body is currently touching.
   */
  touching: Bitset;

  /**
   * The sides the body was touching in the previous frame.
   */
  wasTouching: Bitset;

  /**
   * The bodies this body is currently colliding with.
   */
  isCollidingWith: Body[] = [];

  /**
   * The bodies this body was colliding with in the previous frame.
   */
  wasCollidingWith: Body[] = [];

  /**
   * The bodies this body is currently triggered by.
   */
  isTriggeredBy: Body[] = [];

  /**
   * The bodies this body was triggered by in the previous frame.
   */
  wasTriggeredBy: Body[] = [];

  mass: number;

  /**
   * Creates a new Body instance.
   * @param options - The options to initialize the body with.
   */

  constructor(options: BodyOptions) {
    this.active = options.active ?? true;
    this.bodyType = options.bodyType ?? 'dynamic';
    this.isSensor = options.isSensor ?? false;
    this.bounce = options.bounce ?? 0;
    this.useGravity = options.useGravity ?? true;
    this.groups = options.groups ?? new Bitset(COLLISION_GROUPS.GROUP_01);
    this.masks = options.masks ?? new Bitset(COLLISION_GROUPS.GROUP_01);
    this.canCollide = options.canCollide ?? new Bitset(COLLIDING_SIDES.ALL);
    this.tags = options.tags ?? [];
    this.userData = options.userData;
    this.mass = options.mass ?? 1;

    this.drag = new Vec2();
    this.velocity = new Vec2();
    this.acceleration = new Vec2();
    this.maxVelocity = new Vec2();
    this.offset = new Vec2();

    this.touching = new Bitset(COLLIDING_SIDES.NONE);
    this.wasTouching = new Bitset(COLLIDING_SIDES.NONE);

    this.bounds = new Rectangle(0, 0, 10, 10);

    this.lastPos = new Vec2(this.bounds.x, this.bounds.y);

    if (options.size) {
      this.bounds.width = options.size.width;
      this.bounds.height = options.size.height;
    }

    if (options.offset) {
      this.offset.set(options.offset.x, options.offset.y);
    }

    if (options.position) {
      this.updatePosition(options.position.x, options.position.y);
    }

    if (options.drag) {
      this.drag.set(options.drag.x, options.drag.y);
    }

    if (options.velocity) {
      this.velocity.set(options.velocity.x, options.velocity.y);
    }

    if (options.acceleration) {
      this.acceleration.set(options.acceleration.x, options.acceleration.y);
    }

    if (options.maxVelocity) {
      this.maxVelocity.set(options.maxVelocity.x, options.maxVelocity.y);
    }
  }

  /**
   * Update the body's position base on the center point.
   * @param x - The x-coordinate of the center point.
   * @param y - The y-coordinate of the center point.
   */
  updatePosition(x: number, y: number): void {
    this.bounds.x = x - this.bounds.width * 0.5 + this.offset.x;
    this.bounds.y = y - this.bounds.height * 0.5 + this.offset.y;
  }

  /**
   * Get the position of the body.
   * @returns The position of the body.
   */
  getPosition(out?: Vec2): Vec2 {
    const result = out ?? Vec2.get();
    const x = this.bounds.x + this.bounds.width * 0.5 - this.offset.x;
    const y = this.bounds.y + this.bounds.height * 0.5 - this.offset.y;
    result.set(x, y);

    return result;
  }
}
