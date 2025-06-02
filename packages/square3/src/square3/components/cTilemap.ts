import { Color } from '../graphics/color';
import type { Graphics } from '../graphics/graphics';
import type { Tileset } from '../tiles/tileset';

export type CTilemapOptions = {
  grid: number[][];
  tileset: Tileset;
  color?: Color;
};

export class CTilemap {
  grid: number[][];
  tileset: Tileset;
  color: Color;

  constructor({ grid, tileset, color = new Color(1, 1, 1, 1) }: CTilemapOptions) {
    this.grid = grid;
    this.tileset = tileset;
    this.color = color;
  }

  getTile(x: number, y: number): number {
    if (y < 0 || y >= this.grid.length || x < 0 || x >= this.grid[y].length) {
      return -1;
    }

    return this.grid[y][x];
  }

  setTile(x: number, y: number, tileIndex: number): void {
    if (y < 0 || y >= this.grid.length || x < 0 || x >= this.grid[y].length) {
      return;
    }

    this.grid[y][x] = tileIndex;
  }

  draw(graphics: Graphics): void {
    graphics.color.copyFrom(this.color);
    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[y].length; x++) {
        const tileIndex = this.grid[y][x];
        if (tileIndex >= 0) {
          const rect = this.tileset.getRect(tileIndex);
          graphics.drawImageSection(
            x * this.tileset.tileWidth,
            y * this.tileset.tileHeight,
            rect.x,
            rect.y,
            rect.width,
            rect.height,
            this.tileset.image,
          );
        }
      }
    }
  }
}
