var Points = Class.extend({
    init: function(){
        this.points = 0;
        var style = { font: "48px Arial", fill: "#fff", align: "center" };
        this.sprite = game.add.text(game.width-20, 10, '', style);
        this.sprite.anchor.setTo(1, 0);
        this.draw();
    }

    , draw: function(){
        this.sprite.setText('Points: ' + this.points);
    }

    , add: function(points){
        this.points += points;
        this.draw();
    }

    , get: function(){
        return this.points;
    }

    , destroy: function(){
        this.sprite.destroy();
    }
})