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
      <div class="recherche" style="margin-right: 10vw;">
        <input type="text" name="numéroLot" id="num_lot" placeholder=" ">
        <label for="num_lot">Numéro de lot</label>
        <input id="buttonRechercheLot" onclick="getNumLot()" type="button" value="Rechercher">
      </div>
      <div class="recherche">
        <input type="text" name="numéroCuve" id="num_cuve" placeholder=" ">
        <label for="num_cuve">Numéro de cuve</label>
        <input id="buttonRechercheCuve" onclick="getNumCuve()" type="button" value="Rechercher">
      </div>
    </div>
    <table>
      <thead>
        <tr>
            <th id="col_1"></th>
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
    <tbody id="traçabilité_table">
    </tbody>
    </table>
  </body>
</html>