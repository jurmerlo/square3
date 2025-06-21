import type { Tileset } from '@square3/square3';
import type { Level } from './ldtkJson.js';
import { LdtkLayer } from './ldtkLayer.js';
/**
 * A level in the Ldtk project.
 */
export class LdtkLevel {
  worldX: number;

  worldY: number;

  width: number;

  height: number;

  externalRelPath: string | null | undefined;

  /**
   * All layers in the level.
   */
  private layers = new Map<string, LdtkLayer>();

  /**
   * @param levelData - The level json data.
   * @param tilesets - Loaded tilesets from the project.
   */
  constructor(levelData: Level, tilesets: Map<number, Tileset>) {
    this.worldX = levelData.worldX;
    this.worldY = levelData.worldY;
    this.width = levelData.pxWid;
    this.height = levelData.pxHei;
    this.externalRelPath = levelData.externalRelPath;

    if (levelData.layerInstances) {
      for (const layer of levelData.layerInstances) {
        let tileset: Tileset | undefined;
        if (layer.__tilesetDefUid) {
          tileset = tilesets.get(layer.__tilesetDefUid);
        }
        this.layers.set(layer.__identifier, new LdtkLayer(layer, tileset));
      }
    }
  }

  /**
   * Return a layer by name from the level.
   * @param name - The name identifier in Ldtk.
   * @returns The layer or undefined if it doesn't exist.
   */
  getLayer(name: string): LdtkLayer | undefined {
    return this.layers.get(name);
  }
}
