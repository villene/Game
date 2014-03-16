var Controller = {
    status: 'menu'
    , startGame: function( ){
        console.log('START GAME - ' + songData.name);

        bird = new Bird();
        sheet = new Sheet( songData.name );

        UI.pause = new Pause();
        UI.points = new Points();
    }

    , finishGame: function(){
        console.log('GAME FINISHED');
        UI.finish = new Finish();
    }

    , restartGame: function(){

        bird.destroy();
        delete bird;

        sheet.destroy();
        delete sheet;

        UI.pause.destroy();
        delete UI.pause;

        UI.points.destroy();
        delete UI.points;

        UI.menu = new Menu();
    }
}