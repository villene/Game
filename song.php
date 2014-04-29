<!DOCTYPE html>
<html>
<head>
    <title>Karaoke Bird</title>
    <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <link rel="stylesheet" href="style.css" type="text/css" />

    <script src="js/phaser_min.1.1.5.js"></script>
    <script src="js/class.js"></script>
    <script src="js/config.js"></script>
    <script src="js/db.js"></script>

    <script src="js/controller.js"></script>
    <script src="js/songData.js"></script>
    <script src="js/sound.js"></script>
    <script src="js/score.js"></script>
    <script src="js/rest.js"></script>
    <script src="js/sheet.js"></script>
    <script src="js/init.js"></script>
    <script src="js/bird.js"></script>
    <script src="js/triad.js"></script>


    <!-- UI -->
    <script src="js/ui/pause.js"></script>
    <script src="js/ui/replay.js"></script>
    <script src="js/ui/home.js"></script>
    <script src="js/ui/menu.js"></script>
    <script src="js/ui/list.js"></script>
    <script src="js/ui/range.js"></script>
    <script src="js/ui/points.js"></script>
    <script src="js/ui/finish.js"></script>
    <script src="js/ui/sidebar.js"></script>
    <script src="js/ui/checkbox.js"></script>

    <!-- DOM -->
    <script src="js/ui/playlist.js"></script>

    <!-- audio -->
    <script src="js/main.js"></script>
    <script src="js/windowing.js"></script>

</head>
<body>
    <div id="phaser"></div>

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
    ?>

    <div id="list_icon" class="close"></div>
    <div id="playlist" class="close">
    <?php
        foreach($songs as $song){
//            echo '<a href="song.php?name=' . $song . '">' . $song . '</a><br/>';
            echo '<a onclick="playlist.select(\'' . $song . '\')">' . $song . '</a><br/>';
        }
    ?>
    </div>

</body>
</html>
