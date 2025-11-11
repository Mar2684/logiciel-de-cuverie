<?php
    try {
        header('Content-Type: application/json');
        // $link = mysqli_connect("qrchwexmarius.mysql.db","qrchwexmarius","6Bbt5nnnZX8JBA5","qrchwexmarius");
        $Output = array(
            "error" => false,
            "message" => "N/A",
            "output" => ""
        );
        $data = [];

        $link = mysqli_connect('127.0.0.1', 'root', '', 'cuverie');
        
        if (!$link) {
            throw new Exception("Connexion à la base de données échouée : " . mysqli_connect_error());
        } else {
            switch ($_POST['module']) {
                case 'actions_data':
                    $request_sql = 
                    "
                    SELECT 
                        actions.date_action, 
                        actions.type_action, 
                        COALESCE( 
                            transfert_de_cuve.cuve_départ,
                            mise_en_bouteille.cuve_départ, 
                            sortie_lie.cuve_départ, 
                            apport_de_vendanges.cuve_apport,
                        '/') AS cuve_départ,
                        COALESCE(
                            transfert_de_cuve.cuve_arrivée, 
                            ajout_intrant.cuve_apport,
                        '/') AS cuve_arrivée,
                        COALESCE(
                            ajout_intrant.quantité,
                            apport_de_vendanges.quantité,
                            mise_en_bouteille.volume,
                            sortie_lie.volume,
                            transfert_de_cuve.volume,
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
                    break;  
                case 'cuves_data':
                    $request_sql =
                    "
                    SELECT * FROM cuves
                    ";
                    break;
                case 'erase_lastRequest':
                    $request_sql =
                    "
                    DELETE FROM actions
                    ORDER BY date_action DESC
                    LIMIT 1;
                    ";
                    break;
                case 'traçabilité':
                    $request_sql = 
                    "
                    SELECT 
                        actions.date_action, 
                        actions.type_action, 
                        COALESCE( 
                            transfert_de_cuve.cuve_départ,
                            mise_en_bouteille.cuve_départ, 
                            sortie_lie.cuve_départ, 
                            apport_de_vendanges.cuve_apport,
                        '/') AS cuve_départ,
                        COALESCE(
                            transfert_de_cuve.cuve_arrivée, 
                            ajout_intrant.cuve_apport,
                        '/') AS cuve_arrivée,
                        COALESCE(
                            ajout_intrant.quantité,
                            apport_de_vendanges.quantité,
                            mise_en_bouteille.volume,
                            sortie_lie.volume,
                            transfert_de_cuve.volume,
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
                    WHERE actions.date_action <= 
                    ORDER BY actions.date_action DESC
                    ";
                    break;
                default:
                    $request_sql = $_POST['request_sql'];
                    break;
            }
            mysqli_begin_transaction($link);

            if (mysqli_multi_query($link, $request_sql)) {      
                do {
                    if ($result = mysqli_store_result($link)) {
                        while ($row = mysqli_fetch_assoc($result)) {
                            array_push($data, $row);
                        }
                        mysqli_free_result($result);
                    }
                } while (mysqli_next_result($link));
                mysqli_commit($link);
                $Output["data"] = $data;
                $Output["message"] = "Données synchronisées avec succès.";
                http_response_code(200);
            } else {
                throw new Exception("Erreur de sql : " . mysqli_error($link));
            }
        }
    } catch (\Throwable $e) {
        if (isset($link) && $link instanceof mysqli) {
            mysqli_rollback($link);
        }
        $Output["error"] = true;
        $Output["message"] = $e->getMessage();
    } finally {
        echo json_encode($Output, JSON_FORCE_OBJECT);
        die();
    }
?>