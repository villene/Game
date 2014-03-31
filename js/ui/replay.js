var Replay = Class.extend({
    init: function(x, y){
        this.draw(x, y);
    }

    , draw: function(x, y){
        this.sprite = game.add.button(x, y, 'replayButton', this.replay, this);
    }

    , replay: function(){
        Controller.replayGame();
    }

    , getPointer: function(){
        return this.sprite;
    }
})