(function () {
    var Avatar     = document.getElementById('avatar'),
        Writer     = new Typewriter('#skills-typewriter', {loop: true}),
        shouldTalk = false;

    function startTalking()
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

    function stopTalking()
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
        ].sort(function () {
            // Kind of randomizes the array (source: https://stackoverflow.com/a/18650169)
            return 0.5 - Math.random()
        });

        texts.forEach(function (text) {
            var words = text.split(' ');

            words.forEach(function (word, index) {
                if (index < words.length - 1) {
                    word += ' ';
                }

                Writer.callFunction(startTalking)
                    .typeString(word + ' ')
                    .callFunction(stopTalking)
                    .start()
            });

            Writer.pauseFor(500)
                .deleteAll(45);
        });
    }

    run();
})();
