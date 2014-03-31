var Sound = Class.extend({
    init: function(){
        this.mute = false;
        this.music = null;
        this.button = null;
        this.x = 200;
        this.y = 60;
    }

    , play: function(sound){
        if(this.mute) return;
        game.sound.play(sound);
    }

    , playMusic: function(){
        if(this.mute || this.music) return;
        this.music = game.add.audio('music', 1, true);
        this.music.play('',0,1,true);
    }

    , toggle: function(){
        this.mute = this.mute ? false : true;
        this.mute ? this.music.pause() : this.music.resume();
        this.destroy();
        this.draw();
//        cursor.bringToTop();
    }

    , draw: function(x, y){
        if(x) this.x = x;
        if(y) this.y = y;
        var frame = this.mute ? 1 : 0;
        this.button = game.add.button(this.x, this.y, 'sound', this.toggle, this, frame, frame, frame);
        this.button.anchor.setTo(0.5, 0.5);
//        blurpEffect(this.button);
    }

    , generateOscillator: function(){
        window.oscillator = audioContext.createOscillator();
        oscillator.type = 0; // Sine wave
        oscillator.frequency.value = 0; // Default frequency in hertz
        oscillator.connect(audioContext.destination); // Connect sound source 1 to output
//        oscillator.noteOn(0); // Play sound source 1 instantly
        oscillator.start(0);
    }

    , oscillatorPause: function(){
        oscillator.frequency.value = 0;
    }

    , oscillatorPlay: function(freq){
        oscillator.frequency.value = freq;
    }

    , destroy: function(){
        if(this.button){
            this.button.destroy(true);
            this.button = null;
        }
    }
})