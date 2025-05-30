/**
 * A class representing a size.
 * A size is a two-dimensional object that contains a width and a height.
 */
export class Size {
  /**
   * The width of the size.
   */
  width: number;

  /**
   * The height of the size.
   */
  height: number;

  /**
   * Get the aspect ratio of the size.
   * @returns The aspect ratio.
   */
  get aspectRatio(): number {
    return this.width / this.height;
  }

  /**
   * Get the area of the size.
   * @returns The area.
   */
  get area(): number {
    return this.width * this.height;
  }

  /**
   * Create a new size.
   * @param width - The width of the size.
   * @param height - The height of the size.
   */
  constructor(width = 0, height = 0) {
    this.width = width;
    this.height = height;
  }

  /**
   * Update the width and height of the size.
   * @param width - The new width.
   * @param height - The new height.
   */
  set(width: number, height: number): void {
    this.width = width;
    this.height = height;
  }

  /**
   * Get a string representation of the size.
   * @returns The string representation of the size.
   */
  toString(): string {
    return `Size( width: ${this.width}, height: ${this.height} )`;
  }
}
