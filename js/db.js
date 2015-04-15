var DB = Class.extend({
    init: function(){
        if(typeof(Storage)!=="undefined")
        {
            this.available = true;
        }
        else
        {
            console.log('No Web Storage support!');
        }

        this.intValues = ['octave'];
    }

    , get: function( key ){
        if(!this.available) return;

        if(localStorage[key]){
            if(this.intValues.indexOf(key) !== -1){
                return parseInt(localStorage[key]);
            } else {
                return localStorage[key];
            }
        } else {
            console.log('Key "'+key+'" is not defined in localstorage');
            return;
        }
    }

    , set: function( key, value ){
        if(!this.available) return;
        localStorage[key] = value;
    }
})