var Sidebar = Class.extend({
    init: function(){

    }

    , draw: function(){
        this.group = game.add.group();

        var bg = game.add.graphics(0, 0);
        bg.beginFill(0xc9c49c);
        bg.drawRect(0, 0, 200, game.height);
        bg.beginFill(0x423e20);
        bg.drawRect(200, 0, 7, game.height);
        bg.endFill();
        this.group.add(bg);

        // buttons
        UI.pause.draw();
        this.group.add( new Replay(60, 150).getPointer() );

        this.group.add( new Home(60, 240).getPointer() );

        this.music = new MusicCheck(20, 310);
        this.metronome = new MetronomeCheck(20, 350);
        // music on/off button
        // triad on/off button
        // metronome on/off button
        // tempo range field
        // octave & minor/major select field - laikam jātaisa kā vertikāla josla
    }

    , destroy: function(){
        if(this.group){
            this.group.destroy(true);
            this.group = null;
        }

        if(this.music){
            this.music.destroy();
            this.music = null;
        }

        if(this.metronome){
            this.metronome.destroy();
            this.metronome = null;
        }
    }
})