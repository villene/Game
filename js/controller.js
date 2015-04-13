var Controller = {
    status: false

    , lobby: function () {
        this.clearGame();
        UI.menu = new Menu( db.get('octave') );
        playlist.close();

    }

    , initGame: function(){

    }

    , startGame: function (octave, tempo) {
        console.log('START GAME - ' + songData.name);
        this.octave = octave ? octave : this.octave;
        this.tempo = tempo ? tempo : this.tempo;

        songData.setBottomMidi();
        CONFIG.bottomMidi += (this.octave - songData.octave) * 12;

        sheet = new Sheet(songData.name, this.octave, this.tempo);
        bird = new Bird( CONFIG.bottomMidi + 12 );
        UI.noteSlider = new NoteSlider(sheet.getFirstNote(), 0, 0);

        new Triad();
        UI.pause = new Pause();
        UI.points = new Points();
        UI.sidebar = new Sidebar();

        playlist.hide();
    }

    , finishGame: function () {
        console.log('GAME FINISHED');
        UI.finish = new Finish();

        this.clearGame(true);
    }

    , replayGame: function () {
        this.clearGame();
        this.startGame();
//        UI.menu = new Menu( db.get('octave') );
    }

    , clearGame: function(leaveFinish){
        if(UI.pause){
            UI.pause.destroy();
            UI.pause = null;
        }

        if(UI.points){
            UI.points.destroy();
            UI.points = null;
        }

        if(UI.sidebar){
            UI.sidebar.destroy();
            UI.sidebar = null;
        }

        if(bird){
            bird.destroy();
            bird = null;
        }

        if(sheet){
            sheet.destroy();
            sheet = null;
        }

        if(UI.finish && !leaveFinish){
            UI.finish.destroy();
            UI.finish = null;
        }

//        // hack because oscillator is async
//        setTimeout( function(){ sound.oscillator.pause() }, 100);

        sound.midi.pause();
    }
}