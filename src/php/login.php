<?php
    include 'config.php';
    
    $email = $_POST['inputEmail'];
    $password = $_POST['inputPassword'];

    $return_arr = array();
    $query = sprintf("SELECT * FROM users WHERE email='%s'", mysqli_real_escape_string($conn, $email));
    $result = mysqli_query($conn, $query);

    if(!($line = mysqli_fetch_array($result)))
    {
        echo 'Not a registered user';
    }
    else
    {
        $query = sprintf("SELECT * FROM users WHERE email='%s' AND password='%s'", mysqli_real_escape_string($conn, $email), mysqli_real_escape_string($conn, $password));
        $result = mysqli_query($conn, $query);
        if(!($line = mysqli_fetch_array($result)))
        {
            echo '
            <script>
                alert("Password errata. Riprova")
                window.location="../__/login/login.html"
            </script>';
        }
        else
        {
            header('Location: ../__/monitoring/monitoring.html');
        }
    }
?>