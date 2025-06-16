import { Body, type BodyOptions, type World } from '@square3/collision';
import { Entity, type EntityOptions } from '@square3/square3';

export type EColliderOptions = EntityOptions & {
  bodyOptions: BodyOptions;
  world: World;
};

export class ECollider extends Entity {
  body: Body;

  world: World;

  constructor(options: EColliderOptions) {
    super(options);
    this.world = options.world;

    this.body = new Body(options.bodyOptions);
    this.world.addBody(this.body);
  }

  override preUpdate(_dt: number): void {
    this.body.updatePosition(this.transform.position.x, this.transform.position.y);
  }

  override postUpdate(_dt: number): void {
    this.body.getPosition(this.transform.position);
  }

  override destroy(): void {
    this.world.removeBody(this.body);
  }
}
