import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import Path from 'node:path';
import TOML from '@ltd/j-toml';

import { Command } from 'commander';
import { Atlas } from './atlas.js';
import type { AtlasConfigList } from './atlasConfig.js';
import { saveAtlasImage, saveJsonData } from './save.js';

type PackAtlasOptions = {
  project?: string;
};

/**
 * Packs atlases based on the provided configuration file.
 * @param userPath The path to the TOML configuration file. Defaults to "aeony.toml" if not provided.
 */
function packAtlas(userPath?: string): void {
  let configPath = 'atlas.toml';

  // Use the provided path if specified.
  if (userPath) {
    configPath = userPath;
  }

  // Validate the configuration file path.
  if (!configPath.endsWith('.toml')) {
    process.stdout.write('Error: No valid .toml path config provided.\n');
    return;
  }

  const fullPath = Path.isAbsolute(configPath) ? configPath : Path.join(process.cwd(), configPath);
  const dir = Path.dirname(fullPath);

  if (!existsSync(fullPath)) {
    process.stdout.write(`Error: Configuration file "${fullPath}" does not exist.\n`);
    return;
  }

  // Set the working directory to the folder of the configuration file.
  process.chdir(dir);

  // Load and parse the configuration file.
  let configList: AtlasConfigList;
  try {
    const tomlString = readFileSync(fullPath).toString();
    configList = TOML.parse(tomlString, 1, undefined, false) as AtlasConfigList;
  } catch (error) {
    process.stdout.write(`Error: Failed to read or parse configuration file: ${(error as Error).message}\n`);
    return;
  }

  // Validate the configuration.
  if (!configList.atlases || configList.atlases.length === 0) {
    process.stdout.write('No atlaeses in config file.\n');
    return;
  }

  // Process each atlas configuration.
  let packedCount = 0;
  for (const config of configList.atlases) {
    // Convert numeric properties to numbers.
    if (config.extrude) {
      config.extrude = Number(config.extrude);
    }
    if (config.maxWidth) {
      config.maxWidth = Number(config.maxWidth);
    }
    if (config.maxHeight) {
      config.maxHeight = Number(config.maxHeight);
    }

    const atlas = new Atlas(config);

    if (!atlas.pack()) {
      process.stdout.write(`Error: Unable to pack atlas "${config.name}".\n`);
      continue;
    }

    // Create the save folder if it does not exist.
    const saveFolder = Path.join(process.cwd(), config.saveFolder);
    if (!existsSync(saveFolder)) {
      mkdirSync(saveFolder, { recursive: true });
    }

    // Save the atlas image.
    try {
      saveAtlasImage(config.name, saveFolder, atlas);
    } catch (error) {
      process.stdout.write(`Error: Failed to save atlas image for "${config.name}": ${(error as Error).message}\n`);
      continue;
    }

    // Save the JSON data if required.
    if (!config.noData) {
      try {
        saveJsonData(config.name, saveFolder, atlas);
      } catch (error) {
        process.stdout.write(`Error: Failed to save JSON data for "${config.name}": ${(error as Error).message}\n`);
        continue;
      }
    }

    packedCount++;
    process.stdout.write(`Successfully packed atlas "${config.name}".\n`);
  }

  // Provide feedback on the packing process.
  if (packedCount === 0) {
    process.stdout.write('No atlases were successfully packed.\n');
  } else {
    process.stdout.write(`Successfully packed ${packedCount} atlas(es).\n`);
  }
}

function createConfig(): void {
  const file = 'atlas.toml';
  const fullPath = Path.join(process.cwd(), file);

  const config = `
[[atlases]]
name = "sprites"
saveFolder = "assets"
folders = [
  "images"
]
trimmed = true
extrude = 1
packMethod = "optimal"
`;

  try {
    writeFileSync(fullPath, config.trim());
    process.stdout.write(`Configuration file created at: ${fullPath}\n`);
  } catch (error) {
    process.stdout.write(`Error: Failed to create configuration file: ${(error as Error).message}\n`);
  }
}

const program = new Command();
program
  .name('Square 3 Atlas Packager')
  .description('Packs images into atlases based on a TOML configuration file.')
  .version('0.1.0');

program
  .command('pack')
  .description('Pack images into an atlas')
  .option('-p, --project <string>')
  .action(({ project }: PackAtlasOptions) => {
    packAtlas(project);
  });

program
  .command('init')
  .description('Create a default atlas configuration file')
  .action(() => {
    createConfig();
  });

program.parse();
