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
  "CROIX DE GRANIER, Jeunes Grenaches maison bleue, 14.5",
  "GRAND PEREYROL, Carignans, 20.8",
  "GRAND PEREYROL, Cinsaults, 20.2",
  "GRAND PEREYROL, Grenaches, 20.6",
  "GRAND PEREYROL, Roussanes - Clairettes, 20.3",
  "GRAND PEREYROL, Syrah, 20.4",
  "GRAND PEREYROL, Vieux Carignans, 20.5",
  "GRAND PEREYROL, Viogniers - Marsannes, 20.7",
  "GROUPATA, Jeunes Grenache, 3.3",
  "GROUPATA, Vielles Grenaches, 3.4",
  "LE CONNIER, Syrahs, 5.1",
  "LE DEVES, Jeunes Grenaches, 4.1",
  "LE DEVES, Vielles Grenaches, 4.2",
  "LE PENDANT DES GARRIGUES, Grenaches Vacqueyras, 18.1",
  "LE PENDANT DES GARRIGUES, Syrah Vacqueyras, 18.2",
  "LE PENDANT DES GARRIGUES, Syrah Vacqueyras Roux, 18.3",
  "LE PENDANT DES GARRIGUES, Grenache Vacqueyras Roux, 18.4",
  "LE TON, Jeunes Grenaches, 7.2",
  "LE TON, Syrahs, 7.4",
  "LE TON, Vielles Grenaches, 7.3",
  "LES BAS SAUMES, Muscats sous lulu, 11.1",
  "LES GRANDES VIGNES, Au dessus des gobelets, 1.4",
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
  "LES PIGIERES, Vigne de Dieu - Grenaches, 21.5",
  "LES PIGIERES, Vigne de Dieu - Grenaches gros chêne, 21.3",
  "LES PIGIERES, Vigne de Dieu - Muscat petit grain, 21.4",
  "LES PIGIERES, Vigne de Dieu - Syrah, 21.2",
  "LES PIGIERES, Vigne en H, 19.1",
  "LES PIGIERES, A côté de la cave, 2.3",
  "LES PRES, Figuiers, 23.1",
  "TERRE DES CHABRES, Grenaches, 8.2",
  "TERRE DES CHABRES, Muscat Cinsault, 8.3",
  "TERRE DES FRERES, Ribols, 9.1",
  "VERNAIS SUD, Lavallées sous boyer, 10.1",
  "VERNAIS SUD, Muscats sous boyer, 10.2"
];
let cuves_data

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
    let cuves_data = {
        "B1": {"nom":"B1","appelation":"","millesime":"","cépage":"","volume":0,"unité":"","volume_total":6},
        "B10": {"nom":"B10","appelation":"","millesime":"","cépage":"","volume":0,"unité":"","volume_total":3},
        "B11": {"nom":"B11","appelation":"","millesime":"","cépage":"","volume":0,"unité":"","volume_total":3},
        "B2": {"nom":"B2","appelation":"","millesime":"","cépage":"","volume":0,"unité":"","volume_total":6},
        "B3": {"nom":"B3","appelation":"","millesime":"","cépage":"","volume":0,"unité":"","volume_total":3},
        "B4": {"nom":"B4","appelation":"","millesime":"","cépage":"","volume":0,"unité":"","volume_total":3},
        "B5": {"nom":"B5","appelation":"","millesime":"","cépage":"","volume":0,"unité":"","volume_total":3},
        "B6": {"nom":"B6","appelation":"","millesime":"","cépage":"","volume":0,"unité":"","volume_total":3},
        "B7": {"nom":"B7","appelation":"","millesime":"","cépage":"","volume":0,"unité":"","volume_total":3},
        "B8": {"nom":"B8","appelation":"","millesime":"","cépage":"","volume":0,"unité":"","volume_total":3},
        "B9": {"nom":"B9","appelation":"","millesime":"","cépage":"","volume":0,"unité":"","volume_total":3},
        "C1": {"nom":"C1","appelation":"","millesime":"","cépage":"","volume":0,"unité":"","volume_total":10},
        "F1": {"nom":"F1","appelation":"","millesime":"","cépage":"","volume":0,"unité":"","volume_total":80},
        "F2": {"nom":"F2","appelation":"","millesime":"","cépage":"","volume":0,"unité":"","volume_total":80},
        "F3": {"nom":"F3","appelation":"","millesime":"","cépage":"","volume":0,"unité":"","volume_total":60},
        "F4": {"nom":"F4","appelation":"","millesime":"","cépage":"","volume":0,"unité":"","volume_total":60},
        "F5": {"nom":"F5","appelation":"","millesime":"","cépage":"","volume":0,"unité":"","volume_total":50},
        "F6": {"nom":"F6","appelation":"","millesime":"","cépage":"","volume":0,"unité":"","volume_total":40},
        "F7": {"nom":"F7","appelation":"","millesime":"","cépage":"","volume":0,"unité":"","volume_total":30},
        "F8": {"nom":"F8","appelation":"","millesime":"","cépage":"","volume":0,"unité":"","volume_total":20},
        "F9": {"nom":"F9","appelation":"","millesime":"","cépage":"","volume":0,"unité":"","volume_total":10},
        "I0": {"nom":"I0","appelation":"","millesime":"","cépage":"","volume":0,"unité":"","volume_total":40},
        "I1": {"nom":"I1","appelation":"","millesime":"","cépage":"","volume":0,"unité":"","volume_total":64},
        "I10": {"nom":"I10","appelation":"","millesime":"","cépage":"","volume":0,"unité":"","volume_total":64},
        "I11": {"nom":"I11","appelation":"","millesime":"","cépage":"","volume":0,"unité":"","volume_total":64},
        "I2": {"nom":"I2","appelation":"","millesime":"","cépage":"","volume":0,"unité":"","volume_total":64},
        "I3": {"nom":"I3","appelation":"","millesime":"","cépage":"","volume":0,"unité":"","volume_total":64},
        "I4": {"nom":"I4","appelation":"","millesime":"","cépage":"","volume":0,"unité":"","volume_total":64},
        "I5": {"nom":"I5","appelation":"","millesime":"","cépage":"","volume":0,"unité":"","volume_total":64},
        "I6": {"nom":"I6","appelation":"","millesime":"","cépage":"","volume":0,"unité":"","volume_total":80},
        "I7": {"nom":"I7","appelation":"","millesime":"","cépage":"","volume":0,"unité":"","volume_total":80},
        "I8": {"nom":"I8","appelation":"","millesime":"","cépage":"","volume":0,"unité":"","volume_total":64},
        "I9": {"nom":"I9","appelation":"","millesime":"","cépage":"","volume":0,"unité":"","volume_total":64}
        }
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
                for (let i =  num_action; i >= 0; i--) {
                    let action = output_success.data[i]
                    let cuve_départ = action["cuve_départ"]
                    let cuve_arrivée = action["cuve_arrivée"]
                    let volume_quantité = parseFloat(action["volume_quantité"])
                    switch (action["type_action"]) {
                        case 'transfert_de_cuve':
                            if (cuves_data[cuve_départ]['unité'] == 'hl') {
                                cuves_data[cuve_départ]['volume'] -= volume_quantité
                                cuves_data[cuve_arrivée]['volume'] += volume_quantité
                            } else {    
                                cuves_data[cuve_départ]['volume'] = 0
                                cuves_data[cuve_arrivée]['volume'] = volume_quantité
                            }
                            cuves_data[cuve_arrivée]['appelation'] = cuves_data[cuve_départ]['appelation']
                            cuves_data[cuve_arrivée]['cépage'] = cuves_data[cuve_départ]['cépage']
                            cuves_data[cuve_arrivée]['millesime'] = cuves_data[cuve_départ]['millesime']
                            cuves_data[cuve_arrivée]['unité'] = cuves_data[cuve_départ]["unité"]
                            if (cuves_data[cuve_départ]['unité'] == 'kg') {
                                cuves_data[cuve_départ]['appelation'] = ''
                                cuves_data[cuve_départ]['cépage'] = ''
                                cuves_data[cuve_départ]['millesime'] = ''
                                cuves_data[cuve_arrivée]['unité'] = 'hl'
                                cuves_data[cuve_départ]['unité'] = 'hl'
                            }
                            break;
                        case 'apport_de_vendanges':
                            if (cuves_data[cuve_départ]['unité'] == 'hl') {
                                cuves_data[cuve_départ]['volume'] = volume_quantité
                            } else {
                                cuves_data[cuve_départ]['volume'] += volume_quantité
                            }
                            cuves_data[cuve_départ]['unité'] = 'kg'
                            cuves_data[cuve_départ]['appelation'] = action["appelation"]
                            cuves_data[cuve_départ]['cépage'] = action["cépage"]
                            cuves_data[cuve_départ]['millesime'] = (new Date(action["date"])).getFullYear()
                            break;
                        case 'mise_en_bouteille':
                            cuves_data[cuve_départ]['volume'] -= volume_quantité
                            break;
                        case 'sortie_lie':
                            cuves_data[cuve_départ]['volume'] -= volume_quantité
                            break;
                    } 
                }  
            } catch (e) {
                alert(e.message);
            }
            $('div.cuves').each(function () {
                let cuve = this.id;
                if (cuves_data[cuve]['unité'] == 'kg') {
                    this.querySelector(".rate").style.height = '0%';
                    this.querySelector(".fill_indicator").style.background = 'linear-gradient(to right, rgb(13, 104, 0), rgb(13, 197, 0), rgb(13, 54, 0))';
                } else {
                    this.querySelector(".rate").style.height = 100 - (cuves_data[cuve]['volume'] / cuves_data[cuve]['volume_total'] * 100) + '%';
                    this.querySelector(".fill_indicator").style.background = "linear-gradient(to right, rgb(104, 0, 0), rgb(197, 0, 0), rgb(54, 0, 0))";
                }
                if (cuves_data[cuve]['volume'] == 0) {
                    this.querySelector('.textAppelation').textContent = "";
                    this.querySelector('.textMillesime').textContent = "";
                    this.querySelector('.textCépage').textContent = "";
                } else {
                    this.querySelector('.textAppelation').textContent = cuves_data[cuve]['appelation'];
                    this.querySelector('.textMillesime').textContent = cuves_data[cuve]['millesime'];
                    this.querySelector('.textCépage').textContent = cuves_data[cuve]['cépage'];
                }
                this.querySelector('.volume').textContent = cuves_data[cuve]['volume'] + ' ' + cuves_data[cuve]['unité'];
                this.querySelector('.volume_max').innerHTML = cuves_data[cuve]['volume_total'] + 'hl'
            })
            upload_data_cuves(cuves_data)
        };
    })
    request.fail(function (http_error) {
        let server_msg = http_error.responseText;
        let code = http_error.status;
        let code_label = http_error.statusText;
        alert("Erreur " + code + " (" + code_label + ") : " + server_msg);
    });
}

