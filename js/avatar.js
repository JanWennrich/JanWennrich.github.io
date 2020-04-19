(function () {
    var Avatar     = document.getElementById('avatar'),
        Writer     = new Typewriter('#skills-typewriter', {loop: true}),
        shouldTalk = false;

    async function startTalking()
    {
        shouldTalk = true;
        talk();
    }

    function talk()
    {
        Avatar.classList.add('is-talking');

        var rand = Math.round(Math.random() * 100) + 150;
        setTimeout(function () {
            Avatar.classList.remove('is-talking');

            if (shouldTalk) {
                setTimeout(function () {
                    if (shouldTalk) {
                        talk();
                    }
                }, rand);
            }
        }, rand);
    }

    async function stopTalking()
    {
        shouldTalk = false;
        Avatar.classList.remove('is-talking');
    }


    function run()
    {
        var texts = [
            'Developer',
            'Project Manager',
            'Bachelor of Computer Science',
            'Problem Solver',
            'Nerd',
            'Linux Lover',
            'CLI Connoisseur',
            'Git Guru'
        ].sort(element => 0.5 - Math.random());
        // .sort kind of randomizes the array (source: https://stackoverflow.com/a/18650169)

        texts.forEach(text => {
            Writer.callFunction(startTalking)
                .typeString(text)
                .callFunction(stopTalking)
                .pauseFor(500)
                .deleteAll(45)
                .start();
        });
    }

    run();
})();
