async function send(module, request_sql) {
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
let liste_nom_cuves = {
    "cuves_inox": ["I0", "I1", "I2", "I3", "I4", "I5", "I6", "I7", "I8", "I9", "I10", "I11"], 
    "cuves_fibres": ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9"], 
    "barriques":["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10", "B11"] ,
    "cuvons": ["C1"]
};