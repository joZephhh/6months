<?php
include '../config.php';
// if we ask tweets with a max date
if(!empty($_GET['timestamp'])){
    $query = $pdo->query('SELECT * FROM tweets WHERE date >= '.$_GET['timestamp'].' ORDER BY  `date`  DESC');
    $tweets = $query->fetchAll();
}
// else (retrieve all tweets)
else{
    $query = $pdo->query('SELECT * FROM tweets ORDER BY  `date`  DESC');
    $tweets = $query->fetchAll();
}

$tweets = json_encode($tweets);
die($tweets);
