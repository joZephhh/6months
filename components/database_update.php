<?php


//connect to the data base
require("config.php");

//Api twitter
require("twitter_api/config_twitter.php");

set_time_limit(1000);


//pick database informations in date order
$query    = $pdo->query('SELECT * FROM `tweets` ORDER BY `date` DESC');
$tweet_db = $query->fetchAll();


//function twitter api
request($tweet_db[0]->id_tweet); //In parametre the id of the last tweet in the data base


// test if new tweet(s)
if(!empty($tweets)) {
    foreach($tweets as $key => $_tweet){
        if ($_tweet->lang == 'en'){
            sql_add_request($_tweet);
        }
    }
}

//function twitter api
request(0);//In parametre 0 to pick all the tweets
foreach ($tweet_db as $key => $_tweet_db) {
    foreach ($tweets as $_tweet) {
        if ($_tweet_db->id_tweet == $_tweet->id_str) {
            sql_update_request($_tweet); //function to update like and rt
        }
    }
}


//function to put data in the data base
function sql_add_request($_tweet){
    global $prepare,$pdo;

    //tweet hour in timestamp
    $tweet_date = new DateTime($_tweet->created_at);
    $tweet_date = $tweet_date->format("U");


        //pdo request to add data
        $prepare = $pdo->prepare('INSERT INTO `tweets` (`id_tweet`, `text`, `rt`, `like`, `date`, `img`, `city`, `lat`, `long`) VALUES (:id_tweet, :text, :rt, :like, :date, :img, :city, :lat, :long)');

        $prepare->bindValue(':id_tweet', $_tweet->id_str );
        $prepare->bindValue(':text',     $_tweet->full_text );
        $prepare->bindValue(':rt',       $_tweet->retweet_count );
        $prepare->bindValue(':like',     $_tweet->favorite_count );
        $prepare->bindValue(':date',     $tweet_date);
        $prepare->bindValue(':city',     $_tweet->place != null ? $_tweet->place->name : '' );
        $prepare->bindValue(':img',      isset($_tweet->entities->media[0]->media_url) ? $_tweet->entities->media[0]->media_url : '' );
        $prepare->bindValue(':lat',      $_tweet->place != null ? google_api($_tweet->place->name,'lat') : no_loc($tweet_date)->lat);
        $prepare->bindValue(':long',     $_tweet->place != null ? google_api($_tweet->place->name,'lng') : no_loc($tweet_date)->long);

        $prepare->execute();

}


// if tweet contain city, this give the lat and the long of it
function google_api($c,$l){
    global $url, $tweet_infos;
    $city   =  str_replace(' ', '%20', $c);
    $url    = 'https://maps.googleapis.com/maps/api/geocode/json?address='.$city.'&key='.GG_KEY;
    $tweet_ = file_get_contents($url);
    $tweet_ = json_decode($tweet_);
    return $tweet_->results[0]->geometry->location->$l;
}

//if tweet don't contain city we shearch the position of ISS at the creating time of the tweet
function no_loc($tweet_date){
    return json_decode(file_get_contents('https://6months.space/components/local_api/iss_position.php?timestamp='.$tweet_date ));
}

//function to update the tweets and rt
function sql_update_request($tweet){
    global $prepare,$pdo;


    //pdo request to add data
    $prepare = $pdo->prepare(' UPDATE `tweets` SET rt = :rt , `like` = :like WHERE id_tweet = :id_tweet');

    $prepare->bindValue(':id_tweet', $tweet->id_str );
    $prepare->bindValue(':rt',       $tweet->retweet_count );
    $prepare->bindValue(':like',     $tweet->favorite_count );

    $prepare->execute();

}

die('End');
