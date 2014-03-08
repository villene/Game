var UI = {};

var Pause = Class.extend({
    init: function(){
        this.state = 'play';
        this.sprite = false;
        this.draw();
    }

    , draw: function(){
        this.sprite = game.add.button(20, 20, 'pauseButton', this.toggle, this, 1, 1, 1);
    }

    , toggle: function(){
        score[this.state]();

        this.state = this.state == 'play' ? 'pause' : 'play';
        var frame = this.state == 'pause' ? 0 : 1;
        this.sprite.setFrames(frame, frame, frame);

    }

    , destroy: function(){
        this.sprite.destroy(true);
    }
})