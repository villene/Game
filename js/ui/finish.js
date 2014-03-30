var Finish = Class.extend({
    init: function () {
        this.group = game.add.group();

        this.draw();
        this.show();
    }

    , draw: function () {
        var style = { font: "48px Arial", fill: "#fff", align: "center", stroke: "#333", strokeThickness: 8 };
        var text = 'CONGRATULATIONS!\n Your score is ' + UI.points.get() + '\n out of ' + sheet.getScoreCount();
        this.sprite = game.add.text(game.width / 2, game.height / 2, text, style);
        this.sprite.anchor.setTo(0.5, 0.5);
        this.group.add(this.sprite);

        var play = game.add.button(game.width / 2, 400, 'pauseButton', this.hide, this, 1, 1, 1);
        play.anchor.setTo(0.5, 0.5);
        this.group.add(play);
    }

    , show: function () {
        this.group.x = -game.width;
        game.add.tween(this.group).to({ x: 0 }, 300).start();
    }

    , hide: function () {
        var tween = game.add.tween(this.group).to({ x: game.width }, 300).start();
        tween.onComplete.add(this.destroy, this);
        Controller.restartGame();
    }

    , destroy: function () {
        this.group.destroy(true);
    }
})