<?php

include_once '../components/keys.php';

define('CONSUMER_KEY', T_CK);
define('CONSUMER_SECRET', T_CS);
define('ACCESS_TOKEN', T_AC);
define('ACCESS_TOKEN_SECRET', T_ACS);

function request($last_id_tweet){
    global $tweets;
    include_once('twitteroauth/twitteroauth.php');
    $conn = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET);

    if ($last_id_tweet == 0) {
        $query = array(
            "screen_name" => "Thom_astro",
            "count"       => 800,
            "result_type" => "recent",
            "include_rts" => "false",
            "tweet_mode"  => "extended",
        );
    }
    else{
        $query = array(
            "screen_name" => "Thom_astro",
            "count"       => 800,
            "result_type" => "recent",
            "include_rts" => "false",
            "tweet_mode"  => "extended",
            "since_id"    => $last_id_tweet,
        );
    }

    $tweets = $conn->get('statuses/user_timeline', $query);
}
