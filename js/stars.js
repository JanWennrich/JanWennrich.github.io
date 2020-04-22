/**
 * Inspired by a codepen from Fur Dworetzky:
 * https://codepen.io/furdworetzky/pen/yNKOBm
 */
(function () {
    var Canvas = document.getElementById('stars');
    var Context = Canvas.getContext('2d');
    var width = Canvas.width = window.innerWidth;
    var height = Canvas.height = window.innerHeight;
    var particleCount = 100;
    var particles = [];

    function init() {
        for (var i = 0; i < particleCount; i++) {
            createParticle();
        }
    }

    function createParticle() {
        var newParticle = new Particle();
        newParticle.initialize();
        particles.push(newParticle);
    }

    function Particle() {
        this.initialize = function() {
            this.x = Math.random() * width;
            this.y = Math.random() * height + height;
            this.v = 5 + Math.random() * 5;
            this.s = 2 + Math.random() * 5;
        }

        this.update = async function () {
            this.y -= this.v * 0.15;
            if (this.isOutOfBounds()) {
                this.initialize();
            }

            Context.fillRect(this.x, this.y, this.s, this.s);
            Context.fillStyle = "#b6b6b6";
            Context.fill();
        }

        this.isOutOfBounds = function () {
            return ((this.x < 0) || (this.x > width) || (this.y < 0) || (this.y > height));
        }
    }

    function render() {
        Context.clearRect(0, 0, width, height);
        for (var i = 0; i < particles.length; i++) {
            particles[i].update();
        }
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
