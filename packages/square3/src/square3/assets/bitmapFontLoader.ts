import { BitmapFont } from '../graphics/bitmapFont';
import { Image } from '../graphics/image';
import { AssetLoader, type Assets } from './assets';

export class BitmapFontLoader extends AssetLoader<BitmapFont> {
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
