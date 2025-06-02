import type { Color } from '../graphics/color';
import type { Graphics } from '../graphics/graphics';
import { Vec2 } from '../math/vec2';
import type { XY } from '../math/xy';

export type CBoxShapeOptions = {
  width: number;
  height: number;
  anchor?: XY;
  fillColor?: Color;
  outlineColor?: Color;
  outlineWidth?: number;
};

export class CBoxShape {
  width: number;
  height: number;
  anchor: Vec2;
  fillColor?: Color;
  outlineColor?: Color;
  outlineWidth: number;

  constructor({
    width,
    height,
    anchor = { x: 0.5, y: 0.5 },
    fillColor,
    outlineColor,
    outlineWidth = 1,
  }: CBoxShapeOptions) {
    this.width = width;
    this.height = height;
    this.anchor = new Vec2(anchor.x, anchor.y);
    this.fillColor = fillColor;
    this.outlineColor = outlineColor;
    this.outlineWidth = outlineWidth;
  }

  draw(graphics: Graphics): void {
    if (this.fillColor) {
      graphics.color.copyFrom(this.fillColor);
      graphics.drawSolidRect(-this.width * this.anchor.x, -this.height * this.anchor.y, this.width, this.height);
    }

    if (this.outlineColor) {
      graphics.color.copyFrom(this.outlineColor);
      graphics.drawRect(
        -this.width * this.anchor.x,
        -this.height * this.anchor.y,
        this.width,
        this.height,
        this.outlineWidth,
      );
    }
  }
}
