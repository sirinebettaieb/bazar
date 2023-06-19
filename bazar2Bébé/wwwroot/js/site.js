// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.
// Fonction pour ajouter un article au panier
var totalArticles = 0;
var prixTotal = 0;
var tabProduits = new Array();
var tabPrix = new Array();
var tabNbEltDuMemeProduit = new Array(18).fill(0);  // Initialisation tableau nombre d'articles du même produit à zéro'

// Mettre a jour le nombre total des articles
function mettreAjourTotalArticles() {
    var totalArticlesElement = document.getElementById("total-articles");
    totalArticlesElement.innerText = "Total des articles : " + totalArticles;
}

// Ajouter un article au panier
function ajouterAuPanier(id)
{
    totalArticles++;   // Incrementer le nombre total des articles 
    const boutonAjouter = document.getElementById('car-' + id);  // Recuperer les informations du bouton "boutonAjouter"
    var prix = parseFloat(boutonAjouter.getAttribute('data-price'));
    var description = boutonAjouter.getAttribute('data-description');
    prixTotal += prix;     // Additionner les prix des articles
    tabProduits[id] = description; // Stocker la description du produit dans un tableau 
    tabPrix[id] = prix; // Stocker le prix du produit dans un tableau

    var img = document.createElement("img");  // Creation d un objet de type image
    img.src = "../image/iconePoubelle.png";
    img.setAttribute("class", "deleteButton");
    img.addEventListener("click", function (event) { // Appel de la fonction supprimerElement(id) avec id en parametre
        supprimerElement(id);
        event.preventDefault();
    });
    img.setAttribute("id", "btn-" + id);
    
    //const article = { prix, description };
    tabNbEltDuMemeProduit[id] += 1; // Incrementer le nombre de fois ouù le produit a été ajouté
    if (tabNbEltDuMemeProduit[id] == 1) {   // Si le produit n'a jamais été ajouté au panier on le créé
        // Creation elements
        const panierElement = document.getElementById('panier');
        const tableOfArticle = document.createElement('table');
        const ligneOfTable = document.createElement('tr');
        const colomnOfTable = document.createElement('td');
        const span = document.createElement('span');
        const colomnOfTable2 = document.createElement('td');

        // Parametrage des nouveaux elements crees + lien appendChild
        tableOfArticle.appendChild(ligneOfTable);
        ligneOfTable.appendChild(colomnOfTable);
        span.innerText = `${description} : 1 x ${prix}`;
        span.setAttribute("id", "span-" + id);
        span.setAttribute("class", "zone-" + id);
        colomnOfTable.appendChild(span);
        ligneOfTable.appendChild(colomnOfTable2);
        colomnOfTable2.appendChild(img);
        panierElement.appendChild(tableOfArticle);

    } else {
        mettreAjourDescriptionPanier(id, description, prix);  // On met à jour le nombre d'occurrences du produit dans le panier
    }
    
    
}

function mettreAjourDescriptionPanier(id, description, prix) {

    var nbr = tabNbEltDuMemeProduit[id];
    document.getElementById('span-' + id).innerText = `${description} : ${nbr} x ${prix}`;
}

function mettreAjourPrixTotal() {
    document.getElementById('prix-total-articles').innerHTML = `Prix total des articles: ${prixTotal} €`;
    mettreAjourTotalArticles();

}

function supprimerProduit(element) {
    // Supprimer l'élément du panier
    element.parentNode.removeChild(element);
}

function supprimerElement(id) {
    prixTotal -= tabPrix[id];  // Soustraire le prix de l article a supprimer
    totalArticles--;  // Ajuster le nombre total des articles
    // tabPrix[id] = 0;  // Supprimer le prix de l article du tableau des prix
    // tabProduits[id] = ''; // Supprimer l article du tableau des descriptions
    tabNbEltDuMemeProduit[id] -= 1;  // On supprime une occurrence du produit dans le panier
    if (tabNbEltDuMemeProduit[id] == 0) {
        const btnSupp = document.getElementById('btn-' + id);   // Recuperation du bouton a supprimer
        const produitAsupprimer = document.getElementById('span-' + id);  // Recuperation du produit a supprimer
        supprimerProduit(produitAsupprimer);  // Supprimer le produit du modal
        supprimerProduit(btnSupp);  // Supprimer le bouton supprimer qui correspond au produit
    } else {
        mettreAjourDescriptionPanier(id, tabProduits[id], tabPrix[id]);  // On met à jour le nombre d'occurrences du produit dans le panier
    }

    mettreAjourPrixTotal(); // Mettre a jour prix total et nombre de produits total

}


function viderPanier() {
    totalArticles = 0;
    prixTotal = 0;
    mettreAjourPrixTotal();
    for (var i = 0; i < 18; i++) {
        if (tabNbEltDuMemeProduit[i] > 0) {
            tabNbEltDuMemeProduit[i] = 0;
            const btnSupp = document.getElementById('btn-' + i);   // Recuperation du bouton a supprimer
            const produitAsupprimer = document.getElementById('span-' + i);  // Recuperation du produit a supprimer
            supprimerProduit(produitAsupprimer);  // Supprimer le produit du modal
            supprimerProduit(btnSupp);  // Supprimer le bouton supprimer qui correspond au produit
        }
    }
}

function AfficheMessageFinDeCommande() {
    if (totalArticles > 0) {
        viderPanier();
        alert("Bonne nouvelle, votre commande est confirmée !");
        //const modal = document.getElementById('a');
        //modal.close();
    } else {
        alert("Votre panier est vide");
    }
    
}
