/**
 * @type {Canvas}
 */
let canvas;

//-- Params
const NUM_STARS = 1200;
const MAX_SPEED = 2;
const MIN_DURATION = 5;
const MAX_DURATION = 20;
const MAX_SIZE = 1;
const MAX_PARALLAX_SPEED_MODIF = 2;
const PARALLAX_SPEED_CHANGE_RATE = 5;
const BG_COLOR = '#020008';

const createStars = () => {
    const stars = [];
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
    return stars;
}

/**
 * Renders the starfield™.
 * @param {number} t - Time elapsed since the start of execution.
 * @param {CanvasRenderingContext2D} ctx - The rendering context for drawing on the canvas.
 */
const renderScene = (canvas, stars) => {
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
}

window.onload = () => {
    canvas = new Canvas();
    const startScene = () => {
        canvas.updateDimensions();
        canvas.startAnimation(renderScene, createStars());
    }
    window.onresize = startScene;
    startScene();
};