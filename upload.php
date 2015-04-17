<?php
$storeFolder = 'xml';   
if (!empty($_FILES)) {
    $tempFile = $_FILES['file']['tmp_name'];                  
    $targetPath = dirname( __FILE__ ) . '/'. $storeFolder . '/';      
    $targetFile =  $targetPath. $_FILES['file']['name'];  

    $mime = mime_content_type ( $tempFile );    
    if($mime === 'application/xml'){
    	move_uploaded_file($tempFile, $targetFile); 
	}

 //    $myfile = fopen("xml/newfile.txt", "w") or die("Unable to open file!");
	// fwrite($myfile, $mime);
	// fclose($myfile);
}

if($_GET['delete'] && file_exists('xml/'.$_GET['delete'])){
	unlink('xml/'.$_GET['delete']);
}

?> 

<!DOCTYPE html>
<html>
<head>
    <title>Upload MusicXML files</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">

    <!-- MIDI.js -->
    <script src="js/dropzone.js" type="text/javascript"></script>
    <script src="//code.jquery.com/jquery-1.11.2.min.js"></script>
</head>
<body>

	<?php

    $dir = 'xml/';
    $songs = array();
    if ($handle = opendir($dir)) {
        while (false !== ($entry = readdir($handle))) {
            if ($entry != "." && $entry != ".." && !is_dir($dir.$entry)) {
                array_push($songs, $entry);
            }
        }
        closedir($handle);
    }

    sort($songs);
    ?>

    <div id="filelist">
    <?php
        foreach($songs as $song){
            echo $song . ' <a href="?delete='.$song.'" onclick="return window.confirm(\'Do you really want to delete this file?\');"><img src="assets/close_icon.png"/></a><br/>';
        }
    ?>
    </div>


	<div id="drop">Drag MusicXML file here</div>

<script>
	window.onload = function(){
		var list = $('#filelist');
		var myDropzone = new Dropzone("div#drop", { url: "upload.php"});

		myDropzone.on("complete", function(file) {
			list.append(file.name + '<a href="?delete='+file.name+'" onclick="return window.confirm(\'Do you really want to delete this file?\');"><img src="assets/close_icon.png"/></a><br/>');
		  	myDropzone.removeFile(file);
		});
	}
</script>

<style>
#drop {
	width: 500px;
	height: 130px;	
	margin: 0 auto;
	margin-top: 100px;
	background-color: #eed090;
	color: #a55d35;
	font-family: Arial;
	text-align: center;
	border-radius: 20px;
	padding-top: 100px;
	font-weight: bold;
	border: 3px #805700 dashed;
}

#drop:hover {
	background-color: #c6ab70;
}

#filelist {
	width: 300px;
	position: absolute;
	top: 0px;
	left: 0px;
	font-size: 16px;
}
</style>


</body>
</html>