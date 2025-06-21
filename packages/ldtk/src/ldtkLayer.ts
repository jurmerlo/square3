import { Color, type Graphics, Rectangle, type Tileset, Vec2, clamp } from '@square3/square3';
import { LdtkEntity } from './ldtkEntity.js';
import type { LayerInstance, LayerType, TileInstance } from './ldtkJson.js';
import { LdtkTile } from './ldtkTile.js';

/**
 * A layer in Ldtk
 */
export class LdtkLayer {
  /**
   * The tint color for the whole layer.
   */
  tint: Color;

  type: LayerType;

  tileset?: Tileset;

  id: string;

  /**
   * The width in tiles.
   */
  get width(): number {
    return this.tiles[0].length;
  }

  /**
   * The height in tiles.
   */
  get height(): number {
    return this.tiles.length;
  }

  /**
   * All tiles in the layer. Empty for entity layers.
   */
  private tiles: LdtkTile[][] = [];

  /**
   * All entities in the layer. Empty for non entity layers.
   */
  private entities = new Map<string, LdtkEntity[]>();

  /**
   * The bounds that the camera can so only those tiles get rendered.
   */
  private visibleBounds = new Rectangle();

  /**
   * @param layerJson The json data
   * @param tileset
   */
  constructor(layerJson?: LayerInstance, tileset?: Tileset) {
    this.tint = new Color(1, 1, 1, 1); // Default to white tint.
    this.tileset = tileset;
    if (layerJson) {
      this.type = layerJson.__type;
      this.id = layerJson.__identifier;

      const type = layerJson.__type;
      if (type === 'Tiles') {
        this.tilesFromTileLayer(layerJson);
      } else if (type === 'Entities') {
        this.addEntities(layerJson);
      } else {
        this.tilesFromAutoLayer(layerJson);
      }
    } else {
      this.type = 'AutoLayer';
      this.id = 'Empty';
    }
  }

  clone(): LdtkLayer {
    const layer = new LdtkLayer();
    layer.tileset = this.tileset;
    layer.type = this.type;
    layer.id = this.id;

    for (const [key, entityList] of this.entities) {
      const entities: LdtkEntity[] = [];
      for (const entity of entityList) {
        entities.push(entity.clone());
      }

      layer.entities.set(key, entities);
    }

    for (let y = 0; y < this.tiles.length; y++) {
      const row: LdtkTile[] = [];
      for (let x = 0; x < this.tiles[0].length; x++) {
        const tile = this.tiles[y][x];
        if (tile) {
          row.push(tile.clone());
        }
      }
      layer.tiles.push(row);
    }

    return layer;
  }

  /**
   * Get a list of entities with a specific name.
   * @param name The name of the entity.
   * @returns An array of entities with that name.
   */
  getEntitiesByName(name: string): LdtkEntity[] | undefined {
    return this.entities.get(name);
  }

  /**
   * Get a tile in the layer.
   * @param x The x position in tiles.
   * @param y The y position in tiles.
   * @returns The tile or null if out of bounds.
   */
  getTile(x: number, y: number): LdtkTile | undefined {
    if (x < 0 || x >= this.tiles[0].length || y < 0 || y >= this.tiles.length) {
      return undefined;
    }

    return this.tiles[y][x];
  }

  /**
   * Set new tile values.
   * @param x The x position in tiles.
   * @param y The y position in tiles.
   * @param tileId The new tile id.
   * @param flipX Flipped horizontally.
   * @param flipY Flipped vertically.
   */
  setTile(x: number, y: number, tileId: number, flipX?: boolean, flipY?: boolean): void {
    if (x < 0 || x >= this.tiles[0].length || y < 0 || y >= this.tiles.length) {
      return;
    }

    this.tiles[y][x].set(tileId, flipX || false, flipY || false);
  }

