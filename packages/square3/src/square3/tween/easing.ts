/** @noSelf */
export type Ease = (time: number, begin: number, change: number, duration: number) => number;

/**
 * Two times PI.
 */
const PI_M2 = Math.PI * 2;

/**
 * Half PI.
 */
const PI_D2 = Math.PI / 2;

/**
 * Linear easing.
 * @param time - The time since the tween started in seconds.
 * @param begin - The start value of the property.
 * @param change - The amount of change from start to end.
 * @param duration - The total duration of the tween in seconds.
 * @return The updated property value.
 */
export function easeLinear(time: number, begin: number, change: number, duration: number): number {
  return (change * time) / duration + begin;
}

/**
 * Sine in easing.
 * @param time - The time since the tween started in seconds.
 * @param begin - The start value of the property.
 * @param change - The amount of change from start to end.
 * @param duration - The total duration of the tween in seconds.
 * @return The updated property value.
 */
export function easeInSine(time: number, begin: number, change: number, duration: number): number {
  return -change * Math.cos((time / duration) * PI_D2) + change + begin;
}

/**
 * Sine out easing.
 * @param time - The time since the tween started in seconds.
 * @param begin - The start value of the property.
 * @param change - The amount of change from start to end.
 * @param duration - The total duration of the tween in seconds.
 * @return The updated property value.
 */
export function easeOutSine(time: number, begin: number, change: number, duration: number): number {
  return change * Math.sin((time / duration) * PI_D2) + begin;
}

/**
 * Sine in out easing.
 * @param time - The time since the tween started in seconds.
 * @param begin - The start value of the property.
 * @param change - The amount of change from start to end.
 * @param duration - The total duration of the tween in seconds.
 * @return The updated property value.
 */
export function easeInOutSine(time: number, begin: number, change: number, duration: number): number {
  return (-change / 2) * (Math.cos((Math.PI * time) / duration) - 1) + begin;
}

/**
 * Quint in easing.
 * @param time - The time since the tween started in seconds.
 * @param begin - The start value of the property.
 * @param change - The amount of change from start to end.
 * @param duration - The total duration of the tween in seconds.
 * @return The updated property value.
 */
export function easeInQuint(time: number, begin: number, change: number, duration: number): number {
  const easeTime = time / duration;
  return change * easeTime * easeTime * easeTime * easeTime * easeTime + begin;
}

/**
 * Quint out easing.
 * @param time - The time since the tween started in seconds.
 * @param begin - The start value of the property.
 * @param change - The amount of change from start to end.
 * @param duration - The total duration of the tween in seconds.
 * @return The updated property value.
 */
export function easeOutQuint(time: number, begin: number, change: number, duration: number): number {
  const easeTime = time / duration - 1;
  return change * (easeTime * easeTime * easeTime * easeTime * easeTime + 1 + begin);
}

/**
 * Quint in out easing.
 * @param time - The time since the tween started in seconds.
 * @param begin - The start value of the property.
 * @param change - The amount of change from start to end.
 * @param duration - The total duration of the tween in seconds.
 * @return The updated property value.
 */
export function easeInOutQuint(time: number, begin: number, change: number, duration: number): number {
  let easeTime = time / (duration / 2);
  if (easeTime < 1) {
    return (change / 2) * easeTime * easeTime * easeTime * easeTime * easeTime + begin;
  }

  easeTime -= 2;
  return (change / 2) * (easeTime * easeTime * easeTime * easeTime * easeTime + 2) + begin;
}

/**
 * Quart in easing.
 * @param time - The time since the tween started in seconds.
 * @param begin - The start value of the property.
 * @param change - The amount of change from start to end.
 * @param duration - The total duration of the tween in seconds.
 * @return The updated property value.
 */
export function easeInQuart(time: number, begin: number, change: number, duration: number): number {
  const easeTime = time / duration;
  return change * easeTime * easeTime * easeTime * easeTime + begin;
}

/**
 * Quart out easing.
 * @param time - The time since the tween started in seconds.
 * @param begin - The start value of the property.
 * @param change - The amount of change from start to end.
 * @param duration - The total duration of the tween in seconds.
 * @return The updated property value.
 */
