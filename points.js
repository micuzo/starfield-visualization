/**
 * Data pertaining to the stars on the canvas.
 * @typedef {Object} Star
 * @property {Vector2D} startPos - The starting position of the star.
 * @property {Vector2D} direction - The direction of the star's movement.
 * @property {number} speed - The speed of the star.
 * @property {number} startPhase - The phase of the star's animation.
 * @property {number} duration - The duration of the star's effect.
 * @property {number} size - The size of the star.
 */

/**
 * Represents a 2-Dimensional Vector.
 * @class
 */
class Vector2D {
    #x;
    #y;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    get x() { return this.#x; }
    get y() { return this.#y; }

    /**
     * @param {Vector2D} v - Vector to add.
     * @returns {Vector2D} 
     */
    add= (v) => {
        return new Vector2D(
            this.#x + v.#x,
            this.#y + v.#y
        );
    }

    /**
     * @param {number} s - Scalar to multiply by.
     * @returns {Vector2D} 
     */
    multiplyByScalar = (s) => {
        return new Vector2D(
            this.#x * s,
            this.#y * s
        );
    }
}