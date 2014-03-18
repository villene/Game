var Controller = {
    status: false, createGame: function () {
        drawBg();
        UI.menu = new Menu(songData.octave);
    }, startGame: function (octave) {
        console.log('START GAME - ' + songData.name);

        songData.setBottomMidi();
        CONFIG.bottomMidi += (octave - songData.octave) * 12;

        bird = new Bird( CONFIG.bottomMidi + 12 );
        sheet = new Sheet(songData.name, octave - songData.octave);

        UI.pause = new Pause();
        UI.points = new Points();
    }

    , finishGame: function () {
        console.log('GAME FINISHED');
        UI.finish = new Finish();
    }

    , restartGame: function () {

        bird.destroy();
        delete bird;

        sheet.destroy();
        delete sheet;

        UI.pause.destroy();
        delete UI.pause;

        UI.points.destroy();
        delete UI.points;

        UI.menu = new Menu(songData.octave);
    }
}