/* exported photographerTemplate */
function photographerTemplate(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/Photographers ID Photos/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');

        // Lien cliquable qui enveloppe l'image et le nom (zone focusable)
        const link = document.createElement('a');
        link.setAttribute('href', `photographer.html?id=${id}`);

        const img = document.createElement('img');
        img.setAttribute('src', picture);
        // alt vide : le h2 dans le lien fournit le nom accessible
        img.setAttribute('alt', '');

        const h2 = document.createElement('h2');
        h2.textContent = name;

        link.appendChild(img);
        link.appendChild(h2);

        // Infos textuelles hors du lien (texte statique)
        const location = document.createElement('p');
        location.textContent = `${city}, ${country}`;

        const taglineEl = document.createElement('p');
        taglineEl.textContent = tagline;

        const priceEl = document.createElement('p');
        priceEl.textContent = `${price}€/jour`;

        article.appendChild(link);
        article.appendChild(location);
        article.appendChild(taglineEl);
        article.appendChild(priceEl);

        return article;
    }

    return { name, picture, getUserCardDOM };
}
