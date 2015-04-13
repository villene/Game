var Sheet = Class.extend({
    init: function (title, octave, tempo) {
        this.title = title;
        this.octaveDiff = octave - songData.octave;
        // TODO divisions are hardcoded need to refactor this so all variables are recalculated if divisions are changed
        this.divisions = 4;
        this.tempo = tempo;
        this.bpm = this.tempo * this.divisions; // 1 beat is 1/16 note by default
        this.bps = this.bpm / 60; // beats per second

        this.list = [];
        this.status = 'active';

        this.time = 0;
        this.timeSplit = 0;
        this.playing = false;

        this.beatTime = this.divisions * 1000 / this.bps;
        this.beatCount = 0;
        this.lastBeat = -1000;

        this.octaveList = [0, 0, 0, 0, 0, 0, 0, 0];

        this.group = game.add.group();
        this.scoreLayer = game.add.graphics(200, 0);
        this.scoreLayer.beginFill(0xFF3300);

        this.getXML();
        this.draw();

    }

    , getXML: function () {

        if (songData.xml.getElementsByTagName("divisions")[0]){
            this.divisions = songData.xml.getElementsByTagName("divisions")[0].childNodes[0].nodeValue;
            this.divisions = parseInt(this.divisions);
            console.log('divisions', this.divisions);
        }

        var notes = songData.xml.getElementsByTagName("note");
        var noteSequence = 0;

        for (var i = 0, l = notes.length; i < l; i++) {
            if (notes[i].getElementsByTagName("step")[0]) {
                var step = notes[i].getElementsByTagName("step")[0].childNodes[0].nodeValue;
            } else {
                var step = false;
            }
            if (notes[i].getElementsByTagName("octave")[0]) {
                var octave = notes[i].getElementsByTagName("octave")[0].childNodes[0].nodeValue - 1;
                octave += this.octaveDiff;
            } else {
                var octave = false;
            }
            if (notes[i].getElementsByTagName("alter")[0] && notes[i].getElementsByTagName("alter")[0].childNodes[0]) {
                var alter = notes[i].getElementsByTagName("alter")[0].childNodes[0].nodeValue;
            } else {
                var alter = false;
            }
            if (notes[i].getElementsByTagName("duration")[0]) {
                var duration = notes[i].getElementsByTagName("duration")[0].childNodes[0].nodeValue;
                if(this.divisions != 4){
                    // all elements are normalized to 1/16 notes
                    duration = Math.round(duration * 4/this.divisions);
                }
            } else {
                var duration = 0;
            }
            if (notes[i].getElementsByTagName("text")[0] && notes[i].getElementsByTagName("text")[0].childNodes[0]) {
                var text = notes[i].getElementsByTagName("text")[0].childNodes[0].nodeValue;
            } else {
                var text = false;
            }
            if (notes[i].getElementsByTagName("rest")[0]) { // 'rest' element should be pause
                var rest = true;
            } else {
                var rest = false;
            }
//            console.log(octave, step, alter, duration, text);
            if (rest) {

            } else {
                var freq = this.noteToFrequency(octave, step, alter);
                var freqGen = freq;
                freq = this.frequencyToNote(freq);
//                console.log(freq, freq.midi, octave, step, alter);
            }


            var nr = this.list.length;
            if (rest) {
                this.list[nr] = new Rest(duration);
            } else {
                this.list[nr] = new Score(Math.round(freq.midi), freq.note, freq.oct, freq.step, text, freqGen, duration, noteSequence, this);
                text = false; // add text only to first note
                // this.group.add(this.list[nr].sprite);
                if(this.list[nr].lyric) this.group.add(this.list[nr].lyric);
            }

            noteSequence += duration;
        }
    }

    , draw: function () {
        for (var i = 0, l = this.list.length; i < l; i++) {
            this.list[i].draw(this.time, this.bps);
        }
        this.group.x = 200;

        var x = Math.round((this.time / 1000) * this.bps * CONFIG.noteWidth);
        this.scoreLayer.x = 200-x;
    }

    , play: function () {
        console.log('play');
        this.playing = true;
        this.timeSplit = new Date().getTime();
    }

    , pause: function () {
        console.log('pause');
        this.playing = false;
        var newTime = new Date().getTime();
        this.time += newTime - this.timeSplit;
        this.timeSplit = newTime;
        sound.midi.pause();
    }

    , update: function () {
        if (this.status == 'finished') {
            sound.midi.pause();
            return;
        }
        if (this.playing) {
            var newTime = new Date().getTime();
            this.time += newTime - this.timeSplit;
            this.timeSplit = newTime;

            if(typeof this.currentScore === 'undefined'){
                this.currentScore = 0;
                this.duration = 0;
            } else {
                var sequence = Math.floor(this.time / 1000 * this.bps);
                if(this.duration + this.list[this.currentScore].duration < sequence ){
                    this.duration += this.list[this.currentScore].duration;
                    this.checkAccuracy(this.currentScore);
                    this.currentScore++;
                    if(!this.list[this.currentScore]){
                        this.finished();
                        return;
                    }
                }
            }

            this.draw();
            this.checkAccuracyUnit(bird.midi);
            bird.drawPitch(this.time, this.bps);
            this.playNote();
            this.playBeat();
        }
    }

    , playNote: function(){
        this.list[this.currentScore].playNote();
    }

    , playBeat: function(){
//        console.log(this.beatTime, this.bps, this.tempo, this.divisions);
        if(this.time >= this.lastBeat+this.beatTime){
            this.lastBeat = Math.round(this.beatCount*this.beatTime);
            this.beatCount++;
            sound.metronome.play();
        }
    }

    , checkAccuracyUnit: function (midi) {
        this.list[this.currentScore].checkAccuracyUnit(midi);
    }

    , checkAccuracy: function(scoreNr){
        this.list[scoreNr].checkAccuracy();
    }

    , finished: function () {
        this.status = 'finished';
        this.playing = false;
        Controller.finishGame();
    }

    , getFirstNote: function(){
        return this.list[0].midi;
    }

    , getScoreCount: function () {
        return this.list.length;
    }, destroy: function () {
        this.group.destroy();
    }, noteToFrequency: function (oct, step, alter) {
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