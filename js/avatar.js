(() => {
    const Avatar = document.getElementById('avatar'),
          Writer = new TypeWriter('#skills-typewriter', {loop: true});

    let shouldTalk  = false,

        // Is the typewriter currently typing?
        isTyping    = false,

        // Texts the typewriter still has to type
        textsToType = [];

    // Texts the typewriter should type
    const texts = [
        'Web Developer',
        'App Developer',
        'Software Developer',
        'Project Manager',
        'Bachelor of Computer Science',
        'Problem Solver',
        'Nerd',
        'Linux Lover',
        'CLI Connoisseur',
        'Git Guru',
        'PHP Professional',
        'JavaScript Joyrider',
        'SQL Squire'
    ];


    async function startTalking()
    {
        shouldTalk = true;
        talk();
    }

    function talk()
    {
        Avatar.classList.add('is-talking');

        const rand = Math.round(Math.random() * 100) + 150;
        setTimeout(() => {
            Avatar.classList.remove('is-talking');

            if (!shouldTalk) {
                return;
            }

            setTimeout(() => {
                if (shouldTalk) {
                    talk();
                }
            }, rand);
        }, rand);
    }

    async function stopTalking()
    {
        shouldTalk = false;
        Avatar.classList.remove('is-talking');
    }


    function talkWords(speed = 100)
    {
        isTyping = true;

        if (textsToType.length === 0) {
            // clone from the default texts
            textsToType = [...texts];

            // This .sort call kind of randomizes the array (source: https://stackoverflow.com/a/18650169)
            textsToType.sort(element => 0.5 - Math.random());
        }

        // Pick a random text to type
        let text = textsToType.pop();

        Writer.erase(999999, speed / 2)
            .callBack(startTalking)
            .write(text, {speed: speed})
            .callBack(stopTalking)
            .wait(speed * 7)
            .callBack(() => {isTyping = false});
    }

    setInterval(() => {
        if (!isTyping) {
            talkWords();
        }
    }, 250);
})();
