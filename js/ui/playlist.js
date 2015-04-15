var Playlist = Class.extend({
    init: function(){
        this.status = 'close'; // close, open, hide
        this.list = document.getElementById('playlist');
        this.icon = document.getElementById('list_icon');
        var self = this;
        this.icon.addEventListener('click', function(){
            self.toggle();
        });

    }

    , toggle: function(){
        if(this.status === 'close'){
            this.status = 'open';
            this.open();
        } else {
            this.status = 'close';
            this.close();
        }
    }

    , open: function(){
        this.list.className = 'open';
        this.icon.className = 'open';
    }

    , close: function(){
        this.list.className = 'close';
        this.icon.className = 'close';
    }

    , hide: function(){
        this.list.className = 'hide';
        this.icon.className = 'hide';
    }

    , select: function(song){
        console.log(song);
        songData.destroy();
        songData = new SongData(song);
        Controller.clearGame();
        UI.menu.destroy();
        UI.menu = new Menu( db.get('octave') );
    }
})