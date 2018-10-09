<?php
date_default_timezone_set('Europe/Sofia');
$file = "log.log";
$time = date('Y-m-d H:i:s');
if (isset ($_POST['object'])) {

    $arr = $_POST['object'];

}

$prepend = $time . " Error message: " . $arr['Message'] . " ";

$subject = $arr['Response'] . ' from blockchain.bg';

$fileContents = file_get_contents($file);

$mail = mail("plamenorama@gmail.com", $subject, $prepend);

if ($mail) {
    file_put_contents($file, $prepend . " /E-mail Error/ \n" . $fileContents);
    echo 1;
} else {
    file_put_contents($file, $prepend . $fileContents);
    echo 1;
}