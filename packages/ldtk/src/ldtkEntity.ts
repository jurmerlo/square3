import type { EntityInstance } from './ldtkJson.js';

export class LdtkEntity {
  id: string;

  x: number;

  y: number;

  pivotX: number;

  pivotY: number;

  width: number;

  height: number;

  constructor(entity?: EntityInstance) {
    this.id = entity?.__identifier ?? '';
    this.x = entity?.px[0] ?? 0;
    this.y = entity?.px[1] ?? 0;
    this.pivotX = entity?.__pivot[0] ?? 0.5;
    this.pivotY = entity?.__pivot[1] ?? 0.5;
    this.width = entity?.width ?? 0;
    this.height = entity?.height ?? 0;
  }

  clone(): LdtkEntity {
    const entity = new LdtkEntity();
    entity.id = this.id;
    entity.x = this.x;
    entity.y = this.y;
    entity.pivotX = this.pivotX;
    entity.pivotY = this.pivotY;
    entity.width = this.width;
    entity.height = this.height;

    return entity;
  }
}
