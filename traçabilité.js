function send(module, request_sql) {
    return $.ajax({
        type: "POST",
        url: "dataBase_request.php",
        data: {'module': module, 'request_sql': request_sql},
        timeout: 120000,
        cache: false,
        success: function(output_success) {
            return output_success;
        },
        error: function(http_error) {
            let server_msg = http_error.responseText;
            let code = http_error.status;
            let code_label = http_error.statusText;
            alert("Erreur " + code + " (" + code_label + ") : " + server_msg);
        }
    });
}

function displayData(data) {
    let table = document.getElementById("traçabilité_table");
    console.log(Object.keys(data).length);
    console.log(data);
    if (Object.keys(data).length === 0) {
        console.log("no data");
        table.innerHTML = "<tr><td colspan='10'>Aucun résultat trouvé</td></tr>";
    } else {
        console.log("data found");
        data_keys = Object.keys(data);
        data_keys.forEach(function(key) {
            let row = data[key];
            let rowHTML = "<tr>";
            rowHTML += "<td></td>";
            rowHTML += "<td>" + (row.date_action ?? '/') + "</td>";   
            rowHTML += "<td>" + (row.type_action ?? '/') + "</td>";
            rowHTML += "<td>" + (row.cuve_départ ?? '/') + "</td>";
            rowHTML += "<td>" + (row.cuve_arrivée ?? row.cuve_apport ?? '/') + "</td>";
            rowHTML += "<td>" + (row.volume ?? row.quantité ?? '/') + "</td>";
            rowHTML += "<td>" + (row.libellé ?? '/') + "</td>";
            rowHTML += "<td>" + (row.numéro_lot ?? '/') + "</td>";
            rowHTML += "<td>" + (row.appelation ?? '/') + "</td>";
            rowHTML += "<td>" + (row.cépage ?? '/') + "</td>";
            rowHTML += "<td>" + (row.parcelle ?? '/') + "</td>";
            rowHTML += "</tr>";
            table.innerHTML = rowHTML;
        })
    }
}

function traceabilitySearch(data, actions) {
    console.log('data', data);
    let actions_copy = actions;
    if (data.cuve_départ != '/' || data.type_action == 'mise_en_bouteille') {
        let actions_child = {}
        for (let i = 0; i < Object.keys(actions).length; i++) {
            let action = actions[i];
            console.log('action', action, actions, i)
            if (action.cuve_arrivée == data.cuve_départ) {
                delete actions_copy[i]
                Object.keys(actions).forEach((key) => {
                    if (key < i) {
                        actions_copy[key] = actions[key];
                    } else if (key > i) {
                        actions_copy[key - 1] = actions[key];
                    }
                })
                actions_child[JSON.stringify(action)] = {[JSON.stringify(traceabilitySearch(action, actions_copy))]: {}};
            }
        };
        if (data.type_action == 'mise_en_bouteille') {
            return {[JSON.stringify(data)]: actions_child};
        } else {
            return actions_child;
        }
    } else {
        return data
    }
}
    

document.getElementById("buttonRecherche").addEventListener("click", async function() {
    var inputValue = parseFloat(document.getElementById("num_lot").value);
    if (inputValue == "") {
        alert("Veuillez entrer un numéro de traçabilité.");
    } else {
        const result = await send("", "SELECT * FROM actions JOIN mise_en_bouteille ON actions.id_action = mise_en_bouteille.id WHERE numéro_lot = '" + inputValue + "'");
        const request = `
                    SELECT 
                        actions.id_action,
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
                    ORDER BY actions.id_action DESC
                    `.replace(/\s+/g, ' ').trim();
        console.log(request)
        const actions = await send("", request);
        console.log(actions, actions.data)
        let final_result = traceabilitySearch(result.data[0], actions.data);
        console.log(final_result);
    }
});