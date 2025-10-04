function send(request_sql, callback) {
    let message
    let request = $.ajax({
        type: "POST",
            url: "dataBase_request.php",
            data: {'module': '', 'request_sql': request_sql},
            timeout: 120000,
            cache: false,
    });
    request.done(function (output_success) {
        callback(output_success.data);
    });
    request.fail(function (http_error) {
        let server_msg = http_error.responseText;
        let code = http_error.status;
        let code_label = http_error.statusText;
        callback("Erreur " + code + " (" + code_label + ") : " + server_msg)
    });
    return message;
}

function displayData(data) {
    let table = document.getElementById("traçabilité_table");
    table.innerHTML = "";
    if (data.length === 0) {
        table.innerHTML = "<tr><td colspan='5'>Aucun résultat trouvé</td></tr>";
        return;
    }
    data_keys = Object.keys(data);
    data_keys.forEach(function(key) {
        let row = data[key];
        let rowHTML = "<tr>";
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
        console.log(table.outerHTML)
        console.log(table.innerHTML + rowHTML);
        table.innerHTML += rowHTML;
        console.log(table.innerHTML)
    });
}

document.getElementById("buttonRecherche").addEventListener("click", function() {
    var inputValue = document.getElementById("num_lot").value;
    if (inputValue == "") {
        alert("Veuillez entrer un numéro de traçabilité.");
    } else {
        send("SELECT * FROM actions JOIN mise_en_bouteille ON actions.id = mise_en_bouteille.id WHERE numéro_lot = '" + inputValue + "'", function(data) {
            displayData(data);
        });
    }
});