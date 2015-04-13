function red2green(percentage){
	var stepCount = 34; // should be even number
	var stepSize = 510/stepCount;
	var maxPercent = 80; // it is very hard to get 100% with voice. 50-60% is already good
	var stepNr = Math.round((stepCount * percentage) / maxPercent);

	var red = 0;
	var green = 0;
	var blue = 0;

	if(stepNr < stepCount/2){
		red = 255;
		green = stepNr * stepSize;
	} 
	else {
		green = 255;
		red = 255 - (stepNr-stepCount/2) * stepSize;
		if(red < 0) red = 0;
	}

	return Phaser.Color.getColor(red, green, blue);
}