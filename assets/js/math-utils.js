/**
 * Two times pi
 */
export const TWO_PI = 2 * Math.PI;

/**
 * Convert Cartesian coordinates to polar coordinates
 * @param { number } x the input x component
 * @param { number } y the input y component
 * @return {{ r: number, a: number }} r is the radius and a is the angle
 */
export function toPolar(x, y) {
  return {
    r: Math.hypot(x, y),
    a: Math.atan2(y, x),
  };
}

/**
 * Convert polar coordinates to Cartesian coordinates
 * @param { number } r the input radius
 * @param { number } a the input angle
 * @return {{ x: number, y: number }} the x and y components
 */
export function toCartesian(r, a) {
  return {
    x: r * Math.cos(a),
    y: r * Math.sin(a),
  }
}

/**
 * Calculate the distance between two points
 * @param { number } x1 
 * @param { number } y1 
 * @param { number } x2 
 * @param { number } y2 
 */
export function dist(x1, y1, x2, y2) {
  return Math.hypot(y2 - y1, x2 - x1);
}

/**
 * Calculate the square of the distance between two points
 * @param { number } x1 
 * @param { number } y1 
 * @param { number } x2 
 * @param { number } y2 
 */
export function dist2(x1, y1, x2, y2) {
  const dx = x2 - x1, dy = y2 - y1;
  return dx * dx + dy * dy;
}

/**
 * Get the minimum and maximum values in a list
 * @param { number[] } list the list of values
 * @return {{ min: number, max: number }} an object containing the minimum and maximum values
 */
export function getBounds(list) {
  if (!list) return { min: undefined, max: undefined };
  
  let min, max;
  list.forEach((val) => {
    min = (!min || val < min) ? (val) : (min);
    max = (!max || val > max) ? (val) : (max);
  });

  return { min, max }
}

/**
 * Scale a list of numbers such that the maximum difference of any two numbers is 1,
 * and then shift all the values to be centered around 0
 * @param { number[] } list a list of numbers
 * @return { number[] } the normalized list
 */
export function normalize(list = []) {
  if (list.length === 0) return [];
  if (list.length === 1) return [ 0 ];

  const { min, max } = getBounds(list);
  const range = max - min;
  const shift = (max + min) / 2;

  if (range) {
    return list.map((val) => {
      return (val - shift) / range;
    });
  }

  return list.map(() => {
    return 0;
  });
}

/**
 * Add a constant to all the values in a list
 * @param { number[] } list a list of numbers
 * @param { number } shiftVal the value to add
 * @return { number[] } the normalized list
 */
export function shift(list, shiftVal = 0) {
  return list.map((val) => {
    return val + shiftVal;
  });
}

/**
 * Shift the center of all the values in a list
 * @param { number[] } list a list of numbers
 * @param { number } newCenter the desired center
 * @return { number[] } the normalized list
 */
export function shiftCenter(list, newCenter = 0) {
  if (list.length === 0) return [];
  if (list.length === 1) return [ newCenter ];

  const { min, max } = getBounds(list);
  const shiftVal = newCenter - (max + min) / 2;
  return shift(list, -shiftVal);
}

/**
 * Scale a list of numbers by a constant scalar value
 * @param { number[] } list the list of nubmers to scale
 * @param { number } lambda the constant by which to scale
 */
export function scale(list = [], lambda) {
  if (!list) return [];
  return list.map((val) => {
    return val * lambda;
  });
}

/**
 * Calculate the Discrete Fourier Transform of an input function
 * @param { number[] } x a list of equidistant samples of the input function
 * @returns {{ re: number, im: number }[] } an array of complex numbers, where re
 * is the real component and im is the imaginary component
 */
export function dft(x = []) {
  const X = [];
  const N = x.length;
  const phi_0 = TWO_PI / N;
  for (let k = 0; k < N; k = k + 1) {
    let re = 0, im = 0;
    const phi_1 = phi_0 * k;
    for (let n = 0; n < N; n = n + 1) {
      const phi_2 = phi_1 * n;
      re += x[n] * Math.cos(phi_2);
      im -= x[n] * Math.sin(phi_2);
    }

    X[k] = { re: re / N, im: im / N };
  }

  return X;
}