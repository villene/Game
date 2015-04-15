var Replay = Class.extend({
    init: function(x, y){
        this.draw(x, y);
    }

    , draw: function(x, y){
        this.sprite = game.add.button(x, y, 'replayButton', this.replay, this);
        this.sprite.anchor.setTo(0.5, 0.5);
    }

    , replay: function(){
        Controller.replayGame();
    }

    , getPointer: function(){
        return this.sprite;
    }
})