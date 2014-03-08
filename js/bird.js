var Bird = Class.extend({
    init: function(){
        this.midi = 48;
        this.sprite = false;
        this.draw();
        this.move();
    }

    , draw: function(){
        this.sprite = game.add.sprite(200, game.height/2, 'bird');
        this.sprite.anchor.setTo(1, 0.5);
        this.sprite.scale.x = 1;
        this.sprite.scale.y = 1;
    }

    , onKeyPressed: function(key){
        var deltaMidi = 0.1;
        var newMidi = this.midi;
        if(key == Phaser.Keyboard.UP){
            newMidi +=  deltaMidi;
        }
        if(key == Phaser.Keyboard.DOWN){
            newMidi -= deltaMidi;
        }

        this.setMidi(newMidi);
    }

    , setMidi: function(midi){
        this.midi = midi;
        this.move();
    }

    , move: function(){
        this.sprite.y = game.height - (this.midi - CONFIG.bottomMidi) * CONFIG.lineHeight;
        console.log();
    }

    , alpha: function(alpha){

    }
})