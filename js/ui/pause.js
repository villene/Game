var UI = {};

var Pause = Class.extend({
    init: function () {
        this.state = 'play';
        this.sprite = false;
        this.draw();
    }

    , draw: function () {
        var frame = this.state == 'pause' ? 0 : 1;
        this.sprite = game.add.button(20, 20, 'pauseButton', this.toggle, this, frame, frame, frame);
    }

    , toggle: function () {
        sheet[this.state]();

        this.state = this.state == 'play' ? 'pause' : 'play';
        var frame = this.state == 'pause' ? 0 : 1;
        this.sprite.setFrames(frame, frame, frame);

        if(this.state == 'play'){
            this.destroy();
            UI.sidebar.draw();
        } else {
            UI.sidebar.destroy();
        }
    }

    , destroy: function () {
        if(this.sprite){
            this.sprite.destroy(true);
            this.sprite = null;
        }
    }
})