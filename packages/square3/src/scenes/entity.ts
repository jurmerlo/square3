import type { Graphics } from '../graphics/graphics.js';

const HIGHEST_VALUE = 4294967296;

let nextId = 0;

const freeIds: number[] = [];

/**
 * Get the next available entity ID.
 * @returns The next available entity ID.
 */
function getNextId(): number {
  if (nextId < HIGHEST_VALUE) {
    return nextId++;
  }

  const id = freeIds.pop();
  if (id) {
    return id;
  }

  throw new Error('No more entity ids available');
}

/**
 * Options for creating an entity.
 */
export type EntityOptions = {
  /**
   * Whether the entity is active. Defaults to true.
   */
  active?: boolean;
  /**
   * The layer the entity belongs to. Defaults to 0.
   */
  layer?: number;
  /**
   * A tag to identify the entity. Defaults to 'default'.
   */
  tag?: string;
};

/**
 * Base class for entities in the game.
 */
export abstract class Entity {
  /**
   * Whether the entity is active.
   * If false, the entity will not be updated or drawn.
   */
  active: boolean;

  /**
   * A tag to identify the entity.
   * Used for filtering or grouping entities.
   */
  tag: string;

  /**
   * Unique identifier for the entity.
   * Used to track and manage entities.
   */
  id: number;

  /**
   * Whether the layer of the entity has been updated.
   * Used to optimize layer updates.
   */
  layerUpdated: boolean;

  /**
   * The layer the entity belongs to.
   * Used for rendering order.
   */
  layer: number;

  /**
   * Reset the entity IDs to allow reuse.
   */
  static resetIds(): void {
    nextId = 0;
    freeIds.length = 0;
  }

  /**
   * Create a new entity.
   * @param options Options for the entity.
   */
  constructor({ active, layer, tag }: EntityOptions = {}) {
    this.active = active ?? true;
    this.layer = layer ?? 0;
    this.tag = tag ?? 'default';
    this.id = getNextId();
    this.layerUpdated = false;
  }

  /**
   * Update the layer of the entity.
   * @param value The new layer value.
   */
  updateLayer(value: number): void {
    this.layer = value;
    this.layerUpdated = true;
  }

  /**
   * Called before the entity is updated.
   * @param dt  Delta time since the last update in seconds.
   */
  preUpdate?(dt: number): void;

  /**
   * Update the entity.
   * @param dt Delta time since the last update in seconds.
   */
  update?(dt: number): void;

  /**
   * Called after the entity is updated.
   * @param dt Delta time since the last update in seconds.
   */
  postUpdate?(dt: number): void;

  /**
   * Draw the entity to the graphics context.
   * @param graphics The graphics context to draw to.
   */
  draw?(graphics: Graphics): void;

  /**
   *  Destroy the entity.
   */
  destroy(): void {
    freeIds.push(this.id);
    this.active = false;
  }
}
