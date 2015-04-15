var Sound = Class.extend({
    init: function(){
        this.mute = false;
        this.music = null;
        this.button = null;
        this.x = 200;
        this.y = 60;

        this.metronome = new Metronome();
        this.midi = new Midi();
    }

    , play: function(sound){
        if(this.mute) return;
        game.sound.play(sound);
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

    , createOscillator: function(){
        this.oscillator = new Oscillator();
    }

    , destroy: function(){
        if(this.button){
            this.button.destroy(true);
            this.button = null;
        }
    }
});


var Midi = Class.extend({
    init: function(){
        this.enabled = this.get();

        MIDI.setVolume(0, CONFIG.midiVolume);
    }

    , play: function(midi){
        if(this.enabled){
//            console.log(midi);
            MIDI.noteOn(0, midi, CONFIG.midiVelocity, 0);
            MIDI.noteOff(0, midi, 0.5);
        }

    }

    , pause: function(){
        MIDI.stopAllNotes();
    }

    , get: function(){
        if(db.get('isMusic')){
            var value = db.get('isMusic') === 'true' ? true : false;
        } else {
            var value = true;
            db.set('isMusic', value);
        }
        return value;
    }

    , toggle: function(value){
        db.set('isMusic', value);
        this.enabled = value;

        if(!this.enabled){
            this.pause();
        }
    }
})


var Oscillator = Class.extend({
    init: function(){
        this.enabled = this.get();

        window.oscillator = audioContext.createOscillator();
        oscillator.type = 0; // Sine wave
        oscillator.frequency.value = 0; // Default frequency in hertz
        oscillator.connect(audioContext.destination); // Connect sound source 1 to output
        oscillator.start(0);
    }

    , play: function(freq){
        if(this.enabled){
            oscillator.frequency.value = freq;
        }

    }

    , pause: function(){
        oscillator.frequency.value = 20000;
    }

    , get: function(){
        if(db.get('isMusic')){
            var value = db.get('isMusic') === 'true' ? true : false;
        } else {
            var value = true;
            db.set('isMusic', value);
        }
        return value;
    }

    , toggle: function(value){
        db.set('isMusic', value);
        this.enabled = value;

        if(!this.enabled){
            oscillator.frequency.value = 0;
        }
    }
})


var Metronome = Class.extend({
    init: function(){
        this.enabled = this.get();
    }

    , play: function(){
        if(this.enabled){
            sound.play('metronome');
        }
    }

    , get: function(){
        if(db.get('isMetronome')){
            var value = db.get('isMetronome') === 'true' ? true : false;
        } else {
            var value = true;
            db.set('isMetronome', value);
        }
        return value;
    }

    , toggle: function(value){
        db.set('isMetronome', value);
        this.enabled = value;
    }
})
