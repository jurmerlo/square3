import { type BitmapFont, CText, Entity, type Graphics, type Time, type XY, inject } from '@square3/square3';

export type EFpsTextOptions = {
  x: number;
  y: number;
  font: BitmapFont;
  anchor?: XY;
};

export class EFpsText extends Entity {
  cText: CText;

  @inject()
  private time!: Time;

  constructor({ x, y, font, anchor }: EFpsTextOptions) {
    super({ layer: 2, transformOptions: { x, y } });
    this.cText = new CText({ font, text: 'FPS: 0', anchor });
  }

  override draw(graphics: Graphics): void {
    this.cText.text = `FPS: ${this.time.fps}`;
    this.cText.draw(graphics);
  }
}
