<?php
    /**
     * update table items
     */

    include "config.php";
    include "update-table.php";


    // mnt_items tuple update
    updateTuple("water_cons", $conn);
?>