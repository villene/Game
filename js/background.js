var Background = Class.extend({
	init: function(){
		this.halfnotes = [1,3,6,8,10];
		this.lineArr = [4, 11];
		this.bg = game.add.graphics(0, 0);
		for(var i=CONFIG.topMidi; i>=CONFIG.bottomMidi; i--){
			var note = i%12;
			if(this.halfnotes.indexOf(note) !== -1){
				this.drawHalfNote(i);	
			}
			if(this.lineArr.indexOf(note) !== -1){
				this.drawNoteBorder(i);
			}
		}
	}

	, drawHalfNote: function(midi){
		var y = (CONFIG.topMidi - midi - 0.5) * CONFIG.lineHeight;
		this.bg.lineStyle(0, 0x333333, 0);
		this.bg.beginFill(0x999999, 0.1);
		this.bg.drawRect(0, y, game.width, CONFIG.lineHeight);
	}

	, drawNoteBorder: function(midi){
		var y = (CONFIG.topMidi - midi - 0.5) * CONFIG.lineHeight;
		this.bg.lineStyle(1, 0xcccccc, 0.1);
		this.bg.moveTo(0, y);
		this.bg.lineTo(game.width, y);
	}
})