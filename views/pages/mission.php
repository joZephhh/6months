<?php
include "views/partials/head.php";
 ?>
 <div class="responsive-window">
     <h1>Go to desktop or increase your resolution to explore the site</h1>
 </div>
 <header>
     <a href="/experience">
         <div class="title">
             <h1 class="pre-title">Thomas Pesquet's</h1>
             <h3 class="title">6 months odyssey</h3>
         </div>
     </a>
     <ul>
         <li><a href="<?=URL?>experience">Tweets</a></li>
         <li><a href="<?=URL?>mission" class="active">Mission</a></li>
         <li><a href="<?=URL?>biography">Biography</a></li>
         <li><a href="<?=URL?>team">Team</a></li>
     </ul>
 </header>
 <!-- MISSION CONTENT-->
 <div class="container mission">
     <section class="container-content">
         <div class="content">
             <p class="name">The mission</p>
             <p class="description">
            It was named Proxima, in tribute to the closest star to our Sun, which perpetuates the French tradition of baptizing astronauts' missions by the name of a star or a constellation.
            During his mission, Thomas Pesquet will carry out many scientific and pedagogical activities, he will be conducting a wide variety of experiments. This outstanding research outpost is in fact, a true springboard for the human exploration of space.
            </p>
        </div>
        <div class="img-container">
            <img src="<?=URL?>assets/img/proxima-mission.jpg" alt="mission picture">
        </div>
    </section>
</div>

      <!-- SCRIPTS -->
      <script src="<?=URL?>/assets/js/main.min.js" charset="utf-8"></script>
  </body>

  </html>
