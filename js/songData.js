var SongData = Class.extend({
    init: function (xml) {
        this.url = this.parseUrl();
        this.name = this.url.name;
        this.xml = this.getXML(this.name);
        this.octaveData = this.getOctaveData(this.xml);
        this.octave = this.getCommonOctave(this.octaveData);

        if (!this.xml) console.log('ERROR! XML file does not exist!');
    }, getOctaveData: function (xml) {
        var octaveList = [0, 0, 0, 0, 0, 0, 0, 0];
        var notes = xml.getElementsByTagName("note");

        for (var i = 0, l = notes.length; i < l; i++) {
            if (notes[i].getElementsByTagName("duration")[0]) {
                var duration = notes[i].getElementsByTagName("duration")[0].childNodes[0].nodeValue;
            } else {
                var duration = 0;
            }
            if (notes[i].getElementsByTagName("octave")[0]) {
                var octave = notes[i].getElementsByTagName("octave")[0].childNodes[0].nodeValue - 1;
            } else {
                var octave = false;
            }
            for (var j = 0; j < duration; j++) {
                if (octave) {
                    octaveList[octave]++;
                }
            }
        }
        return octaveList;
    }, getCommonOctave: function (arr) {
        // TODO iterate through array and get most used octave
        var maxVal = 0;
        var maxIterator = false;
        for (var i = 0, l = arr.length; i < l; i++) {
            if (arr[i] > maxVal) {
                maxVal = arr[i];
                maxIterator = i;
            }
        }
        return maxIterator;
    }, parseUrl: function () {
        var url = {};
        var tmp = location.search.substring(1);
        tmp = tmp.split('&');
        for (var i = 0, l = tmp.length; i < l; i++) {
            var tmp2 = tmp[i].split('=');
            url[tmp2[0]] = tmp2[1];
        }
        return url;
    }, getXML: function (name) {
        xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", "xml/" + name + ".xml", false);
        xmlhttp.send();
        xmlDoc = xmlhttp.responseXML;
        return xmlDoc;
    }
})