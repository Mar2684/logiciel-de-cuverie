let list_cuves_inox = ["I0", "I1", "I2", "I3", "I4", "I5", "I6", "I7", "I8", "I9", "I10", "I11"]
let list_cuves_fibre = ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9"]
let list_barriques = ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10", "B11"]
let list_cuvons = ["C1"]
let liste_nom_cuves = [...list_cuves_inox, ...list_cuves_fibre, ...list_barriques, ...list_cuvons];

function get_data_cuves() {
    let request = $.ajax({
        type: "POST",
        url: 'get-data.php',
        data: {'module': 'cuves_data'},
        timeout: 120000,
        cache: false,
    })
    request.done(function (output_success) {
        if (output_success.error) {
            alert('Impossible de récupérer les données serveur : ' + output_success.message);
        } else {
            console.log(output_success.data);
            let list_cuves = {}
            liste_nom_cuves.forEach(cuve => {
                list_cuves[cuve] = output_success.data[cuve]
            })
        }
    })
    request.fail(function (http_error) {
        let server_msg = http_error.responseText;
        let code = http_error.status;
        let code_label = http_error.statusText;
        alert("Erreur " + code + " (" + code_label + ") : " + server_msg);
    });
}

function aff_action(num_action) {
    document.querySelectorAll('.action').forEach((element) => {
        if (element.style.display == '' && element.id == `action${num_action}`){
            element.style.display = 'flex';
        } else{
            element.style.display = '';
        }
    })
}

function synch_cuve() {
    let request = 
        $.ajax({
            type: "POST",
            url: 'get-data.php',
            data: {'module': 'actions_data'},
            timeout: 120000,
            cache: false,
        });
    request.done(function (output_success) {
        if (output_success.error) {
            alert('Impossible de synchroniser les données serveur : ' + output_success.message);
        } else {
            let liste_cuves = {}
            liste_nom_cuves.forEach(cuve => {
                liste_cuves[cuve] = [0,'hl']
            })
            try {
                let num_action = Object.keys(output_success.data).length - 1
                for (let i =  Object.keys(output_success.data).length - 1; i >= 0; i--) {
                    action = output_success.data[i]
                    switch (output_success.data[i['type_action']]) {
                        case 'transfert_de_cuve':
                            if (liste_cuves[action['cuve_arrivée']][1] == 'hl') {
                                if (liste_cuves[action['cuve_arrivée']][0] + action > $données_cuve_arrivée['volume_total']) {
                                    throw new Error("Le volume total après transfert dépasse la capacité de la cuve d'arrivée.");
                                } else if ($_POST['volume'] > $données_cuve_départ['volume']) {
                                    throw new Error("Le volume transféré dépasse le volume disponible dans la cuve de départ.");
                                } else {
                                    
                                };
                            } else if ($données_cuve_départ['unité'] == 'kg') {
                                
                            };
                            break;
                    }
                }   
            } catch (e) {
                alert(e.message);
            }

            $('div.cuves').each(function () {
                let cuve = this.id;
                if (output_success.data[cuve]['unité'] == 'kg') {
                    this.querySelector(".rate").style.height = '0%';
                    this.querySelector(".fill_indicator").style.background = 'linear-gradient(to right, rgb(13, 104, 0), rgb(13, 197, 0), rgb(13, 54, 0))';
                } else {
                    this.querySelector(".rate").style.height = 100 - (output_success.data[cuve]['volume'] / output_success.data[cuve]['volume_total'] * 100) + '%';
                    this.querySelector(".fill_indicator").style.background = "linear-gradient(to right, rgb(104, 0, 0), rgb(197, 0, 0), rgb(54, 0, 0))";
                }
                this.querySelector('.textAppelation').textContent = output_success.data[cuve]['appelation'];
                this.querySelector('.textMillesime').textContent = output_success.data[cuve]['millesime'];
                this.querySelector('.textCépage').textContent = output_success.data[cuve]['cépage'];
                this.querySelector('.volume').textContent = output_success.data[cuve]['volume'] + ' ' + output_success.data[cuve]['unité'];
            })
        };
    })
    request.fail(function (http_error) {
        let server_msg = http_error.responseText;
        let code = http_error.status;
        let code_label = http_error.statusText;
        alert("Erreur " + code + " (" + code_label + ") : " + server_msg);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    get_data_cuves();
    $('select.select-cuves').each(function () {
            let groupe
            groupe = document.createElement('optgroup')
            groupe.label = 'Cuves inox'
            this.appendChild(groupe)
            for (let i in list_cuves_inox) {
                let option = document.createElement('option')
                option.value = list_cuves_inox[i]
                option.innerHTML = list_cuves_inox[i]
                groupe.appendChild(option)
            }
            groupe = document.createElement('optgroup')
            groupe.label = 'Cuves fibre'
            this.appendChild(groupe)
            for (let i in list_cuves_fibre) {
                let option = document.createElement('option')
                option.value = list_cuves_fibre[i]
                option.innerHTML = list_cuves_fibre[i]
                groupe.appendChild(option)
            }
            groupe = document.createElement('optgroup')
            groupe.label = 'Barriques'
            this.appendChild(groupe)
            for (let i in list_barriques) {
                let option = document.createElement('option')
                option.value = list_barriques[i]
                option.innerHTML = list_barriques[i]
                groupe.appendChild(option)
            }
            groupe = document.createElement('optgroup')
            groupe.label = 'Cuvons'
            this.appendChild(groupe)
            for (let i in list_cuvons) {
                let option = document.createElement('option')
                option.value = list_cuvons[i]
                option.innerHTML = list_cuvons[i]
                groupe.appendChild(option)
            }
    });
    $('form.action').on('submit', function (event) {
        event.preventDefault();

        let Datas = new FormData(this);

        let request = 
            $.ajax({
                type: this.method,
                url: this.action,
                data: Datas,
                timeout: 120000,
                cache: false,
                contentType: false,
                processData: false,
            });
        request.done(function (output_success) {
            if (output_success.error) {
                alert(output_success.message);
                console.log(output_success.message);
            } else {
                alert(output_success.message);
                synch_cuve();
                location.reload()
            }
        });
        request.fail(function (http_error) {
            let server_msg = http_error.responseText;
            let code = http_error.status;
            let code_label = http_error.statusText;
            alert("Erreur " + code + " (" + code_label + ") : " + server_msg);
        });
    })
    synch_cuve();
})
