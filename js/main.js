window.AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContext();
var audioInput = null,
    inputPoint = null;
var rafID = null;
var analyserContext = null;
var canvasWidth, canvasHeight;
var Note = null;
var NoteObject = new Array();
var noteLocation=0;
var correctNotes=0;
var heardPitchArray = new Array();
var heardPitchCount=0;
var chopper = new Image();
chopper.src = "assets/heli.png";
var coin = new Image();
coin.src = "assets/coin.png";

/*function generateWave()
{
    var arr=[];
    var frekvence=440;
    var l=2048;
    for(var i=0; i<l; i++){
        
        //arr[i]=Math.sin(i/17);
       arr[i]=Math.sin(2 * Math.PI * (i/48000)*frekvence);
    }
    return arr;
}    

function windowing (buf){
    var gauswin=[];
    for(var i=0, l=buf.length; i<l; i++)
        {
            gauswin[i]=Math.pow(Math.E, -0.5*(Math.pow((i-(l-1)/2)/(0.45*(l-1)/2), 2)));
            buf[i]=buf[i]*gauswin[i];
}
        return buf;
}*/

function getXML(){
    
    xmlhttp=new XMLHttpRequest();  
    xmlhttp.open("GET","xml/Echigo-Jishi.xml",false); //būtu kruta iespēja izvēlēties failu
    xmlhttp.send();
    xmlDoc=xmlhttp.responseXML;
    var steplist = xmlDoc.getElementsByTagName("step"); 
    var octlist = xmlDoc.getElementsByTagName("octave");
    
    for(var i=0; i<steplist.length; i++)
        {
            NoteObject[i]={step:steplist[i].childNodes[0].nodeValue, 
                           octave:octlist[i].childNodes[0].nodeValue,
                           correct:null};
        }
        updateAnalysers();
};

function cancelAnalyserUpdates() {
    window.cancelAnimationFrame( rafID );
    rafID = null;
}

function updateAnalysers(time) {
    {
        var freqData = new Uint8Array(2048);
        analyserNode.getByteTimeDomainData(freqData);
                 
        var FreqElem = document.getElementById('frequency');
        var NoteElem = document.getElementById('note');
        var CorrectElem = document.getElementById('correct');
        var frekvence = testRealTime(freqData);
       // freqData = windowing(freqData);
        Note = frequencyToNote(frekvence);
        //console.log(testRealTime(freqData));
        FreqElem.innerText=frekvence;
        NoteElem.innerText=Note.string;
        if (frekvence>70 && isFinite(frekvence))
            {heardPitchArray[heardPitchCount]=(canvasHeight-((Note.oct*7+Note.note)*10)+100);     
            heardPitchCount+=1;}
        drawData(frekvence);
        CorrectElem.innerText=correctNotes + '/' + NoteObject.length;
                
    }    
    rafID = window.requestAnimationFrame( updateAnalysers );
}

function drawData(frequency){
    
    if (!analyserContext) {
        var canvas = document.getElementById("graph");
        canvasWidth = canvas.width;
        canvasHeight = canvas.height;
        analyserContext = canvas.getContext('2d');
        
    }
    analyserContext.clearRect(0, 0, canvasWidth, canvasHeight);

    var NoteDraw;
    analyserContext.strokeStyle='black';
    analyserContext.moveTo(canvasWidth,canvasHeight);
    analyserContext.lineTo(0,canvasHeight);
    analyserContext.lineTo(0,0);    
    analyserContext.lineWidth = 3;    
    analyserContext.stroke();
    
    for (var i=0; i<canvasHeight; i+=20)
        {
            analyserContext.moveTo(0,i);
            analyserContext.lineTo(canvasWidth,i);
        }
    analyserContext.lineWidth = 1;    
    analyserContext.stroke();       
        
     
    /*analyserContext.beginPath();
    analyserContext.moveTo(canvasWidth/2-heardPitchCount*2, heardPitchArray[i]);
    for (var i=0; i<heardPitchArray.length; i++){
    analyserContext.lineTo(canvasWidth/2-heardPitchCount*2+2*i, heardPitchArray[i]);}
    analyserContext.lineWidth=2;     
    analyserContext.stroke();*/
    
    analyserContext.beginPath();
    if (frequency>70 && isFinite(frequency))
    analyserContext.drawImage(chopper, canvasWidth/2-54, canvasHeight-((Note.oct*7+Note.note)*10)+106 );
    else analyserContext.drawImage(chopper, canvasWidth/2-54, heardPitchArray[heardPitchCount-1]++);
    //analyserContext.arc(canvasWidth/2, canvasHeight-((Note.oct*7+Note.note)*10)-10, 5, 0,2*Math.PI);
    analyserContext.stroke();
    
    analyserContext.font="12px Arial";
    
    //Note = frequencyToNote(autoCorrelate(freqData));
    
    for(var i=0; i<NoteObject.length; i++)
        {                       
    switch (NoteObject[i].step)
    {
        case 'C': NoteDraw=7*NoteObject[i].octave-1; break;
        case 'C♯': NoteDraw=7*NoteObject[i].octave-1; break;
        case 'D': NoteDraw=7*NoteObject[i].octave+1; break;
        case 'D♯': NoteDraw=7*NoteObject[i].octave+1; break;
        case 'E': NoteDraw=7*NoteObject[i].octave+2; break;
        case 'F': NoteDraw=7*NoteObject[i].octave+3; break;
        case 'F♯': NoteDraw=7*NoteObject[i].octave+3; break;
        case 'G': NoteDraw=7*NoteObject[i].octave+4; break;
        case 'G♯': NoteDraw=7*NoteObject[i].octave+4; break;
        case 'A': NoteDraw=7*NoteObject[i].octave+5; break;
        case 'A♯': NoteDraw=7*NoteObject[i].octave+5; break;
        case 'B': NoteDraw=7*NoteObject[i].octave+6; break;
    }
    analyserContext.beginPath();
    analyserContext.strokeStyle='black';
    var freq=noteToFrequency(NoteObject[i].octave, NoteObject[i].step);
    //var freq=noteToFrequency(NoteObject[i].octave, NoteObject[i].step, NoteObject[i].alter);
    var fullnote=frequencyToNote(freq);
    
    if (canvasWidth-noteLocation+60*i<canvasWidth/2+27 && canvasWidth-noteLocation+60*i>canvasWidth/2-27 && NoteObject[i].correct!==true)
        if(fullnote.string===Note.string){
            
            NoteObject[i].correct=true;
            correctNotes++;
        }
            
    if (canvasWidth-noteLocation+60*i<=canvasWidth/2-10 && NoteObject[i].correct===null)
            NoteObject[i].correct=false;
        
    if (NoteObject[i].correct===false || NoteObject[i].correct===null){
    //analyserContext.arc(canvasWidth-noteLocation+60*i,canvasHeight-(NoteDraw*10)-10,10,0,2*Math.PI);
    //analyserContext.fillText(NoteObject[i].lyric, canvasWidth-noteLocation-14+60*i, canvasHeight-(NoteDraw*10)+18);
    analyserContext.drawImage(coin, canvasWidth-noteLocation+60*i-10, canvasHeight-(NoteDraw*10)+100);
    analyserContext.fillText(freq, canvasWidth-noteLocation-14+60*i, canvasHeight-(NoteDraw*10)+30);   
    analyserContext.fillText(fullnote.string, canvasWidth-noteLocation-14+60*i, canvasHeight-(NoteDraw*10)+42);
    analyserContext.stroke();}
        }
         
    noteLocation+=2;
}
    