export function easeOutQuart(time: number, begin: number, change: number, duration: number): number {
  const easeTime = time / duration - 1;
  return -change * (easeTime * easeTime * easeTime * easeTime - 1) + begin;
}

/**
 * Quart in out easing.
 * @param time - The time since the tween started in seconds.
 * @param begin - The start value of the property.
 * @param change - The amount of change from start to end.
 * @param duration - The total duration of the tween in seconds.
 * @return The updated property value.
 */
export function easeInOutQuart(time: number, begin: number, change: number, duration: number): number {
  let easeTime = time / (duration / 2);
  if (easeTime < 1) {
    return (change / 2) * easeTime * easeTime * easeTime * easeTime + begin;
  }

  easeTime -= 2;
  return (-change / 2) * (easeTime * easeTime * easeTime * easeTime - 2) + begin;
}

/**
 * Quad in easing.
 * @param time - The time since the tween started in seconds.
 * @param begin - The start value of the property.
 * @param change - The amount of change from start to end.
 * @param duration - The total duration of the tween in seconds.
 * @return The updated property value.
 */
export function easeInQuad(time: number, begin: number, change: number, duration: number): number {
  const easeTime = time / duration;
  return change * easeTime * easeTime + begin;
}

/**
 * Quad out easing.
 * @param time - The time since the tween started in seconds.
 * @param begin - The start value of the property.
 * @param change - The amount of change from start to end.
 * @param duration - The total duration of the tween in seconds.
 * @return The updated property value.
 */
export function easeOutQuad(time: number, begin: number, change: number, duration: number): number {
  const easeTime = time / duration;
  return -change * easeTime * (easeTime - 2) + begin;
}

/**
 * Quad in out easing.
 * @param time - The time since the tween started in seconds.
 * @param begin - The start value of the property.
 * @param change - The amount of change from start to end.
 * @param duration - The total duration of the tween in seconds.
 * @return The updated property value.
 */
export function easeInOutQuad(time: number, begin: number, change: number, duration: number): number {
  let easeTime = time / (duration / 2);
  if (easeTime < 1) {
    return (change / 2) * easeTime * easeTime + begin;
  }

  easeTime -= 1;
  return (-change / 2) * (easeTime * (easeTime - 2) - 1) + begin;
}

/**
 * Expo in easing.
 * @param time - The time since the tween started in seconds.
 * @param begin - The start value of the property.
 * @param change - The amount of change from start to end.
 * @param duration - The total duration of the tween in seconds.
 * @return The updated property value.
 */
export function easeInExpo(time: number, begin: number, change: number, duration: number): number {
  return time === 0 ? begin : change * 2 ** (10 * (time / duration - 1)) + begin;
}

/**
 * Expo out easing.
 * @param time - The time since the tween started in seconds.
 * @param begin - The start value of the property.
 * @param change - The amount of change from start to end.
 * @param duration - The total duration of the tween in seconds.
 * @return The updated property value.
 */
export function easeOutExpo(time: number, begin: number, change: number, duration: number): number {
  return time === duration ? begin + change : change * (-(2 ** ((-10 * time) / duration)) + 1) + begin;
}

/**
 * Expo in out easing.
 * @param time - The time since the tween started in seconds.
 * @param begin - The start value of the property.
 * @param change - The amount of change from start to end.
 * @param duration - The total duration of the tween in seconds.
 * @return The updated property value.
 */
export function easeInOutExpo(time: number, begin: number, change: number, duration: number): number {
  if (time === 0) {
    return begin;
  }
  if (time === duration) {
    return begin + change;
  }

  let easeTime = time / (duration / 2);
  if (easeTime < 1) {
    return (change / 2) * 2 ** (10 * (easeTime - 1)) + begin;
  }

  easeTime -= 1;
  return (change / 2) * (-(2 ** (-10 * easeTime)) + 2) + begin;
}

/**
 * Elastic in easing.
 * @param time - The time since the tween started in seconds.
 * @param begin - The start value of the property.
 * @param change - The amount of change from start to end.
 * @param duration - The total duration of the tween in seconds.
 * @return The updated property value.
 */
export function easeInElastic(time: number, begin: number, change: number, duration: number): number {
  const p = duration * 0.3;
  const a = change;
  const s = p / 4.0;

  if (time === 0) {
    return begin;
  }

  let easeTime = time / duration;
  if (easeTime === 1) {
    return begin + change;
  }

  easeTime -= 1;
  return -(a * 2 ** (10 * easeTime) * Math.sin(((easeTime * duration - s) * PI_M2) / p)) + begin;
}

