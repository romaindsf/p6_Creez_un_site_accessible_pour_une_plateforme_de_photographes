/* exported createMedia */
// FACTORY METHOD — Médias
// déléguer la création et le formatage de ces données au bon Constructor
// Crée un objet Photo ou Video selon le type de média

class Photo {
    constructor(data, folderName) {
        this.data = data;
        this.folderName = folderName;
    }

    // Retourne un élément <img> accessible
    getMediaDOM() {
        const img = document.createElement("img");
        img.setAttribute("src", `assets/${this.folderName}/${this.data.image}`);
        img.setAttribute("alt", this.data.title);
        return img;
    }
}

class Video {
    constructor(data, folderName) {
        this.data = data;
        this.folderName = folderName;
    }

    // Retourne un élément <video> accessible
    getMediaDOM() {
        const video = document.createElement("video");
        video.setAttribute("src", `assets/${this.folderName}/${this.data.video}`);
        video.setAttribute("aria-label", this.data.title);
        // controls désactivé en galerie, activé dans la lightbox
        return video;
    }
}

// retourne l'objet selon le type de média
function createMedia(data, folderName) {
    if (data.image) {
        return new Photo(data, folderName);
    }
    return new Video(data, folderName);
}
