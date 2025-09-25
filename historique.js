function erase_lastRequest() {
    let request = $.ajax({
        type: "POST",
        url: 'dataBase_request.php',
        data: {'module': 'erase_lastRequest'},
        timeout: 120000,
        cache: false,
    });
    request.done(function(output_success) {
        if (output_success.error) {
            alert("Erreur de sql : " + output_success.message);
        } else {
            location.reload();
        }
    });
    request.fail(function(http_error) {
        alert("Erreur : " + http_error.responseText);
    });
}