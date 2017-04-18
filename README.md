# 6months
#### 6months.space is a live web experience about the Thomas Pesquet's ISS journey.
![alt text](https://github.com/jozephhh/6months/raw/master/screenshots/screenshot.png "Website screenshot")

###### Online version here : https://6months.space

## Install the project

#### Configure routes
Go to **components/config.php** at root directory and edit the `URL` variable, same thing in **src/js/main.js** edit the const `url`. You will need to build the assets to apply the changes, to do that run the following command : `gulp` in the /builder directory, you might be ask to install the dev dependencies.

#### Configure apis key and sensible data
Go to **components/** directory and create a file named `keys.php` and then enter the following lines with the differents key you must request :

````
-----------------------------------
// Database
// you can easily create the tweet table, by import to your database '6months_space.sql' (there is already some tweets to test)

define('DTB_HOST','your database host');
define('DTB_NAME','your database name');
define('DTB_USER','your database user');
define('DTB_PASS','your database password');

-----------------------------------
// Twitter Api
// https://dev.twitter.com/overview/api

define('T_CK','your consumer key');
define('T_CS','your consumer secret');
define('T_AC','your access token');
define('T_ACS','your access token secret');

-----------------------------------
// Google Geocode API
// https://developers.google.com/maps/do…

define('GG_KEY', 'your key');

````
Other APIs works without keys or tokens



## Edit the project

The project is build with Gulp. You will need to install globally nodejs, npm and gulp-cli.

Once it's done, with your terminal, go to the cloned github directory :
````
cd 6months/builder
````
 and run the command line `npm install` in the directory. This will install all the development dependencies.

## Features
- ISS marker position
- Pages routing
- User position (3 hours cache) compared to ISS position, and next time they will be close
- Relative Thomas Pesquet's time in ISS
- Thomas Pesquet's tweets arround the earth with the relative position
- Tweet theather/details mode
- Sort tweet by time
- Story of Thomas Pesquet and its team
- **Micro API Service** (only return on request what the website really need);


#### Roadmap :
- Clean API routing
- Pin data from other people in the ISS


 ## Built with

 - HTML5/SASS (to CSS3)
 - JavaScript
    - WebGL, earth librairy : http://www.webglearth.com/
    - Moment.js : https://momentjs.com/
 - Gulp.js v4.0
 - PHP
 - APIs
    - Open Notify : http://api.open-notify.org/
    - Where the iss at : http://wheretheiss.at/w/developer
    - Google Geocoding : https://developers.google.com/maps/documentation/geocoding/intro?hl=fr
    - Twitter API : https://dev.twitter.com/rest/public


## Contributors

- Joseph Quercia : https://josephquercia.fr
- Charlotte Sieess : https://github.com/CharlotteSieess
- Nicolas Bernaux : https://www.nicolas-bernaux.com
- Paul Perrier : https://www.behance.net/paulperrie67c5
- Antoine de la Fourchardière : http://antoinedlf.com
- Louis Ghodsi : _Behance in construction_
