/**
 * Inspired by a codepen from Fur Dworetzky:
 * https://codepen.io/furdworetzky/pen/yNKOBm
 */
class Stars {
    constructor(Canvas, particleCount)
    {
        this.Canvas = Canvas;
        this.Context = this.Canvas.getContext('2d');
        this.particleCount = particleCount;
        this.particles = [];

        this.isStopped = false;

        this.width = this.Canvas.width = window.innerWidth;
        this.height = this.Canvas.height = window.innerHeight;

        for (let i = 0; i < this.particleCount; i++) {
            this.particles[i] = new Particle(this.getWidth(), this.getHeight());
        }

        if (this.isStopped) {
            return;
        }

        this.render();
    }

    getWidth()
    {
        return this.width;
    }

    getHeight()
    {
        return this.height;
    }

    render()
    {
        if (this.isStopped) {
            return;
        }

        this.Context.clearRect(0, 0, this.getWidth(), this.getHeight());

        this.particles.forEach(Particle => {
            Particle.update()

            if (Particle.isOutOfBounds(this.getWidth())) {
                Particle.reset(this.getWidth(), this.getHeight());
            }

            Particle.draw(this.Context);
        });

        requestAnimationFrame(this.render.bind(this));
    }

    startMoving()
    {
        this.isStopped = false;

        this.render();
    }

    stopMoving()
    {
        this.isStopped = true;
    }
}


class Particle {
    constructor(canvasWidth, canvasHeight)
    {
        this.reset(canvasWidth, canvasHeight);

        this.x += canvasWidth;
    }

    reset(canvasWidth, canvasHeight)
    {
        this.x = Math.random() * canvasWidth - canvasWidth;

        this.y = Math.random() * canvasHeight;

        this.velocity = Math.random() * 0.3;
        this.size = 2 + Math.random() * 4;
        this.color = "#b6b6b6";
    }

    draw(Context)
    {
        Context.fillRect(this.x, this.y, this.size, this.size);
        Context.fillStyle = this.color;
    }

    async update()
    {
        this.x += this.velocity;
    }

    isOutOfBounds(canvasWidth)
    {
        return this.x > canvasWidth;
    }
}


var MyStars = new Stars(document.getElementById('stars'), 80);
