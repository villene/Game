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

    , checkAccuracyUnit: function(birdMidi){
        var isAccurate = this.midi === Math.round(birdMidi) ? true : false;
        this.accuracyArr.push( isAccurate );
    }

    , checkAccuracy: function(){
        if(this.accuracy !== false){
            return;
        }

        var accurateSamples = 0;
        for(var i= 0, l=this.accuracyArr.length; i<l; i++){
            if(this.accuracyArr[i] === true){
                accurateSamples++;
            }
        }
        this.accuracy = Math.round( accurateSamples/this.accuracyArr.length * 100 );

//        console.log(this.accuracy, accurateSamples, this.accuracyArr[0]);

        if(this.accuracy >= CONFIG.accuracy){
            UI.points.add(1);
            this.destroy();
        }
        console.log(this.accuracy + '%');

        return this.accuracy;
    }

    , destroy: function(){
        this.sprite.destroy(true);
    }


})