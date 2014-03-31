var Checkbox = Class.extend({
    init: function(x, y, isChecked, text){
        this.isChecked = isChecked;
        this.group = game.add.group();
        var frame = this.isChecked ? 1 : 0;
        this.sprite = game.add.button(x, y, 'checkbox', this.toggle, this, frame, frame, frame);
        this.group.add(this.sprite);

        if(text){
            var label = game.add.text(x+45, y+3, text, {font: "20px Arial", fill: "#333"});
            this.group.add(label);
        }
    }

    , toggle: function(){
        if(this.isChecked){
            this.isChecked = false;
            var frame = 0;
        } else {
            this.isChecked = true;
            var frame = 1;
        }
        this.sprite.setFrames(frame, frame, frame);
    }

    , destroy: function(){
        if(this.group){
            this.group.destroy(true);
            this.group = null;
        }
    }
})


var MusicCheck = Checkbox.extend({
    init: function(x, y){
        this._super(x, y, sound.oscillator.get(), 'music');
    }

    , toggle: function(){
        this._super();
        sound.oscillator.toggle(this.isChecked);
    }
})



var MetronomeCheck = Checkbox.extend({
    init: function(x, y){
        this._super(x, y, sound.metronome.get(), 'metronome');
    }

    , toggle: function(){
        this._super();
        sound.metronome.toggle(this.isChecked);
    }
})