import { type Assets, Image, Tileset, inject, joinPaths } from '@square3/square3';
import type { LdtkProjectJson, Level } from './ldtkJson.js';
import { LdtkLevel } from './ldtkLevel.js';
/**
 * Ldtk level support.
 */
export class LdtkProject {
  get hasExternalLevels(): boolean {
    return this.data.externalLevels;
  }

  data: LdtkProjectJson;

  /**
   * All levels in the project.
   */
  private levels = new Map<string, LdtkLevel>();

  private tilesets = new Map<number, Tileset>();

  @inject()
  private assets!: Assets;

  /**
   * @param jsonData The loaded data file.
   */
  constructor(jsonData: string) {
    this.data = JSON.parse(jsonData) as LdtkProjectJson;

    for (const tileset of this.data.defs.tilesets) {
      const image = this.assets.get(Image, tileset.identifier);
      if (image) {
        const newTileset = new Tileset({
          image,
          tileWidth: tileset.tileGridSize,
          tileHeight: tileset.tileGridSize,
          spacing: tileset.spacing,
          margin: tileset.padding,
        });

        this.tilesets.set(tileset.uid, newTileset);
      }
    }

    for (const level of this.data.levels) {
      this.levels.set(level.identifier, new LdtkLevel(level, this.tilesets));
    }
  }

  /**
   * Get a level from the project.
   * @param name The name identifier.
   * @returns The level or undefined if it doesn't exist.
   */
  getLevel(name: string): LdtkLevel | undefined {
    if (this.hasExternalLevels) {
      console.log('Levels need to be loaded separately, because they are external files.');
      return undefined;
    }

    return this.levels.get(name);
  }

  /**
   * Load a level when using external level files.
   * @param name The level name without extension.
   * @param projectFolder The relative folder path of the .ldtk project file.
   * @returns A promise to the loaded ldtk level.
   */
  async loadExternalLevel(name: string, projectFolder: string): Promise<LdtkLevel | undefined> {
    const basicData = this.levels.get(name);
    if (basicData?.externalRelPath) {
      const relativePath = basicData.externalRelPath;
      const fullPath = joinPaths([projectFolder, relativePath]);
      const jsonString = await this.assets.load(String, 'level', fullPath, false);
      const levelData = JSON.parse(jsonString.toString()) as Level;

      return new LdtkLevel(levelData, this.tilesets);
    }

    return;
  }
}
