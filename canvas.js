class Canvas {
    #canvas;
    #ctx;
    #startTime;
    #requestID;

    constructor() {
        this.#canvas = document.querySelector('canvas');
        this.#ctx = this.#canvas.getContext('2d');
        this.#startTime = Date.now();
    }

    get ctx() { return this.#ctx; }
    get curTime() { return (Date.now() - this.#startTime) / 1000; }
    get width() { return this.#canvas.width; }
    get height() { return this.#canvas.height; }

    updateDimensions = () => {
        this.#canvas.width = window.innerWidth;
        this.#canvas.height = window.innerHeight;
    }
}