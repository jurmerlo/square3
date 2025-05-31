import type { Image } from '../graphics/image';
import { Rectangle } from '../math/rectangle';

export type TilesetOptions = {
  image: Image;
  tileWidth: number;
  tileHeight: number;
  spacing?: number;
  margin?: number;
};

export class Tileset {
  readonly tileWidth: number;

  readonly tileHeight: number;

  readonly image: Image;

  private tiles: Rectangle[];

  constructor({ image, tileWidth, tileHeight, spacing = 0, margin = 0 }: TilesetOptions) {
    this.image = image;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;

    const width = image.width;
    const height = image.height;
    const horizontalTiles = Math.floor((width - margin * 2 + spacing) / (tileWidth + spacing));
    const verticalTiles = Math.floor((height - margin * 2 + spacing) / (tileHeight + spacing));

    this.tiles = [];
    for (let y = 0; y < verticalTiles; y++) {
      for (let x = 0; x < horizontalTiles; x++) {
        const xPos = margin + x * tileWidth + x * spacing;
        const yPos = margin + y * tileHeight + y * spacing;
        this.tiles.push(new Rectangle(xPos, yPos, tileWidth, tileHeight));
      }
    }
  }

  getRect(index: number): Rectangle {
    if (index < 0 || index >= this.tiles.length) {
      throw new Error(`Tile index ${index} is out of range.`);
    }

    return this.tiles[index];
  }
}
