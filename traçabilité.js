import {liste_cuves, liste_nom_cuves, charger} from './variables.js';

charger(); 

//pour la fonction display_data
let id = 0

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

function displayData(data, layer = 0, parent = 0) {
    Object.keys(data).forEach(function(key) {     
        id += 1  
        let row = JSON.parse(key);
        let rowHTML = "";
        if (layer == 0) {
            rowHTML = "<tr id='"+ id.toString() +"' class=' not_revealed'>";
        } else {
            rowHTML = "<tr id='"+ id.toString() +"' class='"+ parent +" not_revealed' style='display:none;'>";
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
            displayData(data[key], 1, parent + "_"+ id.toString());
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
            document.getElementById("traçabilité_table").innerHTML += rowHTML;
        }
    })
}

function traceabilitySearch(data, actions) {
    let actions_child = {};
    let cuve_départs = [];
    let volume = liste_cuves[data.cuve_départ].volume
    let apport_de_vendanges = null
    Object.keys(actions).forEach((key) => {
        if (actions[key].cuve_départ == data.cuve_départ && !(cuve_départs.includes(actions[key].cuve_départ)) && (parseInt(actions[key].id_action) < parseInt(data.id_action)) && volume != 0) {
            if (actions[key].type_action == 'mise_en_bouteille') {
                volume += parseInt(actions[key].volume_quantité);
            } else if (actions[key].type_action == 'apport_de_vendanges' && (apport_de_vendanges == null || apport_de_vendanges == true)) {
                if (data.cuve_départ == "I7") {
                    console.log(actions[key], apport_de_vendanges)
                }
                apport_de_vendanges = true
                actions_child[JSON.stringify(actions[key])] = '' 
            } else if (actions[key].type_action == 'ajout_intrant') {
                actions_child[JSON.stringify(actions[key])] = ''
            } else if (actions[key].type_action == 'transfert_de_cuve' && apport_de_vendanges == true) {
                apport_de_vendanges = false
            }
        }
        if (actions[key].cuve_arrivée == data.cuve_départ && !(cuve_départs.includes(actions[key].cuve_départ)) && (parseInt(actions[key].id_action) < parseInt(data.id_action))) {
            if (actions[key].type_action == 'transfert_de_cuve' && (volume - parseInt(actions[key].volume_quantité)) >= 0) {
                cuve_départs.push(actions[key].cuve_départ);
                volume -= parseInt(actions[key].volume_quantité);
                liste_cuves[actions[key].cuve_départ].volume += parseInt(actions[key].volume_quantité);
                actions_child[JSON.stringify(actions[key])] = traceabilitySearch(actions[key], actions);
            } 
        }
    })
    console.log('------------------------')
    return actions_child
}

async function getNumLot () {
    let inputValue = document.getElementById("select_numLot").value
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
    let inputValue = document.getElementById("select_numCuve").value
    console.log(inputValue)
    if (inputValue == "") {
        alert("Vauillez entrer un numéro de cuve.")
    } else {
        const result = {'data': [{'cuve_départ': inputValue, 'id_action': '10000000000000000000000000000000000000000000000000000',}]}
        const actions = await send("actions_data", "");
        console.log(actions)
        throwAction(result, actions)
    }
}
async function throwAction(inputData, actions) {  
    let final_result = {[JSON.stringify(inputData.data[0])]: traceabilitySearch(inputData.data[0], actions.data)};
    console.log("result", final_result)
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
// Expose functions used by inline HTML handlers to the global scope
window.getNumCuve = getNumCuve;
window.getNumLot = getNumLot;
window.reveal = reveal;

$('#select_numCuve').each(function () {
    let groupe
    groupe = document.createElement('optgroup')
    groupe.label = 'Cuves inox'
    this.appendChild(groupe)
    for (let i in liste_nom_cuves.cuves_inox) {
        let option = document.createElement('option')
        option.value = liste_nom_cuves.cuves_inox[i]
        option.innerHTML = liste_nom_cuves.cuves_inox[i]
        groupe.appendChild(option)
        console.log(i, 'cuve')
    }
    groupe = document.createElement('optgroup')
    groupe.label = 'Cuves fibre'
    this.appendChild(groupe)
    for (let i in liste_nom_cuves.cuves_fibres) {
        let option = document.createElement('option')
        option.value = liste_nom_cuves.cuves_fibres[i]
        option.innerHTML = liste_nom_cuves.cuves_fibres[i]
        groupe.appendChild(option)
    }
    groupe = document.createElement('optgroup')
    groupe.label = 'Barriques'
    this.appendChild(groupe)
    for (let i in liste_nom_cuves.barriques) {
        let option = document.createElement('option')
        option.value = liste_nom_cuves.barriques[i]
        option.innerHTML = liste_nom_cuves.barriques[i]
        groupe.appendChild(option)
    }
    groupe = document.createElement('optgroup')
    groupe.label = 'Cuvons'
    this.appendChild(groupe)
    for (let i in liste_nom_cuves.cuvons) {
        let option = document.createElement('option')
        option.value = liste_nom_cuves.cuvons[i]
        option.innerHTML = liste_nom_cuves.cuvons[i]
        groupe.appendChild(option)
    }
});

let num_lots = await send("", "SELECT numéro_lot FROM mise_en_bouteille")
$('#select_numLot').each(function() {
    Object.keys(num_lots.data).forEach((key) => {
        console.log(key, num_lots.data[key].numéro_lot)
        let option = document.createElement('option')
        option.value = num_lots.data[key].numéro_lot
        option.innerHTML = num_lots.data[key].numéro_lot
        this.appendChild(option)
    })
})
