<?php
    /**
     * sections db request
     */


    include "config.php";

    $return_arr = array();
    $query = "SELECT * FROM sections";

    $result = mysqli_query($conn,$query);

    while($row = mysqli_fetch_array($result))
    {
        $id = $row['id'];
        $name = $row['name'];
        $description = $row['description'];
        $mandatory = $row['mandatory'];

        // create associative array
        $return_arr[] = array("id" => $id,
                        "name" => $name,
                        "description" => $description,
                        "mandatory" => $mandatory);
    }

    // Encoding array in JSON format
    echo json_encode($return_arr);
?>