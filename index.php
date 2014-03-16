<!DOCTYPE html>
<html>
<head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
</head>
<body>

<?php
    if ($handle = opendir('xml/')) {
        while (false !== ($entry = readdir($handle))) {
            if ($entry != "." && $entry != "..") {
                $name = explode('.', $entry);
                $name = $name[0];
                echo '<a href="song.php?name='.$name.'">'.$name.'</a><br/>';
            }
        }
        closedir($handle);
    }
?>

</body>
</html>
