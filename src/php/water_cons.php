<?php
    include 'config.php';

    $return_arr = array();

    $query = 'SELECT * FROM water_cons';
    $result = mysqli_query($conn, $query);
    
    while($row = mysqli_fetch_assoc($result))
        $return_arr[] = $row;
        
    echo json_encode($return_arr);
?>