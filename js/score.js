var Score = Class.extend({
    init: function(title){
        this.title = title;
        this.bpm = 120; // beats per minute
        this.bps = this.bpm/60; // beats per second
        this.list = [];
        this.group = game.add.group();

        this.getXML();
        this.draw();
    }

    , getXML: function(){

        xmlhttp=new XMLHttpRequest();
        xmlhttp.open("GET","xml/"+this.title+".xml",false);
        xmlhttp.send();
        xmlDoc=xmlhttp.responseXML;
        var steplist = xmlDoc.getElementsByTagName("step");
        var octlist = xmlDoc.getElementsByTagName("octave");
        var altlist = xmlDoc.getElementsByTagName("alter");

        for(var i=0; i<steplist.length; i++)
        {
            this.list[i] = {
                step:steplist[i].childNodes[0].nodeValue,
                octave:octlist[i].childNodes[0].nodeValue-1,
                alter:altlist[i].childNodes[0].nodeValue,
                correct:null
            };
        }
    }

    , draw: function(){
        for(var i= 0, l=this.list.length; i<l; i++){
            var banana = this.group.create(20*i, 300, 'banana');
            banana.anchor.setTo(0, 0);
            banana.scale.x = 0.2;
            banana.scale.y = 0.2;
        }
    }

    , move: function(){

    }
})