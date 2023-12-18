////////// Affichage dynamique de la galerie //////////

// Déclaration des variables //

const gallery = document.querySelector(".gallery");
let works = [];
let categories = [];
const filtersContainer = document.querySelector(".filtres");
const filtreBtn = document.querySelectorAll(".filtres-btn");

// Récupération des projets via l'API et création & affichage des éléments via une fonction //

function workImport() {
    fetch("http://localhost:5678/api/works")
        .then(res => res.json())
        .then(data => {
            works = data
            const images = data;
            showWorks(images);
        })
};
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

///////// Affichage dynamique des filtres //////////

// Récupération des filtres via l'API et création des boutons + tri par catégories au clic //

let selectedFilter = null;

fetch("http://localhost:5678/api/categories")
    .then(res => res.json())
    .then(data => {
        categories = data;
        const filters = data;

        filters.forEach(filterName => {
            const filterElement = document.createElement("div");
            filterElement.className = "filtres-btn";
            filtersContainer.appendChild(filterElement);
            filterElement.textContent = filterName.name;

            filterElement.addEventListener("click", () => {
                // Suppression de la classe "filtres-btn-selected" sur les boutons non sélectionnés //
                if (selectedFilter) {
                    selectedFilter.classList.remove("filtres-btn-selected");
                }

                // Ajout de la classe "filtres-btn-selected" au bouton sélectionné //
                filterElement.classList.add("filtres-btn-selected");
                selectedFilter = filterElement;

                // Affichage de la galerie en fonction du filtre sélectionné //
                gallery.innerHTML = "";
                const filtreWorks = works.filter(function (category) {
                    return category.categoryId === filterName.id;
                });
                showWorks(filtreWorks);
            });
        });
    });

// Création et affichage du bouton filtre "tous" //

function createTous() {
    const filterTous = document.createElement("div");
    filterTous.className = "filtres-btn";
    filterTous.setAttribute("id", "tous");
    filterTous.textContent = "Tous";
    filtersContainer.appendChild(filterTous);

    filterTous.addEventListener("click", () => {
        // Suppression de la classe "filtres-btn-selected" sur les boutons non sélectionnés //
        if (selectedFilter) {
            selectedFilter.classList.remove("filtres-btn-selected");
        }

        // Ajout de la classe "btn-selected" au bouton "tous" //
        filterTous.classList.add("filtres-btn-selected");
        selectedFilter = filterTous;

        gallery.innerHTML = "";
        workImport();
    });
}
createTous();

////////// Mode édition //////////

// Affichage des fonctionnalités d'édition quand l'utilisateur est connecté // 

const token = localStorage.getItem("token");
const editBanner = document.querySelector(".edit-banner");
const modifier = document.querySelector(".modifier");
const loginBtn = document.getElementById("login");
const logoutBtn = document.getElementById("logout");
const projectTitle = document.querySelector(".projets-titre")

function adminMode() {
    console.log("Token:", token);
    if (token !== null) {
        console.log("Admin mode active");
        editBanner.style.display = "flex";
        modifier.style.display = "flex";
        filtersContainer.style.display = "none";
        loginBtn.style.display = "none";
        logoutBtn.style.display = "block";
        projectTitle.style.display = "none";
    } else {
        console.log("Admin mode inactive");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    adminMode();
});

// Retour à la page initiale lors de la déconnexion //

function adminLogout() {
    editBanner.style.display = "none";
    modifier.style.display = "none";
    filtersContainer.style.display = "flex";
    logoutBtn.style.display = "none";
    loginBtn.style.display = "block";
    projectTitle.style.display = "flex";
}


logoutBtn.addEventListener("click", () => {
    console.log("Logout button clicked");
    localStorage.removeItem("token");
    adminLogout();
});

