var Bird = Class.extend({
    init: function(){
        this.sprite = false;
        this.draw();
    }

    , draw: function(){
        this.sprite = game.add.sprite(50, game.height/2, 'bird');
        this.sprite.anchor.setTo(0.5, 0.5);
        this.sprite.scale.x = 0.2;
        this.sprite.scale.y = 0.2;
    }

    , onKeyPressed: function(key){
        var deltaY = 5;
        var newY = this.sprite.y;
        if(key == Phaser.Keyboard.UP){
            newY -=  deltaY;
        }
        if(key == Phaser.Keyboard.DOWN){
            newY += deltaY;
        }

        this.move(newY);
    }

    , move: function(y){
        this.sprite.y = y;
    }

    , alpha: function(alpha){

    }
})