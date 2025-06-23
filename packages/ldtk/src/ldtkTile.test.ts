import { describe, expect, it } from 'vitest';
import { LdtkTile } from './ldtkTile';

describe('LdtkTile', () => {
  it('should create a new tile', () => {
    const tile = new LdtkTile(1, 32, false, false);
    expect(tile.id).toBe(1);
    expect(tile.size).toBe(32);
    expect(tile.flipX).toBe(false);
    expect(tile.flipY).toBe(false);
  });

  it('should correctly calculate renderWidth', () => {
    const tile = new LdtkTile(1, 32, false, false);
    expect(tile.renderWidth).toBe(32);

    tile.flipX = true;
    expect(tile.renderWidth).toBe(-32);
  });

  it('should correctly calculate renderHeight', () => {
    const tile = new LdtkTile(1, 32, false, false);
    expect(tile.renderHeight).toBe(32);

    tile.flipY = true;
    expect(tile.renderHeight).toBe(-32);
  });

  it('should correctly calculate offsetX', () => {
    const tile = new LdtkTile(1, 32, false, false);
    expect(tile.offsetX).toBe(0);

    tile.flipX = true;
    expect(tile.offsetX).toBe(32);
  });

  it('should correctly calculate offsetY', () => {
    const tile = new LdtkTile(1, 32, false, false);
    expect(tile.offsetY).toBe(0);

    tile.flipY = true;
    expect(tile.offsetY).toBe(32);
  });

  it('should clone a tile', () => {
    const tile = new LdtkTile(1, 32, false, false);
    const clonedTile = tile.clone();
    expect(clonedTile.id).toBe(tile.id);
    expect(clonedTile.size).toBe(tile.size);
    expect(clonedTile.flipX).toBe(tile.flipX);
    expect(clonedTile.flipY).toBe(tile.flipY);
    expect(clonedTile).not.toBe(tile);
  });

  it('should check if the tile is empty', () => {
    const emptyTile = new LdtkTile(-1, 32, false, false);
    expect(emptyTile.isEmpty()).toBe(true);

    const nonEmptyTile = new LdtkTile(1, 32, false, false);
    expect(nonEmptyTile.isEmpty()).toBe(false);
  });

  it('should set new values for the tile', () => {
    const tile = new LdtkTile(1, 32, false, false);
    tile.set(2, true, true);
    expect(tile.id).toBe(2);
    expect(tile.flipX).toBe(true);
    expect(tile.flipY).toBe(true);
  });
});
