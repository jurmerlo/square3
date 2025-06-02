import type { Color } from '../graphics/color';
import type { Graphics } from '../graphics/graphics';
import type { Vec2 } from '../math/vec2';

export type CPolyShapeOptions = {
  points: Vec2[];
  fillColor?: Color;
  outlineColor?: Color;
  outlineWidth?: number;
};

export class CPolyShape {
  points: Vec2[];
  fillColor?: Color;
  outlineColor?: Color;
  outlineWidth: number;

  constructor({ points, fillColor, outlineColor, outlineWidth = 1 }: CPolyShapeOptions) {
    this.points = points;
    this.fillColor = fillColor;
    this.outlineColor = outlineColor;
    this.outlineWidth = outlineWidth;
  }

  draw(graphics: Graphics): void {
    if (this.fillColor) {
      graphics.color.copyFrom(this.fillColor);
      graphics.drawSolidPolygon(0, 0, this.points);
    }

    if (this.outlineColor) {
      graphics.color.copyFrom(this.outlineColor);
      graphics.drawPolygon(0, 0, this.points, this.outlineWidth);
    }
  }
}
