<?php
    /**
     * monitoring sections db request
     */


    include "config.php";

    $return_arr = array();
    $query = "SELECT * FROM mnt_sections";

    $result = mysqli_query($conn,$query);

    while($row = mysqli_fetch_array($result))
    {
        $id = intval($row['id']);
        $name = $row['name'];
        $description = $row['description'];

        // create associative array
        $return_arr[] = array(
                        "id" => $id,
                        "name" => $name,
                        "description" => $description,
                    );
    }

    // Encoding array in JSON format
    echo json_encode($return_arr);
?>