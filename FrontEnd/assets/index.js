// Déclaration des variables //

const gallery = document.querySelector(".gallery");
let works = [];
let categories = [];
const filtersContainer = document.querySelector(".filtres");
const tous = document.querySelector(".tous");


// Récupération des projets depuis l'API et affichage des éléments//

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

// Création des filtres //

fetch("http://localhost:5678/api/categories")
    .then(res => res.json())
    .then(data => {
        categories = data
        const filters = data;
        filters.forEach(filterName => {
            const filterElement = document.createElement("div");
            filterElement.className = "filtres-btn";
            filtersContainer.appendChild(filterElement);
            filterElement.textContent = filterName.name;
        });
});

// Fonctionnement des filtres //

let filtreBtn = document.querySelectorAll(".filtres-btn");

tous.addEventListener("click", () => {
    tous.classList = "filtres-btn-selected";
});

