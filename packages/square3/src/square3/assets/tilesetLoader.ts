import { Image } from '../graphics/image';
import { Tileset } from '../tiles/tileset';
import { AssetLoader, type Assets } from './assets';

export type TilesetLoaderProps = {
  tileWidth: number;
  tileHeight: number;
  spacing: number;
  margin: number;
};

export class TilesetLoader extends AssetLoader<Tileset> {
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
