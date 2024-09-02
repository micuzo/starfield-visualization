/**
 * @type {Canvas}
 */
let canvas;

/**
 * @type {Star[]}
 */
let stars = [];

/**
 * Renders the starfield™.
 * @param {number} t - Time elapsed since the start of execution.
 * @param {CanvasRenderingContext2D} ctx - The rendering context for drawing on the canvas.
 */
const renderScene = () => {
    const t = canvas.curTime;
    const ctx = canvas.ctx;

    // Background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    stars.forEach((star) => {
        const curPhase = (star.startPhase + t) % star.duration;
        const displaceMentVector = new Vector2D(
            star.direction.x,
            star.direction.y
        ).multiplyByScalar(
            curPhase * star.speed
        );
        const newPos = star.startPos.add(displaceMentVector);

        /**
         * Alpha value of a star based on its proximity to the halfway point of its cycle: [0...1...0].
         */
        const alpha = (() => {
            const phasePercentage = curPhase / star.duration;
            const distanceToMidPhase = Math.abs(phasePercentage - 0.5);
            const alphaMaxedAtEdges = distanceToMidPhase / 0.5;
            return 1 - alphaMaxedAtEdges;
        })();
        
        const starColor = `rgba(255, 255, 255, ${alpha})`
        ctx.fillStyle = starColor;
        ctx.strokeStyle = starColor;        
        ctx.beginPath();
        ctx.arc(newPos.x, newPos.y, star.size, 0, Math.PI * 2);
        ctx.fill();
    });

    window.requestAnimationFrame(renderScene);
}

window.onload = () => {
    canvas = new Canvas();
    canvas.updateDimensions();
    
    // Create stars
    for (let i = 0; i < NUM_STARS; i++){

        const startPos = new Vector2D(
            250, 300
        );
        // Direction as unit vector
        const direction = (() => {
            return new Vector2D(
                1,
                0
            );
        })();

        const sizePercent = Math.random(); 
        const size = 50;
        
        const speedParallaxModif = Math.pow(sizePercent, PARALLAX_SPEED_CHANGE_RATE) * MAX_PARALLAX_SPEED_MODIF;
        const speed = 120;
        
        const duration = 5;
        const startPhase = 0;

        stars.push({
            startPos,
            direction,
            speed,
            startPhase,
            duration,
            size,
        });
    }
    
    window.onresize = canvas.updateDimensions;
    window.requestAnimationFrame(renderScene);
};