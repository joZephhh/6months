const url = "http://localhost:8888/";
// const url = "https://6months.space/";

let sixMonths = {};
      // DOM ELEMENTS
      sixMonths.el = {};
      sixMonths.el.loading = document.querySelector(".loading-message");
      sixMonths.el.containerH = document.querySelector(".container.home");
      sixMonths.el.container = document.querySelector(".container.experience");
      sixMonths.el.init = document.querySelector(".cta");

      // DATA
      sixMonths.data= {};
      sixMonths.data.tweets = {};
      sixMonths.data.earth="";
      sixMonths.data.iss_position ="";
      sixMonths.data.markers = [];

    // if we are on experience page
      if (sixMonths.el.container) {
          sixMonths.el.experience_container = sixMonths.el.container.querySelector("#earth_container");
          sixMonths.el.init = sixMonths.el.container.querySelector(".cta");
          sixMonths.el.form = sixMonths.el.container.querySelector(".retrieve-location");
          sixMonths.el.tweet_focus = sixMonths.el.container.querySelector(".tweet-focus");
          sixMonths.el.tweet_focus_close = sixMonths.el.container.querySelector(".tweet-focus .closebtn");
          sixMonths.el.ajustTime = sixMonths.el.container.querySelectorAll(".timeline-el");

          for (var i = 0; i <  sixMonths.el.ajustTime.length; i++) {

               sixMonths.el.ajustTime[i].addEventListener("click", function (e) {
                   e.preventDefault();
                   for (var u = 0; u < sixMonths.data.markers.length; u++) {
                      sixMonths.data.markers[u].removeFrom(sixMonths.data.earth);
                  }
                   sixMonths.data.markers=[];
                   for (var j = 0; j < sixMonths.el.ajustTime.length;j++) {
                       sixMonths.el.ajustTime[j].classList.remove("active");
                   }
                   this.classList.add("active");
                   sixMonths.methods.retrieveTweets(this.getAttribute("soustrat-ts"))
               })
          }

          document.addEventListener("DOMContentLoaded", () => {
              sixMonths.methods.init();
              sixMonths.methods.retrieveTweets(172800);
              sixMonths.methods.current_ISS_position();
              sixMonths.methods.nextMeet();
          })
      }


      // METHODS
      sixMonths.methods = {};
      sixMonths.methods.init = () => {
          // init the webgl earth
          let options = {atmosphere: true, center: [0, 0], zoom: 2.7, sky:true, atmosphere:false, zooming:false};
          sixMonths.data.earth = new WE.map(sixMonths.el.experience_container, options);
          WE.tileLayer('https://tileserver.maptiler.com/nasa/{z}/{x}/{y}.jpg', {
            minZoom: 0,
            maxZoom: 3,
            attribution: 'NASA',
          }).addTo(sixMonths.data.earth);

          // show the relative time since Thomas Pesquet is gone
         sixMonths.el.container.querySelector(".relative-start .start-number").innerText = moment("2016-11-20").fromNow(true);
      }

      // retriev the actual postion of the ISS
      sixMonths.methods.current_ISS_position = () => {
          if (self.fetch) {
              fetch(url+'components/local_api/iss_position.php' )
                  .then((response) => {
                      return response.json()
                  })
                  .then((result) =>{
                    sixMonths.data.iss_position = WE.marker([result.lat,result.long],"assets/img/marker_iss.png").addTo(sixMonths.data.earth);
                    sixMonths.data.earth.panTo([parseInt(result.lat),parseInt(result.long)])
                    sixMonths.data.iss_position.element.classList.add("bigger-icon");
                  })
          }
          else {
              // if browser don't support fetch and promises
              var data = new FormData();
              data.append("", "");
              var xhr = new XMLHttpRequest();
              xhr.withCredentials = true;
              xhr.addEventListener("readystatechange", function () {
                  if (this.readyState === this.DONE) {
                      result = JSON.parse(this.responseText)
                      sixMonths.data.iss_position = WE.marker([result.lat,result.long],"assets/img/marker_iss.png").addTo(sixMonths.data.earth);
                      sixMonths.data.earth.panTo([parseInt(this.lat),parseInt(this.long)])
                      sixMonths.data.iss_position.element.classList.add("bigger-icon");
                  }
              });
              xhr.open("GET", url+'components/local_api/iss_position.php');
              xhr.send(data);
          }
    };

    //place markers arround the globe
    sixMonths.methods.placeItems = () => {
        for (let i = 0; i < sixMonths.data.tweets.length ; i++) {
           let marker = WE.marker([sixMonths.data.tweets[i].lat, sixMonths.data.tweets[i].long],"assets/img/marker_0.png").addTo(sixMonths.data.earth);
           sixMonths.data.markers.push(marker);
       }
       for (var i = 0; i < sixMonths.data.markers.length; i++) {
           var popup_container = document.createElement("div");
           popup_container.classList.add("popup-container");
           var popup_content = document.createElement("div");
           popup_content.classList.add("popup-container-content");
           var popup_tweet = document.createElement("p");
           popup_tweet.classList.add("popup-tweet");
           var text = sixMonths.data.tweets[i].text
           text = text.split("http");
           text = text[0];
           popup_tweet.innerText= text;
           var popup_author = document.createElement("p");
           popup_author.classList.add("popup-author");
           popup_author.innerText="@ThomasPesquet";
           popup_content.appendChild(popup_tweet);
           popup_content.appendChild(popup_author);
           popup_container.appendChild(popup_content);
           sixMonths.data.markers[i].element.appendChild(popup_container);
           sixMonths.data.markers[i].element.setAttribute("index",i);

            // events on markers
            sixMonths.data.markers[i].element.querySelector(".we-pm-icon").addEventListener("mouseenter", function(e) {
                e.preventDefault();
                this.style.backgroundImage="url('../assets/img/marker_1.png')";
                this.parentElement.querySelector(".popup-container").classList.add("active");
            });

            sixMonths.data.markers[i].element.querySelector(".we-pm-icon").addEventListener("mouseleave", function(e) {
                e.preventDefault();
                this.style.backgroundImage="url('../assets/img/marker_0.png')";
                this.parentElement.querySelector(".popup-container").classList.remove("active");
            });

            sixMonths.data.markers[i].element.querySelector(".we-pm-icon").addEventListener("click", function(e) {
                var id = this.parentElement.getAttribute("index");
                var parseT = sixMonths.data.tweets[id].text.split(" ");
                var text = "";
                // parse the tweet to retrive links and hashtag
                for (var i = 0; i < parseT.length; i++) {
                    if (parseT[i][0] == "@") {
                        text += ' <a class="mention" target ="_blank" href="https://twitter.com/'+parseT[i].replace("!","").replace("-","")+'">'+parseT[i].replace("!","").replace("-","")+'</a>';
                    }
                    else if (parseT[i][0] == "#") {
                        text += ' <a class="hashtag" target ="_blank" href="https://twitter.com/hashtag/'+parseT[i].substr(1,parseT[i].length).replace("!","").replace("-","")+'">'+parseT[i]+'</a>';
                    }
                    else if (parseT[i][0]=="h" && parseT[i][1] == "t" && parseT[i][2]=="t") {
                        text += ' <a class="link" target ="_blank" href="'+parseT[i]+'">'+parseT[i]+'</a>';
                    }
                    else {
                        text += " "+parseT[i];
                    }
                }

                // append the parsed text
                sixMonths.el.tweet_focus.querySelector(".description").innerHTML=text;

                // if the tweet contains an image or fallback
                if (sixMonths.data.tweets[id].img) {
                    var imgToSSL = sixMonths.data.tweets[id].img.split("http");
                    imgToSSL = "https"+imgToSSL[1]; // move to https
                    sixMonths.el.tweet_focus.querySelector(".image-tweet img").setAttribute("src", imgToSSL);
                }
                else {
                    sixMonths.el.tweet_focus.querySelector(".image-tweet img").setAttribute("src", "../../assets/img/earth.png");
                }

                sixMonths.el.tweet_focus.querySelector(".date").innerText=moment.unix(sixMonths.data.tweets[id].date).fromNow();
                sixMonths.el.tweet_focus.querySelector(".nb-rt").innerText=sixMonths.data.tweets[id].rt+ " rt";
                sixMonths.el.tweet_focus.querySelector(".nb-fav").innerText=sixMonths.data.tweets[id].like+" fav";

                sixMonths.el.tweet_focus.classList.add("active");
            });

            sixMonths.el.tweet_focus_close.addEventListener("click", function(e) {
                sixMonths.el.tweet_focus.classList.remove("active");
            });
        }

        // close the tweet panel when user press echap
        document.addEventListener("keyup", (e) => {
            if(e.code=="Escape") {
                sixMonths.el.tweet_focus.classList.remove("active");
            }
        })
  };

        sixMonths.methods.nextMeet = () => {
          // meet with ISS with the coords of ISS
          var data = window.localStorage.getItem("6m-data");
          data = JSON.parse(data);
          var lat = data.lat;
          var lon = data.lon;
          if(self.fetch) {
          fetch(url+'components/local_api/iss_position.php?lat='+lat+'&lon='+lon)
            .then((response) =>{
                return response.json()
            })
            .then((result) =>{
                let current = moment().format("X");
                // compare unixs timestamp
                let numberEl=  sixMonths.el.container.querySelector(".next-time-numbers");
                if (result.timestamp - current > 0) {
                    sixMonths.el.container.querySelector(".next-time-text").innerText="the position of the ISS will cross yours";
                }
                else  {
                    sixMonths.el.container.querySelector(".next-time-text").innerText="the position of the ISS has crossed yours";
                }
                var convertToDate =  moment.unix(result.timestamp).format();
                numberEl.innerText =  moment(convertToDate).fromNow();
            })
        }
        else {
            // if browser don't support fetch and promises
            var data = new FormData();
            data.append("", "");
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;
            xhr.addEventListener("readystatechange", function () {
              if (this.readyState === this.DONE) {
                result = JSON.parse(this.responseText);
                let current = moment().format("X");
                // compare unixs timestamp
                let numberEl=  sixMonths.el.container.querySelector(".next-time-numbers");
                if (this.responseText.timestamp - current > 0) {
                    sixMonths.el.container.querySelector(".next-time-text").innerText="the position of the ISS will cross yours";
                }
                else  {
                    sixMonths.el.container.querySelector(".next-time-text").innerText="the position of the ISS has crossed yours";
                }
                var convertToDate =  moment.unix(result.timestamp).format();
                numberEl.innerText =  moment(convertToDate).fromNow();
              }
            });
            xhr.open("GET", url+'components/local_api/iss_position.php?lat='+lat+'&lon='+lon);
            xhr.send(data);
        }
      }

      // retrieve all saved tweets
      sixMonths.methods.retrieveTweets = (timestamp) => {
          var current = parseInt(moment().format("X"))-timestamp ;
          if (self.fetch) {
          fetch(url+'components/local_api/tweets.php?timestamp='+current )
            .then((response) =>{
                return response.json()
              })
            .then((result) =>{
                sixMonths.data.tweets = result;
                sixMonths.methods.placeItems();
            })
        }
        else {
            // if browser don't support fetch and promises
            var data = new FormData();
            data.append("", "");
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;
            xhr.addEventListener("readystatechange", function () {
              if (this.readyState === this.DONE) {
                  sixMonths.data.tweets = JSON.parse(this.responseText);
                  sixMonths.methods.placeItems();
              }
            });
            xhr.open("GET", url+'components/local_api/tweets.php?timestamp='+current);
            xhr.send(data);
        }
      }


      // if the current page is home
      if (sixMonths.el.init) {
          // animation homepage
          sixMonths.el.init.addEventListener("mouseenter", (e) => {
              e.preventDefault();
              sixMonths.el.containerH.classList.add("isHover");
          })

          sixMonths.el.init.addEventListener("mouseleave", (e) => {
              e.preventDefault();
             sixMonths.el.containerH.classList.remove("isHover");
          })

          // retrieve user location and save it for 3 hours
          sixMonths.el.init.addEventListener("click", (e) => {
              e.preventDefault();
              // if cache is up to date
              if(parseInt(window.localStorage.getItem("6m-exp")) > moment().format("X")) {
                  var data = window.localStorage.getItem("6m-data");
                  data = JSON.parse(data);
                  var lat = data.lat;
                  var lon = data.lon;
                  window.location.href = url+"experience";
              }
             //  if the browser have HTML5 Geolocation API
             else if (navigator.geolocation) {
                 sixMonths.el.containerH.classList.add("loading");
                 sixMonths.el.loading.classList.add("active");
                 navigator.geolocation.getCurrentPosition((position) => {
                     window.localStorage.setItem("6m-exp", parseInt(moment().format("X"))+10800);
                     var data ={
                         lat : position.coords.latitude,
                         lon : position.coords.longitude
                     };
                     data = JSON.stringify(data);
                     window.localStorage.setItem("6m-data",data);
                     window.location.href = url+"experience";
                 }, () => {
                      // if the user don't want to be localized
                      window.localStorage.setItem("6m-exp", parseInt(moment().format("X"))+10800);
                      var data ={
                          lat :48.85,
                          lon : 2.34
                      };
                      data = JSON.stringify(data);
                      window.localStorage.setItem("6m-data",data);
                      alert("The position of Paris has been assigned to you");
                      window.location.href = url+"experience";
                  });
              } else {
                  // fallback : paris coords
                  console.log("Not support in your browser");
                  window.localStorage.setItem("6m-exp", parseInt(moment().format("X"))+10800);
                  var data ={
                      lat :48.85,
                      lon : 2.34
                  };
                  data = JSON.stringify(data);
                  window.localStorage.setItem("6m-data",data);
                  alert("The position of Paris has been assigned to you");
                  window.location.href = url+"experience";
              }
          })
      }
      else if (sixMonths.el.container) {
         sixMonths.el.container.classList.add("loaded");
      }
