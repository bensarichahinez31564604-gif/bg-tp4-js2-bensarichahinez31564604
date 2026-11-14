"use strict"; // Active le mode strict : les variables non déclarées provoquent une erreur (slide 52)

// Déclaration d'une fonction avec 4 paramètres (slide 45).
// Les fonctions déclarées sont "hoistées" : utilisables avant leur déclaration (slide 46).
function doInsertRowTable(num, nom, prenom, points) {

    // Récupérer l'élément tableau grâce à son identifiant (getElementById, slides 61-64).
    // On cible le <tbody> : c'est là que se trouvent les lignes de données.
    // "const" car cette référence ne sera jamais réaffectée (slides 51-52).
    const table = document.getElementById("table_body");

    // Créer un élément de type tr (ligne de tableau) : on crée un élément HTML à partir de 0
    // (createElement, slides 104-105)
    const row = document.createElement("tr");

    // Affecter à row la valeur "row" à son attribut class (setAttribute, slides 106-107)
    row.setAttribute("class", "row");

    // Créer 5 éléments de type td (colonnes du tableau) (createElement, slides 104-105)
    const col1 = document.createElement("td");
    const col2 = document.createElement("td");
    const col3 = document.createElement("td");
    const col4 = document.createElement("td");
    const col5 = document.createElement("td");

    // Remplir le contenu de chaque colonne avec les paramètres de la fonction,
    // en utilisant la propriété innerText (slides 90-91)
    col1.innerText = num;
    col2.innerText = nom;
    col3.innerText = prenom;
    col4.innerText = points;

    // La dernière colonne contient un élément input de type checkbox :
    // on le crée (slides 104-105), on fixe son type (slides 106-107),
    // puis on l'ajoute dans la colonne avec append() (slides 97-98)
    const chk = document.createElement("input");
    chk.setAttribute("type", "checkbox");
    col5.append(chk);

    // Affecter les classes correspondantes à chaque colonne (setAttribute, slides 106-107)
    col1.setAttribute("class", "col_number");
    col2.setAttribute("class", "col_text");
    col3.setAttribute("class", "col_text");
    col4.setAttribute("class", "col_number");
    col5.setAttribute("class", "col_chkbox");

    // Rajouter les colonnes à la ligne row avec la méthode append() (slides 97-98)
    row.append(col1, col2, col3, col4, col5);

    // Rajouter la ligne row au tableau table (append, slides 97-98)
    table.append(row);
}

/*
     les lignes ajoutées disparaissent et on retrouve uniquement les 3 lignes d'origine.
    JavaScript modifie le DOM, c'est-à-dire la copie de la page gardée en mémoire par le
    navigateur (slides 55-56). Le fichier index.html, lui, n'est jamais modifié. En actualisant,
    le navigateur recharge le fichier HTML d'origine et reconstruit un nouveau DOM : les
    changements faits par le script sont perdus (rien n'est sauvegardé).
*/