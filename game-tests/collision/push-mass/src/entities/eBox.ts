import type { BodyType, World } from '@square3/collision';
import { CBoxShape, Color, type Graphics, type XY } from '@square3/square3';
import { ECollider } from './eCollider';

type EBoxOptions = {
  x: number;
  y: number;
  type: BodyType;
  world: World;
  color?: Color;
  width: number;
  height: number;
  mass?: number;
  velocity?: XY;
};

export class EBox extends ECollider {
  private cBoxShape: CBoxShape;

  constructor({ x, y, type, world, color, width, height, mass = 1, velocity }: EBoxOptions) {
    super({
      bodyOptions: {
        size: { width, height },
        position: { x, y },
        bodyType: type,
        mass,
        drag: { x: 2, y: 0 },
        velocity,
      },
      world,
      transformOptions: { x, y },
    });

    const boxColor = color ?? new Color(1, 1, 1, 1);
    this.cBoxShape = new CBoxShape({ width, height, fillColor: boxColor });
  }

  override draw(graphics: Graphics): void {
    this.cBoxShape.draw(graphics);
  }
}
