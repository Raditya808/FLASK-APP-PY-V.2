class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 4 + 2;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        // Pastel colors array
        this.colors = [
            'rgba(255, 182, 193, 0.7)', // pink
            'rgba(173, 216, 230, 0.7)', // light blue
            'rgba(144, 238, 144, 0.7)', // light green
            'rgba(255, 218, 185, 0.7)', // peach
            'rgba(221, 160, 221, 0.7)'  // plum
        ];
        this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.size > 0.2) this.size -= 0.05;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initBackground() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    function handleResize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticles(e) {
        const mouseX = e ? e.x : Math.random() * canvas.width;
        const mouseY = e ? e.y : Math.random() * canvas.height;

        for (let i = 0; i < 3; i++) {
            particles.push(new Particle(mouseX, mouseY));
        }
    }

    function animate() {
        // Light background with slight opacity
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add subtle gradient background
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, 'rgba(240, 248, 255, 0.2)');  // Alice blue
        gradient.addColorStop(1, 'rgba(255, 250, 250, 0.2)');  // Snow white
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw(ctx);

            if (particles[i].size <= 0.2) {
                particles.splice(i, 1);
            }
        }

        // Increase particle creation frequency
        if (Math.random() > 0.92) {
            createParticles();
        }

        animationId = requestAnimationFrame(animate);
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', createParticles);
    handleResize();
    animate();

    return () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', createParticles);
    };
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initBackground);