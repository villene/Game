var prevFreq = 0;
var Score = Class.extend({
    init: function (midi, note, oct, step, text, frequency, duration, sequence, sheet) {
        this.midi = midi;
        this.note = note;
        this.oct = oct;
        this.step = step;
        this.text = text;
        this.accuracyArr = [];
        this.accuracy = false;
        this.frequency = frequency;

        this.duration = duration;
        this.sequence = sequence;

        // score 
        this.x = CONFIG.noteWidth * this.sequence;
        this.y = game.height - (this.midi - CONFIG.bottomMidi + 0.5) * CONFIG.lineHeight;
        this.width = this.duration * CONFIG.noteWidth;        
        sheet.scoreLayer.drawRect(this.x, this.y, this.width, CONFIG.lineHeight, 5);

        // text
        var style = { font: "18px Arial", fill: "#ff0044"};
        this.lyric = game.add.text(this.x, game.height-20, this.text, style);
        this.lyric.anchor.setTo(0, 1);
    }

    , draw: function (time, bps) {
        var deltaX = Math.round((time / 1000) * bps * CONFIG.noteWidth);
        var x = this.x - deltaX;
        var y = game.height - (this.midi - CONFIG.bottomMidi) * CONFIG.lineHeight;
        this.lyric.x = x;
    },

    playNote: function (){       
        sound.midi.play(this.midi);
    },

    checkAccuracyUnit: function (birdMidi) {
        var isAccurate = this.midi === Math.round(birdMidi) ? true : false;
        this.accuracyArr.push(isAccurate);
    },

    checkAccuracy: function () {
        if (this.accuracy !== false || this.accuracyArr.length === 0) {
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

        // if (this.accuracy >= CONFIG.accuracy) {
        //     UI.points.add(1, this.duration);
        //     this.destroy();
        // }

        UI.points.draw();

        // console.log(this.accuracy + '%');
        var style = { font: "16px Arial", fill: "#333"};
        // var text = this.accuracy + '%' + '\n' + this.accuracyArr.length;
        var text = this.accuracy + '%';
        var result = game.add.text(this.x, this.y-30, text, style);
        sheet.resultLayer.add(result);
        sheet.scoreLayer.beginFill(red2green(this.accuracy));
        sheet.scoreLayer.drawRect(this.x, this.y, this.width, CONFIG.lineHeight, 5);

        return this.accuracy;
    }

    , destroy: function () {
        // this.sprite.destroy(true);
    }


})