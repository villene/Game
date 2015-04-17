var Points = Class.extend({
    init: function () {
        this.points = 0;
        var style = { font: "30px Arial", fill: "#333", align: "center" };
        this.sprite = game.add.text(game.width - 20, 10, '', style);
        this.sprite.anchor.setTo(1, 0);
        this.draw();
    }

    , draw: function () {
        this.calculate();
        this.sprite.setText('Points: ' + this.points);
    }

    // , add: function (points) {
    //     this.points += points;
    //     this.draw();
    // }

    , calculate: function(){
        var accuracy = 0;
        var duration = 0;
        for(var i=0, l=sheet.list.length; i<l; i++){
            if(sheet.list[i].accuracy === 0 || sheet.list[i].accuracy){
                duration += sheet.list[i].duration;
                accuracy += sheet.list[i].accuracy * sheet.list[i].duration;
            }
        }
        if(duration !== 0){
            this.points = Math.round(accuracy / duration);
        }
    }

    , get: function () {
        return this.points;
    }

    , destroy: function () {
        this.sprite.destroy();
    }
})