/* global createMedia */
/* exported openLightbox */
// State de la lightbox
let lightboxCurrentIndex = 0;
let lightboxMediaList = [];
let lightboxFolderName = "";

// Référence au lien qui a ouvert la lightbox (pour restituer le focus à la fermeture)
let lightboxOpener = null;

// Ouvre la lightbox sur le média à l'index donné
function openLightbox(index, mediaList, folderName, openerElement) {
    lightboxCurrentIndex = index;
    lightboxMediaList = mediaList;
    lightboxFolderName = folderName;
    lightboxOpener = openerElement;

    displayLightboxMedia();

    const lightbox = document.getElementById("lightbox");
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");

    // Focus sur le bouton fermer à l'ouverture
    document.querySelector(".lightbox-close").focus();
}

// Ferme la lightbox
function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");

    // Restitue le focus au lien média qui avait ouvert la lightbox
    if (lightboxOpener) {
        lightboxOpener.focus();
    }
}

// Affiche le média courant dans la lightbox
function displayLightboxMedia() {
    const media = lightboxMediaList[lightboxCurrentIndex];
    const container = document.querySelector(".lightbox-media");
    container.innerHTML = "";

    // Réutilise la Factory Method (createMedia est chargée depuis mediaFactory.js)
    const mediaObject = createMedia(media, lightboxFolderName);
    const el = mediaObject.getMediaDOM();

    // Les vidéos ont les contrôles activés dans la lightbox
    if (media.video) {
        el.setAttribute("controls", "");
    }

    container.appendChild(el);
    document.querySelector(".lightbox-title").textContent = media.title;
}

// Navigation vers le média précédent (circulaire)
function lightboxPrev() {
    lightboxCurrentIndex = (lightboxCurrentIndex - 1 + lightboxMediaList.length) % lightboxMediaList.length;
    displayLightboxMedia();
}

// Navigation vers le média suivant (circulaire)
function lightboxNext() {
    lightboxCurrentIndex = (lightboxCurrentIndex + 1) % lightboxMediaList.length;
    displayLightboxMedia();
}

// Listeners sur les boutons de la lightbox
document.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
document.querySelector(".lightbox-prev").addEventListener("click", lightboxPrev);
document.querySelector(".lightbox-next").addEventListener("click", lightboxNext);

// Navigation clavier : flèches et Échap
document.addEventListener("keydown", function(event) {
    const lightbox = document.getElementById("lightbox");
    if (!lightbox.classList.contains("open")) return;

    if (event.key === "ArrowLeft") lightboxPrev();
    if (event.key === "ArrowRight") lightboxNext();
    if (event.key === "Escape") closeLightbox();
});
