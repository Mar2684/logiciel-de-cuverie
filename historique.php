<table>
    <caption>Historique des enregistrements</caption>
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
    <tbody>
        <?php   
            $link = mysqli_connect('127.0.0.1', 'root', '', 'cuverie');
            if (!$link) {
                echo "<p>Erreur de connexion : " . mysqli_connect_error() . "</p>";
            } else {
                $request_sql = 
                "
                SELECT 
                    actions.date_action, 
                    actions.type_action, 
                    COALESCE(
                        ajout_intrant.cuve_apport, 
                        transfert_de_cuve.cuve_départ,
                        mise_en_bouteille.cuve_départ, 
                        sortie_lie.cuve_départ, 
                        apport_de_vendanges.cuve_apport,
                    '/') AS cuve_départ,
                    IFNULL(transfert_de_cuve.cuve_arrivée, '/') AS cuve_arrivée,
                    COALESCE(
                        CONCAT(ajout_intrant.quantité, ' kg'),
                        CONCAT(apport_de_vendanges.quantité, ' kg'),
                        CONCAT(mise_en_bouteille.volume, ' hL'),
                        CONCAT(sortie_lie.volume, ' hL'),
                        CONCAT(transfert_de_cuve.volume, ' hL'),
                    '/') AS volume_quantité,
                    IFNULL(ajout_intrant.libellé, '/') AS libellé,
                    IFNULL(mise_en_bouteille.numéro_lot, '/') AS numéro_lot,
                    COALESCE(
                        apport_de_vendanges.appelation, 
                        mise_en_bouteille.appelation, 
                    '/') AS appelation,
                    IFNULL(apport_de_vendanges.cépage, '/') AS cépage,
                    IFNULL(apport_de_vendanges.parcelle, '/') AS parcelle
                    
                FROM actions
                LEFT JOIN ajout_intrant ON actions.id = ajout_intrant.id
                LEFT JOIN transfert_de_cuve ON actions.id = transfert_de_cuve.id
                LEFT JOIN mise_en_bouteille ON actions.id = mise_en_bouteille.id
                LEFT JOIN sortie_lie ON actions.id = sortie_lie.id
                LEFT JOIN apport_de_vendanges ON actions.id = apport_de_vendanges.id
                ORDER BY actions.date_action DESC
                ";
                $result = mysqli_query($link, $request_sql);
                if ($result) {
                    while ($row = mysqli_fetch_assoc($result)) {
                        echo "<tr>";
                        echo "<td class='date_action'>" . $row['date_action'] . "</td>";
                        echo "<td>" . $row['type_action'] . "</td>";
                        echo "<td>" . $row['cuve_départ'] . "</td>";
                        echo "<td>" . $row['cuve_arrivée'] . "</td>";
                        echo "<td>" . $row['volume_quantité'] . "</td>";
                        echo "<td>" . $row['libellé'] . "</td>";
                        echo "<td>" . $row['numéro_lot'] . "</td>";
                        echo "<td>" . $row['appelation'] . "</td>";
                        echo "<td>" . $row['cépage'] . "</td>"; 
                        echo "<td>" . $row['parcelle'] . "</td>";
                        echo "</tr>";
                    }
                    mysqli_free_result($result);
                } else {
                    echo "<p>Erreur : " . mysqli_error($link) . "</p>";
                }
            } 
        ?>
    </tbody>
</table>