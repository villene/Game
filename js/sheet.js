var Sheet = Class.extend({
    init: function(title){
        this.title = title;
        this.bpm = 120; // beats per minute
        this.bps = this.bpm/60; // beats per second
        this.list = [];

        this.time = 0;
        this.timeSplit = 0;
        this.playing = false;

        this.group = game.add.group();

        this.getXML();
        this.draw();
    }

    , getXML: function(){

        xmlhttp=new XMLHttpRequest();
        xmlhttp.open("GET","xml/"+this.title+".xml",false);
        xmlhttp.send();
        xmlDoc=xmlhttp.responseXML;
        var steplist = xmlDoc.getElementsByTagName("step");
        var octlist = xmlDoc.getElementsByTagName("octave");
        var altlist = xmlDoc.getElementsByTagName("alter");

        for(var i=0; i<steplist.length; i++)
        {
            var step = steplist[i].childNodes[0].nodeValue;
            var octave = octlist[i].childNodes[0].nodeValue-1;
            var alter = altlist[i].childNodes[0].nodeValue;
            var freq = this.noteToFrequency(octave, step, alter);
            freq = this.frequencyToNote(freq);

            this.list[i] = new Score(Math.round(freq.midi), freq.note, freq.oct, freq.step, this.bps, i);
            this.group.add(this.list[i].sprite);
        }
    }

    , draw: function(){
        for(var i= 0, l=this.list.length; i<l; i++){
            this.list[i].draw(this.time);
        }
        this.group.x = 200;
    }

    , play: function(){
        console.log('play');
        this.playing = true;
        this.timeSplit = new Date().getTime();
    }

    , pause: function(){
        console.log('pause');
        this.playing = false;
        var newTime = new Date().getTime();
        this.time += newTime - this.timeSplit;
        this.timeSplit = newTime;
    }

    , update: function(){
        if(this.playing){
            var newTime = new Date().getTime();
            this.time += newTime - this.timeSplit;
            this.timeSplit = newTime;
            this.draw();
        }
    }

    , noteToFrequency: function(oct, step, alter){
        var freq;
        switch (step)
        {
            case 'C': step=oct*12+1; break;
            case 'C♯': step=oct*12+2; break;
            case 'D': step=oct*12+3; break;
            case 'D♯': step=oct*12+4; break;
            case 'E': step=oct*12+5; break;
            case 'F': step=oct*12+6; break;
            case 'F♯': step=oct*12+7; break;
            case 'G': step=oct*12+8; break;
            case 'G♯': step=oct*12+9; break;
            case 'A': step=oct*12+10; break;
            case 'A♯': step=oct*12+11; break;
            case 'B': step=oct*12+12; break;
        }
        if(alter==='1')step+=1;
        else if(alter==='-1')step-=1;

        if (step===58) freq=440;
        else { step-=58; freq=440*Math.pow(1.059463, step);}

        return freq.toFixed(2);
    }

    , frequencyToNote: function(freq){
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
            case 2: {step='C♯';break;}
            case 3: {step='D'; note=2; break;}
            case 4: {step='D♯';break;}
            case 5: {step='E'; note=3; break;}
            case 6: {step='F'; note=4; break;}
            case 7: {step='F♯';break;}
            case 8: {step='G'; note=5; break;}
            case 9: {step='G♯';break;}
            case 10: {step='A'; note=6; break;}
            case 11: {step='A♯';break;}
            case 0: {step='B'; oct--; note=7; break;}
        }
        var midi = 12*(Math.log(freq/440)/Math.log(2))+69;
        return {step:step, oct:oct, note:note, string:step+oct, midi: midi};
    }
})