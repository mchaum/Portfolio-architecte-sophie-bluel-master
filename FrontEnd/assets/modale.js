////////// Modale 1 //////////

// Ouverture & fermeture de la modale //

let modal = null;

function openModal(e) {
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

function closeModal(e) {
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
        btnDelete.setAttribute("data-id", image.id);
        figureElement.appendChild(btnDelete);

        btnDelete.imageId = image.id;

        // Intégration de l'icone delete //
        const iconDelete = document.createElement('i');
        iconDelete.classList = "fa-solid fa-trash-can";
        iconDelete.style.color = "#FFFFFF";
        btnDelete.appendChild(iconDelete);

        deleteWork(btnDelete);

    });
}

// Fonction pour supprimer un élément //

function deleteWork(btnDelete) {
    btnDelete.addEventListener("click", () => {
        let id = btnDelete.getAttribute("data-id");

        fetch(`http://localhost:5678/api/works/${id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": "Bearer " + localStorage.user,
            },
        })
            .then((res) => {
                if (res.ok) {
                    // Suppression de la galerie actuelle et actualisation sur la modale et la page d'accueil avec l'élément supprimé //
                    modalGallery.innerHTML = "";
                    gallery.innerHTML = "";
                    btnDelete.parentElement.remove();
                    workImportModal();
                    workImport();
                    console.log('Élément supprimé avec succès');
                }
            })
            .catch(error => {
                console.error('Erreur lors de la suppression :', error);
            });
    });
}

////////// Modale 2 ////////// 

// Ouverture de la modale au clic sur le bouton "ajouter une photo" //

let modal2 = null;

function openModal2(e) {
    e.preventDefault();
    const target = document.querySelector(".modal2");
    // Faire apparaître la fenêtre //
    target.style.display = "flex";
    target.removeAttribute("aria-hidden");
    target.setAttribute("aria-modal", "true");
    modal2 = target;
    // Fermer la modale 1 à l'ouverture de la 2 //
    closeModal(e);
    // Fermer la modale si on clique sur "X" ou n'importe où sur l'écran (hors modale) //
    modal2.addEventListener("click", closeModal2);
    document.querySelector(".js-modal2-return").addEventListener("click", returnModal2);
    document.querySelector(".js-modal2-close").addEventListener("click", closeModal2);
    document.querySelector(".js-modal2-stop").addEventListener("click", stopPropagation);
}

// Fonction inverse pour fermer la modale //

function closeModal2(e) {
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

// Fonction pour fermer la modale 2 et retourner à la 1  au clic sur la flèche //

function returnModal2(e) {
    closeModal2(e);
    openModal(e);
}

// Affichage de la modale  2 au clic //

document.querySelectorAll(".js-modal2").forEach(a => {
    a.addEventListener("click", openModal2);

})

////////// Formulaire d'ajout d'image ////////// 

// Fonction pour ajouter une prévisualisation de l'image à ajouter //

const previewImg = document.getElementById("preview-photo");
const iconPhoto = document.getElementById("icon-photo");
const addPhoto = document.querySelector(".add-photo");
const addPhotoBtn = document.querySelector(".add-photo-label")
const addPhotoP = document.querySelector(".add-photo-p")

const previewPicture = function (e) {
    const [picture] = e.files
    if (picture) {
        // Création d'une url de l'image uploadée pour l'ajouter à la source de la balise img //
        previewImg.src = URL.createObjectURL(picture);
        // Cacher l'affichage des boutons pour ajouter la prévisualisation à la place //
        iconPhoto.style.display = "none";
        addPhotoBtn.style.display = "none";
        addPhotoP.style.display = "none";
        previewImg.style.display = "flex";
    }
}

// Fonction pour changer la couleur du bouton "valider" quand tous les champs du formulaire sont remplis //

const BtnValider = document.querySelector(".modal-btn2");

function verifInput() {
    const photoValue = document.getElementById("photo").value;
    const titleValue = document.getElementById("title").value;
    const categoryValue = document.getElementById("category").value;

    if (photoValue !== "" && titleValue !== "" && categoryValue !== "0") {
        BtnValider.style.backgroundColor = "#1d6154";
    }
}

// Appel de la fonction pour vérifier si la validation est possible à chaque saisie dans un champ //

document.getElementById("photo").addEventListener("input", verifInput);
document.getElementById("title").addEventListener("input", verifInput);
document.getElementById("category").addEventListener("input", verifInput);


// Envoi des données du formulaire à l'API pour ajouter une photo et actualisation de la galerie //

function addWork() {
    const fileInput = document.getElementById("photo");
    const titleValue = document.getElementById("title").value;
    const categoryValue = document.getElementById("category").value;

    // Récupération des valeurs entrées dans le formulaire //
    const formData = new FormData();
    formData.append("image", fileInput.files[0]);
    formData.append("title", titleValue);
    formData.append("category", Number(categoryValue));

    // Envoi des données à l'API //
    fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.user,
        },
        body: formData,
    })
        .then((res) => res.json())
        .then((data) => {
            showNewWorks(data);
        })
        .catch((error) => {
            console.error(error);
        });
}

// Fonction pour générer la galerie et la galerie dans la modale contenant le nouvel élément //

function showNewWorks() {
    modalGallery.innerHTML = "";
    gallery.innerHTML = "";
    workImportModal();
    workImport();
    
};

// Ajout d'un évènement au clic : si tous les champs sont remplis, alors la validation est ok et le nouvel élément est généré dans la galerie //

const addForm = document.querySelector(".add-image");

addForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const photoValue = document.getElementById("photo").value;
    const titleValue = document.getElementById("title").value;
    const categoryValue = document.getElementById("category").value;

    if (photoValue !== "" && titleValue !== "" && categoryValue !== "0") {
        addWork();
        closeModal2(e);
    } else {
        console.log("Une erreur est survenue, merci de remplir tous les champs");
    }
});