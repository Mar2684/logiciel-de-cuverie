<table>

    <caption>Historique des enregistrements</caption>

    <thead>

        <tr>

            <th>Date d'apport</th>

            <th>Type de l'action</th>

            <th>Cuve_départ</th>

            <th>Cuve arrivée</th>

            <th>Volume/quantité</th>

            <th>Date</th>

            <th>Libellé</th>

            <th>Numéro de lot</th>

            <th>Appellation</th>

            <th>Cépage</th>

            <th>Parcelle</th>

        </tr>

    </thead>

    <tbody>

        <?php   

        $link = mysqli_connect("qrchwexmarius.mysql.db","qrchwexmarius","6Bbt5nnnZX8JBA5","qrchwexmarius");


            if (!$link) {

                echo "<p>Erreur de connexion : " . mysqli_connect_error() . "</p>";

            } else {

                $request_sql = 

                "

                SELECT 

                    actions.type_action,

                    COALESCE(

                        transfert_de_cuve.date,

                        mise_en_bouteille.date,

                        sortie_lie.date,

                        ajout_intrant.date ,

                        apport_de_vendanges.date, 

                    '/') AS date,

                    COALESCE(

                        transfert_de_cuve.cuve_départ,

                        mise_en_bouteille.cuve_départ, 

                        sortie_lie.cuve_départ, 

                    '/') AS cuve_départ,

                    COALESCE(

                        transfert_de_cuve.cuve_arrivée,

                        ajout_intrant.cuve_apport, 

                        apport_de_vendanges.cuve_apport,

                    '/') AS cuve_arrivée,

                    COALESCE(

                        CONCAT(ajout_intrant.quantité),

                        CONCAT(apport_de_vendanges.quantité, ' kg'),

                        CONCAT(mise_en_bouteille.volume, ' hL'),

                        CONCAT(sortie_lie.volume, ' hL'),

                        CONCAT(transfert_de_cuve.volume, ' hL'),

                    '/') AS volume_quantité,

                    COALESCE(

                            ajout_intrant.date,

                            apport_de_vendanges.date,

                            mise_en_bouteille.date,

                            sortie_lie.date,

                            transfert_de_cuve.date,

                        '/') AS date,

                    IFNULL(ajout_intrant.libellé, '/') AS libellé,

                    IFNULL(mise_en_bouteille.numéro_lot, '/') AS numéro_lot,

                    COALESCE(

                        apport_de_vendanges.appelation, 

                    '/') AS appelation,

                    IFNULL(apport_de_vendanges.cépage, '/') AS cépage,

                    IFNULL(apport_de_vendanges.parcelle, '/') AS parcelle

                    

                FROM actions

                LEFT JOIN ajout_intrant ON actions.id_action = ajout_intrant.id

                LEFT JOIN transfert_de_cuve ON actions.id_action = transfert_de_cuve.id

                LEFT JOIN mise_en_bouteille ON actions.id_action = mise_en_bouteille.id

                LEFT JOIN sortie_lie ON actions.id_action = sortie_lie.id

                LEFT JOIN apport_de_vendanges ON actions.id_action = apport_de_vendanges.id

                ORDER BY actions.date_action DESC

                ";

                $result = mysqli_query($link, $request_sql);

                if ($result) {

                    while ($row = mysqli_fetch_assoc($result)) {

                        echo "<tr>";

                        echo "<td class='date_action'>" . $row['date'] . "</td>";

                        echo "<td>" . $row['type_action'] . "</td>";

                        echo "<td>" . $row['cuve_départ'] . "</td>";

                        echo "<td>" . $row['cuve_arrivée'] . "</td>";

                        echo "<td>" . $row['volume_quantité'] . "</td>";

                        echo "<td>" . $row['date'] . "</td>";

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

    <button id="effacer" onclick="erase_lastRequest()">Effacer dernière action</button>

</table>