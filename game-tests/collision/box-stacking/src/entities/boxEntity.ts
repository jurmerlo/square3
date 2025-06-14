import { Body, type BodyType, type World } from '@square3/collision';
import { CBoxShape, CTransform, Color, Entity, type Graphics, type Random, inject } from '@square3/square3';

type BoxEntityOptions = {
  x: number;
  y: number;
  type: BodyType;
  world: World;
  color?: Color;
  width?: number;
  height?: number;
};

export class BoxEntity extends Entity {
  private cTransform: CTransform;

  private cBoxShape: CBoxShape;

  private body: Body;

  private world: World;

  @inject()
  private random!: Random;

  constructor({ x, y, type, world, color, width, height }: BoxEntityOptions) {
    super();

    this.world = world;

    this.cTransform = new CTransform({ x, y });

    const boxWidth = width ?? this.random.int(20, 40);
    const boxHeight = height ?? this.random.int(20, 40);
    const boxColor = color ?? new Color(1, 1, 1, 1);

    this.body = new Body({
      size: { width: boxWidth, height: boxHeight },
      position: { x, y },
      bodyType: type,
    });
    this.world.addBody(this.body);
    this.cBoxShape = new CBoxShape({ width: boxWidth, height: boxHeight, fillColor: boxColor });
  }

  override preUpdate(_dt: number): void {
    this.body.updatePosition(this.cTransform.position.x, this.cTransform.position.y);
  }

  override postUpdate(_dt: number): void {
    this.body.getPosition(this.cTransform.position);
  }

  override draw(graphics: Graphics): void {
    this.cTransform.drawWithTransform(graphics, () => {
      this.cBoxShape.draw(graphics);
    });
  }

  override destroy(): void {
    this.world.removeBody(this.body);
  }
}
