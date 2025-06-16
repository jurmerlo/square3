import { type BodyType, TOUCHING, type World } from '@square3/collision';
import { CBoxShape, Color, type Graphics, type Input, type XY, inject } from '@square3/square3';
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
  drag?: XY;
};

export class EPlayer extends ECollider {
  private cBoxShape: CBoxShape;

  @inject()
  private input!: Input;

  private leftDown = false;

  private rightDown = false;

  constructor({ x, y, type, world, color, width, height, mass = 1, drag }: EBoxOptions) {
    super({
      transformOptions: { x, y },
      bodyOptions: {
        bodyType: type,
        size: { width, height },
        position: { x, y },
        mass,
        drag: drag ?? { x: 0, y: 0 },
        maxVelocity: { x: 300, y: 500 },
      },
      world,
    });

    const boxColor = color ?? new Color(1, 1, 1, 1);

    this.cBoxShape = new CBoxShape({ width: width, height: height, fillColor: boxColor });

    this.input.on({
      event: 'keyPressed',
      callback: (keyCode): void => {
        if (keyCode === 'ArrowLeft') {
          this.leftDown = true;
        } else if (keyCode === 'ArrowRight') {
          this.rightDown = true;
        } else if (keyCode === 'ArrowUp') {
          if (this.body.touching.has(TOUCHING.BOTTOM)) {
            this.body.velocity.y = -400;
          }
        }
      },
    });

    this.input.on({
      event: 'keyReleased',
      callback: (keyCode): void => {
        if (keyCode === 'ArrowLeft') {
          this.leftDown = false;
        } else if (keyCode === 'ArrowRight') {
          this.rightDown = false;
        }
      },
    });
  }

  override update(_dt: number): void {
    if (this.leftDown) {
      this.body.acceleration.x = -20; // Move left
    } else if (this.rightDown) {
      this.body.acceleration.x = 20; // Move right
    } else {
      this.body.acceleration.x = 0; // Stop moving
    }

    if (Math.abs(this.body.velocity.x) < 0.1) {
      this.body.velocity.x = 0; // Stop if velocity is very low
    }
  }

  override draw(graphics: Graphics): void {
    this.cBoxShape.draw(graphics);
  }
}
