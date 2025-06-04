import {
  type Assets,
  Atlas,
  CSprite,
  CTransform,
  Entity,
  type Graphics,
  type Random,
  type View,
  inject,
} from '../../square3';
import { BunnyMove } from './cBunnyMove';

export class EBunny extends Entity {
  transform: CTransform;

  sprite: CSprite;

  move: BunnyMove;

  @inject()
  private assets!: Assets;

  @inject()
  private random!: Random;

  @inject()
  private view!: View;

  private readonly maxX: number;
  private readonly maxY: number;

  private readonly gravity = 0.5;

  constructor() {
    super();

    this.maxX = this.view.viewWidth;
    this.maxY = this.view.viewHeight;

    this.transform = new CTransform();

    const atlas = this.assets.get(Atlas, 'bunnySprites');

    this.sprite = new CSprite({ atlas, frameName: 'bunny', color: this.random.color(0.3) });

    this.move = new BunnyMove();
  }

  override update(_dt: number): void {
    const position = this.transform.position;
    position.x += this.move.speed.x;
    position.y += this.move.speed.y;
    this.transform.rotation += this.move.rotationSpeed;

    this.move.speed.y += this.gravity;

    if (position.x < 0) {
      position.x = 0;
      this.move.speed.x *= -1;
    } else if (position.x > this.maxX) {
      position.x = this.maxX;
      this.move.speed.x *= -1;
    }

    if (position.y < 0) {
      position.y = 0;
      this.move.speed.y = 0;
    } else if (position.y > this.maxY) {
      position.y = this.maxY;
      this.move.speed.y *= -0.8;

      if (this.random.float(0, 1) > 0.5) {
        this.move.speed.y -= 3 * this.random.float(0, 4);
      }
    }
  }

  override draw(graphics: Graphics): void {
    this.transform.drawWithTransform(graphics, () => {
      this.sprite.draw(graphics);
    });
  }
}
