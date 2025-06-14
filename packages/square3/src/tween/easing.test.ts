import { describe, expect, it } from 'vitest';
import {
  easeInBack,
  easeInBounce,
  easeInCircular,
  easeInCubic,
  easeInElastic,
  easeInExpo,
  easeInOutBack,
  easeInOutBounce,
  easeInOutCircular,
  easeInOutCubic,
  easeInOutElastic,
  easeInOutExpo,
  easeInOutQuad,
  easeInOutQuart,
  easeInOutQuint,
  easeInOutSine,
  easeInQuad,
  easeInQuart,
  easeInQuint,
  easeInSine,
  easeLinear,
  easeOutBack,
  easeOutBounce,
  easeOutCircular,
  easeOutCubic,
  easeOutElastic,
  easeOutExpo,
  easeOutQuad,
  easeOutQuart,
  easeOutQuint,
  easeOutSine,
} from './easing.js';

describe('Test tweens/easing:', () => {
  it('Should ease linear.', () => {
    let actual = easeLinear(0, 0, 10, 1);
    expect(actual).toBeCloseTo(0, 4);

    actual = easeLinear(0.25, 0, 10, 1);
    expect(actual).toBeCloseTo(2.5, 4);

    actual = easeLinear(0.5, 0, 10, 1);
    expect(actual).toBeCloseTo(5, 4);

    actual = easeLinear(0.75, 0, 10, 1);
    expect(actual).toBeCloseTo(7.5, 4);

    actual = easeLinear(1, 0, 10, 1);
    expect(actual).toBeCloseTo(10, 4);
  });

  it('Should ease in sine.', () => {
    let actual = easeInSine(0, 0, 10, 1);
    expect(actual).toBeCloseTo(0, 4);

    actual = easeInSine(0.25, 0, 10, 1);
    expect(actual).toBeCloseTo(0.7612, 4);

    actual = easeInSine(0.5, 0, 10, 1);
    expect(actual).toBeCloseTo(2.9289, 4);

    actual = easeInSine(0.75, 0, 10, 1);
    expect(actual).toBeCloseTo(6.17316, 4);

    actual = easeInSine(1, 0, 10, 1);
    expect(actual).toBeCloseTo(10, 4);
  });

  it('Should ease out sine.', () => {
    let actual = easeOutSine(0, 0, 10, 1);
    expect(actual).toBeCloseTo(0, 4);

    actual = easeOutSine(0.25, 0, 10, 1);
    expect(actual).toBeCloseTo(3.8268, 4);

    actual = easeOutSine(0.5, 0, 10, 1);
    expect(actual).toBeCloseTo(7.07106, 4);

    actual = easeOutSine(0.75, 0, 10, 1);
    expect(actual).toBeCloseTo(9.23879, 4);

    actual = easeOutSine(1, 0, 10, 1);
    expect(actual).toBeCloseTo(10, 4);
  });

  it('Should ease in out sine.', () => {
    let actual = easeInOutSine(0, 0, 10, 1);
    expect(actual).toBeCloseTo(0, 4);

    actual = easeInOutSine(0.25, 0, 10, 1);
    expect(actual).toBeCloseTo(1.46446, 4);

    actual = easeInOutSine(0.5, 0, 10, 1);
    expect(actual).toBeCloseTo(4.99999, 4);

    actual = easeInOutSine(0.75, 0, 10, 1);
    expect(actual).toBeCloseTo(8.5355, 4);

    actual = easeInOutSine(1, 0, 10, 1);
    expect(actual).toBeCloseTo(10, 4);
  });

  it('Should ease in quint.', () => {
    let actual = easeInQuint(0, 0, 10, 1);
    expect(actual).toBeCloseTo(0, 4);

    actual = easeInQuint(0.25, 0, 10, 1);
    expect(actual).toBeCloseTo(0.00976, 4);

    actual = easeInQuint(0.5, 0, 10, 1);
    expect(actual).toBeCloseTo(0.3125, 4);

    actual = easeInQuint(0.75, 0, 10, 1);
    expect(actual).toBeCloseTo(2.373, 4);

    actual = easeInQuint(1, 0, 10, 1);
    expect(actual).toBeCloseTo(10, 4);
  });

  it('Should ease out quint.', () => {
    let actual = easeOutQuint(0, 0, 10, 1);
    expect(actual).toBeCloseTo(0, 4);

    actual = easeOutQuint(0.25, 0, 10, 1);
    expect(actual).toBeCloseTo(7.62695, 4);

    actual = easeOutQuint(0.5, 0, 10, 1);
    expect(actual).toBeCloseTo(9.6875, 4);

    actual = easeOutQuint(0.75, 0, 10, 1);
    expect(actual).toBeCloseTo(9.9902, 4);

    actual = easeOutQuint(1, 0, 10, 1);
    expect(actual).toBeCloseTo(10, 4);
  });

  it('Should ease in out quint.', () => {
    let actual = easeInOutQuint(0, 0, 10, 1);
    expect(actual).toBeCloseTo(0, 4);

    actual = easeInOutQuint(0.25, 0, 10, 1);
    expect(actual).toBeCloseTo(0.1562, 4);

    actual = easeInOutQuint(0.5, 0, 10, 1);
    expect(actual).toBeCloseTo(5, 4);

    actual = easeInOutQuint(0.75, 0, 10, 1);
    expect(actual).toBeCloseTo(9.8437, 4);

    actual = easeInOutQuint(1, 0, 10, 1);
    expect(actual).toBeCloseTo(10, 4);
  });

  it('Should ease in quart.', () => {
    let actual = easeInQuart(0, 0, 10, 1);
    expect(actual).toBeCloseTo(0, 4);

    actual = easeInQuart(0.25, 0, 10, 1);
    expect(actual).toBeCloseTo(0.03906, 4);

    actual = easeInQuart(0.5, 0, 10, 1);
    expect(actual).toBeCloseTo(0.625, 4);

    actual = easeInQuart(0.75, 0, 10, 1);
    expect(actual).toBeCloseTo(3.164062, 4);

    actual = easeInQuart(1, 0, 10, 1);
    expect(actual).toBeCloseTo(10, 4);
  });

  it('Should ease out quart.', () => {
    let actual = easeOutQuart(0, 0, 10, 1);
    expect(actual).toBeCloseTo(0, 4);

    actual = easeOutQuart(0.25, 0, 10, 1);
    expect(actual).toBeCloseTo(6.8359, 4);

    actual = easeOutQuart(0.5, 0, 10, 1);
    expect(actual).toBeCloseTo(9.375, 4);

    actual = easeOutQuart(0.75, 0, 10, 1);
    expect(actual).toBeCloseTo(9.9609, 4);

    actual = easeOutQuart(1, 0, 10, 1);
    expect(actual).toBeCloseTo(10, 4);
  });

  it('Should ease in out quart.', () => {
    let actual = easeInOutQuart(0, 0, 10, 1);
    expect(actual).toBeCloseTo(0, 4);

    actual = easeInOutQuart(0.25, 0, 10, 1);
    expect(actual).toBeCloseTo(0.3125, 4);

    actual = easeInOutQuart(0.5, 0, 10, 1);
    expect(actual).toBeCloseTo(5, 4);

    actual = easeInOutQuart(0.75, 0, 10, 1);
    expect(actual).toBeCloseTo(9.6875, 4);

    actual = easeInOutQuart(1, 0, 10, 1);
    expect(actual).toBeCloseTo(10, 4);
  });

  it('Should ease in quad.', () => {
    let actual = easeInQuad(0, 0, 10, 1);
    expect(actual).toBeCloseTo(0, 4);

    actual = easeInQuad(0.25, 0, 10, 1);
    expect(actual).toBeCloseTo(0.625, 4);

    actual = easeInQuad(0.5, 0, 10, 1);
    expect(actual).toBeCloseTo(2.5, 4);

    actual = easeInQuad(0.75, 0, 10, 1);
    expect(actual).toBeCloseTo(5.625, 4);

    actual = easeInQuad(1, 0, 10, 1);
    expect(actual).toBeCloseTo(10, 4);
  });

  it('Should ease out quad.', () => {
    let actual = easeOutQuad(0, 0, 10, 1);
    expect(actual).toBeCloseTo(0, 4);

    actual = easeOutQuad(0.25, 0, 10, 1);
    expect(actual).toBeCloseTo(4.375, 4);

    actual = easeOutQuad(0.5, 0, 10, 1);
    expect(actual).toBeCloseTo(7.5, 4);

    actual = easeOutQuad(0.75, 0, 10, 1);
    expect(actual).toBeCloseTo(9.375, 4);

    actual = easeOutQuad(1, 0, 10, 1);
    expect(actual).toBeCloseTo(10, 4);
  });

  it('Should ease in out quad.', () => {
    let actual = easeInOutQuad(0, 0, 10, 1);
    expect(actual).toBeCloseTo(0, 4);

    actual = easeInOutQuad(0.25, 0, 10, 1);
    expect(actual).toBeCloseTo(1.25, 4);

    actual = easeInOutQuad(0.5, 0, 10, 1);
    expect(actual).toBeCloseTo(5, 4);

    actual = easeInOutQuad(0.75, 0, 10, 1);
    expect(actual).toBeCloseTo(8.75, 4);

    actual = easeInOutQuad(1, 0, 10, 1);
    expect(actual).toBeCloseTo(10, 4);
  });

  it('Should ease in expo.', () => {
    let actual = easeInExpo(0, 0, 10, 1);
    expect(actual).toBeCloseTo(0, 4);

    actual = easeInExpo(0.25, 0, 10, 1);
    expect(actual).toBeCloseTo(0.0552, 4);

    actual = easeInExpo(0.5, 0, 10, 1);
    expect(actual).toBeCloseTo(0.3125, 4);

    actual = easeInExpo(0.75, 0, 10, 1);
    expect(actual).toBeCloseTo(1.76776, 4);

    actual = easeInExpo(1, 0, 10, 1);
    expect(actual).toBeCloseTo(10, 4);
  });

  it('Should ease out expo.', () => {
    let actual = easeOutExpo(0, 0, 10, 1);
    expect(actual).toBeCloseTo(0, 4);

    actual = easeOutExpo(0.25, 0, 10, 1);
    expect(actual).toBeCloseTo(8.2322, 4);

    actual = easeOutExpo(0.5, 0, 10, 1);
    expect(actual).toBeCloseTo(9.6875, 4);

    actual = easeOutExpo(0.75, 0, 10, 1);
    expect(actual).toBeCloseTo(9.94475, 4);

    actual = easeOutExpo(1, 0, 10, 1);
    expect(actual).toBeCloseTo(10, 4);
  });

  it('Should ease in out expo.', () => {
    let actual = easeInOutExpo(0, 0, 10, 1);
    expect(actual).toBeCloseTo(0, 4);

    actual = easeInOutExpo(0.25, 0, 10, 1);
    expect(actual).toBeCloseTo(0.1562, 4);

    actual = easeInOutExpo(0.5, 0, 10, 1);
    expect(actual).toBeCloseTo(5, 4);

    actual = easeInOutExpo(0.75, 0, 10, 1);
    expect(actual).toBeCloseTo(9.8437, 4);

    actual = easeInOutExpo(1, 0, 10, 1);
    expect(actual).toBeCloseTo(10, 4);
  });

  it('Should ease in elastic.', () => {
    let actual = easeInElastic(0, 0, 10, 1);
    expect(actual).toBeCloseTo(0, 4);

    actual = easeInElastic(0.25, 0, 10, 1);
    expect(actual).toBeCloseTo(-0.0552, 4);

    actual = easeInElastic(0.5, 0, 10, 1);
    expect(actual).toBeCloseTo(-0.15625, 4);

    actual = easeInElastic(0.75, 0, 10, 1);
    expect(actual).toBeCloseTo(0.88388, 4);

    actual = easeInElastic(1, 0, 10, 1);
    expect(actual).toBeCloseTo(10, 4);
  });

  it('Should ease out elastic.', () => {
    let actual = easeOutElastic(0, 0, 10, 1);
    expect(actual).toBeCloseTo(0, 4);

    actual = easeOutElastic(0.25, 0, 10, 1);
    expect(actual).toBeCloseTo(9.1161, 4);

    actual = easeOutElastic(0.5, 0, 10, 1);
    expect(actual).toBeCloseTo(10.1562, 4);

    actual = easeOutElastic(0.75, 0, 10, 1);
    expect(actual).toBeCloseTo(10.0552, 4);

    actual = easeOutElastic(1, 0, 10, 1);
    expect(actual).toBeCloseTo(10, 4);
  });

  it('Should ease in out elastic.', () => {
    let actual = easeInOutElastic(0, 0, 10, 1);
    expect(actual).toBeCloseTo(0, 4);

    actual = easeInOutElastic(0.25, 0, 10, 1);
    expect(actual).toBeCloseTo(0.11969, 4);

    actual = easeInOutElastic(0.5, 0, 10, 1);
    expect(actual).toBeCloseTo(5, 4);

    actual = easeInOutElastic(0.75, 0, 10, 1);
    expect(actual).toBeCloseTo(9.8803, 4);

    actual = easeInOutElastic(1, 0, 10, 1);
    expect(actual).toBeCloseTo(10, 4);
  });

  it('Should ease in circular.', () => {
    let actual = easeInCircular(0, 0, 10, 1);
    expect(actual).toBeCloseTo(0, 4);

    actual = easeInCircular(0.25, 0, 10, 1);
    expect(actual).toBeCloseTo(0.3175, 4);

    actual = easeInCircular(0.5, 0, 10, 1);
    expect(actual).toBeCloseTo(1.3397, 4);

    actual = easeInCircular(0.75, 0, 10, 1);
    expect(actual).toBeCloseTo(3.3856, 4);

    actual = easeInCircular(1, 0, 10, 1);
    expect(actual).toBeCloseTo(10, 4);
  });

  it('Should ease out circular.', () => {
    let actual = easeOutCircular(0, 0, 10, 1);
    expect(actual).toBeCloseTo(0, 4);

    actual = easeOutCircular(0.25, 0, 10, 1);
    expect(actual).toBeCloseTo(6.61437, 4);

    actual = easeOutCircular(0.5, 0, 10, 1);
    expect(actual).toBeCloseTo(8.66025, 4);

    actual = easeOutCircular(0.75, 0, 10, 1);
    expect(actual).toBeCloseTo(9.68245, 4);

    actual = easeOutCircular(1, 0, 10, 1);
    expect(actual).toBeCloseTo(10, 4);
  });

  it('Should ease in out circular.', () => {
    let actual = easeInOutCircular(0, 0, 10, 1);
    expect(actual).toBeCloseTo(0, 4);

    actual = easeInOutCircular(0.25, 0, 10, 1);
    expect(actual).toBeCloseTo(0.66987, 4);

    actual = easeInOutCircular(0.5, 0, 10, 1);
    expect(actual).toBeCloseTo(5, 4);

    actual = easeInOutCircular(0.75, 0, 10, 1);
    expect(actual).toBeCloseTo(9.3301, 4);

    actual = easeInOutCircular(1, 0, 10, 1);
    expect(actual).toBeCloseTo(10, 4);
  });

  it('Should ease in back.', () => {
    let actual = easeInBack(0, 0, 10, 1);
    expect(actual).toBeCloseTo(0, 4);

    actual = easeInBack(0.25, 0, 10, 1);
    expect(actual).toBeCloseTo(-0.64136, 4);

    actual = easeInBack(0.5, 0, 10, 1);
    expect(actual).toBeCloseTo(-0.87697, 4);

    actual = easeInBack(0.75, 0, 10, 1);
    expect(actual).toBeCloseTo(1.8259, 4);

    actual = easeInBack(1, 0, 10, 1);
    expect(actual).toBeCloseTo(10, 4);
  });

  it('Should ease out back.', () => {
    let actual = easeOutBack(0, 0, 10, 1);
    expect(actual).toBeCloseTo(0, 4);

    actual = easeOutBack(0.25, 0, 10, 1);
    expect(actual).toBeCloseTo(8.17409, 4);

    actual = easeOutBack(0.5, 0, 10, 1);
    expect(actual).toBeCloseTo(10.876975, 4);

    actual = easeOutBack(0.75, 0, 10, 1);
    expect(actual).toBeCloseTo(10.64136, 4);

    actual = easeOutBack(1, 0, 10, 1);
    expect(actual).toBeCloseTo(10, 4);
  });

  it('Should ease in out back.', () => {
    let actual = easeInOutBack(0, 0, 10, 1);
    expect(actual).toBeCloseTo(0, 4);

    actual = easeInOutBack(0.25, 0, 10, 1);
    expect(actual).toBeCloseTo(-0.9968, 4);

    actual = easeInOutBack(0.5, 0, 10, 1);
    expect(actual).toBeCloseTo(5, 4);

    actual = easeInOutBack(0.75, 0, 10, 1);
    expect(actual).toBeCloseTo(10.9968, 4);

    actual = easeInOutBack(1, 0, 10, 1);
    expect(actual).toBeCloseTo(10, 4);
  });

  it('Should ease in bounce.', () => {
    let actual = easeInBounce(0, 0, 10, 1);
    expect(actual).toBeCloseTo(0, 4);

    actual = easeInBounce(0.25, 0, 10, 1);
    expect(actual).toBeCloseTo(0.2734, 4);

    actual = easeInBounce(0.5, 0, 10, 1);
    expect(actual).toBeCloseTo(2.3437, 4);

    actual = easeInBounce(0.75, 0, 10, 1);
    expect(actual).toBeCloseTo(5.2734, 4);

    actual = easeInBounce(1, 0, 10, 1);
    expect(actual).toBeCloseTo(10, 4);
  });

  it('Should ease out bounce.', () => {
    let actual = easeOutBounce(0, 0, 10, 1);
    expect(actual).toBeCloseTo(0, 4);

    actual = easeOutBounce(0.25, 0, 10, 1);
    expect(actual).toBeCloseTo(4.72656, 4);

    actual = easeOutBounce(0.5, 0, 10, 1);
    expect(actual).toBeCloseTo(7.6562, 4);

    actual = easeOutBounce(0.75, 0, 10, 1);
    expect(actual).toBeCloseTo(9.72656, 4);

    actual = easeOutBounce(1, 0, 10, 1);
    expect(actual).toBeCloseTo(10, 4);
  });

  it('Should ease in out bounce.', () => {
    let actual = easeInOutBounce(0, 0, 10, 1);
    expect(actual).toBeCloseTo(0, 4);

    actual = easeInOutBounce(0.25, 0, 10, 1);
    expect(actual).toBeCloseTo(1.17187, 4);

    actual = easeInOutBounce(0.5, 0, 10, 1);
    expect(actual).toBeCloseTo(5, 4);

    actual = easeInOutBounce(0.75, 0, 10, 1);
    expect(actual).toBeCloseTo(8.8281, 4);

    actual = easeInOutBounce(1, 0, 10, 1);
    expect(actual).toBeCloseTo(10, 4);
  });

  it('Should ease in cubic.', () => {
    let actual = easeInCubic(0, 0, 10, 1);
    expect(actual).toBeCloseTo(0, 4);

    actual = easeInCubic(0.25, 0, 10, 1);
    expect(actual).toBeCloseTo(0.1562, 4);

    actual = easeInCubic(0.5, 0, 10, 1);
    expect(actual).toBeCloseTo(1.25, 4);

    actual = easeInCubic(0.75, 0, 10, 1);
    expect(actual).toBeCloseTo(4.2187, 4);

    actual = easeInCubic(1, 0, 10, 1);
    expect(actual).toBeCloseTo(10, 4);
  });

  it('Should ease out cubic.', () => {
    let actual = easeOutCubic(0, 0, 10, 1);
    expect(actual).toBeCloseTo(0, 4);

    actual = easeOutCubic(0.25, 0, 10, 1);
    expect(actual).toBeCloseTo(5.7812, 4);

    actual = easeOutCubic(0.5, 0, 10, 1);
    expect(actual).toBeCloseTo(8.75, 4);

    actual = easeOutCubic(0.75, 0, 10, 1);
    expect(actual).toBeCloseTo(9.8437, 4);

    actual = easeOutCubic(1, 0, 10, 1);
    expect(actual).toBeCloseTo(10, 4);
  });

  it('Should ease in out cubic.', () => {
    let actual = easeInOutCubic(0, 0, 10, 1);
    expect(actual).toBeCloseTo(0, 4);

    actual = easeInOutCubic(0.25, 0, 10, 1);
    expect(actual).toBeCloseTo(0.625, 4);

    actual = easeInOutCubic(0.5, 0, 10, 1);
    expect(actual).toBeCloseTo(5, 4);

    actual = easeInOutCubic(0.75, 0, 10, 1);
    expect(actual).toBeCloseTo(9.375, 4);

    actual = easeInOutCubic(1, 0, 10, 1);
    expect(actual).toBeCloseTo(10, 4);
  });
});
