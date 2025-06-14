import { Vec2 } from '@square3/square3';
import type { Body } from './body.js';

/**
 * Represents a hit detected by a ray.
 */
export class RayHit {
  /**
   * The x-coordinate of the hit point.
   */
  x: number;

  /**
   * The y-coordinate of the hit point.
   */
  y: number;

  /**
   * The distance from the ray origin to the hit point.
   */
  distance: number;

  /**
   * The body that was hit, if any.
   */
  body?: Body;

  /**
   * Object pool for the hits.
   */
  private static pool: RayHit[] = [];

  /**
   * Retrieves a RayHit instance from the pool or creates a new one.
   * @param origin - The origin point of the ray.
   * @param target - The target point of the ray.
   * @param body - The body that was hit, if any.
   * @returns A RayHit instance.
   */
  static get(origin: Vec2, target: Vec2, body?: Body): RayHit {
    const hit = RayHit.pool.pop();
    if (hit) {
      hit.reset(origin, target, body);

      return hit;
    }

    return new RayHit(origin, target, body);
  }

  /**
   * Creates a new RayHit instance.
   * @param origin - The origin point of the ray.
   * @param target - The target point of the ray.
   * @param body - The body that was hit, if any.
   */
  constructor(origin: Vec2, target: Vec2, body?: Body) {
    this.x = target.x;
    this.y = target.y;
    this.distance = Vec2.distance(origin, target);
    this.body = body;
  }

  /**
   * Resets the RayHit instance with new values.
   * @param origin - The origin point of the ray.
   * @param target - The target point of the ray.
   * @param body - The body that was hit, if any.
   */
  reset(origin: Vec2, target: Vec2, body?: Body): void {
    this.x = target.x;
    this.y = target.y;
    this.distance = Vec2.distance(origin, target);
    this.body = body;
  }

  /**
   * Returns the RayHit instance to the pool.
   */
  put(): void {
    RayHit.pool.push(this);
  }
}
