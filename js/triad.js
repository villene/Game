var Triad = Class.extend({
    init: function(rootNote){
        this.hertzList = [110, 220, 440, 480];

        this.generateOscillator();
        this.play(0);
    }

    , play: function(key){
        if(key >= this.hertzList.length){
            this.destroy();
        }

        oscillator.frequency.value = this.hertzList[key];
        var self = this;
        setTimeout(function(){
            key++;
            self.play(key);
        }, 1000);
    }

    , generateOscillator: function(){
        window.oscillator = audioContext.createOscillator();
        oscillator.type = 0; // Sine wave
        oscillator.frequency.value = 0; // Default frequency in hertz
        oscillator.connect(audioContext.destination); // Connect sound source 1 to output
        oscillator.start(0);
    }

    , destroy: function(){
        oscillator.disconnect();
    }

})