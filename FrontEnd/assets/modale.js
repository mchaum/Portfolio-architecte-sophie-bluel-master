// Modale 1 : affichage & édition de la galerie //

let modal = null;

const openModal = function (e) {
    e.preventDefault();
    const target = document.querySelector(".modal");
    // Faire apparaître la fenêtre //
    target.style.display = "flex";
    target.removeAttribute("aria-hidden");
    target.setAttribute("aria-modal", "true");
    modal = target;
    // Fermer la modale si on clique sur "X" ou n'importe où sur l'écran (hors modale) //
    modal.addEventListener("click", closeModal);
    document.querySelector(".js-modal-close").addEventListener("click", closeModal);
    document.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
}

const closeModal = function (e) {
    // Fonction inverse pour fermer la modale //
    if (modal === null) return
    e.preventDefault();
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    modal.removeEventListener("click", closeModal);
    document.querySelector(".js-modal-close").removeEventListener("click", closeModal);
    document.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);
    modal = null;
}

// Fonction permettant d'éviter de fermer la modale si on clique sur la fenêtre //

const stopPropagation = function (e) {
    e.stopPropagation();
}

// Affichage de la modale au clic //

document.querySelectorAll(".js-modal").forEach(a => {
    a.addEventListener("click", openModal);

})

// Déclaration des variables pour l'affichage des travaux dans la modale //

const modalGallery = document.querySelector(".modal-gallery");
let modalWorks = [];

// Récupération des projets depuis l'API et création & affichage des éléments dans la modale via une fonction //

function workImportModal() {
    fetch("http://localhost:5678/api/works")
        .then(res => res.json())
        .then(data => {
            modalWorks = data
            const images = data;
            showWorksModal(images);
        })
};
workImportModal();

function showWorksModal(i) {
    i.forEach(image => {
        const figureElement = document.createElement("figure");
        modalGallery.appendChild(figureElement);

        const imgElement = document.createElement("img");
        imgElement.src = image.imageUrl;
        imgElement.alt = image.title;
        figureElement.appendChild(imgElement);

        // Création du boutton delete //
        const btnDelete = document.createElement("div");
        btnDelete.classList.add("btn-delete");
        figureElement.appendChild(btnDelete);

        // Intégration de l'icone delete //
        const iconDelete = document.createElement('i');
        iconDelete.classList = "fa-solid fa-trash-can";
        iconDelete.style.color = "#FFFFFF";
        btnDelete.appendChild(iconDelete);
    });
}

// Modale 2 : Affichage de la modale au clic sur le bouton "ajouter une photo" //

let modal2 = null;

const openModal2 = function (e) {
    e.preventDefault();
    const target = document.querySelector(".modal2");
    // Faire apparaître la fenêtre //
    target.style.display = "flex";
    target.removeAttribute("aria-hidden");
    target.setAttribute("aria-modal", "true");
    modal2 = target;
    // Fermer la modale 1 à l'ouverture de la 2 //
    modal.style.display = "none";
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    modal.removeEventListener("click", closeModal);
    document.querySelector(".js-modal-close").removeEventListener("click", closeModal);
    document.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);
    modal = null;
    // Fermer la modale si on clique sur "X" ou n'importe où sur l'écran (hors modale) //
    modal2.addEventListener("click", closeModal2);
    document.querySelector(".js-modal2-close").addEventListener("click", closeModal2);
    document.querySelector(".js-modal2-stop").addEventListener("click", stopPropagation);
}

const closeModal2 = function (e) {
    // Fonction inverse pour fermer la modale //
    if (modal2 === null) return
    e.preventDefault();
    modal2.style.display = "none";
    modal2.setAttribute("aria-hidden", "true");
    modal2.removeAttribute("aria-modal");
    modal2.removeEventListener("click", closeModal2);
    document.querySelector(".js-modal2-close").removeEventListener("click", closeModal2);
    document.querySelector(".js-modal2-stop").removeEventListener("click", stopPropagation);
    modal2 = null;
}

// Affichage de la modale au clic //

document.querySelectorAll(".js-modal2").forEach(a => {
    a.addEventListener("click", openModal2);

})