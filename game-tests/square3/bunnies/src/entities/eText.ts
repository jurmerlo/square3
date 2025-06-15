import { type BitmapFont, CText, type Color, Entity, type Graphics, type XY } from '@square3/square3';

export type ETextOptions = {
  x: number;
  y: number;
  font: BitmapFont;
  text: string;
  color?: Color;
  anchor?: XY;
};
export class EText extends Entity {
  cText: CText;

  constructor({ x, y, font, text, anchor, color }: ETextOptions) {
    super({ layer: 2, transformOptions: { x, y } });
    this.cText = new CText({ font, text, color, anchor });
  }

  override draw(graphics: Graphics): void {
    this.cText.draw(graphics);
  }
}
