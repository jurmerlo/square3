import { type BitmapFont, CText, CTransform, type Color, Entity, type Graphics, type XY } from '../../square3';

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

  cTransform: CTransform;

  constructor({ x, y, font, text, anchor, color }: ETextOptions) {
    super({ layer: 2 });
    this.cTransform = new CTransform({ x, y });
    this.cText = new CText({ font, text, color, anchor });
  }

  override draw(graphics: Graphics): void {
    this.cTransform.drawWithTransform(graphics, () => {
      this.cText.draw(graphics);
    });
  }
}
