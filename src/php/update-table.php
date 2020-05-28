<?php

    /**
     * Function to update one or more tuple in the given table
     * 
     * $table_name: the name of the table to be updated
     * $conn: the db connection
     * 
     */
    function updateTuple($table_name, $conn)
    {
        //Make sure that it is a POST request.
        if(strcasecmp($_SERVER['REQUEST_METHOD'], 'POST') != 0)
        {
            throw new Exception('Request method must be POST!');
        }
        
        //Receive the RAW post data.
        $content = trim(file_get_contents("php://input"));
        
        //Attempt to decode the incoming RAW post data from JSON.
        $decoded = json_decode($content, true);
        
        //If json_decode failed, the JSON is invalid.
        if(!is_array($decoded))
        {
            throw new Exception('Received content contained invalid JSON!');
        }


        $format = 
            '
            UPDATE %s
            SET %s
            WHERE id = %s;
            ';

        $total = count($decoded);
        $updated = 0;

        foreach ($decoded as $i => $arr)    // for each row
        {
            $id = $arr['id'];
            $setter = '';
            foreach ($arr as $key => $value)    // for each column
            {
                $temp = $value;
                if (is_bool($value)){
                    $temp = $value ? 'true' : 'false';
                }
                elseif ($value == 'false' || $value == 'true') {
                    $temp = $value == 'true' ? 'true' : 'false';
                }
                elseif (is_numeric($temp)) {
                    
                }
                else {
                    $temp = "'" . $temp . "'"; 
                }
                $setter = $setter . $key  . '=' . $temp  .',';
            }
            $setter = substr($setter, 0, -1);   // remove last comma
            
            $query = sprintf($format, $table_name, $setter, $id);    // build query
            //error_log($query);

            if ($conn->query($query) === TRUE)
            {
                //echo "Record with id: " . $id . " updated successfully; ";
                $updated++;
            }
            else
            {
                echo "Error updating record: " . $id . " " . $conn->error;
            }
        }
        
        echo "total tuple: " . $total . " | updated tuple: " . $updated;
        
        $conn->close();
    }
?>