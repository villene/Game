var Score = Class.extend({
    init: function(midi, note, oct, step, bps, nr){
        this.midi = midi;
        this.note = note;
        this.oct = oct;
        this.step = step;
        this.bps = bps;
        this.nr = nr;
        this.accuracyArr = [];
        this.accuracy = false;

        this.sprite = game.add.sprite(0, 0, 'banana');
        this.sprite.anchor.setTo(0, 0.5);
        this.sprite.scale.x = 1;
        this.sprite.scale.y = 1;

        this.draw(0);
    }

    , draw: function(time){
        var deltaX = Math.round((time/1000) * this.bps * CONFIG.noteWidth);
        var x = CONFIG.noteWidth * this.nr - deltaX;
        var y = game.height - (this.midi - CONFIG.bottomMidi) * CONFIG.lineHeight;
        this.sprite.x = x;
        this.sprite.y = y;
    }

    , checkAccuracy: function(birdMidi){
        var isAccurate = this.midi === Math.round(birdMidi) ? true : false;
        this.accuracyArr.push( isAccurate );
    }


})