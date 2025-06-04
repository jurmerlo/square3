import { type Assets, Atlas, BitmapFont, type EmitHandler, type Input, Scene, inject } from '../../square3';
import { EBunny } from './eBunny';
import { EFpsText } from './eFpsText';
import { EText } from './eText';

export class BunniesScene extends Scene {
  @inject()
  private assets!: Assets;

  @inject()
  private input!: Input;

  private bunniesText!: EText;

  private bunniesCount = 0;

  private isMouseDown = false;

  private downHandler!: EmitHandler;
  private upHandler!: EmitHandler;

  override async load(): Promise<void> {
    await this.assets.load(Atlas, 'bunnySprites', 'assets/bunnies/bunnyAtlas');
    await this.assets.load(BitmapFont, 'bunnyFont', 'assets/bunnies/kp-32');
  }

  override init(): void {
    const font = this.assets.get(BitmapFont, 'bunnyFont');

    this.bunniesText = new EText({ x: 20, y: 20, font, text: 'Bunnies: 0', anchor: { x: 0, y: 0 } });
    this.addEntity(this.bunniesText);

    const fpsText = new EFpsText({ x: 20, y: 50, font, anchor: { x: 0, y: 0 } });
    this.addEntity(fpsText);

    this.createBunny();

    this.downHandler = this.input.on({
      event: 'mousePressed',
      callback: (): void => {
        this.isMouseDown = true;
      },
    });

    this.upHandler = this.input.on({
      event: 'mouseReleased',
      callback: (): void => {
        this.isMouseDown = false;
      },
    });
  }

  override update(dt: number): void {
    super.update(dt);
    if (this.isMouseDown) {
      for (let i = 0; i < 20; i++) {
        this.createBunny();
      }
    }
  }

  private createBunny(): void {
    const bunny = new EBunny();
    this.addEntity(bunny);
    this.bunniesCount++;
    this.bunniesText.cText.text = `Bunnies: ${this.bunniesCount}`;
  }

  override destroy(): void {
    this.assets.unload(Atlas, 'bunnySprites');
    this.assets.unload(BitmapFont, 'bunnyFont');

    this.input.off('mousePressed', this.downHandler);
    this.input.off('mouseReleased', this.upHandler);
  }
}
