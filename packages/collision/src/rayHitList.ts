import type { Vec2 } from '@square3/square3';
import type { Body } from './body.js';
import { RayHit } from './rayHit.js';

/**
 * Helper function to check if a body has all tags.
 * @param body The body to check the tags in.
 * @param tags The tags to check.
 * @returns True if the body has all the tags.
 */
function hasAllTags(body: Body, tags: string[]): boolean {
  for (const tag of tags) {
    if (!body.tags.includes(tag)) {
      return false;
    }
  }

  return true;
}

/**
 * Class representing a list of ray hits from a raycast.
 */
export class RayHitList {
  /**
   * The list of hits.
   */
  private hits: RayHit[];

  /**
   * Creates a new RayHitList instance.
   */
  constructor() {
    this.hits = [];
  }

  /**
   * Inserts a new ray hit into the list, maintaining order by distance.
   * @param origin - The origin point of the ray.
   * @param target - The target point of the ray.
   * @param body - The body that was hit, if any.
   */
  insert(origin: Vec2, target: Vec2, body?: Body): void {
    const hit = RayHit.get(origin, target, body);

    if (this.hits.length > 0) {
      if (this.hits.length === 1) {
        const first = this.hits[0];
        if (hit.distance < first.distance) {
          this.hits.unshift(hit);
        } else {
          this.hits.push(hit);
        }
      } else {
        let index = 0;
        while (index < this.hits.length && hit.distance > this.hits[index].distance) {
          index++;
        }

        if (index < this.hits.length) {
          this.hits.splice(index, 0, hit);
        } else {
          this.hits.push(hit);
        }
      }
    } else {
      this.hits.push(hit);
    }
  }

  /**
   * Filters the hits based on the given tags.
   * @param tags - The tags to filter by.
   * @returns An array of RayHits that match the tags.
   */
  filterOnTags(tags: string[]): RayHit[] {
    return this.hits.filter((hit) => hit.body && hasAllTags(hit.body, tags));
  }

  /**
   * Gets the first hit in the list.
   * @returns The first RayHit, or undefined if the list is empty.
   */
  first(): RayHit | undefined {
    return this.hits[0];
  }

  /**
   * Gets the last hit in the list.
   * @returns The last RayHit, or undefined if the list is empty.
   */
  last(): RayHit | undefined {
    return this.hits[this.hits.length - 1];
  }

  /**
   * Gets the number of hits in the list.
   * @returns The number of hits.
   */
  count(): number {
    return this.hits.length;
  }

  /**
   * Removes a specific hit from the list.
   * @param hit - The RayHit to remove.
   */
  remove(hit: RayHit): void {
    const index = this.hits.indexOf(hit);
    if (index >= 0) {
      this.hits.splice(index, 1);
    }
  }

  /**
   * Clears the list of hits, returning them to the pool.
   */
  clear(): void {
    while (this.hits.length > 0) {
      this.hits.pop()?.put();
    }
  }
}