  /**
   * Render the layer.
   * @param graphics The graphics to render with.
   */
  draw(graphics: Graphics): void {
    for (let y = this.visibleBounds.y; y < this.visibleBounds.height; y++) {
      for (let x = this.visibleBounds.x; x < this.visibleBounds.width; x++) {
        const tile = this.tiles[y][x];
        if (!tile.isEmpty() && this.tileset) {
          const frame = this.tileset.getRect(tile.id);
          const xPos = x * tile.size + tile.offsetX;
          const yPos = y * tile.size + tile.offsetY;

          graphics.color.copyFrom(this.tint);
          graphics.drawScaledImageSection(
            xPos,
            yPos,
            tile.renderWidth,
            tile.renderHeight,
            frame.x,
            frame.y,
            frame.width,
            frame.height,
            this.tileset.image,
          );
        }
      }
    }
  }

  /**
   * Convert a local pixel position to tile position.
   * @param xPos The world x position in game pixels.
   * @param yPos The world y position in game pixels.
   * @returns The point.
   */
  pixelToTilePosition(xPos: number, yPos: number): Vec2 {
    if (this.tileset) {
      const x = Math.floor(xPos / this.tileset.tileWidth);
      const y = Math.floor(yPos / this.tileset.tileHeight);

      return Vec2.get(x, y);
    }

    return Vec2.get();
  }

  /**
   * Update the visible tile range.
   * @param bounds The camera bounds.
   */
  updateVisibleTiles(bounds: Rectangle): void {
    const topLeft = this.pixelToTilePosition(bounds.x, bounds.y);
    topLeft.x -= 1;
    topLeft.y -= 1;
    topLeft.x = clamp(topLeft.x, 0, this.width);
    topLeft.y = clamp(topLeft.y, 0, this.height);

    const bottomRight = this.pixelToTilePosition(bounds.x + bounds.width, bounds.y + bounds.height);
    bottomRight.x += 2;
    bottomRight.y += 2;
    bottomRight.x = clamp(bottomRight.x, 0, this.width);
    bottomRight.y = clamp(bottomRight.y, 0, this.height);

    this.visibleBounds.set(topLeft.x, topLeft.y, bottomRight.x, bottomRight.y);

    topLeft.put();
    bottomRight.put();
  }

  private tilesFromTileLayer(layerJson: LayerInstance): void {
    this.createEmptyTiles(layerJson.__cWid, layerJson.__cHei, layerJson.__gridSize);
    this.insertTiles(layerJson.gridTiles, layerJson.__gridSize);
  }

  private tilesFromAutoLayer(layerJson: LayerInstance): void {
    this.createEmptyTiles(layerJson.__cWid, layerJson.__cHei, layerJson.__gridSize);
    this.insertTiles(layerJson.autoLayerTiles, layerJson.__gridSize);
  }

  /**
   * Add all entities to the layer array.
   * @param layerJson The entity json.
   */
  private addEntities(layerJson: LayerInstance): void {
    for (const entityJson of layerJson.entityInstances) {
      const name = entityJson.__identifier;
      const entity = new LdtkEntity(entityJson);
      if (!this.entities.has(name)) {
        this.entities.set(name, [entity]);
      } else {
        const list = this.entities.get(name);
        if (list) {
          list.push(entity);
        }
      }
    }
  }

  /**
   * Create a 2d array of empty tiles.
   * @param width The width in tiles.
   * @param height The height in tiles.
   * @param tileSize The tile size in pixels.
   */
  private createEmptyTiles(width: number, height: number, tileSize: number): void {
    for (let y = 0; y < height; y++) {
      const row: LdtkTile[] = [];
      for (let x = 0; x < width; x++) {
        row.push(new LdtkTile(-1, tileSize, false, false));
      }
      this.tiles.push(row);
    }
  }

  /**
   * Add all tiles into the tile 2d array.
   * @param tileList All tiles in the layer.
   * @param tileSize The tile size in pixels.
   */
  private insertTiles(tileList: TileInstance[], tileSize: number): void {
    for (const tile of tileList) {
      const flipX = (tile.f & 1) !== 0;
      const flipY = (tile.f & 2) !== 0;
      const x = Math.floor(tile.px[0] / tileSize);
      const y = Math.floor(tile.px[1] / tileSize);
      this.tiles[y][x].set(tile.t, flipX, flipY);
    }
  }
}
