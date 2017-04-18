<?php
 $q = isset($_GET["q"]) ? $_GET["q"]  : '';

 if ($q == '') {
     $page="home";
 }
 elseif ($q=="experience") {
     $page="experience";
 }
 elseif ($q=="mission") {
     $page="mission";
 }
 elseif ($q=="biography") {
     $page="biography";
 }
 elseif ($q=="team") {
     $page="team";
 }
 else {
    $page = '404';
}

include 'views/pages/'.$page.'.php';
