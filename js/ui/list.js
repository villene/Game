var List = Class.extend({
    init: function(x, y, lineHeight, list, defaultVal){
        this.x = x;
        this.y = y;
        this.lineHeight = lineHeight;
        this.group = game.add.group();
        this.elements = [];
        this.iterateList(list);

        // select first element
        this.toggle( this.getNrByVal(list, defaultVal) );
    }

    , iterateList: function(list){
        for(var i= 0, l=list.length; i<l; i++){
            this.add(list[i].title);
        }
    }

    , add: function(text){
        var y = this.y + this.elements.length * this.lineHeight;
        var nr = this.elements.length;
        var button = game.add.button(this.x, y, 'title_button', function(){ this.toggle(nr); }, this, 1, 0, 1);
        button.anchor.setTo(0, 0);
        this.group.add(button);

        var style = { font: "20px Arial", fill: "#333", align: "center" };
        var t = game.add.text(this.x+5, y+2, text, style);
        t.anchor.setTo(0, 0);
        this.group.add(t);

        this.elements.push({ button: button, text: t, title: text });
    }

    , getNrByVal: function(list, val){
        for(var i= 0, l=list.length; i<l; i++){
            if(list[i].title === val){
                return i;
            }
        }
        return 0;
    }

    , toggle: function(elementNr){
        for(var i= 0, l=this.elements.length; i<l; i++){
            this.buttonState(i, 'unselect');
        }
        this.buttonState(elementNr, 'select');
    }

    , buttonState: function(nr, state){
        if(state == 'select'){
            this.elements[nr].button.setFrames(1, 1, 1);
            this.elements[nr].active = true;
        } else {
            this.elements[nr].button.setFrames(1, 0, 1);
            this.elements[nr].active = false;
        }

    }

    , getSelected: function(){
        for(var i= 0, l=this.elements.length; i<l;  i++){
            if(this.elements[i].active){
                return this.elements[i].title;
            }
        }
        return false;
    }

    , draw: function(){

    }

    , destroy: function(){
        this.group.destroy;
    }
})