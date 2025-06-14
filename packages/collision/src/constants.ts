/**
 * Sides of a body that can be touching another body.
 */
export const TOUCHING = {
  NONE: 0,
  LEFT: 0b0001,
  RIGHT: 0b0010,
  TOP: 0b0100,
  BOTTOM: 0b1000,
};

/**
 * Sides of a body that will collide with another body.
 */
export const COLLIDING_SIDES = {
  NONE: 0,
  LEFT: 0b0001,
  RIGHT: 0b0010,
  TOP: 0b0100,
  BOTTOM: 0b1000,
  ALL: 0b1111,
};

/**
 * Collision groups for filtering collisions.
 */
export const COLLISION_GROUPS = {
  GROUP_01: 0b0000000000000001,
  GROUP_02: 0b0000000000000010,
  GROUP_03: 0b0000000000000100,
  GROUP_04: 0b0000000000001000,
  GROUP_05: 0b0000000000010000,
  GROUP_06: 0b0000000000100000,
  GROUP_07: 0b0000000001000000,
  GROUP_08: 0b0000000010000000,
  GROUP_09: 0b0000000100000000,
  GROUP_10: 0b0000001000000000,
  GROUP_11: 0b0000010000000000,
  GROUP_12: 0b0000100000000000,
  GROUP_13: 0b0001000000000000,
  GROUP_14: 0b0010000000000000,
  GROUP_15: 0b0100000000000000,
  GROUP_16: 0b1000000000000000,
};
