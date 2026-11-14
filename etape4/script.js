"use strict"; // Active le mode strict (slide 52)

// Compteur de lignes (let car modifiée, slides 51-52 ; variable globale, slides 50-51)
let lignes = 0;

// Déclarer une variable "total_points" et l'initialiser à 0 (slides 51-52)
let total_points = 0;

// Tableau d'objets "persons" (tableau slide 38, objets slide 39, tableau d'objets slide 40)
const persons = [
    { nom: "nom-1", prenom: "prenom-1", points: 5 },
    { nom: "nom-2", prenom: "prenom-2", points: 10 },
    { nom: "nom-3", prenom: "prenom-3", points: 15 }
];

// Appel de init() (possible avant la déclaration grâce au hoisting, slide 46)
init();

// Remplit le tableau HTML à partir de "persons" (slide 45)
function init() {
    // Boucle for...of sur les objets du tableau persons (slide 44)
    for (const person of persons) {
        doInsert(person.nom, person.prenom, person.points);
    }
}

// Insère une personne dans le tableau HTML et met à jour le résumé (slide 45)
function doInsert(nom, prenom, points) {
    // Incrémenter lignes de 1, puis l'affecter à num (opérateur ++, slide 41)
    lignes++;
    const num = lignes;

    // Rajouter points (passé en paramètre) à la variable total_points (opérateur combiné +=, slide 41)
    total_points += points;

    // Insérer la ligne dans le tableau HTML (fonction de l'étape 2)
    doInsertRowTable(num, nom, prenom, points);

    // Appeler update_summary() pour rafraîchir l'espace résumé (défini plus bas)
    update_summary();
}

// Insère une ligne dans l'élément table (slide 45)
function doInsertRowTable(num, nom, prenom, points) {

    // Récupérer le corps du tableau par son identifiant (getElementById, slides 61-64)
    const table = document.getElementById("table_body");

    // Créer la ligne tr et lui donner la classe "row" (slides 104-107)
    const row = document.createElement("tr");
    row.setAttribute("class", "row");

    // Créer les 5 colonnes td (slides 104-105)
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

    // Dernière colonne : checkbox (slides 104-107, append slides 97-98)
    const chk = document.createElement("input");
    chk.setAttribute("type", "checkbox");
    col5.append(chk);

    // Affecter les classes des colonnes (slides 106-107)
    col1.setAttribute("class", "col_number");
    col2.setAttribute("class", "col_text");
    col3.setAttribute("class", "col_text");
    col4.setAttribute("class", "col_number");
    col5.setAttribute("class", "col_chkbox");

    // Ajouter les colonnes à la ligne, puis la ligne au tableau (append, slides 97-98)
    row.append(col1, col2, col3, col4, col5);
    table.append(row);
}

// Met à jour l'espace "Résumé" (slide 45)
function update_summary() {
    // Récupérer l'élément d'identifiant p1 (getElementById, slides 61-64)
    const element_lignes = document.getElementById("p1");

    // Récupérer l'élément d'identifiant p3 (getElementById, slides 61-64)
    const element_points = document.getElementById("p3");

    // Avec innerText (slides 90-91), afficher le nombre de lignes.
    // Template literal (`...${}...`) pour construire la chaîne (slide 141)
    element_lignes.innerText = `${lignes} ligne(s)`;

    // Avec innerText, afficher le total des points
    element_points.innerText = `Total point(s)= ${total_points}`;
}

// Fonction exécutée au clic sur "Console Tableau" (événement onclick, slides 127-135)
function consoleTableau() {
    // Afficher le contenu du tableau "persons" dans la console (slide 33)
    console.log(persons);
}