var Sheet = Class.extend({
    init: function (title, octaveDiff) {
        this.title = title;
        this.octaveDiff = octaveDiff;
        this.divisions = 4;
        this.tempo = 120;
        this.bpm = this.tempo * this.divisions; // 1 beat is 1/16 note by default
        this.bps = this.bpm / 60; // beats per second
        this.list = [];
        this.status = 'active';

        this.time = 0;
        this.timeSplit = 0;
        this.playing = false;

        this.octaveList = [0, 0, 0, 0, 0, 0, 0, 0];

        this.group = game.add.group();

        this.generateOscillator();
        this.getXML();
        this.draw();

    }

    , getXML: function () {

        if (songData.xml.getElementsByTagName("divisions")[0]){
            this.divisions = songData.xml.getElementsByTagName("divisions")[0].childNodes[0].nodeValue;
            console.log('divisions', this.divisions);
        }

        var notes = songData.xml.getElementsByTagName("note");

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

            for (var j = 0; j < duration; j++) {
                var nr = this.list.length;
                if (rest) {
                    this.list[nr] = new Rest();
                } else {
                    this.list[nr] = new Score(Math.round(freq.midi), freq.note, freq.oct, freq.step, this.bps, nr, text, freqGen);
                    text = false; // add text only to first note
                    this.group.add(this.list[nr].sprite);
                    if(this.list[nr].lyric) this.group.add(this.list[nr].lyric);
                }

                if (octave) {
                    this.octaveList[octave]++;
                }

            }
//            var nr = this.list.length;
//            this.list[i] = new Score(Math.round(freq.midi), freq.note, freq.oct, freq.step, this.bps, nr, text);
//            this.group.add(this.list[i].sprite);
        }
    }

    , draw: function () {
        for (var i = 0, l = this.list.length; i < l; i++) {
            this.list[i].draw(this.time);
        }
        this.group.x = 200;
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
        oscillator.frequency.value = 0;
    }

    , update: function () {
        if (this.status == 'finished') {
            return;
        }
        if (this.playing) {
            var newTime = new Date().getTime();
            this.time += newTime - this.timeSplit;
            this.timeSplit = newTime;

            this.draw();
            this.checkAccuracy(bird.midi);
            this.playNote();
        }
    },

    playNote: function(){
        var scoreNr = Math.floor(this.time / 1000 * this.bps);
        if (scoreNr - 1 >= 0) {
            this.list[scoreNr - 1].playNote();
        }
    }

    , generateOscillator: function(){
        window.oscillator = audioContext.createOscillator();
        oscillator.type = 0; // Sine wave
        oscillator.frequency.value = 0; // Default frequency in hertz
        oscillator.connect(audioContext.destination); // Connect sound source 1 to output
//        oscillator.noteOn(0); // Play sound source 1 instantly
        oscillator.start(0);
    }

    ,checkAccuracy: function (midi) {
        // calculate score being played
        var scoreNr = Math.floor(this.time / 1000 * this.bps);
        if (scoreNr - 1 >= 0) {
            this.list[scoreNr - 1].checkAccuracy();
        }
        if (scoreNr < this.list.length) {
            this.list[scoreNr].checkAccuracyUnit(midi);
        } else {
            this.finished();
        }

    }, finished: function () {
        this.status = 'finished';
        Controller.finishGame();
        
        oscillator.disconnect();
    }, getScoreCount: function () {
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