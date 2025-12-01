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



        $link = mysqli_connect("qrchwexmarius.mysql.db","qrchwexmarius","6Bbt5nnnZX8JBA5","qrchwexmarius");


        

        if (!$link) {

            throw new Exception("Connexion à la base de données échouée : " . mysqli_connect_error());

        } else {

            switch ($_POST['module']) {

                case 'actions_data':

                    // $request_sql = "

                    //     SELECT

                    //     actions.id_action,

                    //     actions.date_action,

                    //     actions.type_action,

                    //     COALESCE(

                    //         (SELECT cuve_départ FROM transfert_de_cuve WHERE id = actions.id_action LIMIT 1),

                    //         (SELECT cuve_départ FROM mise_en_bouteille WHERE id = actions.id_action LIMIT 1),

                    //         (SELECT cuve_départ FROM sortie_lie WHERE id = actions.id_action LIMIT 1),

                    //         (SELECT cuve_apport FROM apport_de_vendanges WHERE id = actions.id_action LIMIT 1),

                    //         '/') AS cuve_départ,

                    //     COALESCE(

                    //         (SELECT cuve_arrivée FROM transfert_de_cuve WHERE id = actions.id_action LIMIT 1),

                    //         (SELECT cuve_apport FROM ajout_intrant WHERE id = actions.id_action LIMIT 1),

                    //         '/') AS cuve_arrivée,

                    //     COALESCE(

                    //         (SELECT quantité FROM ajout_intrant WHERE id = actions.id_action LIMIT 1),

                    //         (SELECT quantité FROM apport_de_vendanges WHERE id = actions.id_action LIMIT 1),

                    //         (SELECT volume FROM mise_en_bouteille WHERE id = actions.id_action LIMIT 1),

                    //         (SELECT volume FROM sortie_lie WHERE id = actions.id_action LIMIT 1),

                    //         (SELECT volume FROM transfert_de_cuve WHERE id = actions.id_action LIMIT 1),

                    //         '/') AS volume_quantité,

                    //     COALESCE(

                    //         (SELECT date FROM ajout_intrant WHERE id = actions.id_action LIMIT 1),

                    //         (SELECT date FROM apport_de_vendanges WHERE id = actions.id_action LIMIT 1),

                    //         (SELECT date FROM mise_en_bouteille WHERE id = actions.id_action LIMIT 1),

                    //         (SELECT date FROM sortie_lie WHERE id = actions.id_action LIMIT 1),

                    //         (SELECT date FROM transfert_de_cuve WHERE id = actions.id_action LIMIT 1),

                    //         '/') AS date,

                    //     COALESCE((SELECT libellé FROM ajout_intrant WHERE id = actions.id_action LIMIT 1), '/') AS libellé,

                    //     COALESCE((SELECT numéro_lot FROM mise_en_bouteille WHERE id = actions.id_action LIMIT 1), '/') AS numéro_lot,

                    //     COALESCE((SELECT appelation FROM apport_de_vendanges WHERE id = actions.id_action LIMIT 1), '/') AS appelation,

                    //     COALESCE((SELECT cépage FROM apport_de_vendanges WHERE id = actions.id_action LIMIT 1), '/') AS cépage,

                    //     COALESCE((SELECT parcelle FROM apport_de_vendanges WHERE id = actions.id_action LIMIT 1), '/') AS parcelle

                    //     FROM actions

                    //     ORDER BY actions.date_action DESC

                    //     ";

                        $request_sql = "

                        SELECT 

                            actions.id_action,

                            actions.date_action,

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

                                apport_de_vendanges.cuve_apport,

                                ajout_intrant.cuve_apport,

                            '/') AS cuve_départ,

                            COALESCE(

                                transfert_de_cuve.cuve_arrivée, 

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