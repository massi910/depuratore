<?php
    /**
     * monitoring items db request
     */


    include "config.php";

    $return_arr = array();
    $query = "SELECT * FROM mnt_items";

    $result = mysqli_query($conn,$query);

    while($row = mysqli_fetch_array($result))
    {
        $id = $row['id'];
        $name = $row['name'];
        $description = $row['description'];
        $b_status = $row['b_status'];
        $b_alarm = $row['b_alarm'];
        $b_manual = $row['b_manual'];
        $section_id = $row['section_id'];

        // create associative array
        $return_arr[] = array(
                        "id" => $id,
                        "name" => $name,
                        "description" => $description,
                        "b_status" => $b_status,
                        "b_alarm" => $b_alarm,
                        "b_manual" => $b_manual,
                        "section_id" => $section_id
                    );
    }

    // Encoding array in JSON format
    echo json_encode($return_arr);
?>