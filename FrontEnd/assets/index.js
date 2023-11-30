// Déclaration des variables //

const gallery = document.querySelector(".gallery");
let works = [];
let categories = [];
const filtersContainer = document.querySelector(".filtres");


// Récupération des projets depuis l'API et création & affichage des éléments via une fonction //

function workImport () {
    fetch("http://localhost:5678/api/works")
    .then(res => res.json())
    .then(data => {
        works = data
        const images = data;
        showWorks(images);
})};
workImport();

function showWorks(i) {
    i.forEach(image => {
        const figureElement = document.createElement("figure");
        gallery.appendChild(figureElement);

        const imgElement = document.createElement("img");
        imgElement.src = image.imageUrl;
        imgElement.alt = image.title;
        figureElement.appendChild(imgElement);

        const figCaptionElement = document.createElement("figcaption");
        figCaptionElement.textContent = image.title;
        figureElement.appendChild(figCaptionElement);
    });
}

// Récupération des filtres via l'API et création des boutons //

fetch("http://localhost:5678/api/categories")
    .then(res => res.json())
    .then(data => {
        categories = data
        const filters = data;
        filters.forEach(filterName => {
            const filterElement = document.createElement("div");
            filterElement.className = "filtres-btn";
            filterElement.setAttribute("id", filterName.name);
            filtersContainer.appendChild(filterElement);
            filterElement.textContent = filterName.name;
        });
});

// Création et affichage du bouton "tous" //

function createTous () {
    const filterTous = document.createElement("div");
    filterTous.className = "filtres-btn";
    filterTous.setAttribute("id", "tous");
    filterTous.textContent = "Tous";
    filtersContainer.appendChild(filterTous);
}
createTous();

// Fonctionnement du filtre "tous" : ajout d'un event listener pour ajouter une classe "selected" et afficher toute la galerie //

const tous = document.querySelector("#tous");
const filtreBtn = document.querySelectorAll(".filtres-btn");

console.log(filtreBtn);

tous.addEventListener("click", () => {
    tous.classList.add("filtres-btn-selected");
    showWorks();
});

let ObjetsBtn = document.getElementById("Objets");

console.log(ObjetsBtn);

// Fonctionnement des filtres : ajout d'un event listener pour afficher une galerie selon une selection //

ObjetsBtn.addEventListener("click", () => {
    ObjetsBtn.classList.add( "filtres-btn-selected");
    gallery.innerHTML = "";
    const  filtreObjet = works.filter(function(category){
        return category.categoryId === 1;
    });
    console.log(filtreObjet);
    showWorks(filtreObjet); 
});
