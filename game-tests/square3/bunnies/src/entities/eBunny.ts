import { type Assets, Atlas, CSprite, Entity, type Graphics, type Random, type Size, inject } from '@square3/square3';
import { BunnyMove } from '../components/cBunnyMove';

export class EBunny extends Entity {
  sprite: CSprite;

  move: BunnyMove;

  @inject()
  private assets!: Assets;

  @inject()
  private random!: Random;

  private readonly gravity = 0.5;

  private viewSize: Size;

  constructor(viewSize: Size) {
    super();
    this.viewSize = viewSize;

    const atlas = this.assets.get(Atlas, 'bunnySprites');

    this.sprite = new CSprite({ atlas, frameName: 'bunny', color: this.random.color(0.3, undefined, false) });

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
    } else if (position.x > this.viewSize.width) {
      position.x = this.viewSize.width;
      this.move.speed.x *= -1;
    }

    if (position.y < 0) {
      position.y = 0;
      this.move.speed.y = 0;
    } else if (position.y > this.viewSize.height) {
      position.y = this.viewSize.height;
      this.move.speed.y *= -0.8;

      if (this.random.float(0, 1) > 0.5) {
        this.move.speed.y -= 3 * this.random.float(0, 4);
      }
    }
  }

  override draw(graphics: Graphics): void {
    this.sprite.draw(graphics);
  }
}
