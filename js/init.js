var game = new Phaser.Game(1024, 500, Phaser.CANVAS, 'phaser', { preload: preload, create: create, update: update, render: render });
var bird, score;

function preload(){
    // UI
    game.load.spritesheet('pauseButton', 'assets/pause.png', 73, 73);

    // gameplay assets
    game.load.image('bg', 'assets/bg.png');
    game.load.image('bird', 'assets/bird.png');
    game.load.image('banana', 'assets/banana.png');

}

function create(){
    drawBg();

    bird = new Bird();
    score = new Score('sample');

    UI.pause = new Pause();

}

function update(){
    if (game.input.keyboard.isDown(Phaser.Keyboard.UP)){
        bird.onKeyPressed(Phaser.Keyboard.UP);
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
        bird.onKeyPressed(Phaser.Keyboard.DOWN);
    }

    score.update();
}

function render(){

}


function drawBg(){
    game.add.sprite(0, 0, 'bg');
}