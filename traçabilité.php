<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Titre de la page</title>
    <link rel="stylesheet" href="traçabilité.css">
  </head>
  <body>
    <div id="container1">
      <input type="text" name="numéroLot" id="num_lot">
      <label for="numéroLot">Numéro de lot</label>
      <input id="buttonRecherche" type="button" value="Rechercher">
    </div>
    <table id="traçabilité_table">
      <thead>
        <tr>
            <th>Date d'enregistrement</th>
            <th>Type de l'action</th>
            <th>Cuve_départ</th>
            <th>Cuve arrivée</th>
            <th>Volume/quantité</th>
            <th>Libellé</th>
            <th>Numéro de lot</th>
            <th>Appellation</th>
            <th>Cépage</th>
            <th>Parcelle</th>
        </tr>
    </thead>
    </table>
  </body>
</html>