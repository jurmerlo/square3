import type { Atlas, AtlasFrame } from '../graphics/atlas';
import { Color } from '../graphics/color';
import type { Graphics } from '../graphics/graphics';
import { Vec2 } from '../math/vec2';
import type { XY } from '../math/xy';

/**
 * The sprite component initial values.
 */
export type CSpriteOptions = {
  /**
   * The atlas to use.
   */
  atlas: Atlas;

  /**
   * The frame to display.
   */
  frameName: string;

  /**
   * The anchor (0 - 1).
   */
  anchor?: XY;

  /**
   * The tint color.
   */
  color?: Color;

  /**
   * Flip the image horizontally.
   */
  flipX?: boolean;

  /**
   * Flip the image vertically.
   */
  flipY?: boolean;
};

/**
 * Sprite component.
 */
export class CSprite {
  /**
   * The draw anchor.
   */
  anchor = new Vec2(0.5, 0.5);

  /**
   * The tint color.
   */
  color: Color;

  /**
   * The atlas to render from.
   */
  atlas!: Atlas;

  /**
   * Flip the image horizontally.
   */
  flipX = false;

  /**
   * Flip the image vertically.
   */
  flipY = false;

  /**
   * The frame to draw.
   */
  private frame!: AtlasFrame;

  /**
   * Create a new sprite component.
   * @param options - The initial value.
   */
  constructor({ atlas, frameName, anchor, color, flipX, flipY }: CSpriteOptions) {
    this.anchor.x = anchor?.x ?? 0.5;
    this.anchor.y = anchor?.y ?? 0.5;
    this.color = color ?? new Color(1, 1, 1, 1);
    this.flipX = flipX ?? false;
    this.flipY = flipY ?? false;
    this.setFrame(frameName, atlas);
  }

  /**
   * The current frame name.
   * @returns The frame name.
   */
  getFrameName(): string {
    return this.frame.name;
  }

  /**
   * Set a new frame to draw.
   * @param frameName - The name of the frame.
   * @param atlas - The atlas to use. Optional.
   */
  setFrame(frameName: string, atlas?: Atlas): void {
    if (atlas) {
      this.atlas = atlas;
    }

    if (!this.atlas) {
      return;
    }

    this.frame = this.atlas.getFrame(frameName);

    if (!this.frame) {
      console.log(`frame ${frameName} not found in atlas`);
    }
  }

  /**
   * Draw the sprite.
   */
  draw(graphics: Graphics): void {
    graphics.color.copyFrom(this.color);
    graphics.drawImageSection(
      -(this.frame.sourceRect.width * this.anchor.x) + this.frame.sourceRect.x,
      -(this.frame.sourceRect.height * this.anchor.y) + this.frame.sourceRect.y,
      this.frame.frame.x,
      this.frame.frame.y,
      this.frame.frame.width,
      this.frame.frame.height,
      this.atlas.image,
      this.flipX,
      this.flipY,
    );
  }

  /**
   * Get the sprite width in pixels.
   * @returns The width.
   */
  getWidth(): number {
    return this.frame.sourceRect.width;
  }

  /**
   * Get the sprite height in pixels.
   * @returns The height.
   */
  getHeight(): number {
    return this.frame.sourceRect.height;
  }
}
