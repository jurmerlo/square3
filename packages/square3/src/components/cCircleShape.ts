import type { Color } from '../graphics/color.js';
import type { Graphics } from '../graphics/graphics.js';
import { Vec2 } from '../math/vec2.js';
import type { XY } from '../math/xy.js';

export type CCircleShapeOptions = {
  radius: number;
  segments?: number;
  anchor?: XY;
  fillColor?: Color;
  outlineColor?: Color;
  outlineWidth?: number;
};

export class CCircleShape {
  radius: number;
  segments: number;
  anchor: Vec2;
  fillColor?: Color;
  outlineColor?: Color;
  outlineWidth: number;

  constructor({
    radius,
    segments = 32,
    anchor = { x: 0.5, y: 0.5 },
    fillColor,
    outlineColor,
    outlineWidth = 1,
  }: CCircleShapeOptions) {
    this.radius = radius;
    this.segments = segments;
    this.anchor = new Vec2(anchor.x, anchor.y);
    this.fillColor = fillColor;
    this.outlineColor = outlineColor;
    this.outlineWidth = outlineWidth;
  }

  draw(graphics: Graphics): void {
    if (this.fillColor) {
      graphics.color.copyFrom(this.fillColor);
      graphics.drawSolidCircle(-this.radius * this.anchor.x, -this.radius * this.anchor.y, this.radius, this.segments);
    }

    if (this.outlineColor) {
      graphics.color.copyFrom(this.outlineColor);
      graphics.drawCircle(
        -this.radius * this.anchor.x,
        -this.radius * this.anchor.y,
        this.radius,
        this.segments,
        this.outlineWidth,
      );
    }
  }
}
