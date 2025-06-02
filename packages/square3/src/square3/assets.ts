/* eslint-disable @typescript-eslint/no-wrapper-object-types */
import type { Audio } from './audio/audio';
import { Sound } from './audio/sound';
import { inject } from './di/inject';
import { Atlas } from './graphics/atlas';
import { BitmapFont } from './graphics/bitmapFont';
import { Image } from './graphics/image';
import { Tileset } from './tiles/tileset';

export type AssetItem = {
  type: new (
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    ...args: any[]
  ) => unknown;
  id: string;
  path: string;
  props?: unknown;
};

/**
 * Base class for custom asset loaders.
 */
export abstract class AssetLoader<T> {
  /**
   * The type of asset the loader manages.
   */
  readonly assetType: new (
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    ...args: any[]
  ) => T;

  /**
   * Internal asset manager instance.
   */
  protected assets: Assets;

  /**
   * The map of loaded assets for this loader.
   */
  protected loadedAssets: Record<string, T> = {};

  /**
   * Create a new loader instance.
   * @param assetType The type of asset to manage.
   * @param assets The asset manager instance.
   */

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  constructor(assetType: new (...args: any[]) => T, assets: Assets) {
    this.assetType = assetType;
    this.assets = assets;
  }

  /**
   * Load an asset. This needs to be implemented per loader.
   * @param id The id used to reference the asset.
   * @param path The url path to the asset.
   * @param props Any other properties needed to load the asset.
   * @param keep Should this asset be stored.
   */
  abstract load(id: string, path: string, props?: unknown, keep?: boolean): Promise<T>;

  /**
   * Add an externally loaded asset to the loader.
   * @param id The id used to reference the asset.
   * @param instance The asset instance to add.
   */
  add(id: string, instance: T): void {
    this.loadedAssets[id] = instance;
  }

  /**
   * Get a loaded asset by id.
   * @param id The id of the asset to load.
   * @returns The loaded asset. Will throw if the asset does not exist.
   */
  get(id: string): T {
    if (this.loadedAssets[id]) {
      return this.loadedAssets[id];
    }

    throw new Error(`Asset with id "${id}" not loaded`);
  }

  /**
   * Unload a loaded asset.
   * @param id The id of the asset to unload.
   * @returns True if the unload wsa successful.
   */
  unload(id: string): boolean {
    if (this.loadedAssets[id]) {
      delete this.loadedAssets[id];
    }
    return true;
  }
}

/**
 * Class to load and manage assets.
 */
export class Assets {
  /**
   * The registered loaders.
   */
  private readonly loaders = new Map<
    new (
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      ...args: any[]
    ) => unknown,
    AssetLoader<unknown>
  >();

  /**
   * Register all built-in loaders. Gets called automatically when the engine starts.
   */
  registerBuiltinLoaders(): void {
    this.registerLoader(new ImageLoader(this));
    this.registerLoader(new TextLoader(this));
    this.registerLoader(new BitmapFontLoader(this));
    this.registerLoader(new SoundLoader(this));
    this.registerLoader(new AtlasLoader(this));
    this.registerLoader(new TilesetLoader(this));
  }

  /**
   * Register a new loader.
   * @param loader The loader to register.
   */
  registerLoader<T>(loader: AssetLoader<T>): void {
    this.loaders.set(loader.assetType, loader);
  }

  /**
   * Load an asset.
   * @param type The class type of asset to load.
   * @param id The id used to reference the asset.
   * @param path The url path to the asset.
   * @param props Any other properties needed to load the asset.
   * @param keep Should this asset be stored.
   * @returns The loaded asset.
   */
  async load<T>(
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    type: new (...args: any[]) => T,
    id: string,
    path: string,
    props?: unknown,
    keep = true,
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      const loader = this.loaders.get(type);
      if (loader) {
        loader
          .load(id, path, props, keep)
          .then((value) => {
            resolve(value as T);
          })
          .catch((reason) => {
            reject(new Error(reason as string));
          });
      } else {
        reject(new Error('Loader is not registered for type'));
      }
    });
  }

  /**
   * Load a list of assets in parallel. Returns when all assets are loaded.
   * @param assets The assets to load.
   */
  async loadAll(assets: AssetItem[]): Promise<void> {
    return new Promise((resolve, reject) => {
      const count = assets.length;
      let loaded = 0;

      for (const { type, id, path, props } of assets) {
        this.load(type, id, path, props)
          .then(() => {
            loaded++;
            if (loaded === count) {
              resolve();
            }
          })
          .catch((reason) => {
            reject(new Error(reason as string));
          });
      }
    });
  }

  /**
   * Add an externally loaded asset to the manager.
   * @param type The type of asset to add.
   * @param id The id used to reference the asset.
   * @param instance The asset to add.
   */

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  add<T>(type: new (...args: any[]) => T, id: string, instance: T): void {
    if (this.loaders.has(type)) {
      this.loaders.get(type)?.add(id, instance);
    } else {
      throw new Error('Loader is not registered for type');
    }
  }

  /**
   * Get a loaded asset.
   * @param type The type of asset to get.
   * @param id The id of the asset.
   * @returns The loaded asset. Will throw if the asset is not loaded.
   */

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  get<T>(type: new (...args: any[]) => T, id: string): T {
    if (this.loaders.has(type)) {
      return this.loaders.get(type)?.get(id) as T;
    }

    throw new Error('Loader is not registered for type');
  }

  /**
   * Unload and remove an asset from the manager.
   * @param type The type of asset to unload.
   * @param id The id of the asset.
   * @returns True if the unload was successful.
   */

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  unload<T>(type: new (...args: any[]) => T, id: string): boolean {
    if (this.loaders.has(type)) {
      return this.loaders.get(type)?.unload(id) ?? false;
    }

    throw new Error('Loader is not registered for type');
  }
}

