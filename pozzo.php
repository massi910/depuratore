<?php

    // This PHP script must be in "SOME_PATH/jsonFile/index.php"

    $file = 'status.json';

    if($_SERVER['REQUEST_METHOD'] === 'POST')
    // or if(!empty($_POST))
    {
        // $jsondata = file_get_contents($file);
        // $post = json_decode(file_get_contents('php://input'), true);
        // file_put_contents($jsondata, $post);
        // echo json_encode($jsondata);

        $post = file_get_contents('php://input');
        
        $fp = fopen($file, 'w');
        fwrite($fp, $post);
        fclose($fp);
        
        $jsondata = file_get_contents($file);
        $return_arr = json_decode($jsondata, true);
        echo json_encode($return_arr);
    }
    else if($_SERVER['REQUEST_METHOD'] === 'GET')
    // or else if(!empty($_GET))
    {
        $jsondata = file_get_contents($file);
        $return_arr = json_decode($jsondata, true);
        echo json_encode($return_arr);
    }
?>