import { type BitmapFont, CText, CTransform, Entity, type Graphics, type Time, type XY, inject } from '../../square3';

export type EFpsTextOptions = {
  x: number;
  y: number;
  font: BitmapFont;
  anchor?: XY;
};

export class EFpsText extends Entity {
  cText: CText;

  cTransform: CTransform;

  @inject()
  private time!: Time;

  constructor({ x, y, font, anchor }: EFpsTextOptions) {
    super({ layer: 2 });
    this.cTransform = new CTransform({ x, y });
    this.cText = new CText({ font, text: 'FPS: 0', anchor });
  }

  override draw(graphics: Graphics): void {
    this.cText.text = `FPS: ${this.time.fps}`;
    this.cTransform.drawWithTransform(graphics, () => {
      this.cText.draw(graphics);
    });
  }
}
