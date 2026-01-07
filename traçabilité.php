<div id="container1">
  <div class="recherche" style="margin-right: 10vw;">
    <select id="select_numLot" required><option value="">-- Choisir un numéro de lot --</option></select>
    <input id="buttonRechercheLot" onclick="getNumLot()" type="button" value="Rechercher">
  </div>
  <div class="recherche">
    <select id="select_numCuve" required><option value="">-- Choisir une cuve--</option></select>
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