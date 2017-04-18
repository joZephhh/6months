<?php
include "views/partials/head.php";
?>
<script src="https://www.webglearth.com/v2/api.js" charset="utf-8"></script>
<body>
    <div class="responsive-window">
        <h1>Go to desktop or increase your resolution to explore the site</h1>
    </div>
    <div class="container experience">
        <header>
            <a href="/experience">
                <div class="title">
                    <h1 class="pre-title">Thomas Pesquet's</h1>
                    <h3 class="title">6 months odyssey</h3>
                </div>
            </a>
            <ul>
                <li><a href="<?=URL?>mission" class="active">Tweets</a></li>
                <li><a href="<?=URL?>mission">Mission</a></li>
                <li><a href="<?=URL?>biography">Biography</a></li>
                <li><a href="<?=URL?>team">Team</a></li>
            </ul>
        </header>

        <!-- DATA ON ISS AND THOMAS PESQUET -->
        <div class="data-ISS">
            <div class="next-time">
                <p class="next-time-numbers">loading</p>
                <p class="next-time-text">retrieve your postion</p>
            </div>
            <div class="relative-start">
                <p class="start-number">loading</p>
                <p class="start-text">since Thomas Pesquet is aboard the ISS</p>
            </div>
        </div>

        <!-- CANVAS RENDERING -->
        <div id="earth_container"></div>

        <!-- MOVE IN TIME -->
        <div class="timeline-container">
            <a href="#" class="timeline-el active" soustrat-ts =172800>48H</a>
            <a href="#" class="timeline-el" soustrat-ts="604800">1W</a>
            <a href="#" class="timeline-el" soustrat-ts="1209600">+2W</a>
        </div>

        <!-- TWEET FOCUS -->
        <div class="tweet-focus">
            <section class="tweets">
                <div class="content">
                    <div class="profile">
                        <span class="profile-picture"><img src="../../assets/img/pp_thomas_pesquet.jpg" alt='profile-picture-thomas-pesquet'></span>
                        <span class="profile-name">@Thom_astro</span>
                    </div>
                    <div>
                        <p class="name">Thomas Pesquet</p>
                        <p class="description"><!-- Dynamic--></a></p>
                        <p class="date"><!-- Dynamic--> </p>
                    </div>
                    <div class="image-tweet">
                        <img src="" alt="image-twitter-thomas-pesquet">
                        <h6><span class="nb-rt"><!-- Dynamic--></span><span class="nb-fav"><!-- Dynamic--></span></h6>
                    </div>
                </div>
            </section>
            <span class="closebtn" style="cursor:pointer;"><i class="fa fa-long-arrow-down" aria-hidden="true"></i></span>
        </div>
    </div>

    <!-- SCRIPTS -->
    <script src="<?=URL?>/assets/js/main.min.js" charset="utf-8"></script>
</body>
</html>
