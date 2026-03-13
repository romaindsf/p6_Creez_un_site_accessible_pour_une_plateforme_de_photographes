/* global CustomEvent */

const customSortButton = document.querySelector(".custom-select-button");
const customSortList = document.getElementById("sort-list");
const sortSelectedLabel = document.getElementById("sort-selected");
const sortOptions = customSortList.querySelectorAll("[role='option']");

// Ouvre le dropdown
function openSortList() {
    customSortButton.setAttribute("aria-expanded", "true");
    customSortList.classList.add("open");
    // Focus sur l'option actuellement sélectionnée
    const selected = customSortList.querySelector("[aria-selected='true']");
    if (selected) {
        selected.focus();
    }
}

// Ferme le dropdown et restitue le focus au bouton
function closeSortList() {
    customSortButton.setAttribute("aria-expanded", "false");
    customSortList.classList.remove("open");
    customSortButton.focus();
}

// Sélectionne une option, met à jour l'UI et dispatch l'événement de tri
function selectSortOption(option) {
    sortOptions.forEach(function(opt) {
        opt.setAttribute("aria-selected", "false");
    });
    option.setAttribute("aria-selected", "true");
    sortSelectedLabel.textContent = option.textContent;

    const value = option.getAttribute("data-value");
    document.dispatchEvent(new CustomEvent("sort-change", { detail: { value: value } }));

    closeSortList();
}

// Clic sur le bouton : toggle ouverture/fermeture
customSortButton.addEventListener("click", function() {
    if (customSortButton.getAttribute("aria-expanded") === "true") {
        closeSortList();
    } else {
        openSortList();
    }
});

// Clic sur une option
sortOptions.forEach(function(option) {
    option.addEventListener("click", function() {
        selectSortOption(option);
    });
});

// Navigation clavier sur le bouton fermé
customSortButton.addEventListener("keydown", function(event) {
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openSortList();
    }
});

// Navigation clavier dans la liste
customSortList.addEventListener("keydown", function(event) {
    const optionsList = Array.from(sortOptions);
    const focused = document.activeElement;
    const idx = optionsList.indexOf(focused);

    if (event.key === "ArrowDown") {
        event.preventDefault();
        optionsList[(idx + 1) % optionsList.length].focus();
    } else if (event.key === "ArrowUp") {
        event.preventDefault();
        optionsList[(idx - 1 + optionsList.length) % optionsList.length].focus();
    } else if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        if (focused && focused.getAttribute("role") === "option") {
            selectSortOption(focused);
        }
    } else if (event.key === "Escape") {
        closeSortList();
    }
});

// Ferme le dropdown si clic en dehors
document.addEventListener("click", function(event) {
    const customSort = document.getElementById("custom-sort");
    if (!customSort.contains(event.target)) {
        if (customSortButton.getAttribute("aria-expanded") === "true") {
            closeSortList();
        }
    }
});
