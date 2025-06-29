import { Rectangle } from '../math/rectangle.js';
import { Vec2 } from '../math/vec2.js';

/**
 * Helper to keep track of which tiles have been checked when generating colliders.
 */
type CollisionTile = {
  id: number;
  checked: boolean;
};

type GenFromIntGridParams = {
  grid: number[][];
  worldX: number;
  worldY: number;
  tileWidth: number;
  tileHeight: number;
  collisionIds: number[];
};

type GenColliderParams = {
  tiles: CollisionTile[][];
  worldX: number;
  worldY: number;
  tileWidth: number;
  tileHeight: number;
  collisionIds: number[];
};

/**
 * Generate colliders from an integer 2d grid.
 * @param params
 * @return Array<Rectangle>
 */
export function generateFromIntGrid({
  grid,
  worldX,
  worldY,
  tileWidth,
  tileHeight,
  collisionIds,
}: GenFromIntGridParams): Rectangle[] {
  const tiles: CollisionTile[][] = [];

  for (let y = 0; y < grid.length; y++) {
    const row: CollisionTile[] = [];
    for (let x = 0; x < grid[0].length; x++) {
      row.push({ id: grid[y][x], checked: false });
    }
    tiles.push(row);
  }

  return generateColliders({
    tiles,
    worldX,
    worldY,
    tileWidth,
    tileHeight,
    collisionIds,
  });
}

/**
 * Check if a tile is part of the ids that generate colliders.
 * @param id
 * @param collisionIds
 * @return Bool
 */
function isCollisionTile(id: number, collisionIds: number[]): boolean {
  // If no ids specified every non-empty tile is a collision tile.
  if (collisionIds.length === 0) {
    return id > 0;
  }

  return collisionIds.includes(id);
}

/**
 * Generate the tile colliders.
 * @param params
 * @return Array<Rectangle>
 */
function generateColliders({
  tiles,
  worldX,
  worldY,
  tileWidth,
  tileHeight,
  collisionIds,
}: GenColliderParams): Rectangle[] {
  const colliders: Rectangle[] = [];
  const start = Vec2.get();
  const current = Vec2.get();

  let checking = false;
  let foundLastY = false;

  // Starting at the top lef, loop over all tiles and create colliders.
  for (let x = 0; x < tiles[0].length; x++) {
    for (let y = 0; y < tiles.length; y++) {
      let tile = tiles[y][x];

      // Check if the tile should be part of a collider.
      if (tile.checked || !isCollisionTile(tile.id, collisionIds)) {
        continue;
      }

      tile.checked = true;
      start.set(x, y);
      current.set(x, y);
      checking = true;
      foundLastY = false;

      // Move down until there is no collider found or the3nd of the map is reached.
      while (checking) {
        // If it found the bottom most connected collision tile move right from the start to see how big
        // the collider can be horizontally.
        if (foundLastY) {
          current.x++;
          if (current.x >= tiles[0].length) {
            checking = false;
            current.x--;
            break;
          }

          for (let i = start.y; i < current.y + 1; i++) {
            tile = tiles[i][current.x];
            if (tile.checked || !isCollisionTile(tile.id, collisionIds)) {
              current.x--;
              checking = false;
            } else {
              tile.checked = true;
            }

            if (!checking) {
              break;
            }
          }

          if (!checking) {
            for (let i = start.y; i < current.y + 1; i++) {
              tiles[i][current.x + 1].checked = false;
            }
          }
        } else {
          current.y++;
          if (current.y >= tiles.length) {
            foundLastY = true;
            current.y--;
          } else {
            tile = tiles[current.y][current.x];
            if (tile.checked || !isCollisionTile(tile.id, collisionIds)) {
              current.y--;
              foundLastY = true;
            } else {
              tile.checked = true;
            }
          }
        }
      }

      const distX = current.x - start.x + 1;
      const distY = current.y - start.y + 1;
      const xPos = worldX + start.x * tileWidth;
      const yPos = worldY + start.y * tileHeight;
      colliders.push(new Rectangle(xPos, yPos, tileWidth * distX, tileHeight * distY));
    }
  }

  start.put();
  current.put();

  return colliders;
}
