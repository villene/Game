var Controller = {
    status: 'menu'

    , startGame: function( title ){
        console.log('START GAME - ' + title);

        bird = new Bird();
        sheet = new Sheet( title );

        UI.pause = new Pause();
        UI.points = new Points();
    }
}