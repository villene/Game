<!DOCTYPE html>
<html>
<head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">

    <!-- MIDI.js -->
    <script src="js/midijs/AudioDetect.js" type="text/javascript"></script>
    <script src="js/midijs/LoadPlugin.js" type="text/javascript"></script>
    <script src="js/midijs/Plugin.js" type="text/javascript"></script>
    <script src="js/midijs/Player.js" type="text/javascript"></script>
    <script src="js/midijs/DOMLoader.XMLHttp.js" type="text/javascript"></script>
    <script src="js/midijs/Base64.js" type="text/javascript"></script>
    <script src="js/midijs/base64binary.js" type="text/javascript"></script>
    <!-- MIDI.js -->

</head>
<body>

    <h1>Song list:</h1>

<?php

    $songs = [];
    if ($handle = opendir('xml/')) {
        while (false !== ($entry = readdir($handle))) {
            if ($entry != "." && $entry != "..") {
                $name = explode('.', $entry);
                array_push($songs, $name[0]);
            }
        }
        closedir($handle);
    }

    sort($songs);
    foreach($songs as $song){
        echo '<a href="song.php?name=' . $song . '">' . $song . '</a><br/>';
    }

?>


    <script type="text/javascript">

        window.onload = function () {
            MIDI.loadPlugin({
                soundfontUrl: "js/midijs/soundfont/",
                instrument: "acoustic_grand_piano",
                callback: function() {
                    var delay = 0; // play one note every quarter second
                    var note = 50; // the MIDI note
                    var velocity = 150; // how hard the note hits
                    // play the note
                    MIDI.setVolume(0, 127);
                    MIDI.noteOn(0, note, velocity, delay);
                    setTimeout(function(){
                        MIDI.noteOff(0, note, 0);
                    }, 500);

                }
            });
        };

    </script>

</body>
</html>
