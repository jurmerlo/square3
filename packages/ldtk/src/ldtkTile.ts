/**
 * A tile in a LdtkLayer.
 */
export class LdtkTile {
  /**
   * Is the tile flipped horizontally?
   */
  flipX: boolean;

  /**
   * Is the tile flipped vertically?
   */
  flipY: boolean;

  /**
   * The tile's id in the tileset.
   */
  id: number;

  /**
   * The size of the tile in pixels.
   */
  size: number;

  /**
   * Get the tile's width for rendering in pixels.
   */
  get renderWidth(): number {
    return this.flipX ? -this.size : this.size;
  }

  /**
   * Get the tile's height for rendering in pixels.
   */
  get renderHeight(): number {
    return this.flipY ? -this.size : this.size;
  }

  /**
   * Get the tile's horizontal offset in pixels.
   */
  get offsetX(): number {
    return this.flipX ? this.size : 0;
  }

  /**
   * Get the tile's vertical offset in pixels.
   */
  get offsetY(): number {
    return this.flipY ? this.size : 0;
  }

  /**
   * Create a new LdtkTile.
   * @param id - The tile's id in the tileset.
   * @param size - The size of the tile in pixels.
   * @param flipX - Whether the tile is flipped horizontally.
   * @param flipY - Whether the tile is flipped vertically.
   */
  constructor(id: number, size: number, flipX: boolean, flipY: boolean) {
    this.id = id;
    this.size = size;
    this.flipX = flipX;
    this.flipY = flipY;
  }

  /**
   * Clone this tile.
   * @returns The cloned tile.
   */
  clone(): LdtkTile {
    return new LdtkTile(this.id, this.size, this.flipX, this.flipY);
  }

  /**
   * Check if the tile is empty (id is -1).
   * @returns True if the tile is empty.
   */
  isEmpty(): boolean {
    return this.id === -1;
  }

  /**
   * Set new values for the tile.
   * @param id - The tile's id in the tileset.
   * @param flipX - Whether the tile is flipped horizontally.
   * @param flipY - Whether the tile is flipped vertically.
   */
  set(id: number, flipX: boolean, flipY: boolean): void {
    this.id = id;
    this.flipX = flipX;
    this.flipY = flipY;
  }
}
