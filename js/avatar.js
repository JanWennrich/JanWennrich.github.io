import Typed from '/js/typed.min.js';

"use strict";

class TalkingAvatar{
    Avatar = document.getElementById('avatar');
    Writer = new Typed('#skills-typewriter', {shuffle: true, loop: true});

    shouldTalk  = false;

    // Is the typewriter currently typing?
    isTyping    = false;

    // Texts the typewriter still has to type
    // TODO: read texts from HTML (better SEO)
    textsToType = [];

    async startTalking()
    {
        this.shouldTalk = true;
        this.talk();
    }

    talk()
    {
        this.Avatar.classList.add('is-talking');

        const rand = Math.round(Math.random() * 100) + 150;
        setTimeout(() => {
            this.Avatar.classList.remove('is-talking');

            if (!this.shouldTalk) {
                return;
            }

            setTimeout(() => {
                if (this.shouldTalk) {
                    this.talk();
                }
            }, rand);
        }, rand);
    }

    async stopTalking()
    {
        this.shouldTalk = false;
        this.Avatar.classList.remove('is-talking');
    }


    talkWords(speed = 100)
    {
        this.isTyping = true;

        if (this.textsToType.length === 0) {
            // clone from the default texts
            this.textsToType = [...texts];

            // This .sort call kind of randomizes the array (source: https://stackoverflow.com/a/18650169)
            this.textsToType.sort(() => 0.5 - Math.random());
        }

        // Pick a random text to type
        let text = this.textsToType.pop();

        this.Writer.erase(999999, speed / 2)
              .callBack(this.startTalking)
              .write(text, {speed: speed})
              .callBack(this.stopTalking)
              .wait(speed * 7)
              .callBack(() => {this.isTyping = false});
    }
}

export default TalkingAvatar;

(() => {
    const MyAvatar = new TalkingAvatar();

    setInterval(() => {
        if (!MyAvatar.isTyping) {
            MyAvatar.talkWords();
        }
    }, 250);
})()