function upload_data_cuves(cuves_data) {
    Object.keys(cuves_data).forEach((key) => {
        let cuveData = cuves_data[key]; 
        (async () => {
            await send("","UPDATE cuves SET volume = " + parseFloat(cuveData["volume"]) + ", unité  = '" + cuveData['unité'] + "', appelation = '" + cuveData['appelation'] + "', millesime = '" + cuveData['millesime'] + "', cépage = '" + cuveData['cépage'] + "' WHERE nom = '" + key + "'")
        })()
    })
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
                } else if (cuves_data[cuve_départ]['unité'] == 'hl' && cuves_data[cuve_arrivée]['volume'] + volume_quantité  > cuves_data[cuve_arrivée]['volume_total']) {
                    alert('Le volume total dans la cuve d\'arrivée serait dépassé !');
                    return '';
                } else if (cuves_data[cuve_départ]['unité'] == 'hl' && data['volume'] > cuves_data[cuve_départ]['volume']) {
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
                } else if (cuves_data[cuve_départ]['unité'] == 'kg') {
                    alert('La cuve doit contenir du vin (hl) et non des vendanges (kg) !');
                    return '';  
                } else if (volume_quantité  > cuves_data[cuve_départ]['volume']) {
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
                } else if (cuves_data[cuve_départ]['unité'] == 'kg') {
                    alert('La cuve doit contenir du vin (hl) et non des vendanges (kg) !');
                    return '';  
                } else if (volume_quantité  > cuves_data[cuve_départ]['volume']) {
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
                } else if (cuves_data[cuve_départ]['unité'] == 'kg') {
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
    synch_cuve()
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