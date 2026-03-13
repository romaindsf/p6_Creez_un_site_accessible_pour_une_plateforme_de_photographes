/* global createMedia, openLightbox */
// Récupère l'id du photographe depuis l'URL (?id=243)
function getPhotographerId() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get("id"), 10);
}

// Charge toutes les données depuis le fichier JSON
async function getData() {
    const response = await fetch("data/photographers.json");
    const data = await response.json();
    return data;
}

// Affiche les infos du photographe dans le header de la page
function displayPhotographerHeader(photographer) {
    document.querySelector(".photograph-name").textContent = photographer.name;
    document.querySelector(".photograph-location").textContent = `${photographer.city}, ${photographer.country}`;
    document.querySelector(".photograph-tagline").textContent = photographer.tagline;

    // Portrait : alt = nom du photographe (specs accessibilité Figma)
    const portrait = document.querySelector(".photograph-portrait");
    portrait.setAttribute("src", `assets/Photographers ID Photos/${photographer.portrait}`);
    portrait.setAttribute("alt", photographer.name);

    // Nom dans le titre de la modale de contact
    document.querySelector(".modal-photographer-name").textContent = `Contactez-moi ${photographer.name}`;

    // Titre de l'onglet navigateur
    document.title = `Fisheye - ${photographer.name}`;
}

// Calcule et affiche le total des likes + le prix dans le footer sticky
function updateStickyFooter(mediaList, price) {
    const total = mediaList.reduce(function(sum, media) {
        return sum + media.likes;
    }, 0);

    document.querySelector(".total-likes").textContent = total;
    document.querySelector(".price-per-day").textContent = `${price}€ / jour`;
}

// Vide la galerie et la re-remplit avec la liste de médias fournie
function renderGallery(mediaList, folderName) {
    const gallery = document.querySelector(".photograph-gallery");
    gallery.innerHTML = "";

    mediaList.forEach(function(media, index) {
        const article = document.createElement("article");

        // Lien qui enveloppe le média — ouvre la lightbox au clic
        const link = document.createElement("a");
        link.setAttribute("href", "#");
        link.setAttribute("aria-label", `${media.title}, closeup view`);
        link.addEventListener("click", function(event) {
            event.preventDefault();
            openLightbox(index, mediaList, folderName, link);
        });

        // Factory Method : crée Photo ou Video selon le type de média
        const mediaObject = createMedia(media, folderName);
        const mediaElement = mediaObject.getMediaDOM();
        link.appendChild(mediaElement);
        article.appendChild(link);

        // Footer de la carte : titre + bouton likes
        const footer = document.createElement("footer");
        footer.classList.add("media-footer");

        const title = document.createElement("p");
        title.classList.add("media-title");
        title.textContent = media.title;

        // Bouton likes : incrémente au clic (une seule fois par média)
        const likesButton = document.createElement("button");
        likesButton.classList.add("media-likes");
        likesButton.setAttribute("aria-label", `${media.likes} likes`);

        // Restaure l'état visuel si déjà liké (ex : après un re-render au tri)
        if (media.liked) {
            likesButton.classList.add("liked");
        }

        const likesCount = document.createElement("span");
        likesCount.textContent = media.likes;

        const heartIcon = document.createElement("span");
        heartIcon.setAttribute("aria-hidden", "true");
        heartIcon.textContent = "♥";

        likesButton.appendChild(likesCount);
        likesButton.appendChild(heartIcon);

        // Au clic : incrémente les likes du média et met à jour le footer
        likesButton.addEventListener("click", function() {
            if (media.liked) return;
            media.liked = true;
            media.likes++;
            likesCount.textContent = media.likes;
            likesButton.setAttribute("aria-label", `${media.likes} likes`);
            likesButton.classList.add("liked");
            updateStickyFooter(mediaList, currentPrice);
        });

        footer.appendChild(title);
        footer.appendChild(likesButton);
        article.appendChild(footer);
        gallery.appendChild(article);
    });
}

// Prix courant du photographe (accessible dans les callbacks de likes)
let currentPrice = 0;

// Point d'entrée
async function init() {
    const id = getPhotographerId();
    const { photographers, media } = await getData();

    // Trouve le photographe correspondant à l'id dans l'URL
    const photographer = photographers.find(function(p) {
        return p.id === id;
    });

    // Garde uniquement les médias de ce photographe
    const photographerMedia = media.filter(function(m) {
        return m.photographerId === id;
    });

    // Le dossier des médias = prénom du photographe
    // Ex : "Ellie-Rose Wilkens" -> "Ellie Rose"
    const folderName = photographer.name.split(" ")[0].replace("-", " ");

    currentPrice = photographer.price;

    displayPhotographerHeader(photographer);
    renderGallery(photographerMedia, folderName);
    updateStickyFooter(photographerMedia, photographer.price);

    // Tri : écoute l'événement dispatché par customSelect.js
    document.addEventListener("sort-change", function(event) {
        const value = event.detail.value;

        if (value === "popularity") {
            photographerMedia.sort(function(a, b) { return b.likes - a.likes; });
        } else if (value === "date") {
            photographerMedia.sort(function(a, b) { return new Date(b.date) - new Date(a.date); });
        } else if (value === "title") {
            photographerMedia.sort(function(a, b) { return a.title.localeCompare(b.title); });
        }

        renderGallery(photographerMedia, folderName);
    });
}

init();
