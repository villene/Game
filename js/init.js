var game = new Phaser.Game(1024, 500, Phaser.CANVAS, 'phaser', { preload: preload, create: create, update: update, render: render });

// global variables
var bird, sheet;
var db = new DB();
var songData = new SongData();

function preload() {
    // UI
    game.load.spritesheet('pauseButton', 'assets/pause.png', 73, 73);
    game.load.image('popup_bg', 'assets/popup_bg.png');
    game.load.spritesheet('title_button', 'assets/title_button.png', 200, 30);
    game.load.image('noiseButton', 'assets/noise_button.png', 40, 40);

    // gameplay assets
    game.load.image('bg', 'assets/bg.png');
    game.load.image('bird', 'assets/bird.png');
    game.load.spritesheet('bird_eat', 'assets/bird_eat.png', 40, 424 / 8);
    game.load.image('banana', 'assets/banana.png');
    game.load.image('heart', 'assets/heart.png');

}

function create() {
    Controller.createGame();
}

function update() {
    if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
        bird.onKeyPressed(Phaser.Keyboard.UP);
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
        bird.onKeyPressed(Phaser.Keyboard.DOWN);
    }

    if (sheet) {
        sheet.update();
    }
}

function render() {
        //game.debug.renderCameraInfo(game.camera, 500, 32);
        //game.debug.renderInputInfo(32,32);
}


function drawBg() {
    game.add.sprite(0, 0, 'bg');
}