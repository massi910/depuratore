<?php
    /**
     * update table phases
     */

    include "config.php";
    include "update-table.php";


    // mnt_items tuple update
    updateTuple("phases", $conn);
?>