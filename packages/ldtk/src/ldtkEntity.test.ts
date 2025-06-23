import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { LdtkEntity } from './ldtkEntity';
import type { LdtkProjectJson } from './ldtkJson';

describe('LdtkEntity', () => {
  it('should create a new entity with default values', () => {
    const entity = new LdtkEntity();
    expect(entity.id).toBe('');
    expect(entity.x).toBe(0);
    expect(entity.y).toBe(0);
    expect(entity.pivotX).toBe(0.5);
    expect(entity.pivotY).toBe(0.5);
    expect(entity.width).toBe(0);
    expect(entity.height).toBe(0);
  });

  it('should create a new entity with provided values', () => {
    const content = readFileSync('./testFiles/testMap.ldtk');
    const project = JSON.parse(content.toString()) as LdtkProjectJson;
    const level = project.levels[0];
    const layers = level.layerInstances;
    if (!layers) {
      throw new Error('No layers found in the level');
    }

    const entityLayer = layers.find((layer) => layer.__type === 'Entities');
    if (!entityLayer) {
      throw new Error('No entity layer found in the level');
    }

    const entityInstance = entityLayer.entityInstances[0];
    const entity = new LdtkEntity(entityInstance);
    expect(entity.id).toBe('Player');
    expect(entity.x).toBe(64);
    expect(entity.y).toBe(64);
    expect(entity.pivotX).toBe(0);
    expect(entity.pivotY).toBe(0);
    expect(entity.width).toBe(32);
    expect(entity.height).toBe(32);
  });
});
