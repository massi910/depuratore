<?php
    /**
     * db configuration/connection
     */


    $host = 'remotemysql.com:3306';
    $user = 'gPweywPxPn';
    $psw = '25mSgUuLT4';
    $dbName = 'gPweywPxPn';
    $conn = mysqli_connect($host, $user, $psw, $dbName);
    if(! $conn ) 
    {
        die('Could not connect: ' . mysqli_error());
    }
    
?>