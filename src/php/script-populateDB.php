<?php
    include 'config.php';

    $utenze = array(2,3,4,5,6,7,8,9,10,11,12,13);
    $date = array("2020-05-02","2020-05-03","2020-05-04","2020-05-05","2020-05-06","2020-05-07","2020-05-08");
    
    foreach ($utenze as $utenza) {
        foreach ($date as $data) {
            $cons = rand(0,100);
            $query = "INSERT INTO consumptions (id_item, id_unit, cons, date) VALUES ($utenza, 1, $cons, '$data')";
            if(mysqli_query($conn, $query)){
                echo "Records added successfully.";
            } else{
                echo "ERROR: Could not able to execute $query. " . mysqli_error($conn);
            }
        }
    }
?>