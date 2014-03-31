var Bird = Class.extend({
    init: function (midi) {
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
        this.midi = midi;
        this.move();
    }

    , move: function () {
        this.sprite.y = game.height - (this.midi - CONFIG.bottomMidi) * CONFIG.lineHeight;
        console.log();
    }

    , alpha: function (alpha) {

    }

    , destroy: function () {
        this.sprite.destroy(true);
    }
})