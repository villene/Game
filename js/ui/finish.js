var Finish = Class.extend({
    init: function () {
        this.group = game.add.group();

        this.draw();
        this.show();
    }

    , draw: function () {
        var style = { font: "48px Arial", fill: "#fff", align: "center", stroke: "#333", strokeThickness: 8 };
        var text = 'CONGRATULATIONS!\n Your have scored ' + UI.points.get() + '%';
        this.sprite = game.add.text(game.width / 2, game.height / 2 - 50, text, style);
        this.sprite.anchor.setTo(0.5, 0.5);
        this.group.add(this.sprite);

//        var play = game.add.button(game.width/7 * 3, 400, 'pauseButton', this.hide, this, 1, 1, 1);
//        play.anchor.setTo(0.5, 0.5);
//        this.group.add(play);

        this.group.add( new Home(game.width/7 * 3, game.height/2+110).getPointer() );

        this.group.add( new Replay(game.width/7 * 4, game.height/2+110).getPointer() );

    }

    , show: function () {
        this.group.x = -game.width;
        game.add.tween(this.group).to({ x: 0 }, 300).start();
    }

    , hide: function () {
        var tween = game.add.tween(this.group).to({ x: game.width }, 300).start();
        tween.onComplete.add(this.destroy, this);
        Controller.lobby();
    }

    , destroy: function () {
        if(this.group){
            this.group.destroy(true);
            this.group = null;
        }

    }
})