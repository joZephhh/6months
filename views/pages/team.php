<?php
include "views/partials/head.php";
?>
<body>
    <div class="responsive-window">
        <h1>Go to desktop or increase your resolution to explore the site</h1>
    </div>
    <header>
        <div class="title">
            <h1 class="pre-title">Thomas Pesquet's</h1>
            <h3 class="title">6 months odyssey</h3>
        </div>
        <ul>
            <li><a href="<?=URL?>experience">Tweets</a></li>
            <li><a href="<?=URL?>mission">Mission</a></li>
            <li><a href="<?=URL?>biography">Biography</a></li>
            <li><a href="<?=URL?>team"  class="active">Team</a></li>
        </ul>
    </header>
    <div class="container">
        <div class="description-pages">
            <div class="description-img team">
                <img src="assets/img/portrait-team.png" alt="portrait-thomas" />
                <div class="description-text">
                    <p class="name about-name">TEAM</p>
                    <p class="description-about">“ Around Thomas Pesquet, a team of experts is there to help him prepare for his departure for the station. ”</p>
                </div>

            </div>
        </div>
      <div class="six-dates">
          <h3>10 EXPERTS</h3>
          <div class="timeline">
              <h2 style="margin-top: 10px;">PEGGY WHITSON</h2>
              <h4>Teammate, Expedition 51 Commander</h4>
              <p>
                  Peggy is one of NASA's most experienced astronauts, having completed two missions and totaling 376 days in space and six extra-vehicle sorties, which lasted over 39 hours. She participated in the construction of the International Space Station.
            </p>
            <h2>OLEG NOVITSKI</h2>
            <h4>Teammate</h4>
            <p>
                Oleg, who has a military career, is a pilot, diver and military parachuting instructor. This will be his second trip to the ISS.
            </p>
            <h2>GUILLAUME WEERTS</h2>
            <h4>Selection Board Member</h4>
            <h2>LUCA ANNICIELLO</h2>
            <h4>Teammate</h4>
            <h2>BRIGITTE GODARD</h2>
            <h4>Doctor</h4>
            <h2>FRANK DE WINNE</h2>
            <h4>Director of the European Astronaut Center</h4>
            <h2>SAMANTHA CRISTOFORETTI</h2>
            <h4>Astronaut</h4>
            <h2>VICTOR DEMARIA-PESCE</h2>
            <h4>Scientific Advisor</h4>
            <h2>HERVE STEVENIN</h2>
            <h4>Instructor</h4>
            <h2>MICHEL TOGNINI</h2>
            <h4>Former Astronaut</h4>
        </div>
    </div>
  </div>
 <script src="<?=URL?>/assets/js/main.min.js" charset="utf-8"></script>
</body>
</html>
