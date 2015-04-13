var Bird = Class.extend({
    init: function (midi) {
        this.prevMidi = midi;
        this.midi = midi;
        this.sprite = false;
        this.draw();
        this.move();
    }

    , draw: function () {
        this.sprite = game.add.sprite(200, game.height / 2, 'bird_eat');
        this.sprite.anchor.setTo(1, 0.5);
        this.sprite.scale.x = 1;
        this.sprite.scale.y = 1;

        this.sprite.animations.add('eat');
        this.sprite.animations.play('eat', 8, true);

        this.pitchLayer = game.add.graphics(0, 0);
        this.pitchLayer.lineStyle(1, 0xff0000, 1);
        this.pitchLayer.moveTo(0,100);
        this.count = 0;
    }

    , onKeyPressed: function (key) {
        var deltaMidi = 0.1;
        var newMidi = this.midi;
        if (key == Phaser.Keyboard.UP) {
            newMidi += deltaMidi;
        }
        if (key == Phaser.Keyboard.DOWN) {
            newMidi -= deltaMidi;
        }

        this.setMidi(newMidi);
    }

    , setMidi: function (midi) {
        this.prevMidi = this.midi;
        this.midi = midi;
        this.move();
    }

    , move: function () {
        this.sprite.y = game.height - (this.midi - CONFIG.bottomMidi) * CONFIG.lineHeight;
        // console.log();
    }

    , alpha: function (alpha) {

    }

    , drawPitch: function(){          
        // console.log(this.count, this.midi);  
        this.pitchLayer.x = -this.count + sheet.group.x;  
        this.count++; 

        if(this.midi > CONFIG.upMidi || this.midi < CONFIG.bottomMidi){
            return; // don't draw pitch out of visible range
        }
        if(Math.abs(this.prevMidi - this.midi) > 3){
            // var midi = this.prevMidi > this.midi ? this.midi + 1 : this.midi - 1;
            var midi = this.midi;
            var y = game.height - (midi - CONFIG.bottomMidi) * CONFIG.lineHeight;
            this.pitchLayer.moveTo(this.count-1, y);
        }
        var y = game.height - (this.midi - CONFIG.bottomMidi) * CONFIG.lineHeight; 
        this.pitchLayer.lineTo(this.count, y);            
          
    }

    , destroy: function () {
        this.sprite.destroy(true);
        this.sprite = null;

        this.pitchLayer.destroy();
        this.pitchLayer = null;
    }
})