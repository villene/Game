var Controller = {
    status: 'menu'

    , startGame: function( title ){
        console.log('START GAME - ' + title);

        bird = new Bird();
        sheet = new Sheet( title );

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