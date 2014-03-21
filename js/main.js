window.AudioContext = window.AudioContext || window.webkitAudioContext;
window.audioContext = new AudioContext();

var audioInput = null,
    inputPoint = null;
var rafID = null;
var analyserContext = null;
var canvasWidth, canvasHeight;
var Note = null;

var thresholdSilence = Math.pow(10, -2.5);

var noteLines = [48, 50, 52, 53, 55, 57, 59, 60];

function cancelAnalyserUpdates() {
    window.cancelAnimationFrame(rafID);
    rafID = null;
}

function updateAnalysers(time) {
    {
        var freqData = new Uint8Array(2048);
        analyserNode.getByteTimeDomainData(freqData);

        var frekvence = testRealTime(freqData);
        Note = frequencyToNote(frekvence.frequency);

        if (bird) {
            //console.log(Note.midi);
            if (frekvence.frequency > 70 && isFinite(frekvence.frequency) && frekvence.decibels > thresholdSilence) {
                bird.setMidi(Note.midi);
            } else {
                bird.setMidi(1);
            }
        }
    }
    rafID = window.requestAnimationFrame(updateAnalysers);
}

function drawMidi(midi) {
    var maxMidi = 90;
    var minMidi = 36;
    return canvasHeight - (midi - minMidi) * (canvasHeight / (maxMidi - minMidi));
}

function frequencyToNote(freq) {

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

function noteToFrequency(oct, step, alter) {
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
}

function gotStream(stream) {
    inputPoint = audioContext.createGain();


    audioInput = audioContext.createMediaStreamSource(stream);
    audioInput.connect(inputPoint);

    analyserNode = audioContext.createAnalyser();
    analyserNode.fftSize = 2048;
    analyserNode.smoothingTimeConstant = 1;
    inputPoint.connect(analyserNode);

    zeroGain = audioContext.createGain();
    zeroGain.gain.value = 0.0;
    inputPoint.connect(zeroGain);
    zeroGain.connect(audioContext.destination);
    updateAnalysers();
}

function initAudio() {
    if (!navigator.getUserMedia)
        navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    if (!navigator.cancelAnimationFrame)
        navigator.cancelAnimationFrame = navigator.webkitCancelAnimationFrame || navigator.mozCancelAnimationFrame;
    if (!navigator.requestAnimationFrame)
        navigator.requestAnimationFrame = navigator.webkitRequestAnimationFrame || navigator.mozRequestAnimationFrame;

    navigator.getUserMedia({audio: true}, gotStream, function (e) {
        alert('Error getting audio');
        console.log(e);
    });
}

window.addEventListener('load', initAudio);