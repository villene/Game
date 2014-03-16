var Menu = Class.extend({
    init: function (defaultOctave) {
        this.group = game.add.group();
        this.scores;
        this.octaves;
        this.defaultOctave = defaultOctave;

        this.draw();
        this.show();
    }, draw: function () {
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

        var play = game.add.button(game.width / 2, 400, 'pauseButton', this.startGame, this, 1, 1, 1);
        play.anchor.setTo(0.5, 0.5);
        this.group.add(play);

    }, startGame: function () {
//        Controller.startGame( this.scores.getSelected() );
        Controller.startGame(this.octaves.getSelected());
        this.hide();
    }, toggle: function () {

    }, show: function () {
        this.group.x = -game.width;
        game.add.tween(this.group).to({x: 0}, 1000).start();
    }, hide: function () {
        var tween = game.add.tween(this.group).to({x: game.width}, 1000).start();
        tween.onComplete.add(this.destroy, this);
    }, destroy: function () {
        // TODO destroy nested groups. Something when you try to do it in a regular way
//        this.group.destroy(true);
    }
})