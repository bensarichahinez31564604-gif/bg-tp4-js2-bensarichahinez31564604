"use strict"; // Active le mode strict (slide 52)


// Compteur de lignes et total des points (let car modifiées, slides 51-52 ; globales, slides 50-51)
let lignes = 0;
let total_points = 0;

// Tableau d'objets "persons" (slides 38-40)
const persons = [
    { nom: "nom-1", prenom: "prenom-1", points: 5 },
    { nom: "nom-2", prenom: "prenom-2", points: 10 },
    { nom: "nom-3", prenom: "prenom-3", points: 15 }
];

// Appel de init() (hoisting, slide 46)
init();

// Remplit le tableau HTML à partir de "persons" (slide 45)
function init() {
    // Boucle for...of (slide 44)
    for (const person of persons) {
        doInsert(person.nom, person.prenom, person.points);
    }
}

// Insère une personne dans le tableau HTML et met à jour le résumé (slide 45)
function doInsert(nom, prenom, points) {
    lignes++;  // compteur de lignes (opérateur ++, slide 41)
    const num = lignes;
    total_points += points;  // opérateur combiné += (slide 41)

    doInsertRowTable(num, nom, prenom, points);
    update_summary();
}

// Insère une ligne dans l'élément table (slide 45)
function doInsertRowTable(num, nom, prenom, points) {

    // Récupérer le corps du tableau (getElementById, slides 61-64)
    const table = document.getElementById("table_body");

    // Créer la ligne et ses 5 colonnes (createElement, slides 104-105) ; classe via setAttribute (slides 106-107)
    const row = document.createElement("tr");
    row.setAttribute("class", "row");
    const col1 = document.createElement("td");
    const col2 = document.createElement("td");
    const col3 = document.createElement("td");
    const col4 = document.createElement("td");
    const col5 = document.createElement("td");

    // Contenu des colonnes avec innerText (slides 90-91)
    col1.innerText = num;
    col2.innerText = nom;
    col3.innerText = prenom;
    col4.innerText = points;

    // Colonne checkbox (slides 104-107 ; append, slides 97-98)
    const chk = document.createElement("input");
    chk.setAttribute("type", "checkbox");
    col5.append(chk);

    // Classes des colonnes (slides 106-107)
    col1.setAttribute("class", "col_number");
    col2.setAttribute("class", "col_text");
    col3.setAttribute("class", "col_text");
    col4.setAttribute("class", "col_number");
    col5.setAttribute("class", "col_chkbox");

    // Assemblage (append, slides 97-98)
    row.append(col1, col2, col3, col4, col5);
    table.append(row);
}

// Met à jour l'espace "Résumé" (slide 45)
function update_summary() {
    // Récupérer les éléments p1 et p3 (getElementById, slides 61-64)
    const element_lignes = document.getElementById("p1");
    const element_points = document.getElementById("p3");

    // Modifier leur contenu avec innerText (slides 90-91) ; template literals (slide 141)
    element_lignes.innerText = `${lignes} ligne(s)`;
    element_points.innerText = `Total point(s)= ${total_points}`;
}

// Fonction exécutée au clic sur "Ajouter" (événement onclick, slides 127-135)
function doNewData() {

    // Récupérer les 3 champs de saisie par leur identifiant (getElementById, slides 61-64)
    const elt_nom = document.getElementById("form_nom");
    const elt_prenom = document.getElementById("form_prenom");
    const elt_points = document.getElementById("form_points");

    // Accéder à l'attribut value de chaque champ (attributs accessibles par leur nom, slides 92-93).
    // trim() retire les espaces inutiles : une saisie "   " est donc considérée comme vide (méthode de String, slide 37)
    const nom = elt_nom.value.trim();
    const prenom = elt_prenom.value.trim();

    // parseInt convertit le texte saisi en entier : la valeur d'un champ est toujours du texte
    // (typage faible / conversion de types, slide 31 ; parseInt indiqué dans l'énoncé du TP)
    const points = parseInt(elt_points.value);

    // Saisie contrôlée : condition if...else (slide 42) avec opérateurs logique || et de comparaison === (slides 41 et 141).
    // Number.isNaN(points) vaut true si le champ Points est vide ou invalide.
    if (nom === "" || prenom === "" || Number.isNaN(points)) {
        // Afficher un message avec alert, méthode de window (BOM, slide 116)
        alert("Formulaire incomplet !");
    } else {
        // Appeler doInsert avec les nouvelles données (ajoute la ligne HTML et met à jour le résumé)
        doInsert(nom, prenom, points);

        // Insérer aussi les nouvelles données dans le tableau "persons" (push, méthode de tableau, slide 38)
        // Objet littéral avec propriétés abrégées (slide 39)
        persons.push({ nom, prenom, points });

        // Vider les champs de saisie pour préparer une autre saisie (attribut value, slides 92-93)
        elt_nom.value = "";
        elt_prenom.value = "";
        elt_points.value = "";
    }
}

// Fonction exécutée au clic sur "Console Tableau" (slides 127-135)
function consoleTableau() {
    // Afficher le tableau "persons" dans la console (slide 33)
    console.log(persons);
}