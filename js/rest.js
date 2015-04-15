/*
 Empty object which uses the same interface what is used for new Score()
 */
var Rest = Class.extend({
    init: function (duration) { 
    	this.duration = duration;
    }
    , draw: function () { }
    , checkAccuracyUnit: function () { }
    , checkAccuracy: function () { }

    , playNote: function(){
//        oscillator.frequency.value = 0;
        sound.midi.pause();
    }
})