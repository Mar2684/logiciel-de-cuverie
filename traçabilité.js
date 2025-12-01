function send(module, request_sql) {
    console.log(request_sql)
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

function displayData(data, layer = 0, parent = "") {
    Object.keys(data).forEach(function(key) {            
        let row = JSON.parse(key);
        let rowHTML = "";
        if (layer == 0) {
            rowHTML = "<tr id='"+ row.id_action +"' class=' not_revealed'>";
        } else {
            rowHTML = "<tr id='"+ row.id_action +"' class='"+ parent +" not_revealed' style='display:none;'>";
        }
        if (data[key] != '') {
            rowHTML += "<td><button onclick=reveal(this)><img src='triangle.png'></button></td>";
            rowHTML += "<td>" + (row.date_action ?? '/') + "</td>";   
            rowHTML += "<td>" + (row.type_action ?? '/') + "</td>";
            rowHTML += "<td>" + (row.cuve_départ ?? '/') + "</td>";
            rowHTML += "<td>" + (row.cuve_arrivée ?? row.cuve_apport ?? '/') + "</td>";
            rowHTML += "<td>" + (row.volume_quantité ?? row.volume ?? '/') + "</td>";
            rowHTML += "<td>" + (row.libellé ?? '/') + "</td>";
            rowHTML += "<td>" + (row.numéro_lot ?? '/') + "</td>";
            rowHTML += "<td>" + (row.appelation ?? '/') + "</td>";
            rowHTML += "<td>" + (row.cépage ?? '/') + "</td>";
            rowHTML += "<td>" + (row.parcelle ?? '/') + "</td>";
            rowHTML += "</tr>";
            document.getElementById("traçabilité_table").innerHTML += rowHTML;
            console.log(rowHTML)
            displayData(data[key], 1, parent + "_"+ row.id_action);
        } else if (data[key] == '') {
            rowHTML += "<td></td>";
            rowHTML += "<td>" + (row.date_action ?? '/') + "</td>";   
            rowHTML += "<td>" + (row.type_action ?? '/') + "</td>";
            rowHTML += "<td>" + (row.cuve_départ ?? '/') + "</td>";
            rowHTML += "<td>" + (row.cuve_arrivée ?? row.cuve_apport ?? '/') + "</td>";
            rowHTML += "<td>" + (row.volume_quantité ?? '/') + "</td>";
            rowHTML += "<td>" + (row.libellé ?? '/') + "</td>";
            rowHTML += "<td>" + (row.numéro_lot ?? '/') + "</td>";
            rowHTML += "<td>" + (row.appelation ?? '/') + "</td>";
            rowHTML += "<td>" + (row.cépage ?? '/') + "</td>";
            rowHTML += "<td>" + (row.parcelle ?? '/') + "</td>";
            rowHTML += "</tr>";            
            console.log(rowHTML)
            document.getElementById("traçabilité_table").innerHTML += rowHTML;
        }
    })
}

function traceabilitySearch(data, actions) {
    let actions_child = {};
    let cuve_départs = [];
    Object.keys(actions).forEach((key) => {
        if (actions[key].type_action == 'transfert_de_cuve') {
            if (actions[key].cuve_arrivée == data.cuve_départ && !(cuve_départs.includes(actions[key].cuve_départ)) && (actions[key].id_action < data.id_action)) {
                cuve_départs.push(actions[key].cuve_départ);
                actions_child[JSON.stringify(actions[key])] = traceabilitySearch(actions[key], actions);
            }
        } else if (actions[key].type_action == 'apport_de_vendanges' || actions[key].type_action == 'ajout_intrant') {
            if (actions[key].cuve_départ == data.cuve_départ && !(cuve_départs.includes(actions[key].cuve_départ)) && (actions[key].id_action < data.id_action)) {
                actions_child[JSON.stringify(actions[key])] = '' 
            }
        }
    })
    return actions_child
}

async function getNumLot () {
    let inputValue = document.getElementById("num_lot").value
    if (inputValue == "") {
        alert("Veuillez entrer un numéro de lot.")
    } else {
        const result = await send("", "SELECT * FROM actions JOIN mise_en_bouteille ON actions.id_action = mise_en_bouteille.id WHERE numéro_lot = '" + inputValue + "'");
        const actions = await send("actions_data", "");
        Object.keys(actions.data).forEach((key) => {
            if (actions.data[key].id_action >= result.data[0].id_action) {
                delete actions.data[key];
            }
        })  
        throwAction(result, actions)
    }
}

async function getNumCuve () {
    let inputValue = document.getElementById("num_cuve").value
    console.log(inputValue)
    if (inputValue == "") {
        alert("Vauillez entrer un numéro de cuve.")
    } else {
        // const result = await send("", "SELECT * FROM actions JOIN mise_en_bouteille ON actions.id_action = mise_en_bouteille.id WHERE numéro_lot = '" + numLot + "'");
        const result = {'data': [{'cuve_départ': inputValue, 'id_action': 10000000000000000000000000000000000000000000000000000,}]}
        const actions = await send("actions_data", "");
        throwAction(result, actions)
    }
}
async function throwAction(inputData, actions) {  
    let final_result = {[JSON.stringify(inputData.data[0])]: traceabilitySearch(inputData.data[0], actions.data)};
    console.log(final_result, 'ok')
    document.getElementById("traçabilité_table").innerHTML = "";
    displayData(final_result);
}

function reveal(element) {
    if (element.parentNode.parentNode.classList.contains("revealed")) {
        element.parentNode.parentNode.classList.remove("revealed");
        element.parentNode.parentNode.classList.add("not_revealed");
    } else {
        element.parentNode.parentNode.classList.remove("not_revealed");
        element.parentNode.parentNode.classList.add("revealed");
    }
    let id = element.parentNode.parentNode.id;
    if (element.parentNode.parentNode.classList.contains("revealed")) {
        let trs = document.querySelectorAll('tbody tr');
        trs.forEach(tr => {
            let classes = tr.classList[0].split("_");
            if (classes[classes.length-1] == id) {
                tr.style.display = "";
            }
        });
    } else {
        let trs = document.querySelectorAll('tbody tr');
        trs.forEach(tr => {
            if (tr.classList[0].includes(id)) {
                tr.style.display = "None";
                tr.classList.remove("revealed");
                tr.classList.add("not_revealed");
            }
        });
    }
}
