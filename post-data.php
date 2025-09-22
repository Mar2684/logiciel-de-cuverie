<?php
    try {
        header('Content-Type: application/json');
        // $link = mysqli_connect("qrchwexmarius.mysql.db","qrchwexmarius","6Bbt5nnnZX8JBA5","qrchwexmarius");
        $Output = array(
            "error" => false,
            "message" => "N/A",
        );
        
        $link = mysqli_connect('127.0.0.1', 'root', '', 'cuverie');
        
        if (!$link) {
            throw new Exception("Connexion à la base de données échouée : " . mysqli_connect_error());
        } else {
            $nom_table = $_POST['nom_table'];

            switch ($nom_table) {

                case 'transfert_de_cuve':
                    $données_cuve_départ = mysqli_fetch_assoc(mysqli_query($link, "SELECT volume, unité, appelation, millesime, cépage FROM cuves WHERE nom = '".$_POST['cuve_départ']."'"));
                    $données_cuve_arrivée = mysqli_fetch_assoc(mysqli_query($link, "SELECT volume, volume_total FROM cuves WHERE nom = '".$_POST['cuve_arrivée']."'"));

                    if ($données_cuve_départ['unité'] == 'hl') {
                        if ($données_cuve_arrivée['volume'] + $_POST['volume'] > $données_cuve_arrivée['volume_total']) {
                            throw new Exception("Le volume total après transfert dépasse la capacité de la cuve d'arrivée.");
                        } else if ($_POST['volume'] > $données_cuve_départ['volume']) {
                            throw new Exception("Le volume transféré dépasse le volume disponible dans la cuve de départ.");
                        } else {    
                            $request_sql = 
                            "
                            INSERT INTO actions (type_action, date_action) VALUES ('".$nom_table."', NOW());
                            INSERT INTO ".$nom_table." (id, date, cuve_départ, volume, cuve_arrivée) VALUES (LAST_INSERT_ID(), '".$_POST['date']."', '".$_POST['cuve_départ']."', '".$_POST['volume']."', '".$_POST['cuve_arrivée']."');
                            UPDATE cuves SET volume = volume - '".$_POST['volume']."' WHERE nom = '".$_POST['cuve_départ']."';
                            UPDATE cuves SET volume = volume + '".$_POST['volume']."', appelation = '".$données_cuve_départ['appelation']."', millesime = '".$données_cuve_départ['millesime']."', cépage = '".$données_cuve_départ['cépage']."' WHERE nom = '".$_POST['cuve_arrivée']."';
                            ";
                        };
                        break;
                    } else if ($données_cuve_départ['unité'] == 'kg') {
                        $request_sql =
                        "
                        INSERT INTO actions (type_action, date_action) VALUES ('".$nom_table."', NOW());
                        INSERT INTO ".$nom_table." (id, date, cuve_départ, volume, cuve_arrivée) VALUES (LAST_INSERT_ID(), '".$_POST['date']."', '".$_POST['cuve_départ']."', '".$_POST['volume']."', '".$_POST['cuve_arrivée']."');
                        UPDATE cuves SET unité = 'hl',  volume = 0 WHERE nom = '".$_POST['cuve_départ']."';
                        UPDATE cuves SET volume = '".$_POST['volume']."', appelation = '".$données_cuve_départ['appelation']."', millesime = '".$données_cuve_départ['millesime']."', cépage = '".$données_cuve_départ['cépage']."' WHERE nom = '".$_POST['cuve_arrivée']."';
                        ";
                    };
                    break;

                case 'apport_de_vendanges':
                    $request_sql =
                    "
                    INSERT INTO actions (type_action, date_action) VALUES ('".$nom_table."', NOW());
                    INSERT INTO ".$nom_table." (id, date, parcelle, quantité, cuve_apport, appelation, cépage) VALUES (LAST_INSERT_ID(), '".$_POST['date']."', '".$_POST['parcelle']."', '".$_POST['quantité']."', '".$_POST['cuve_apport']."', '".$_POST['appelation']."', '".$_POST['cépage']."');
                    UPDATE cuves SET volume = '".$_POST['quantité']."', unité = 'kg', appelation = '".$_POST['appelation']."', millesime = '".date('Y', strtotime($_POST['date']))."', cépage = '".$_POST['cépage']."' WHERE nom = '".$_POST['cuve_apport']."';
                    ";
                    break;

                case 'mise_en_bouteille':
                    $données_cuve_départ = mysqli_fetch_assoc(mysqli_query($link, "SELECT volume, unité, appelation, millesime, cépage FROM cuves WHERE nom = '".$_POST['cuve_départ']."'"));
                    if ($données_cuve_départ['unité'] != 'hl') {
                        throw new Exception("La cuve de départ doit contenir du volume en hectolitres.");
                    } else if ($_POST['volume'] > $données_cuve_départ['volume']) {
                        throw new Exception("Le volume mis en bouteille dépasse le volume disponible dans la cuve d'apport.");
                    } else {
                        $request_sql =
                        "
                        INSERT INTO actions (type_action, date_action) VALUES ('".$nom_table."', NOW());
                        INSERT INTO ".$nom_table." (id, date, cuve_départ, volume, numéro_lot, appelation) VALUES (LAST_INSERT_ID(), '".$_POST['date']."', '".$_POST['cuve_départ']."', '".$_POST['volume']."', '".$_POST['numéro_lot']."', '".$données_cuve_départ['appelation']."');
                        UPDATE cuves SET volume = volume - ".$_POST['volume']." WHERE nom = '".$_POST['cuve_départ']."';
                        ";
                    };
                    break;

                case 'sortie_lie':
                    $données_cuve_départ = mysqli_fetch_assoc(mysqli_query($link, "SELECT volume, unité, appelation, millesime, cépage FROM cuves WHERE nom = '".$_POST['cuve_départ']."'"));
                    if ($données_cuve_départ['unité'] != 'hl') {
                        throw new Exception("La cuve de départ doit contenir du volume en hectolitres.");
                    } else if ($_POST['volume'] > $données_cuve_départ['volume']) {
                        throw new Exception("Le volume de sortie dépasse le volume disponible dans la cuve de départ.");
                    } else {
                        $request_sql =
                        "
                        INSERT INTO actions (type_action, date_action) VALUES ('".$nom_table."', NOW());
                        INSERT INTO ".$nom_table." (id, date, cuve_départ, volume) VALUES (LAST_INSERT_ID(), '".$_POST['date']."', '".$_POST['cuve_départ']."', '".$_POST['volume']."');
                        UPDATE cuves SET volume = volume - '".$_POST['volume']."' WHERE nom = '".$_POST['cuve_départ']."';
                        ";
                    };
                    break;

                case 'ajout_intrant':
                    $données_cuve_apport = mysqli_fetch_assoc(mysqli_query($link, "SELECT volume, volume_total, unité, appelation, millesime, cépage FROM cuves WHERE nom = '".$_POST['cuve_apport']."'"));
                    if ($données_cuve_apport['unité'] != 'hl') {
                        throw new Exception("La cuve d'apport doit contenir du volume en hectolitres.");
                    } else if ($_POST['quantité'] + $données_cuve_apport['volume'] > $données_cuve_apport['volume_total']) {
                        throw new Exception("Le volume total après ajout dépasse la capacité de la cuve d'apport.");
                    } else {
                        $request_sql =
                        "
                        INSERT INTO actions (type_action, date_action) VALUES ('".$nom_table."', NOW());
                        INSERT INTO ".$nom_table." (id, date, cuve_apport, libellé, quantité) VALUES (LAST_INSERT_ID(), '".$_POST['date']."', '".$_POST['cuve_apport']."', '".$_POST['libellé']."', '".$_POST['quantité']."');
                        UPDATE cuves SET volume = volume + '".$_POST['quantité']."' WHERE nom = '".$_POST['cuve_apport']."';
                        ";
                    };
                    break;
            }

            mysqli_begin_transaction($link);

            if (mysqli_multi_query($link, $request_sql)) {
                do {
                    if ($result = mysqli_store_result($link)) {
                        mysqli_free_result($result);
                    }
                } while (mysqli_next_result($link));
                mysqli_commit($link);
                $Output["message"] = "Les données ont bien été enregistrées.";
                http_response_code(200);
            } else {
                mysqli_rollback($link);
                throw new Exception("Erreur de sql : " . mysqli_error($link));
            }
        }
    } catch (\Throwable $e) {
        mysqli_rollback($link);
    $Output["error"] = true;
    $Output["message"] = $e->getMessage();
    } finally {
        echo json_encode($Output, JSON_FORCE_OBJECT);
        die();
    }
?>