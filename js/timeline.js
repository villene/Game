var Timeline = Class.extend ({
	init: function(){
		this.line = game.add.graphics(0, 0);
        this.line.lineStyle(10, 0xFF0000, 1);
        this.line.moveTo(200, 50)
        this.line.lineTo(game.width-200, 50);

        this.slider = game.add.sprite(200, 50, 'slider');
        this.slider.anchor.setTo(0.5, 0.5);
        this.slider.inputEnabled = true;
        this.slider.input.enableDrag();
        this.slider.input.allowVerticalDrag = false;
	}

	, hide: function(){

	}

	, show: function(){

	}

	, destroy: function(){

	}
})