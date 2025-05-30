import type { Graphics } from './graphics/graphics.js';

const HIGHEST_VALUE = 4294967296;

let nextId = 0;

const freeIds: number[] = [];

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

export type EntityOptions = {
  active?: boolean;
  layer?: number;
  tag?: string;
};

export abstract class Entity {
  active: boolean;

  tag: string;

  id: number;

  layerUpdated: boolean;

  layer: number;

  static resetIds(): void {
    nextId = 0;
    freeIds.length = 0;
  }

  constructor({ active, layer, tag }: EntityOptions = {}) {
    this.active = active ?? true;
    this.layer = layer ?? 0;
    this.tag = tag ?? 'default';
    this.id = getNextId();
    this.layerUpdated = false;
  }

  updateLayer(value: number): void {
    this.layer = value;
    this.layerUpdated = true;
  }

  preUpdate?(dt: number): void;
  update?(dt: number): void;
  postUpdate?(dt: number): void;

  draw?(graphics: Graphics): void;

  destroy(): void {
    freeIds.push(this.id);
    this.active = false;
  }
}
