<!DOCTYPE html>
<html>
<head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
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

</body>
</html>
