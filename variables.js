export const liste_nom_cuves = {
    "cuves_inox": ["I0", "I1", "I2", "I3", "I4", "I5", "I6", "I7", "I8", "I9", "I10", "I11"], 
    "cuves_fibres": ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9"], 
    "barriques":["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10", "B11"] ,
    "cuvons": ["C1"]
};
export let liste_cuves = {};

export const sauvegarder = () => sessionStorage.setItem('transfert_cuves', JSON.stringify(liste_cuves));
export const charger = () => Object.assign(liste_cuves, JSON.parse(sessionStorage.getItem('transfert_cuves') || '{}'));