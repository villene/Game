var Triad = Class.extend({
    init: function(rootNote){
        this.hertzList = [110, 220, 440, 480];

//        this.generateOscillator();
//        this.play(0);
    }

    , play: function(key){
        if(key >= this.hertzList.length){
            this.destroy();
        }

//        oscillator.frequency.value = this.hertzList[key];

        var self = this;
        setTimeout(function(){
            key++;
            self.play(key);
        }, 500);
    }

    , destroy: function(){
//        oscillator.frequency.value = 0;
//        this.oscillator.disconnect();
        sound.midi.pause();
    }

})