var Timeline = Class.extend ({
	init: function(){
		this.group = game.add.group();

		this.startX = 250;
		this.endX = game.width - 180;
		var y = 50;

		this.line = game.add.graphics(0, 0);
        this.line.lineStyle(10, 0x426c0a, 1);
        this.line.moveTo(this.startX, y)
        this.line.lineTo(this.endX, y);
        this.group.add(this.line);

        this.slider = game.add.sprite(this.startX, y, 'slider');
        this.slider.alpha = 0.8;
        this.slider.anchor.setTo(0.5, 0.5);
        this.slider.inputEnabled = true;
        this.slider.input.enableDrag();
        this.slider.input.allowVerticalDrag = false;
        var radius = this.slider.width/2;
        var x = this.startX-radius;
        var width = Math.abs(this.endX-this.startX)+2*radius;
        // rectangle doesn't have anchor 0.5, 0.5 as sprite has
        this.slider.input.boundsRect = new Phaser.Rectangle(x, y-radius, width, radius*2);
        this.group.add(this.slider);
	}

	, hide: function(){
		this.group.visible = false;
	}

	, show: function(){
		this.group.visible = true;
	}

	, update: function(){
		if(this.slider.input.isDragged){
			// console.log(this.slider.x);
			var deltaX = this.slider.x - this.startX;
			var percentage = deltaX/(this.endX-this.startX) * 100;
			sheet.scroll(percentage);
		}
	}

	, destroy: function(){
		if(this.group){
			this.group.destroy(true);
			this.group = null;
		}
	}
})