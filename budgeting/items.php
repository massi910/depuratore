<?php
    /**
     * sections db request
     */


    include "config.php";

    $return_arr = array();
    $query = "SELECT * FROM items";

    $result = mysqli_query($conn,$query);

    while($row = mysqli_fetch_array($result))
    {
        $id = $row['id'];
        $name = $row['name'];
        $description = $row['description'];
        $price = $row['price'];
        $section = $row['section'];

        // create associative array
        $return_arr[] = array("id" => $id,
                        "name" => $name,
                        "description" => $description,
                        "price" => $price,
                        "section" => $section
                    );
    }

    // Encoding array in JSON format
    echo json_encode($return_arr);
?>