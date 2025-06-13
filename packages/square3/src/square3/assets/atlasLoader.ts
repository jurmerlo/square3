import { Atlas } from '../graphics/atlas';
import { Image } from '../graphics/image';
import { AssetLoader, type Assets } from './assets';

export class AtlasLoader extends AssetLoader<Atlas> {
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
