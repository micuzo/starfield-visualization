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
            Math.random() * canvas.width,
            Math.random() * canvas.height
        );
        // Direction as unit vector
        const direction = (() => {
            const theta = Math.random() * 2 * Math.PI;
            
            return new Vector2D(
                Math.cos(theta),
                Math.sin(theta)
            );
        })();

        const sizePercent = Math.random(); 
        const size = sizePercent * MAX_SIZE;
        
        const speedParallaxModif = Math.pow(sizePercent, PARALLAX_SPEED_CHANGE_RATE) * MAX_PARALLAX_SPEED_MODIF;
        const speed = Math.random() * MAX_SPEED * speedParallaxModif;
        
        const duration = MIN_DURATION + Math.random() * (MAX_DURATION - MIN_DURATION);
        const startPhase = Math.random() * duration;

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