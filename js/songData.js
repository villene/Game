var SongData = Class.extend({
    init: function (song) {
        if(song){
            this.name = song;
        } else {
            this.url = this.parseUrl();
            this.name = this.url.name;
        }

        this.minMidi;
        this.maxMidi;
        this.getXML(this.name);

        // this.xml = this.getXML(this.name);
        // this.octaveData = this.getOctaveData(this.xml);
        // this.octave = this.getCommonOctave(this.octaveData);

        // this.minMidi;
        // this.maxMidi;
        // this.findMaxMinMidi(this.xml);
        // this.setBottomMidi();

        // if (!this.xml) console.log('ERROR! XML file does not exist!');
    }

    , getOctaveData: function (xml) {
        var octaveList = [0, 0, 0, 0, 0, 0, 0, 0];
        var notes = xml.getElementsByTagName("note");

        for (var i = 0, l = notes.length; i < l; i++) {
            if (notes[i].getElementsByTagName("duration")[0]) {
                var duration = notes[i].getElementsByTagName("duration")[0].childNodes[0].nodeValue;
            } else {
                var duration = 0;
            }
            if (notes[i].getElementsByTagName("octave")[0]) {
                var octave = notes[i].getElementsByTagName("octave")[0].childNodes[0].nodeValue - 1;
            } else {
                var octave = false;
            }
            for (var j = 0; j < duration; j++) {
                if (octave) {
                    octaveList[octave]++;
                }
            }
        }
        return octaveList;
    }

    , getCommonOctave: function (arr) {
        var maxVal = 0;
        var maxIterator = false;
        for (var i = 0, l = arr.length; i < l; i++) {
            if (arr[i] > maxVal) {
                maxVal = arr[i];
                maxIterator = i;
            }
        }
        return maxIterator;
    }

    , findMaxMinMidi: function(xml){
        this.minMidi = false;
        this.maxMidi = false;
        var notes = xml.getElementsByTagName("note");

        for (var i = 0, l = notes.length; i < l; i++) {
            if (notes[i].getElementsByTagName("step")[0]) {
                var step = notes[i].getElementsByTagName("step")[0].childNodes[0].nodeValue;
            } else {
                var step = false;
            }
            if (notes[i].getElementsByTagName("octave")[0]) {
                var octave = notes[i].getElementsByTagName("octave")[0].childNodes[0].nodeValue - 1;
            } else {
                var octave = false;
            }
            if (notes[i].getElementsByTagName("alter")[0] && notes[i].getElementsByTagName("alter")[0].childNodes[0]) {
                var alter = notes[i].getElementsByTagName("alter")[0].childNodes[0].nodeValue;
            } else {
                var alter = false;
            }

            if(!octave || !step){
                continue; // check against rest elements
            }

            var freq = this.noteToFrequency(octave, step, alter);
            freq = this.frequencyToNote(freq);
            var midi = freq.midi;

            if(!this.minMidi || this.minMidi > midi){
                this.minMidi = midi;
            }

            if(!this.maxMidi || this.maxMidi < midi){
                this.maxMidi = midi;
            }
        }

        this.minMidi = Math.round(this.minMidi);
        this.maxMidi = Math.round(this.maxMidi);
    }

    , setBottomMidi: function(){
        var visibleLines = Math.floor(game.height/CONFIG.lineHeight);
        var songLines = this.maxMidi - this.minMidi;
        var linesFromBottom = Math.round((visibleLines - songLines) / 2);
        CONFIG.bottomMidi = this.minMidi - linesFromBottom;
    }

    , parseUrl: function () {
        var url = {};
        var tmp = location.search.substring(1);
        tmp = tmp.split('&');
        for (var i = 0, l = tmp.length; i < l; i++) {
            var tmp2 = tmp[i].split('=');
            url[tmp2[0]] = tmp2[1];
        }
        return url;
    }

    , getXML: function (name) {
    //     xmlhttp = new XMLHttpRequest();
    //     xmlhttp.open("GET", "xml/" + name + ".xml", false);
    //     xmlhttp.send();
    //     xmlDoc = xmlhttp.responseXML;
    //     return xmlDoc;
        var self = this;
        $.get( "xml/" + name + ".xml", function( xml ) {
            self.parseXML(xml);
        }, "xml"); 
    }

    , parseXML: function(xml){
        if (!xml) {
            console.log('ERROR! XML file does not exist!');
            return;
        }

        this.xml = xml;
        this.octaveData = this.getOctaveData(this.xml);
        this.octave = this.getCommonOctave(this.octaveData);

        this.findMaxMinMidi(this.xml);
        this.setBottomMidi();        
    }

    , destroy: function(){
        $(this.xml).remove();
        this.xml = null;
    }

    , noteToFrequency: function (oct, step, alter) {
        var freq;
        switch (step) {
            case 'C':
                step = oct * 12 + 1;
                break;
            case 'C♯':
                step = oct * 12 + 2;
                break;
            case 'D':
                step = oct * 12 + 3;
                break;
            case 'D♯':
                step = oct * 12 + 4;
                break;
            case 'E':
                step = oct * 12 + 5;
                break;
            case 'F':
                step = oct * 12 + 6;
                break;
            case 'F♯':
                step = oct * 12 + 7;
                break;
            case 'G':
                step = oct * 12 + 8;
                break;
            case 'G♯':
                step = oct * 12 + 9;
                break;
            case 'A':
                step = oct * 12 + 10;
                break;
            case 'A♯':
                step = oct * 12 + 11;
                break;
            case 'B':
                step = oct * 12 + 12;
                break;
        }
        if (alter === '1')step += 1;
        else if (alter === '-1')step -= 1;

        if (step === 58) freq = 440;
        else {
            step -= 58;
            freq = 440 * Math.pow(1.059463, step);
        }

        return freq.toFixed(2);
    }, frequencyToNote: function (freq) {
        var note;
        var oct;
        var step;
        var diff = 12 * Math.log(freq / 440) / Math.log(2);
        diff = Math.round(diff);

        note = 58 + diff;
        oct = Math.floor(note / 12);
        note %= 12;

        switch (note) {
            case 1:
            {
                step = 'C';
                note = 1;
                break;
            }
            case 2:
            {
                step = 'C♯';
                break;
            }
            case 3:
            {
                step = 'D';
                note = 2;
                break;
            }
            case 4:
            {
                step = 'D♯';
                break;
            }
            case 5:
            {
                step = 'E';
                note = 3;
                break;
            }
            case 6:
            {
                step = 'F';
                note = 4;
                break;
            }
            case 7:
            {
                step = 'F♯';
                break;
            }
            case 8:
            {
                step = 'G';
                note = 5;
                break;
            }
            case 9:
            {
                step = 'G♯';
                break;
            }
            case 10:
            {
                step = 'A';
                note = 6;
                break;
            }
            case 11:
            {
                step = 'A♯';
                break;
            }
            case 0:
            {
                step = 'B';
                oct--;
                note = 7;
                break;
            }
        }
        var midi = 12 * (Math.log(freq / 440) / Math.log(2)) + 69;
        return {step: step, oct: oct, note: note, string: step + oct, midi: midi};
    }
})