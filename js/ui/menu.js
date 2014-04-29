var Menu = Class.extend({
    init: function (defaultOctave) {
        this.group = game.add.group();
        this.scores;
        this.octaves;
        this.tempo;
        this.defaultOctave = defaultOctave;

        this.draw();
        this.show();
    }

    , draw: function () {
        var bg = this.group.create(game.width / 2, game.height / 2, 'popup_bg');
        bg.anchor.setTo(0.5, 0.5);

        var heading = game.add.text(game.width / 2, 60, 'FortaNota', {font: "50px Arial", fill: "#fff"});
        heading.anchor.setTo(0.5, 0);
        this.group.add(heading);

        // scoresList
        var scoreX = 280;
        var scoreY = 180;
        var lineHeight = 30;
        var description = game.add.text(scoreX, scoreY, 'Song: ' + songData.name, { font: "20px Arial", fill: "#333" });
        this.group.add(description);
//        this.scores = new List(scoreX, scoreY, lineHeight, CONFIG.scores);
//        this.group.add( this.scores.group );

        // octavesList
        var scoreX = 530;
        var octaveText = game.add.text(scoreX, scoreY - 30, 'Select Octave', { font: "20px Arial", fill: "#333" });
        this.group.add(octaveText);
        var octavesList = [
            {title: 2},
            {title: 3},
            {title: 4},
            {title: 5}
        ];
        this.octaves = new List(scoreX, scoreY, lineHeight, octavesList, this.defaultOctave);
        this.group.add(this.octaves.group);

        var scoreX = 280;
        var scoreY = 240;
        // value, step, min, max
        this.tempo = new Range(scoreX, scoreY, 120);
        this.group.add(this.tempo.group);


        var play = game.add.button(game.width / 2, 400, 'pauseButton', this.startGame, this, 1, 1, 1);
        play.anchor.setTo(0.5, 0.5);
        this.group.add(play);




        
        var measureText = game.add.text(game.width/2+17, 307, 'Set background noise', {font: "16px Arial", fill: "#333"});
        this.group.add(measureText);
        
        var bgMeasure = game.add.button(game.width/2+200, 315, 'noiseButton', this.measureNoise, this, 1, 1, 1);
        bgMeasure.anchor.setTo (0.5, 0.5);
        this.group.add(bgMeasure);

    }

    , startGame: function () {
//        Controller.startGame( this.scores.getSelected() );
        console.log('octave: ' + this.octaves.getSelected(), 'tempo: ' + this.tempo.getSelected());
        // save user selected octave
        db.set('octave', this.octaves.getSelected());
        Controller.startGame(this.octaves.getSelected(), this.tempo.getSelected());
        this.hide();
    }

    , measureNoise: function(){
        if (!mainFreq)return;
        else{
            thresholdSilence=0;
            var collect = setInterval(function(){collectNoise();}, 50);
            setTimeout(function(){clearInterval(collect);}, 4050);
            setTimeout(function(){thresholdSilence/=80;},4055); console.log(thresholdSilence);            
        }         
    }, toggle: function () {

    }, show: function () {
        this.group.x = -game.width;
        game.add.tween(this.group).to({x: 0}, 300).start();
    }, hide: function () {
        var tween = game.add.tween(this.group).to({x: game.width}, 300).start();
        tween.onComplete.add(this.destroy, this);
    }

    , destroy: function () {
        // TODO destroy nested groups. Something when you try to do it in a regular way
//        this.group.destroy(true);
        if(this.octaves){
            this.octaves.destroy(true);
            this.octaves = null;
        }

        if(this.tempo){
            this.tempo.destroy(true);
            this.tempo = null;
        }

        if(this.group){
            this.group.destroy(true);
            this.group = null;
        }
    }
})