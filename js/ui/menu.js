var Menu = Class.extend({
    init: function(){
        this.group = game.add.group();
        this.draw();

    }

    , draw: function(){
        var bg = this.group.create(game.width/2, game.height/2, 'popup_bg');
        bg.anchor.setTo(0.5, 0.5);

        var scoreX = 280;
        var scoreY = 150;
        var lineHeight = 30;
        for(var i= 0, l=CONFIG.scores.length; i<l; i++){

            var button = game.add.button(scoreX, scoreY+lineHeight*i, 'title_button', this.toggle, this, 1, 0, 1);
            button.anchor.setTo(0, 0);
            this.group.add(button);

            var title = CONFIG.scores[i].title;
            var style = { font: "20px Arial", fill: "#333", align: "center" };
            var t = game.add.text(scoreX+5, scoreY+lineHeight*i+2, title, style);
            t.anchor.setTo(0, 0);
            this.group.add(t);
        }

        var scoreX = 530;
        var octaves = [3, 4, 5];
        for(var i= 0, l=octaves.length; i<l; i++){
            var button = game.add.button(scoreX, scoreY+lineHeight*i, 'title_button', this.toggle, this, 1, 0, 1);
            button.anchor.setTo(0, 0);
            this.group.add(button);

            var style = { font: "20px Arial", fill: "#333", align: "center" };
            var t = game.add.text(scoreX+5, scoreY+lineHeight*i+2, octaves[i], style);
            t.anchor.setTo(0, 0);
            this.group.add(t);
        }

    }

    , toggle: function(){

    }

    , show: function(){

    }

    , hide: function(){

    }

    , destroy: function(){

    }
})