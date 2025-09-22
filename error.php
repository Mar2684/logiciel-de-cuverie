<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>Error</title>
</head>
<body>
    <p>
        <?php
            if (isset($_GET['error'])) {
                echo htmlspecialchars($_GET['error']);
            } else {
                echo "Aucune erreur n'a été signalée.";
            }
        ?>
    </p>
    <a href="index.php">Retour à l'accueil</a>
</body>
</html>