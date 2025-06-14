import type { Body } from './body.js';
import { COLLIDING_SIDES } from './constants.js';

const OVERLAP_PADDING = 4;

/**
 * Separates two intersecting bodies along the axis of least overlap.
 * @param body1 - The first body.
 * @param body2 - The second body.
 * @returns True if the bodies were separated.
 */
export function separate(body1: Body, body2: Body): boolean {
  const bounds1 = body1.bounds;
  const bounds2 = body2.bounds;
  const overlapX = Math.min(bounds1.x + bounds1.width, bounds2.x + bounds2.width) - Math.max(bounds1.x, bounds2.x);
  const overlapY = Math.min(bounds1.y + bounds1.height, bounds2.y + bounds2.height) - Math.max(bounds1.y, bounds2.y);

  // Least overlap gets separated.
  if (overlapX > overlapY) {
    return separateY(body1, body2);
  }

  return separateX(body1, body2);
}

/**
 * Checks if two bodies intersect.
 * @param body1 - The first body.
 * @param body2 - The second body.
 * @returns True if the bodies intersect.
 */
export function bodiesIntersect(body1: Body, body2: Body): boolean {
  return body1.bounds.intersects(body2.bounds);
}

/**
 * Separates two intersecting bodies along the X axis.
 * @param body1 - The first body.
 * @param body2 - The second body.
 * @returns True if the bodies were separated.
 */
function separateX(body1: Body, body2: Body): boolean {
  const bounds1 = body1.bounds;
  const bounds2 = body2.bounds;

  let overlap = Math.min(bounds1.x + bounds1.width, bounds2.x + bounds2.width) - Math.max(bounds1.x, bounds2.x);
  const ov = bounds1.x > bounds2.x ? overlap : -overlap;

  if (
    (ov < 0 && bounds1.x + bounds1.width * 0.5 > bounds2.x + bounds2.width * 0.5) ||
    (ov > 0 && bounds1.x + bounds1.width * 0.5 < bounds2.x + bounds2.width * 0.5)
  ) {
    return false;
  }

  const delta = bounds1.x - body1.lastPos.x;

  if (overlap > Math.abs(delta) + OVERLAP_PADDING && delta !== 0) {
    overlap = 0;
  }

  overlap = bounds1.x > bounds2.x ? overlap : -overlap;

  if (overlap === 0) {
    return false;
  }

  // Check if the side are allowed to collide.
  if (overlap > 0) {
    if (
      body1.velocity.x > 0 ||
      !body1.canCollide.has(COLLIDING_SIDES.LEFT) ||
      !body2.canCollide.has(COLLIDING_SIDES.RIGHT)
    ) {
      return false;
    }

    body1.touching.add(COLLIDING_SIDES.LEFT);
    body2.touching.add(COLLIDING_SIDES.RIGHT);
  } else {
    if (
      body1.velocity.x < 0 ||
      !body1.canCollide.has(COLLIDING_SIDES.RIGHT) ||
      !body2.canCollide.has(COLLIDING_SIDES.LEFT)
    ) {
      return false;
    }

    body1.touching.add(COLLIDING_SIDES.RIGHT);
    body2.touching.add(COLLIDING_SIDES.LEFT);
  }

  // if the second body is not dynamic we only update the first body.
  if (body2.bodyType !== 'dynamic') {
    bounds1.x += overlap;
    body1.velocity.x = -body1.velocity.x * body1.bounce;
  } else {
    // Separate both bodies by half the overlap.
    overlap *= 0.5;
    bounds1.x += overlap;
    bounds2.x -= overlap;

    const velocity1 = body2.velocity.x;
    const velocity2 = body1.velocity.x;
    const mass1 = body1.mass;
    const mass2 = body2.mass;
    const momentum = mass1 * velocity1 + mass2 * velocity2;

    body1.velocity.x = (momentum + body1.bounce * mass2 * (velocity2 - velocity1)) / (mass1 + mass2);
    body2.velocity.x = (momentum + body2.bounce * mass1 * (velocity1 - velocity2)) / (mass1 + mass2);
  }

  return true;
}

/**
 * Separates two intersecting bodies along the Y axis.
 * @param body1 - The first body.
 * @param body2 - The second body.
 * @returns True if the bodies were separated.
 */
function separateY(body1: Body, body2: Body): boolean {
  const bounds1 = body1.bounds;
  const bounds2 = body2.bounds;

  let overlap = Math.min(bounds1.y + bounds1.height, bounds2.y + bounds2.height) - Math.max(bounds1.y, bounds2.y);
  const ov = bounds1.y > bounds2.y ? overlap : -overlap;

  if (
    (ov < 0 && bounds1.y + bounds1.height * 0.5 > bounds2.y + bounds2.height * 0.5) ||
    (ov > 0 && bounds1.y + bounds1.height * 0.5 < bounds2.y + bounds2.height * 0.5)
  ) {
    return false;
  }

  const delta = bounds1.y - body1.lastPos.y;

  if (overlap > Math.abs(delta) + OVERLAP_PADDING && delta !== 0) {
    overlap = 0;
  }
  overlap = bounds1.y > bounds2.y ? overlap : -overlap;

  if (overlap === 0) {
    return false;
  }

  // Check if the side are allowed to collide.
  if (overlap > 0) {
    if (
      body1.velocity.y > 0 ||
      !body1.canCollide.has(COLLIDING_SIDES.TOP) ||
      !body2.canCollide.has(COLLIDING_SIDES.BOTTOM)
    ) {
      return false;
    }

    body1.touching.add(COLLIDING_SIDES.TOP);
    body2.touching.add(COLLIDING_SIDES.BOTTOM);
  } else {
    if (
      body1.velocity.y < 0 ||
      !body1.canCollide.has(COLLIDING_SIDES.BOTTOM) ||
      !body2.canCollide.has(COLLIDING_SIDES.TOP)
    ) {
      return false;
    }

    body1.touching.add(COLLIDING_SIDES.BOTTOM);
    body2.touching.add(COLLIDING_SIDES.TOP);
  }

  // if the second body is not dynamic we only update the first body.
  if (body2.bodyType !== 'dynamic') {
    bounds1.y += overlap;
    body1.velocity.y = -body1.velocity.y * body1.bounce;
  } else {
    // Separate both bodies by half the overlap.
    overlap *= 0.5;
    bounds1.y += overlap;
    bounds2.y -= overlap;

    const velocity1 = body2.velocity.y;
    const velocity2 = body1.velocity.y;
    const mass1 = body1.mass;
    const mass2 = body2.mass;
    const momentum = mass1 * velocity1 + mass2 * velocity2;

    body1.velocity.y = (momentum + body1.bounce * mass2 * (velocity2 - velocity1)) / (mass1 + mass2);
    body2.velocity.y = (momentum + body2.bounce * mass1 * (velocity1 - velocity2)) / (mass1 + mass2);
  }

  return true;
}
