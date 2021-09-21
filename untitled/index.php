<?php
$scriptList = array("js/jquery3.3.js", "./js/Carousel.js");
$currentPage = basename($_SERVER['PHP_SELF']); include("header.php");
?>

        <main>
            <p>
                Welcome to Classic Cinema, your online store for classic film.
            </p>
            <div id="carousel"></div>
        </main>

        <?php include ("footer.php"); ?>

    </body>
</html>