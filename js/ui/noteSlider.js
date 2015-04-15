var NoteSlider = Class.extend({
    init: function(tonality, x, y){
        this.x = x;
        this.y = y;
        this.group = game.add.group();
        this.group.x = x;
        this.group.y = y;

        this.tonality = tonality; // midi number
        this.newTonality = tonality;
        this.notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        this.octaves = [2, 3, 4, 5];
        this.midiStart = 36;
        this.tonalityNr = 0;

        this.draw();

//        test = game.add.sprite(200, 0, 'noteSlider');
        this.drag = game.add.sprite(0, 0, 0);

        this.drag.inputEnabled = true;
        this.drag.input.enableDrag();
        this.drag.input.allowHorizontalDrag = false;
        this.drag.input.enableSnap(1, CONFIG.lineHeight, true, true);
        this.drag.height = 12 * CONFIG.lineHeight * this.octaves.length;

    }

    , getTonality: function(){
        return this.newTonality;
    }

    , draw: function(){
        for(var i= 0, l=this.octaves.length; i<l; i++){
            var octaveY = i * 12 * CONFIG.lineHeight;
            for(var j= 0, l2=this.notes.length; j<l2; j++){
                var noteY = j * CONFIG.lineHeight;
                var y = octaveY+noteY;
                var midiNr = this.midiStart + i*12 + j;
                var texture = 'noteSlider';
                if(this.tonality === midiNr){
                    texture = 'noteSliderHover';
                    game.add.sprite(this.group.x+20, this.group.y+y, 'noteSliderHover');
                }
                this.group.create(0, y, texture);
                var text = game.add.text(0, y, this.notes[j] + this.octaves[i], {font: "12px Arial"});
                this.group.add(text);
            }
        }
    }

    , update: function(){
        this.group.y = this.drag.y;
        if(this.group.y !== this.y){
            this.newTonality = this.tonality + (this.y - this.group.y)/CONFIG.lineHeight;
        }
    }

    , destroy: function(){

    }
})