let list_cuves_inox = ["I0", "I1", "I2", "I3", "I4", "I5", "I6", "I7", "I8", "I9", "I10", "I11"]
let list_cuves_fibre = ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9"]
let list_barriques = ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10", "B11"]
let list_cuvons = ["C1"]
let liste_nom_cuves = [...list_cuves_inox, ...list_cuves_fibre, ...list_barriques, ...list_cuvons];
let liste_cuves = {}

function get_data_cuves() {
    let request = $.ajax({
        type: "POST",
        url: 'dataBase_request.php',
        data: {'module': 'cuves_data'},
        timeout: 120000,
        cache: false,
    })
    request.done(function (output_success) {
        if (output_success.error) {
            alert('Impossible de récupérer les données serveur : ' + output_success.message);
        } else {
            liste_cuves = {}
            Object.keys(output_success.data).forEach(key => {
                let row = output_success.data[key]
                row['volume'] = parseFloat(row['volume'])
                row['volume_total'] = parseFloat(row['volume_total'])
                liste_cuves[output_success.data[key]['nom']] = row
            })
            synch_cuve();
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
            url: 'dataBase_request.php',
            data: {'module': 'actions_data'},
            timeout: 120000,
            cache: false,
        });
    request.done(function (output_success) {
        if (output_success.error) {
            alert('Impossible de synchroniser les données serveur : ' + output_success.message);
        } else {            
            try {
                let num_action = Object.keys(output_success.data).length - 1
                for (let i =  Object.keys(output_success.data).length - 1; i >= 0; i--) {
                    let action = output_success.data[i]
                    let cuve_départ = action["cuve_départ"]
                    let cuve_arrivée = action["cuve_arrivée"]
                    let volume_quantité = parseFloat(action["volume_quantité"])
                    switch (action["type_action"]) {
                        case 'transfert_de_cuve':
                            
                            if (liste_cuves[cuve_départ]['unité'] == 'hl') {
                                liste_cuves[cuve_départ]['volume'] -= volume_quantité
                                liste_cuves[cuve_arrivée]['volume'] += volume_quantité
                            } else if (liste_cuves[cuve_départ]['unité'] == 'kg') {
                                liste_cuves[cuve_départ]['volume'] = 0
                                liste_cuves[cuve_arrivée]['volume'] = volume_quantité
                                liste_cuves[cuve_arrivée]['unité'] = 'hl'
                                liste_cuves[cuve_départ]['unité'] = 'hl'
                            }
                            break;
                        case 'apport_de_vendanges':
                            liste_cuves[cuve_départ]['volume'] = volume_quantité
                            liste_cuves[cuve_départ]['unité'] = 'kg'
                            liste_cuves[cuve_départ]['appelation'] = action["appelation"]
                            liste_cuves[cuve_départ]['cépage'] = action["cépage"]
                            liste_cuves[cuve_départ]['millesmime'] = (new Date(action["date"])).getFullYear()
                            break;
                        case 'mise_en_bouteille':
                            liste_cuves[cuve_départ]['volume'] -= volume_quantité
                            break;
                        case 'sortie_lie':
                            liste_cuves[cuve_départ]['volume'] -= volume_quantité
                            break;
                    } 
                }  
            } catch (e) {
                alert(e.message);
            }

            $('div.cuves').each(function () {
                let cuve = this.id;
                liste_cuves[cuve]
                if (liste_cuves[cuve]['unité'] == 'kg') {
                    this.querySelector(".rate").style.height = '0%';
                    this.querySelector(".fill_indicator").style.background = 'linear-gradient(to right, rgb(13, 104, 0), rgb(13, 197, 0), rgb(13, 54, 0))';
                } else {
                    this.querySelector(".rate").style.height = 100 - (liste_cuves[cuve]['volume'] / liste_cuves[cuve]['volume_total'] * 100) + '%';
                    this.querySelector(".fill_indicator").style.background = "linear-gradient(to right, rgb(104, 0, 0), rgb(197, 0, 0), rgb(54, 0, 0))";
                }
                this.querySelector('.textAppelation').textContent = liste_cuves[cuve]['appelation'];
                this.querySelector('.textMillesime').textContent = liste_cuves[cuve]['millesmime'];
                this.querySelector('.textCépage').textContent = liste_cuves[cuve]['cépage'];
                this.querySelector('.volume').textContent = liste_cuves[cuve]['volume'] + ' ' + liste_cuves[cuve]['unité'];
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

function create_postSqlRequest(data) {
    data = Object.fromEntries(data.entries());
    let nom_table = data['nom_table']
    let cuve_départ = data['cuve_départ'] ?? data['cuve_apport'] ?? '/';
    let cuve_arrivée = data['cuve_arrivée'] ?? '/';
    let volume_quantité = parseFloat(data['volume'] ?? data['quantité']);
    switch (nom_table) {
            case 'transfert_de_cuve':
                if (data['volume'] <= 0) {
                    alert('Le volume transféré doit être supérieur à 0 !');
                } else if (liste_cuves[cuve_départ]['unité'] == 'hl' && liste_cuves[cuve_arrivée]['volume'] + volume_quantité  > liste_cuves[cuve_arrivée]['volume_total']) {
                    console.log(liste_cuves[cuve_arrivée]['volume'], volume_quantité , liste_cuves[cuve_arrivée]['volume_total'])
                    alert('Le volume total dans la cuve d\'arrivée serait dépassé !');
                    return '';
                } else if (liste_cuves[cuve_départ]['unité'] == 'hl' && data['volume'] > liste_cuves[cuve_départ]['volume']) {
                    alert('Le volume transféré est supérieur au volume disponible dans la cuve de départ !');
                    return '';
                } else {
                    return `INSERT INTO actions (type_action, date_action) VALUES ('${nom_table}', NOW());
                            INSERT INTO transfert_de_cuve (id, date, cuve_départ, cuve_arrivée, volume) VALUES (LAST_INSERT_ID(), '${data['date']}', '${cuve_départ}', '${cuve_arrivée}', '${volume_quantité }');
                            `.replace(/\s+/g, ' ').trim();;
                }
            case 'apport_de_vendanges':
                if (data['volume'] <= 0) {
                    alert('Le volume apporté doit être supérieur à 0 !');
                    return '';
                } else {
                    return `INSERT INTO actions (type_action, date_action) VALUES ('${nom_table}', NOW());
                            INSERT INTO apport_de_vendanges (id, date, parcelle, quantité, cuve_apport, appelation, cépage) VALUES (LAST_INSERT_ID(), '${data['date']}', '${data['parcelle']}', '${volume_quantité }', '${cuve_départ}', '${data['appelation']}', '${data['cépage']}');
                            `.replace(/\s+/g, ' ').trim();;
                }
            case 'mise_en_bouteille':
                if (data['volume'] <= 0) {
                    alert('Le volume mis en bouteille doit être supérieur à 0 !');
                    return '';
                } else if (liste_cuves[cuve_départ]['unité'] == 'kg') {
                    alert('La cuve doit contenir du vin (hl) et non des vendanges (kg) !');
                    return '';  
                } else if (volume_quantité  > liste_cuves[cuve_départ]['volume']) {
                    alert('Le volume mis en bouteille est supérieur au volume disponible dans la cuve !');
                    return '';
                } else {
                    return `INSERT INTO actions (type_action, date_action) VALUES ('${nom_table}', NOW());
                            INSERT INTO mise_en_bouteille (id, date, cuve_départ, volume, numéro_lot, appelation) VALUES (LAST_INSERT_ID(), '${data['date']}', '${cuve_départ}', '${volume_quantité }', '${data['numéro_lot']}', '${data['appelation']}');
                            `.replace(/\s+/g, ' ').trim();;
                }
            case 'sortie_lie':
                if (volume_quantité  <= 0) {
                    alert('Le volume de lie sortie doit être supérieur à 0 !');
                    return '';
                } else if (liste_cuves[cuve_départ]['unité'] == 'kg') {
                    alert('La cuve doit contenir du vin (hl) et non des vendanges (kg) !');
                    return '';  
                } else if (volume_quantité  > liste_cuves[cuve_départ]['volume']) {
                    alert('Le volume de lie sortie est supérieur au volume disponible dans la cuve !');
                    return '';
                } else {
                    return `INSERT INTO actions (type_action, date_action) VALUES ('${nom_table}', NOW());
                            INSERT INTO sortie_lie (id, date, cuve_départ, volume) VALUES (LAST_INSERT_ID(), '${data['date']}', '${cuve_départ}', '${volume_quantité }');
                            `.replace(/\s+/g, ' ').trim();;
                }
            case 'ajout_intrant':
                if (volume_quantité  <= 0) {
                    alert('La quantité ajoutée doit être supérieure à 0 !');
                    return '';
                } else if (liste_cuves[cuve_départ]['unité'] == 'kg') {
                    alert('La cuve doit contenir du vin (hl) et non des vendanges (kg) !');
                    return '';  
                } else {
                    return `INSERT INTO actions (type_action, date_action) VALUES ('${nom_table}', NOW());
                            INSERT INTO ajout_intrant (id, date, cuve_apport, libellé, quantité) VALUES (LAST_INSERT_ID(), '${data['date']}', '${cuve_départ}', '${data['libellé']}', '${volume_quantité }');
                            `.replace(/\s+/g, ' ').trim();;
                }
            default:
                alert('Type d\'action inconnu !');
                return '';
    }
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
        let request_sql = create_postSqlRequest(Datas)
        if (request_sql != '') {
            let request = $.ajax({
                type: this.method,
                url: this.action,
                data: {'module': '', 'request_sql': request_sql},
                timeout: 120000,
                cache: false,
            });
            request.done(function (output_success) {
                if (output_success.error) {
                    alert(output_success.message);
                } else {
                    alert(output_success.message);
                    get_data_cuves();
                }
            });
            request.fail(function (http_error) {
                let server_msg = http_error.responseText;
                let code = http_error.status;
                let code_label = http_error.statusText;
                alert("Erreur " + code + " (" + code_label + ") : " + server_msg);
            });
        }
    })
})
