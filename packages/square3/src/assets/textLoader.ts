import { AssetLoader, type Assets } from './assets.js';

// biome-ignore lint/complexity/noBannedTypes: Need to be able to use String as a type
export class TextLoader extends AssetLoader<String> {
  constructor(assets: Assets) {
    super(String, assets);
  }

  async load(
    id: string,
    path: string,
    _props?: unknown,
    keep = true,
    // biome-ignore lint/complexity/noBannedTypes: Same as above.
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
