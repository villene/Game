var Home = Class.extend({
    init: function(x, y){
        this.draw(x, y);
    }

    , draw: function(x, y){
        this.sprite = game.add.button(x, y, 'homeButton', this.home, this);
        this.sprite.anchor.setTo(0.5, 0.5);
    }

    , home: function(){
        Controller.lobby();
    }

    , getPointer: function(){
        return this.sprite;
    }
})