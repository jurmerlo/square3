import { readFileSync } from 'node:fs';
import { beforeAll, describe, expect, it } from 'vitest';
import type { LdtkProjectJson } from './ldtkJson';
import { LdtkLayer } from './ldtkLayer';

describe('LdtkLayer', () => {
  let project: LdtkProjectJson;
  beforeAll(() => {
    const content = readFileSync('./testFiles/testMap.ldtk');
    project = JSON.parse(content.toString()) as LdtkProjectJson;
  });

  it('should create a new layer with provided values', () => {
    const level = project.levels[0];
    const layers = level.layerInstances;
    if (!layers) {
      throw new Error('No layers found in the level');
    }

    const layerData = layers[0];
    const layer = new LdtkLayer(layerData);
    expect(layer.id).toBe(layerData.__identifier);
    expect(layer.type).toBe(layerData.__type);
    expect;
  });

  it('should create an entity layer', () => {
    const level = project.levels[0];
    const layers = level.layerInstances;
    if (!layers) {
      throw new Error('No layers found in the level');
    }

    const entityLayer = layers.find((layer) => layer.__type === 'Entities');
    if (!entityLayer) {
      throw new Error('No entity layer found in the level');
    }

    const layer = new LdtkLayer(entityLayer);
    expect(layer.id).toBe(entityLayer.__identifier);
    expect(layer.type).toBe('Entities');
    expect(layer.getEntitiesByName('Player')?.length ?? 0).toBeGreaterThan(0);
  });

  it('should create a tile layer', () => {
    const level = project.levels[0];
    const layers = level.layerInstances;
    if (!layers) {
      throw new Error('No layers found in the level');
    }

    const tileLayer = layers.find((layer) => layer.__type === 'IntGrid');
    if (!tileLayer) {
      throw new Error('No tile layer found in the level');
    }

    const layer = new LdtkLayer(tileLayer);
    expect(layer.id).toBe(tileLayer.__identifier);
    expect(layer.type).toBe('IntGrid');
    expect(layer.width).toBe(tileLayer.__cWid);
    expect(layer.height).toBe(tileLayer.__cHei);
  });
});
