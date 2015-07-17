<?php

   $json = $_POST['json'];

   if (json_decode($json) != null) {
     $file = fopen('json/rapid_data.json','w');
     fwrite($file, $json);
     fclose($file);
   } else {
     echo "error writing file";
   }

?>
