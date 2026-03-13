/* exported displayModal, closeModal */
// Ouvre la modale de contact
function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    // Replace le focus sur le premier champ du formulaire
    document.getElementById("firstname").focus();
}

// Ferme la modale de contact
function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    // Replace le focus sur le bouton qui a ouvert la modale
    document.querySelector(".contact_button").focus();
}

// Ferme la modale avec la touche Echap
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        const modal = document.getElementById("contact_modal");
        if (modal.classList.contains("open")) {
            closeModal();
        }
    }
});

// Log le contenu du formulaire dans la console à l'envoi
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    console.log("Prénom :", firstname);
    console.log("Nom :", lastname);
    console.log("Email :", email);
    console.log("Message :", message);
});
