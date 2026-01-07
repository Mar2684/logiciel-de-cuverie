<!-- essai -->
<?php
    if (!isset($_GET["page"])) {
        $_GET["page"] = "cuve";
    }
?>
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <?php
        if (isset($_GET["page"])) {
            echo "<link rel='stylesheet' href='".$_GET["page"].".css'>";
        }
    ?>
    <title>Gestion cuverie</title>
  </head>
  <body>
    <header>
        <a href="index.php?page=cuve" id="accueil">Accueil</a>
        <a href="index.php?page=historique" id="historique">Historique</a>
        <a href="index.php?page=traçabilité" id="traçabilité">Traçabalité</a>
        <p id="adresse_bd">https://phpmyadmin.cluster030.hosting.ovh.net/index.php?pma_username=qrchwexmarius&pma_servername=qrchwexmarius.mysql.db</p>
    </header>
    <main>
        <?php
            if (isset($_GET["page"])) {
                    $page = $_GET["page"];
                    if (file_exists($page . ".php")) {
                        include($page . ".php");
                    } else {
                        echo "<p>Page non trouvée.</p>";
                    }
                }
        ?>
    </main>
    <?php
        if (isset($_GET["page"])) {
            echo "<script type='module' src='".$_GET["page"].".js'></script>";
        }
    ?>
  </body>
</html>