/**
 * Elastic out easing.
 * @param time - The time since the tween started in seconds.
 * @param begin - The start value of the property.
 * @param change - The amount of change from start to end.
 * @param duration - The total duration of the tween in seconds.
 * @return The updated property value.
 */
export function easeOutElastic(time: number, begin: number, change: number, duration: number): number {
  const p = duration * 0.3;
  const a = change;
  const s = p / 4.0;

  if (time === 0) {
    return begin;
  }

  let easeTime = time / duration;
  if (easeTime === 1) {
    return begin + change;
  }

  easeTime -= 1;
  return a * 2 ** (-10 * easeTime) * Math.sin(((easeTime * duration - s) * PI_M2) / p) + change + begin;
}

/**
 * Elastic in out easing.
 * @param time - The time since the tween started in seconds.
 * @param begin - The start value of the property.
 * @param change - The amount of change from start to end.
 * @param duration - The total duration of the tween in seconds.
 * @return The updated property value.
 */
export function easeInOutElastic(time: number, begin: number, change: number, duration: number): number {
  const p = duration * (0.3 * 1.5);
  const a = change;
  const s = p / 4.0;

  if (time === 0) {
    return begin;
  }

  let easeTime = time / (duration / 2);
  if (easeTime === 2) {
    return begin + change;
  }

  if (easeTime < 1) {
    easeTime -= 1;
    return -0.5 * (a * 2 ** (10 * easeTime) * Math.sin(((easeTime * duration - s) * PI_M2) / p)) + begin;
  }

  easeTime -= 1;
  return a * 2 ** (-10 * easeTime) * Math.sin(((easeTime * duration - s) * PI_M2) / p) * 0.5 + change + begin;
}

/**
 * Circular in easing.
 * @param time - The time since the tween started in seconds.
 * @param begin - The start value of the property.
 * @param change - The amount of change from start to end.
 * @param duration - The total duration of the tween in seconds.
 * @return The updated property value.
 */
export function easeInCircular(time: number, begin: number, change: number, duration: number): number {
  const easeTime = time / duration;
  return -change * (Math.sqrt(1 - easeTime * easeTime) - 1) + begin;
}

/**
 * Circular out easing.
 * @param time - The time since the tween started in seconds.
 * @param begin - The start value of the property.
 * @param change - The amount of change from start to end.
 * @param duration - The total duration of the tween in seconds.
 * @return The updated property value.
 */
export function easeOutCircular(time: number, begin: number, change: number, duration: number): number {
  const easeTime = time / duration;
  return change * Math.sqrt(1 - (easeTime - 1) * easeTime) + begin;
}

/**
 * Circular in out easing.
 * @param time - The time since the tween started in seconds.
 * @param begin - The start value of the property.
 * @param change - The amount of change from start to end.
 * @param duration - The total duration of the tween in seconds.
 * @return The updated property value.
 */
export function easeInOutCircular(time: number, begin: number, change: number, duration: number): number {
  let easeTime = time / (duration / 2);
  if (easeTime < 1) {
    return (-change / 2) * (Math.sqrt(1 - easeTime * easeTime) - 1) + begin;
  }

  easeTime -= 2;
  return (change / 2) * (Math.sqrt(1 - easeTime * easeTime) + 1) + begin;
}

/**
 * Back in easing.
 * @param time - The time since the tween started in seconds.
 * @param begin - The start value of the property.
 * @param change - The amount of change from start to end.
 * @param duration - The total duration of the tween in seconds.
 * @return The updated property value.
 */
export function easeInBack(time: number, begin: number, change: number, duration: number): number {
  const s = 1.70158;
  const easeTime = time / duration;
  return change * easeTime * easeTime * ((s + 1) * easeTime - s) + begin;
}

/**
 * Back out easing.
 * @param time - The time since the tween started in seconds.
 * @param begin - The start value of the property.
 * @param change - The amount of change from start to end.
 * @param duration - The total duration of the tween in seconds.
 * @return The updated property value.
 */