/*function autoCorrelate(buf) {
	var MIN_SAMPLES = 100;	// corresponds to an 11kHz signal
	var MAX_SAMPLES = 1024; // corresponds to a 44Hz signal
	var SIZE = 1024;
	var best_offset = -1;
	var best_correlation = 0;
	var rms = 0;
        var sampleRate = 48000;
        
	if (buf.length < (SIZE + MAX_SAMPLES - MIN_SAMPLES))
		return;  // Not enough data

	for (var i=0;i<SIZE;i++) {
		var val = (buf[i] - 128)/128;
		rms += val*val;
	} 
	rms = Math.sqrt(rms/SIZE);
       
	for (var offset = MIN_SAMPLES; offset <= MAX_SAMPLES; offset++) {
		var correlation = 0;

		for (var i=0; i<SIZE; i++) {
			correlation += Math.abs(((buf[i] - 128)/128)-((buf[i+offset] - 128)/128));
		}
		correlation = 1 - (correlation/SIZE);
		if (correlation > best_correlation) {
			best_correlation = correlation;
			best_offset = offset;
		}
	}
	if ((rms>0.01)&&(best_correlation > 0.01)) {
		return sampleRate/best_offset;
	}
        
}*/

function frequencyToNote(freq){
    
    var note;
    var oct;
    var step;
    var diff=12*Math.log(freq/440)/Math.log(2);
    diff=Math.round(diff);
    
    note=58+diff;
    oct=Math.floor(note/12);
    note%=12;

    switch(note)
    {
        case 1: {step='C'; note=1; break;}
        case 2: {step='C';break;}
        case 3: {step='D'; note=2; break;}
        case 4: {step='D';break;}
        case 5: {step='E'; note=3; break;}
        case 6: {step='F'; note=4; break;}
        case 7: {step='F';break;}
        case 8: {step='G'; note=5; break;}
        case 9: {step='G';break;}
        case 10: {step='A'; note=6; break;}
        case 11: {step='A';break;}
        case 0: {step='B'; oct--; note=7; break;}
    }
    return {step:step, oct:oct, note:note, string:step+oct};
}

function noteToFrequency(oct, step){
    var freq;
    switch (step)
    {
        case 'C': step=oct*12+1; break;
        case 'D': step=oct*12+3; break;
        case 'E': step=oct*12+5; break;
        case 'F': step=oct*12+6; break;
        case 'G': step=oct*12+8; break;
        case 'A': step=oct*12+10; break;
        case 'B': step=oct*12+12; break;
    }   
    
        if (step===58) freq=440;
        else{ step-=58; freq=440*Math.pow(1.059463, step);}        
   
    return freq.toFixed(2);
}

function gotStream(stream) {
    inputPoint = audioContext.createGain();

    
    audioInput = audioContext.createMediaStreamSource(stream);
    audioInput.connect(inputPoint);

    analyserNode = audioContext.createAnalyser();
    analyserNode.fftSize = 2048;
    analyserNode.smoothingTimeConstant = 1;
    inputPoint.connect( analyserNode );

    zeroGain = audioContext.createGain();
    zeroGain.gain.value = 0.0;
    inputPoint.connect( zeroGain );
    zeroGain.connect( audioContext.destination );
    getXML();
}

function initAudio() {
        if (!navigator.getUserMedia)
            navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        if (!navigator.cancelAnimationFrame)
            navigator.cancelAnimationFrame = navigator.webkitCancelAnimationFrame || navigator.mozCancelAnimationFrame;
        if (!navigator.requestAnimationFrame)
            navigator.requestAnimationFrame = navigator.webkitRequestAnimationFrame || navigator.mozRequestAnimationFrame;

    navigator.getUserMedia({audio:true}, gotStream, function(e) {
            alert('Error getting audio');
            console.log(e);            
        });
}

window.addEventListener('load', initAudio );