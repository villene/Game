var prevFreq = 0;
var Score = Class.extend({
    init: function (midi, note, oct, step, bps, nr, text, freqGen) {
        this.midi = midi;
        this.note = note;
        this.oct = oct;
        this.step = step;
        this.bps = bps;
        this.nr = nr;
        this.text = text;
        this.accuracyArr = [];
        this.accuracy = false;
        this.frequency = freqGen;

        this.sprite = game.add.sprite(0, 0, 'heart');
        this.sprite.anchor.setTo(0, 0.5);
        this.sprite.scale.x = 1;
        this.sprite.scale.y = 1;

        var style = { font: "18px Arial", fill: "#ff0044", align: "center"};
        this.lyric = game.add.text(220, 450, this.text, style);
        this.lyric.anchor.setTo(0.5, 0.5);

        this.draw(0);
    }, draw: function (time) {
        var deltaX = Math.round((time / 1000) * this.bps * CONFIG.noteWidth);
        var x = CONFIG.noteWidth * this.nr - deltaX;
        var y = game.height - (this.midi - CONFIG.bottomMidi) * CONFIG.lineHeight;
        this.sprite.x = x;
        this.sprite.y = y;

        this.lyric.x = x + 220;
        
        if (this.sprite.x===5){            
            this.generateSound(this.frequency);
        }
    },generateSound: function (frequency){
        oscillator.frequency.value=frequency;                  
    },checkAccuracyUnit: function (birdMidi) {
        var isAccurate = this.midi === Math.round(birdMidi) ? true : false;
        this.accuracyArr.push(isAccurate);
    }, checkAccuracy: function () {
        if (this.accuracy !== false) {
            return;
        }

        var accurateSamples = 0;
        for (var i = 0, l = this.accuracyArr.length; i < l; i++) {
            if (this.accuracyArr[i] === true) {
                accurateSamples++;
            }
        }
        this.accuracy = Math.round(accurateSamples / this.accuracyArr.length * 100);

//        console.log(this.accuracy, accurateSamples, this.accuracyArr[0]);

        if (this.accuracy >= CONFIG.accuracy) {
            UI.points.add(1);
            this.destroy();
        }
//        console.log(this.accuracy + '%');

        return this.accuracy;
    }, destroy: function () {
        this.sprite.destroy(true);
    }


})