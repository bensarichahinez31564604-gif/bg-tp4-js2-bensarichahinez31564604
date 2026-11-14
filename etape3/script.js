"use strict"; // Active le mode strict (slide 52)


// Déclarer une variable "lignes" et l'initialiser à 0 : compteur de lignes.
// "let" car sa valeur va changer (slides 51-52). Variable globale (slides 50-51).
let lignes = 0;

// Tableau "persons" : un tableau (slide 38) d'objets littéraux (slide 39),
// chaque objet "person" ayant 3 propriétés : nom, prenom, points (slide 40).
// "const" car la référence du tableau ne change pas (on modifiera seulement son contenu) (slides 51-52).
const persons = [
    { nom: "nom-1", prenom: "prenom-1", points: 5 },
    { nom: "nom-2", prenom: "prenom-2", points: 10 },
    { nom: "nom-3", prenom: "prenom-3", points: 15 }
];

// Appel de init() : possible avant sa déclaration car les fonctions déclarées sont hoistées (slide 46)
init();

// Fonction qui remplit le tableau HTML à partir du tableau "persons" (slide 45)
function init() {
    // Boucle for...of : parcourt chaque objet du tableau persons (slide 44)
    for (const person of persons) {
        // Appel de doInsert avec les données de l'objet courant (accès aux propriétés d'un objet, slide 39)
        doInsert(person.nom, person.prenom, person.points);
    }
}

// Fonction appelée pour chaque nouvelle personne à afficher (slide 45)
function doInsert(nom, prenom, points) {
    // Incrémenter la variable lignes de 1 (opérateur ++, slide 41)...
    lignes++;
    // ... puis l'affecter à num, au lieu de 99 (affectation, slide 36)
    const num = lignes;

    // Appel de doInsertRowTable avec les paramètres appropriés (slide 45)
    doInsertRowTable(num, nom, prenom, points);
}

// Insère une ligne dans l'élément table (définie à l'étape 2) (slide 45)
function doInsertRowTable(num, nom, prenom, points) {

    // Récupérer l'élément tableau par son identifiant (getElementById, slides 61-64)
    const table = document.getElementById("table_body");

    // Créer un élément tr et lui donner la classe "row" (createElement slides 104-105, setAttribute slides 106-107)
    const row = document.createElement("tr");
    row.setAttribute("class", "row");

    // Créer 5 éléments td (slides 104-105)
    const col1 = document.createElement("td");
    const col2 = document.createElement("td");
    const col3 = document.createElement("td");
    const col4 = document.createElement("td");
    const col5 = document.createElement("td");

    // Remplir le contenu des colonnes avec innerText (slides 90-91)
    col1.innerText = num;
    col2.innerText = nom;
    col3.innerText = prenom;
    col4.innerText = points;

    // Dernière colonne : un input de type checkbox (slides 104-107 et append, slides 97-98)
    const chk = document.createElement("input");
    chk.setAttribute("type", "checkbox");
    col5.append(chk);

    // Affecter les classes de chaque colonne (setAttribute, slides 106-107)
    col1.setAttribute("class", "col_number");
    col2.setAttribute("class", "col_text");
    col3.setAttribute("class", "col_text");
    col4.setAttribute("class", "col_number");
    col5.setAttribute("class", "col_chkbox");

    // Rajouter les colonnes à la ligne, puis la ligne au tableau (append, slides 97-98)
    row.append(col1, col2, col3, col4, col5);
    table.append(row);
}

// Fonction exécutée au clic sur le bouton "Console Tableau" (événement onclick, slides 127-135)
function consoleTableau() {
    // Afficher le contenu du tableau "persons" dans la console (console.log, slide 33)
    console.log(persons);
}