export function easeOutBack(time: number, begin: number, change: number, duration: number): number {
  const s = 1.70158;
  const easeTime = time / duration - 1;
  return change * (easeTime * easeTime * ((s + 1) * easeTime + s) + 1) + begin;
}

/**
 * Back in out easing.
 * @param time - The time since the tween started in seconds.
 * @param begin - The start value of the property.
 * @param change - The amount of change from start to end.
 * @param duration - The total duration of the tween in seconds.
 * @return The updated property value.
 */
export function easeInOutBack(time: number, begin: number, change: number, duration: number): number {
  let s = 1.70158;

  let easeTime = time / (duration / 2);
  if (easeTime < 1) {
    s *= 1.525;
    return (change / 2) * easeTime * easeTime * ((s + 1) * easeTime - s) + begin;
  }

  s *= 1.525;
  easeTime -= 2;
  return (change / 2) * (easeTime * easeTime * ((s + 1) * easeTime + s) + 2) + begin;
}

/**
 * Bounce in easing.
 * @param time - The time since the tween started in seconds.
 * @param begin - The start value of the property.
 * @param change - The amount of change from start to end.
 * @param duration - The total duration of the tween in seconds.
 * @return The updated property value.
 */
export function easeInBounce(time: number, begin: number, change: number, duration: number): number {
  return change - easeOutBounce(duration - time, 0, change, duration) + begin;
}

/**
 * Bounce out easing.
 * @param time - The time since the tween started in seconds.
 * @param begin - The start value of the property.
 * @param change - The amount of change from start to end.
 * @param duration - The total duration of the tween in seconds.
 * @return - The updated property value.
 */
export function easeOutBounce(time: number, begin: number, change: number, duration: number): number {
  let easeTime = time / duration;
  if (easeTime < 1 / 2.75) {
    return change * (7.5625 * time * time) + begin;
  }

  easeTime -= 2.625 / 2.75;
  if (easeTime < 2 / 2.75) {
    return change * (7.5625 * easeTime * easeTime + 0.75) + begin;
  }

  if (easeTime < 2.5 / 2.75) {
    return change * (7.5625 * easeTime * easeTime + 0.9375) + begin;
  }

  return change * (7.5625 * easeTime * easeTime + 0.984375) + begin;
}

/**
 * Bounce in out easing.
 * @param time - The time since the tween started in seconds.
 * @param begin - The start value of the property.
 * @param change - The amount of change from start to end.
 * @param duration - The total duration of the tween in seconds.
 * @return The updated property value.
 */
export function easeInOutBounce(time: number, begin: number, change: number, duration: number): number {
  if (time < duration / 2) {
    return easeInBounce(time * 2, 0, change, duration) * 0.5 + begin;
  }

  return easeOutBounce(time * 2 - duration, 0, change, duration) * 0.5 + change * 0.5 + begin;
}

/**
 * Cubic in easing.
 * @param time - The time since the tween started in seconds.
 * @param begin - The start value of the property.
 * @param change - The amount of change from start to end.
 * @param duration - The total duration of the tween in seconds.
 * @return The updated property value.
 */
export function easeInCubic(time: number, begin: number, change: number, duration: number): number {
  const easeTime = time / duration;
  return change * easeTime * easeTime * easeTime + begin;
}

/**
 * Cubic out easing.
 * @param time - The time since the tween started in seconds.
 * @param begin - The start value of the property.
 * @param change - The amount of change from start to end.
 * @param duration - The total duration of the tween in seconds.
 * @return The updated property value.
 */
export function easeOutCubic(time: number, begin: number, change: number, duration: number): number {
  const easeTime = time / duration - 1;
  return change * (easeTime * easeTime * easeTime + 1) + begin;
}

/**
 * Cubic in out easing.
 * @param time - The time since the tween started in seconds.
 * @param begin - The start value of the property.
 * @param change - The amount of change from start to end.
 * @param duration - The total duration of the tween in seconds.
 * @return The updated property value.
 */
export function easeInOutCubic(time: number, begin: number, change: number, duration: number): number {
  let easeTime = time / (duration / 2);
  if (easeTime < 1) {
    return (change / 2) * easeTime * easeTime * easeTime + begin;
  }

  easeTime -= 2;
  return (change / 2) * (easeTime * easeTime * easeTime + 2) + begin;
}
