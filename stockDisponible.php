<table>
    <thead>
        <td>Appelations disponibles</td>
        <td>volume</td>
    </thead>
    <tbody>
        <?php
            $link = mysqli_connect('127.0.0.1', 'root', '', 'cuverie');

            if (!$link) {
                echo "<p>Erreur de connexion : " . mysqli_connect_error() . "</p>";
            } else {
                $request_sql =
                "
                SELECT DISTINCT cuves1.appelation, cuves1.millesime, (SELECT SUM(cuves2.volume) FROM cuves AS cuves2 WHERE cuves2.appelation = cuves1.appelation AND cuves2.millesime = cuves1.millesime) AS volume_appelation FROM cuves AS cuves1
                ";

                $result = mysqli_query($link, $request_sql);
                if ($result) {
                    while ($row = mysqli_fetch_assoc($result)) {
                        if ($row['appelation'] != '') {
                            echo "<tr style='background-color: gray'>";
                            echo "<td>" . $row['appelation'] . " " . $row["millesime"] . "</td>";
                            echo "<td>" . $row['volume_appelation'] . "</td>";
                            echo "</tr>";
                            echo "<tr>";
                            echo "<td class='liste_cuves' colspan='2'";
                            $requete_cuves = mysqli_query($link, "SELECT nom, unité, volume FROM cuves WHERE appelation = '".$row["appelation"]."' AND millesime = '".$row["millesime"]."'");
                            while ($cuveData = mysqli_fetch_assoc($requete_cuves)) {
                                echo "<div>".$cuveData["nom"]." : ".$cuveData["volume"].$cuveData["unité"]."</div>";
                            }
                            echo "</td>";
                            echo "</tr>";
                        }
                    }
                    mysqli_free_result($result);
                } else {
                    echo "<p>Erreur : " . mysqli_error($link) . "</p>";
                }
            }
        ?>
    </tbody>
</table>