class ImageLoader extends AssetLoader<Image> {
  constructor(assets: Assets) {
    super(Image, assets);
  }

  async load(id: string, path: string, _props?: unknown, keep = true): Promise<Image> {
    return new Promise((resolve, reject) => {
      const element = document.createElement('img');
      element.onload = (): void => {
        element.onload = null;

        const canvas = document.createElement('canvas');
        canvas.width = element.width;
        canvas.height = element.height;

        const canvasContext = canvas.getContext('2d');
        canvasContext?.drawImage(element, 0, 0);

        const data = canvasContext?.getImageData(0, 0, element.width, element.height).data;
        if (data) {
          const image = new Image(element.width, element.height, data);
          if (keep) {
            this.loadedAssets[id] = image;
          }
          resolve(image);
        } else {
          reject(new Error(`Unable to load image "${path}".`));
        }
      };

      element.onerror = (): void => {
        reject(new Error(`Unable to load image "${path}".`));
      };

      element.src = path;
    });
  }

  override unload(id: string): boolean {
    const image = this.loadedAssets[id];
    if (image) {
      image.destroy();
      return super.unload(id);
    }

    return false;
  }
}

// biome-ignore lint/complexity/noBannedTypes: <explanation>
class TextLoader extends AssetLoader<String> {
  constructor(assets: Assets) {
    super(String, assets);
  }

  async load(
    id: string,
    path: string,
    _props?: unknown,
    keep = true,
    // biome-ignore lint/complexity/noBannedTypes: <explanation>
  ): Promise<String> {
    const response = await fetch(path);
    if (response.status < 400) {
      const text = new String(await response.text());
      if (keep) {
        this.loadedAssets[id] = text;
      }

      return text;
    }

    throw new Error(`Unable to load text ${path}.`);
  }
}

class BitmapFontLoader extends AssetLoader<BitmapFont> {
  constructor(assets: Assets) {
    super(BitmapFont, assets);
  }

  async load(id: string, path: string, _props?: unknown, keep = true): Promise<BitmapFont> {
    const image = await this.assets.load(Image, `square3_bitmap_font_${id}`, `${path}.png`, undefined, keep);
    const data = await this.assets.load(String, `square3_bitmap_font_${id}`, `${path}.fnt`, undefined, keep);

    const font = new BitmapFont(image, data.valueOf());
    if (keep) {
      this.loadedAssets[id] = font;
    }

    return font;
  }

  override unload(id: string): boolean {
    if (this.loadedAssets[id]) {
      this.assets.unload(Image, `square3_bitmap_fot_${id}`);
      this.assets.unload(String, `square3_bitmap_font_${id}`);
    }

    return super.unload(id);
  }
}

class SoundLoader extends AssetLoader<Sound> {
  @inject()
  private audio!: Audio;

  constructor(assets: Assets) {
    super(Sound, assets);
  }

  async load(id: string, path: string, _props?: unknown, keep?: boolean): Promise<Sound> {
    const response = await fetch(path);
    if (response.status < 400) {
      const buffer = await response.arrayBuffer();
      const sound = await this.audio.decodeSound(id, buffer);

      if (sound) {
        if (keep) {
          this.loadedAssets[id] = sound;
        }

        return sound;
      }
    }

    throw new Error(`Unable to load sound ${id}.`);
  }
}

class AtlasLoader extends AssetLoader<Atlas> {
  constructor(assets: Assets) {
    super(Atlas, assets);
  }

  async load(id: string, path: string, _props?: unknown, keep?: boolean): Promise<Atlas> {
    const image = await this.assets.load(Image, `square3_atlas_${id}`, `${path}.png`, undefined, keep);
    const data = await this.assets.load(String, `square3_atlas_${id}`, `${path}.json`, undefined, keep);

    const atlas = new Atlas(image, data.valueOf());
    if (keep) {
      this.loadedAssets[id] = atlas;
    }

    return atlas;
  }

  override unload(id: string): boolean {
    if (this.loadedAssets[id]) {
      this.assets.unload(Image, `square3_atlas_${id}`);
      this.assets.unload(String, `square3_atlas_${id}`);

      return super.unload(id);
    }

    return false;
  }
}

export type TilesetLoaderProps = {
  tileWidth: number;
  tileHeight: number;
  spacing: number;
  margin: number;
};

class TilesetLoader extends AssetLoader<Tileset> {
  constructor(assets: Assets) {
    super(Tileset, assets);
  }

  async load(id: string, path: string, props?: TilesetLoaderProps, keep?: boolean): Promise<Tileset> {
    if (!props || !props.tileWidth || !props.tileHeight || !props.spacing || !props.margin) {
      throw new Error('missing properties to load the tilemap');
    }

    const { tileWidth, tileHeight, spacing, margin } = props;

    const image = await this.assets.load(Image, `square3_tileset_${id}`, path, undefined, keep);
    const tileset = new Tileset({
      image,
      tileWidth,
      tileHeight,
      spacing,
      margin,
    });
    if (keep) {
      this.loadedAssets[id] = tileset;
    }

    return tileset;
  }

  override unload(id: string): boolean {
    if (this.loadedAssets[id]) {
      this.assets.unload(Image, `square3_tileset_${id}`);

      return super.unload(id);
    }

    return false;
  }
}
