import {liste_cuves, liste_nom_cuves, sauvegarder} from './variables.js';

window.addEventListener('beforeunload', () => {
    sauvegarder(); 
});


const liste_parcelles = [
  "COURROIE DES VERNAIS, Cinsault, 22.5",
  "COURROIE DES VERNAIS, Lavallées en lyre, 12.1",
  "COURROIE DES VERNAIS, Merlots, 12.2",
  "COURROIE DES VERNAIS, Muscat petit grain, 22.1",
  "COURROIE DES VERNAIS, Muscats, 22.4",
  "COURROIE DES VERNAIS, Parcelle de Jean, 22.2",
  "COURROIE DES VERNAIS, Ribols en lyre, 22.3",
  "CROIX DE GRANIER, Cinsaults maison bleue, 14.1",
  "CROIX DE GRANIER, Gobelets maison bleue, 14.2",
  "CROIX DE GRANIER, Grenache Cyprès maison bleue, 14.3",
  "CROIX DE GRANIER, Grenaches au-dessus maison bleue, 14.4",
  "LES GRANDES VIGNES, Gleize, 1.3",
  "LES GRANDES VIGNES, Gobelets, 1.5",
  "LES GRANDES VIGNES, Jeunes Grenaches, 1.8",
  "LES GRANDES VIGNES, Rangée qui descendent, 1.2",
  "LES GRANDES VIGNES, Rangées courtes, 1.1",
  "LES GRANDES VIGNES, Syrah devant, 1.10",
  "LES GRANDES VIGNES, Syrah longues rangées, 1.6",
  "LES GRANDES VIGNES, Vielles Grenaches, 1.7",
  "LES PIGIERES, Sous Martial, 2.2",
  "LES PIGIERES, Sous Portalier, 2.1",
  "LES PIGIERES, Sous route, 2.4",
  "LES PIGIERES, Syrah Martial, 23.1",
  "LES PIGIERES, Vigne de Dieu - Grenaches, 21.5"
];

function get_data_cuves() {
    let request = $.ajax({
        type: "POST",
        url: 'dataBase_request.php',
        data: {'module': 'cuves_data'},
        timeout: 5000,
        cache: false,
    })
    request.done(function (output_success) {
        if (output_success.error) {
            alert('Immpossible de récupérer les données serveur : ' + output_success.message);
        } else {
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
            timeout: 5000,
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
                            } else {
                                liste_cuves[cuve_départ]['volume'] = 0
                                liste_cuves[cuve_arrivée]['volume'] = volume_quantité
                            }
                            liste_cuves[cuve_arrivée]['appelation'] = liste_cuves[cuve_départ]['appelation']
                            liste_cuves[cuve_arrivée]['cépage'] = liste_cuves[cuve_départ]['cépage']
                            liste_cuves[cuve_arrivée]['millesmime'] = liste_cuves[cuve_départ]['millesmime']
                            if (liste_cuves[cuve_départ]['unité'] == 'kg') {
                                liste_cuves[cuve_départ]['appelation'] = ''
                                liste_cuves[cuve_départ]['cépage'] = ''
                                liste_cuves[cuve_départ]['millesmime'] = ''
                                liste_cuves[cuve_arrivée]['unité'] = 'hl'
                                liste_cuves[cuve_départ]['unité'] = 'hl'
                            }
                            break;
                        case 'apport_de_vendanges':
                            if (liste_cuves[cuve_départ]['unité'] == 'hl') {
                                liste_cuves[cuve_départ]['volume'] = volume_quantité
                            } else {
                                liste_cuves[cuve_départ]['volume'] += volume_quantité
                            }
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
                if (liste_cuves[cuve]['unité'] == 'kg') {
                    this.querySelector(".rate").style.height = '0%';
                    this.querySelector(".fill_indicator").style.background = 'linear-gradient(to right, rgb(13, 104, 0), rgb(13, 197, 0), rgb(13, 54, 0))';
                } else {
                    this.querySelector(".rate").style.height = 100 - (liste_cuves[cuve]['volume'] / liste_cuves[cuve]['volume_total'] * 100) + '%';
                    this.querySelector(".fill_indicator").style.background = "linear-gradient(to right, rgb(104, 0, 0), rgb(197, 0, 0), rgb(54, 0, 0))";
                }
                if (liste_cuves[cuve]['volume'] == 0) {
                    this.querySelector('.textAppelation').textContent = "";
                    this.querySelector('.textMillesime').textContent = "";
                    this.querySelector('.textCépage').textContent = "";
                } else {
                    this.querySelector('.textAppelation').textContent = liste_cuves[cuve]['appelation'];
                    this.querySelector('.textMillesime').textContent = liste_cuves[cuve]['millesmime'];
                    this.querySelector('.textCépage').textContent = liste_cuves[cuve]['cépage'];
                }
                this.querySelector('.volume').textContent = liste_cuves[cuve]['volume'] + ' ' + liste_cuves[cuve]['unité'];
                this.querySelector('.volume_max').innerHTML = liste_cuves[cuve]['volume_total'] + 'hl'
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
                            INSERT INTO mise_en_bouteille (id, date, cuve_départ, volume, numéro_lot) VALUES (LAST_INSERT_ID(), '${data['date']}', '${cuve_départ}', '${volume_quantité }', '${data['numéro_lot']}');
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
                            INSERT INTO ajout_intrant (id, date, cuve_apport, libellé, quantité) VALUES (LAST_INSERT_ID(), '${data['date']}', '${cuve_départ}', '${data['libellé']}', '${data['quantité']}');
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
    liste_parcelles.forEach((parcelle) => {
        let option
        option = document.createElement('option')
        option.value = parcelle
        option.innerHTML = parcelle
        document.getElementById("select-parcelle").appendChild(option)
    })
    $('form.action').on('submit', function (event) {
                event.preventDefault();

        let Datas = new FormData(this);
        let request_sql = create_postSqlRequest(Datas)
        console.log(request_sql)
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
window.aff_action = aff_action;