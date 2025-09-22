<?php
    try {
        header('Content-Type: application/json');
        // $link = mysqli_connect("qrchwexmarius.mysql.db","qrchwexmarius","6Bbt5nnnZX8JBA5","qrchwexmarius");
        $Output = array(
            "error" => false,
            "message" => "N/A",
            "data" => "N/A"
        );
        
        $link = mysqli_connect('127.0.0.1', 'root', '', 'cuverie');
        
        if (!$link) {
            throw new Exception("Connexion à la base de données échouée : " . mysqli_connect_error());
        } else {
            switch ($_POST['module']) {
                case 'actions_data':
                    // $data = [];
                    // $request_sql =
                    // "
                    // SELECT * FROM cuves
                    // ";
                    // if (mysqli_multi_query($link, $request_sql)) {      
                    //     do {
                    //         if ($result = mysqli_store_result($link)) {
                    //             $rows = [];
                    //             $Output["data"] = [];
                    //             while ($row = mysqli_fetch_assoc($result)) {
                    //                 $Output["data"][$row['nom']] = ['appelation' => $row['appelation'], 'millesime' => $row['millesime'], 'cépage' =>$row['cépage'] , 'volume' => $row['volume'], 'volume_total' => $row['volume_total'], 'unité' => $row['unité']];
                    //             }
                    //             mysqli_free_result($result);
                    //         }
                    //     } while (mysqli_next_result($link));
                    //     $Output["data"] = $data;
                    //     $Output["message"] = "Données synchronisées avec succès.";
                    //     http_response_code(200);
                    // } else {
                    //     throw new Exception("Erreur de sql : " . mysqli_error($link));
                    // }
                    // break;  
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
                    break;
                case 'cuves_data':
                    $data = [];
                    $request_sql =
                    "
                    SELECT * FROM cuves
                    ";
                    break;
                default:
                    throw new Exception("Module inéxistant");
            }
            if (mysqli_multi_query($link, $request_sql)) {      
                do {
                    if ($result = mysqli_store_result($link)) {
                        $rows = [];
                        $data = [];
                        while ($row = mysqli_fetch_assoc($result)) {
                            array_push($data, $row);
                        }
                        mysqli_free_result($result);
                    }
                } while (mysqli_next_result($link));
                $Output["data"] = $data;
                $Output["message"] = "Données synchronisées avec succès.";
                http_response_code(200);
            } else {
                throw new Exception("Erreur de sql : " . mysqli_error($link));
            }
        }
    } catch (\Throwable $e) {
        $Output["error"] = true;
        $Output["message"] = $e->getMessage();
    } finally {
        echo json_encode($Output, JSON_FORCE_OBJECT);
        die();
    }
?>