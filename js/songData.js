var SongData = Class.extend({
    init: function(xml){
        this.url = this.parseUrl();
        this.name = this.url.name;
        this.xml = this.getXML(this.name);

        if(!this.xml) console.log('ERROR! XML file does not exist!');
    }

    , parseUrl: function(){
        var url = {};
        var tmp = location.search.substring(1);
        tmp = tmp.split('&');
        for(var i= 0, l=tmp.length; i<l; i++){
            var tmp2 = tmp[i].split('=');
            url[tmp2[0]] = tmp2[1];
        }
        return url;
    }

    , getXML: function(name){
        xmlhttp=new XMLHttpRequest();
        xmlhttp.open("GET","xml/"+name+".xml",false);
        xmlhttp.send();
        xmlDoc=xmlhttp.responseXML;
        return xmlDoc;
    }
})