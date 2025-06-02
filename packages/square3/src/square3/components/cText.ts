import type { BitmapFont } from '../graphics/bitmapFont';
import { Color } from '../graphics/color';
import type { Graphics } from '../graphics/graphics';
import { Vec2 } from '../math/vec2';
import type { XY } from '../math/xy';

export type CTextOptions = {
  font: BitmapFont;
  text: string;
  color?: Color;
  anchor?: XY;
};

export class CText {
  font: BitmapFont;

  text: string;

  anchor: Vec2;

  color: Color;

  get width(): number {
    return this.font.width(this.text);
  }

  get height(): number {
    return this.font.height;
  }

  constructor({ font, text, anchor, color }: CTextOptions) {
    this.font = font;
    this.text = text;
    this.anchor = new Vec2(anchor?.x ?? 0.5, anchor?.y ?? 0.5);
    this.color = color ?? new Color(1, 1, 1, 1);
  }

  draw(graphics: Graphics): void {
    graphics.color.copyFrom(this.color);
    graphics.drawBitmapText(-this.width * this.anchor.x, -this.height * this.anchor.y, this.font, this.text);
  }
}
