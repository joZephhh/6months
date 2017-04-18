<?php
$issPosition ="";
$timestamp="";

// the request has no parameters
if (empty($_GET)) {
    $issPosition = file_get_contents("https://api.wheretheiss.at/v1/satellites/25544/");
    $issPosition = json_decode($issPosition);
    $result = (object) [
    'lat' => $issPosition->latitude,
    'long' => $issPosition->longitude,
  ];
}

// if we ask with a timestamp
else if (array_key_exists("timestamp", $_GET)) {
    $timestamp = intval($_GET["timestamp"]);
    $url = "https://api.wheretheiss.at/v1/satellites/25544/positions?timestamps=$timestamp";
    $issPosition = file_get_contents($url);
    $issPosition = json_decode($issPosition);
    $result = (object) [
    'lat' => $issPosition[0]->latitude,
    'long' => $issPosition[0]->longitude,
  ];
}

// if the we ask the next time he will pass overhead user head
else if (array_key_exists("lat", $_GET) && array_key_exists("lon", $_GET)) {
    //substr for api restriction string length
    $lat = substr($_GET["lat"],0,-1);
    $lon = substr($_GET["lon"],0,-1);
    // $lat = intval($_GET["lat"]);
    // $lon = intval($_GET["lon"]);

    // retrieve position
    $url = "http://api.open-notify.org/iss-pass.json?lat=$lat&lon=$lon";
    $distance= file_get_contents($url);
    $distance= json_decode($distance);
    $result = (object) [
    'timestamp' => $distance->response[0]->risetime,
  ];


}

// encode the result
$result = json_encode($result);

// show it
die($result);
