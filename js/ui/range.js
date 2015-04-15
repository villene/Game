var Range = Class.extend({
    init: function(x, y, value, step, min, max){
        this.x = x ? x : 0;
        this.y = y ? y : 0;
        this.value = value ? value : 120;
        this.step = step ? step : 10;
        this.min = min ? min : 30;
        this.max = max ? max : 240;
        this.text;

        this.group = game.add.group();
        this.draw();
    }

    , draw: function(){
        var label = game.add.text(this.x, this.y, 'tempo', { font: "20px Arial", fill: "#333" });
        this.group.add(label);

        var arrowLeft = this.group.create(this.x+70, this.y-3, 'arrow');
        arrowLeft.scale.x = -1;
        arrowLeft.x += -arrowLeft.width;
        arrowLeft.inputEnabled = true;
        arrowLeft.events.onInputDown.add(this.subtract, this);

        this.text = game.add.text(this.x+110, this.y, this.value, { font: "20px Arial", fill: "#333" });
        this.text.anchor.setTo(0.5, 0);
        this.group.add(this.text);

        var arrowRight = this.group.create(this.x+130, this.y-3, 'arrow');
        arrowRight.inputEnabled = true;
        arrowRight.events.onInputDown.add(this.add, this);

    }

    , subtract: function(){
        if(this.value - this.step < this.min) return;
        this.setValue(this.value - this.step);
    }

    , add: function(){
        if(this.value + this.step > this.max) return;
        this.setValue(this.value + this.step);
    }

    , setValue: function(newValue){
        this.value = newValue;
        this.text.setText(newValue);
    }

    , getSelected: function(){
        return this.value;
    }

    , destroy: function(){
        if(this.group){
            this.group.destroy(true);
            this.group = null;
        }
    }
})