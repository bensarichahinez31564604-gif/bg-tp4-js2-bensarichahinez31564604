"use strict"; // Active le mode strict (slide 52)



// Compteur de lignes et total des points (let car modifiées, slides 51-52 ; globales, slides 50-51)
let lignes = 0;
let total_points = 0;

// Tableau d'objets "persons" (slides 38-40).
// const : la référence ne change pas, seul le contenu est modifié (push / splice) (slides 51-52)
const persons = [
    { nom: "nom-1", prenom: "prenom-1", points: 5 },
    { nom: "nom-2", prenom: "prenom-2", points: 10 },
    { nom: "nom-3", prenom: "prenom-3", points: 15 }
];

// Appels au démarrage (possibles avant les déclarations grâce au hoisting, slide 46)
init();
init_bonus();

// Remplit le tableau HTML à partir de "persons" (slide 45)
function init() {
    // Boucle for...of (slide 44)
    for (const person of persons) {
        doInsert(person.nom, person.prenom, person.points);
    }
}

// Insère une personne dans le tableau HTML et met à jour le résumé (slide 45)
function doInsert(nom, prenom, points) {
    lignes++;                // opérateur ++ (slide 41)
    const num = lignes;
    total_points += points;  // opérateur combiné += (slide 41)

    doInsertRowTable(num, nom, prenom, points);
    update_summary();

    // BONUS : une nouvelle ligne est décochée et doit respecter le filtre de recherche en cours
    apply_filter();
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

    // BONUS 1 : quand on coche / décoche une ligne, on met à jour la case "Tout sélectionner"
    // (addEventListener, slide 139)
    chk.addEventListener("change", update_select_all);

    // BONUS 3 : double-clic sur la ligne => modification de la personne (dblclick, slide 139)
    row.addEventListener("dblclick", function (event) {
        editRow(row, event);
    });

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

    // Récupérer les 3 champs de saisie (getElementById, slides 61-64)
    const elt_nom = document.getElementById("form_nom");
    const elt_prenom = document.getElementById("form_prenom");
    const elt_points = document.getElementById("form_points");

    // Lire l'attribut value des champs (slides 92-93) ; trim() enlève les espaces (méthode de String, slide 37)
    const nom = elt_nom.value.trim();
    const prenom = elt_prenom.value.trim();

    // parseInt : conversion du texte en entier (typage faible, slide 31 ; parseInt indiqué dans l'énoncé du TP)
    const points = parseInt(elt_points.value);

    // Saisie contrôlée : if...else (slide 42), opérateurs || et === (slides 41 et 141)
    if (nom === "" || prenom === "" || Number.isNaN(points)) {
        // alert : méthode de window (BOM, slide 116)
        alert("Formulaire incomplet !");
    } else {
        // Ajouter la ligne HTML et mettre à jour le résumé
        doInsert(nom, prenom, points);

        // Ajouter aussi la personne dans le tableau "persons" (push, slide 38 ; objet littéral, slide 39)
        persons.push({ nom, prenom, points });

        // Vider les champs (attribut value, slides 92-93)
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

//  ETAPE 6 : Suppression des lignes sélectionnées (bouton "Supprimer")

function deleteRow() {

    // Etape 1 : vérifier si le tableau est vide.
    // Si le nombre de lignes est égal à 0, afficher une alerte et sortir de la fonction
    // (if, slide 42 ; comparaison stricte ===, slide 141 ; alert, slide 116)
    if (lignes === 0) {
        alert("Le tableau est vide !");
        return;
    }

    // Etape 2 : récupérer le tableau et la liste des checkbox cochées.
    // querySelector() et querySelectorAll() avec des sélecteurs CSS (slides 76-78).
    // On cible les checkbox à l'intérieur de .col_chkbox ; :checked ne garde que les cases cochées.
    const table = document.querySelector("#table_persons");
    const checked = table.querySelectorAll(".col_chkbox input:checked");

    // Etape 3 : si aucune checkbox n'est cochée, afficher un message et sortir de la fonction
    if (checked.length === 0) {
        alert("Sélectionnez au moins une ligne !");
        return;
    }

    // Etape 4 : demander une confirmation avant suppression ; si l'utilisateur clique sur "Annuler", quitter.
    // confirm() est une méthode de window, de la même famille de pop-ups que alert() et prompt() (BOM, slide 116)
    if (!confirm(`Voulez-vous vraiment supprimer ${checked.length} ligne(s) ?`)) {
        return;
    }

    // Etape 5 : récupérer toutes les lignes du tableau (querySelectorAll, slides 76-78).
    // querySelectorAll renvoie une collection FIXE : supprimer des lignes pendant le parcours est donc sans danger.
    const rows = table.querySelectorAll("tbody .row");

    // Compteur du nombre de lignes déjà supprimées : sert à retrouver le bon indice dans "persons"
    let removed = 0;

    // Etape 6 : parcourir les lignes (boucle sur une collection, slides 79-83 ; forEach, slide 44)
    rows.forEach(function (row, index) {

        // Récupérer la checkbox de la ligne (querySelector, slides 76-78)
        const chk = row.querySelector(".col_chkbox input");

        // Si la checkbox est cochée (propriété checked, slides 92-93)
        if (chk.checked) {

            // Récupérer la valeur des points dans la 4e cellule : children[3] (propriété children, slides 88-89),
            // convertie en entier avec parseInt
            const points = parseInt(row.children[3].innerText);

            // Soustraire les points de total_points (opérateur combiné -=, slide 41)
            total_points -= points;

            // Décrémenter la variable lignes (opérateur --, slide 41)
            lignes--;

            // Supprimer la ligne du DOM (remove, slides 99-100)
            row.remove();

            // Supprimer aussi la même entrée dans le tableau persons (splice, méthode de tableau, slide 38).
            // Les lignes déjà supprimées décalent les indices, d'où "index - removed".
            persons.splice(index - removed, 1);
            removed++;
        }
    });

    // Renuméroter la colonne N° des lignes restantes (1, 2, 3...) pour garder une numérotation
    // cohérente avec "lignes" et avec les indices de "persons" (children, slides 88-89 ; innerText, slides 90-91)
    const remaining = table.querySelectorAll("tbody .row");
    remaining.forEach(function (row, index) {
        row.children[0].innerText = index + 1;
    });

    // Etape 7 : mettre à jour le résumé, puis afficher un message de succès
    update_summary();
    update_select_all();
    alert(`${removed} ligne(s) supprimée(s) avec succès !`);
}

/*
  les lignes supprimées réapparaissent (et celles ajoutées disparaissent).
    La suppression ne modifie que le DOM et le tableau "persons" en MÉMOIRE (slides 55-56).
    Au rechargement, le navigateur relit index.html et script.js : le tableau "persons" est
    recréé avec ses 3 valeurs d'origine, donc rien n'est sauvegardé. Pour conserver les données,
    il faudrait un stockage (localStorage, base de données côté serveur...), vu dans les chapitres suivants.
*/

//  BONUS 1 : "Tout sélectionner"


// Retourne les lignes actuellement visibles (non masquées par la recherche).
// Array.from convertit la collection en vrai tableau (slide 38), filter garde les lignes voulues (slide 141)
function get_visible_rows() {
    const all_rows = Array.from(document.querySelectorAll("#table_body .row"));
    return all_rows.filter(function (row) {
        return row.style.display !== "none";   // propriété style (slides 94-95)
    });
}

// Coche / décoche toutes les lignes visibles selon l'état de la case "Tout sélectionner"
function toggle_select_all() {
    const select_all = document.getElementById("select_all");
    for (const row of get_visible_rows()) {                       // boucle for...of (slide 44)
        row.querySelector(".col_chkbox input").checked = select_all.checked;   // propriété checked (slides 92-93)
    }
}

// Met à jour la case "Tout sélectionner" : cochée seulement si toutes les lignes visibles sont cochées
function update_select_all() {
    const select_all = document.getElementById("select_all");
    const visible = get_visible_rows();
    // every() renvoie true si TOUTES les lignes satisfont la condition (méthode native de tableau, slide 141)
    select_all.checked = visible.length > 0 && visible.every(function (row) {
        return row.querySelector(".col_chkbox input").checked;
    });
}




// Affiche seulement les lignes dont le nom ou le prénom contient le texte recherché
function apply_filter() {
    const search = document.getElementById("form_search").value.trim().toLowerCase();   // slides 37 et 92-93
    const rows = document.querySelectorAll("#table_body .row");                         // slides 76-78

    rows.forEach(function (row) {
        // Lire le nom (2e cellule) et le prénom (3e cellule) : children, slides 88-89
        const nom = row.children[1].innerText.toLowerCase();
        const prenom = row.children[2].innerText.toLowerCase();

        // Condition avec opérateur || (slide 41) ; includes() est une méthode de String (slide 37)
        const visible = nom.includes(search) || prenom.includes(search);

        // Afficher / masquer la ligne via la propriété style (slides 94-95)
        row.style.display = visible ? "" : "none";

        // Une ligne masquée est décochée, pour qu'un clic sur "Supprimer" ne supprime jamais une ligne cachée
        if (!visible) {
            row.querySelector(".col_chkbox input").checked = false;
        }
    });

    update_select_all();
}


//  BONUS 3 : Modification d'une personne (double-clic sur une ligne)

function editRow(row, event) {

    // Ignorer le double-clic sur la case à cocher (propriété tagName d'un élément, slides 86-87)
    if (event.target.tagName === "INPUT") {
        return;
    }

    // Retrouver la position de la ligne dans le tableau : c'est aussi son indice dans "persons"
    const rows = Array.from(document.querySelectorAll("#table_body .row"));
    const index = rows.indexOf(row);
    const person = persons[index];

    // prompt() : boîte de dialogue avec champ de saisie, méthode de window (BOM, slide 116).
    // La valeur actuelle est proposée par défaut ; prompt renvoie null si on clique sur "Annuler".
    const new_nom = prompt("Nouveau nom :", person.nom);
    if (new_nom === null) { return; }

    const new_prenom = prompt("Nouveau prénom :", person.prenom);
    if (new_prenom === null) { return; }

    const new_points_text = prompt("Nouveaux points :", person.points);
    if (new_points_text === null) { return; }

    // Conversion en entier (slide 31) puis contrôle de saisie (if, slide 42)
    const new_points = parseInt(new_points_text);
    if (new_nom.trim() === "" || new_prenom.trim() === "" || Number.isNaN(new_points)) {
        alert("Formulaire incomplet ! Modification annulée.");
        return;
    }

    // Mettre à jour le total des points : on retire l'ancienne valeur, on ajoute la nouvelle (slide 41)
    total_points += new_points - person.points;

    // Mettre à jour les données (objet, slide 39)...
    person.nom = new_nom.trim();
    person.prenom = new_prenom.trim();
    person.points = new_points;

    // ... et l'affichage (innerText, slides 90-91 ; children, slides 88-89)
    row.children[1].innerText = person.nom;
    row.children[2].innerText = person.prenom;
    row.children[3].innerText = person.points;

    // Rafraîchir le résumé et le filtre de recherche
    update_summary();
    apply_filter();
}

//  Branchement des événements des bonus (appelée une seule fois au démarrage)

function init_bonus() {
    // Case "Tout sélectionner" : événement "change" (addEventListener, slide 139)
    document.getElementById("select_all").addEventListener("change", toggle_select_all);

    // Champ de recherche : événement "input" déclenché à chaque caractère tapé (addEventListener, slide 139)
    document.getElementById("form_search").addEventListener("input", apply_filter);
}