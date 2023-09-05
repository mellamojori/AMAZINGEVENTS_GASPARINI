generateCards(data.events, "eventsContainer");

const unrepiteCategories = getUnrepiteCategories (data.events);

generateCheckboxes (unrepiteCategories, "checkboxContainer");


let searchBar = document.getElementById ('searchBarId');
let form = document.getElementById ('formId');

searchBar.addEventListener ('input', () => {
    fullFiltered(data.events, "eventsContainer");
});

form.addEventListener ('submit', e => {
    e.preventDefault();
    fullFiltered(data.events, "eventsContainer");
});

document.addEventListener('change', e => {
    if (e.target.classList.contains('inputCheckbox')){
        fullFiltered(data.events, "eventsContainer");
    }
});