/**
 * Inspired by a codepen from Fur Dworetzky:
 * https://codepen.io/furdworetzky/pen/yNKOBm
 */
(function () {
    var Canvas = document.getElementById('stars');
    var Context = Canvas.getContext('2d');
    var width = Canvas.width = window.innerWidth;
    var height = Canvas.height = window.innerHeight;
    var particleCount = 80;
    var particles = [];

    function init() {
        for (var i = 0; i < particleCount; i++) {
            createParticle();
        }
    }

    function createParticle() {
        var newParticle = new Particle();
        newParticle.initialize(true);
        particles.push(newParticle);
    }

    function Particle() {
        this.initialize = function(isFirstDraw) {
            this.x = Math.random() * width;

            if (!isFirstDraw) {
                this.x -= width;
            }

            this.y = Math.random() * height;
            this.velocity = Math.random() + 0.75;
            this.size = 2 + Math.random() * 3;
        }

        this.update = async function () {
            this.x += this.velocity;
            if (this.isOutOfBounds()) {
                this.initialize();
            }

            Context.fillRect(this.x, this.y, this.size, this.size);
            Context.fillStyle = "#b6b6b6";
        }

        this.isOutOfBounds = function () {
            return this.x > width;
        }
    }

    function render() {
        Context.clearRect(0, 0, width, height);
        particles.forEach(particle => particle.update());
        requestAnimationFrame(render);
    }

    window.addEventListener('resize', resize);
    function resize() {
        width = Canvas.width = window.innerWidth;
        height = Canvas.height = window.innerHeight;
    }

    init();
    render();
})();
