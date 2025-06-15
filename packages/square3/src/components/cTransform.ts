import { Mat4 } from '../math/mat4.js';
import { toRad } from '../math/mathUtils.js';
import { Vec2 } from '../math/vec2.js';

/**
 * The transform initial value options.
 */
export type CTransformOptions = {
  /**
   * The x position.
   */
  x?: number;

  /**
   * The y position.
   */
  y?: number;

  /**
   * The rotation in degrees.
   */
  rotation?: number;

  /**
   * The x axis scale.
   */
  scaleX?: number;

  /**
   * The y axis scale.
   */
  scaleY?: number;

  /**
   * Optional parent for parent child movement.
   */
  parent?: CTransform;
};

/**
 * Transform component used for position, rotation and scale.
 */
export class CTransform {
  /**
   * The local space position.
   */
  position = new Vec2();

  /**
   * The local space rotation in degrees.
   */
  rotation = 0;

  /**
   * The local space scale.
   */
  scale = new Vec2(1, 1);

  /**
   * The parent transform.
   */
  parent?: CTransform;

  useWorldTransform = true;

  /**
   * Create a new transform instance.
   * @param options - Initial value options.
   */
  constructor({ x, y, rotation, scaleX, scaleY, parent }: CTransformOptions = {}) {
    this.position.x = x ?? 0;
    this.position.y = y ?? 0;
    this.rotation = rotation ?? 0;
    this.scale.x = scaleX ?? 1.0;
    this.scale.y = scaleY ?? 1.0;
    this.parent = parent;
  }

  /**
   * Convert a parent space position to a local space position.
   * @param x - The x axis position.
   * @param y - The y axis position.
   * @returns The local space x and y position.
   */
  parentToLocalPosition(x: number, y: number, out?: Vec2): Vec2 {
    const result = out ?? Vec2.get();

    // No need to calculate the rotation.
    if (this.rotation === 0) {
      // No need to calculate scale.
      if (this.scale.x === 1.0 && this.scale.y === 1.0) {
        result.set(x - this.position.x, y - this.position.y);
      } else {
        result.set((x - this.position.x) / this.scale.x, (y - this.position.y) / this.scale.y);
      }
    } else {
      const c = Math.cos(toRad(this.rotation));
      const s = Math.sin(toRad(this.rotation));
      const toX = x - this.position.x;
      const toY = y - this.position.y;

      result.set((toX * c + toY * s) / this.scale.x, (toY * -s + toY * c) / this.scale.y);
    }

    return result;
  }

  /**
   * Convert a local space position to a parent space position.
   * @param x - The x axis position.
   * @param y - The y axis position.
   * @returns The parent space x and y position.
   */
  localToParentPosition(x: number, y: number, out?: Vec2): Vec2 {
    const result = out ?? Vec2.get();

    if (this.rotation === 0) {
      if (this.scale.x === 1.0 && this.scale.y === 1.0) {
        result.set(x + this.position.x, y + this.position.y);
      } else {
        result.set(x * this.scale.x + this.position.x, y * this.scale.y + this.position.y);
      }
    } else {
      const c = Math.cos(toRad(-this.rotation));
      const s = Math.sin(toRad(-this.rotation));
      const toX = x * this.scale.x;
      const toY = y * this.scale.y;
      result.set(toX * c + toY * s + this.position.x, toX * -s + toY * c + this.position.y);
    }

    return result;
  }

  /**
   * Convert a position from local to world space.
   * @param x - The x axis position.
   * @param y - The y axis position.
   * @returns Return the position in world space.
   */
  localToWorldPosition(x: number, y: number, out?: Vec2): Vec2 {
    const result = out ?? Vec2.get();
    result.set(x, y);

    let parent = this.parent;
    while (parent) {
      parent.localToParentPosition(x, y, result);
      parent = parent.parent;
    }

    return result;
  }

  /**
   * Convert a position from world to local space.
   * @param x - The x axis position.
   * @param y - The y axis position.
   * @returns Return the position in local space.
   */
  worldToLocalPosition(x: number, y: number, out?: Vec2): Vec2 {
    const result = out ?? Vec2.get();
    result.set(x, y);

    if (this.parent) {
      this.parent.parentToLocalPosition(x, y, result);
    }

    return result;
  }

  /**
   * Get the world position of this transform.
   * @param out - Optional output vector to store the result.
   * @returns The x and y world position.
   */
  getWorldPosition(out?: Vec2): Vec2 {
    return this.localToWorldPosition(this.position.x, this.position.y, out);
  }

  /**
   * Set a new world position.
   * @param x - The x axis position.
   * @param y - The y axis position.
   */
  setWorldPosition(x: number, y: number): void {
    this.worldToLocalPosition(x, y, this.position);
  }

  /**
   * Get the world rotation for this transform.
   * @returns The world rotation in degrees.
   */
  getWorldRotation(): number {
    if (this.parent) {
      return this.parent.getWorldRotation() + this.rotation;
    }

    return this.rotation;
  }

  /**
   * Set a new world rotation.
   * @param rotation - The new rotation in degrees.
   */
  setWorldRotation(rotation: number): void {
    if (this.parent) {
      this.rotation = rotation - this.parent.getWorldRotation();
    } else {
      this.rotation = rotation;
    }
  }

  /**
   * Get world world scale for this transform.
   * @param out - Optional output vector to store the result.
   * @returns The world scale.
   */
  getWorldScale(out?: Vec2): Vec2 {
    const result = out ?? Vec2.get();
    if (this.parent) {
      this.parent.getWorldScale(result);
      result.multiply(this.scale);

      return result;
    }

    result.set(this.scale.x, this.scale.y);

    return result;
  }

  /**
   * Set a new world scale.
   * @param scaleX - The x axis scale.
   * @param scaleY - The y axis scale.
   */
  setWorldScale(scaleX: number, scaleY: number): void {
    if (this.parent) {
      const parentScale = this.parent.getWorldScale();
      this.scale.set(scaleX / parentScale.x, scaleY / parentScale.y);
    } else {
      this.scale.x = scaleX;
      this.scale.y = scaleY;
    }
  }

  /**
   * Set a new local position.
   * @param x - The x axis position.
   * @param y - The y axis position.
   */
  setPosition(x: number, y: number): void {
    this.position.x = x;
    this.position.y = y;
  }

  /**
   * Set a new local scale.
   * @param scaleX - The x axis scale.
   * @param scaleY - The y axis scale.
   */
  setScale(scaleX: number, scaleY: number): void {
    this.scale.x = scaleX;
    this.scale.y = scaleY;
  }

  /**
   * Get a matrix representation of this transform.
   * @param out Optional output matrix to store the result.
   * @returns The matrix representation of this transform.
   */
  getMatrix(out?: Mat4): Mat4 {
    const result = out ?? Mat4.get();
    if (this.useWorldTransform) {
      const position = this.getWorldPosition();
      const scale = this.getWorldScale();
      Mat4.from2dRotationTranslationScale(
        toRad(this.getWorldRotation()),
        position.x,
        position.y,
        scale.x,
        scale.y,
        result,
      );

      position.put();
      scale.put();
    } else {
      Mat4.from2dRotationTranslationScale(
        toRad(this.rotation),
        this.position.x,
        this.position.y,
        this.scale.x,
        this.scale.y,
        result,
      );
    }

    return result;
  }
}
