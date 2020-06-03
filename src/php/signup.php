<?php
    include 'config.php';
    
    $email = $_POST['inputEmail'];
    $password = $_POST['inputPassword'];

    $return_arr = array();
    $query = sprintf("SELECT * FROM users WHERE email='%s'", mysqli_real_escape_string($conn, $email));
    $result = mysqli_query($conn, $query);

    if($line = mysqli_fetch_array($result))
    {
        echo "L'email è già in uso";
    }
    else
    {
        $query = sprintf("INSERT INTO users (email, password) VALUES ('%s', '%s')", mysqli_real_escape_string($conn, $email), mysqli_real_escape_string($conn, $password));
        if(mysqli_query($conn, $query)){
            header('Location: ../__/login/login.html');
            exit();
        } else{
            echo "ERROR: Could not able to execute $query. " . mysqli_error($conn);
        }
    }
?>