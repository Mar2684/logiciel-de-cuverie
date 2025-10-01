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
    data.forEach(function(row) {
        let rowHTML = "<tr>";
        rowHTML += "<td>" + row.numéro_lot + "</td>";   
        rowHTML += "<td>" + row.date_mise_en_bouteille + "</td>";
        rowHTML += "<td>" + row.volume + "</td>";
        rowHTML += "<td>" + row.type_de_vin + "</td>";
        rowHTML += "<td>" + row.origine_des_raisins + "</td>";
        rowHTML += "</tr>";
        table.innerHTML += rowHTML;
    });
}

document.getElementById("buttonRecherche").addEventListener("click", function() {
    var inputValue = document.getElementById("num_lot").value;
    if (inputValue == "") {
        alert("Veuillez entrer un numéro de traçabilité.");
    } else {
        send("SELECT * FROM actions JOIN mise_en_bouteille ON actions.id = mise_en_bouteille.id WHERE numéro_lot = '" + inputValue + "'", function(data) {
            console.log(data, 'data');
        });
    }
});