let pastEvents = data.events.filter (event => event.date <= data.currentDate);

generateCards(pastEvents, "pastEventsContainer");

const unrepiteCategories = getUnrepiteCategories (pastEvents);

generateCheckboxes (unrepiteCategories, "checkboxContainer");

let searchBar = document.getElementById ('searchBarId');
let form = document.getElementById ('formId');

searchBar.addEventListener ('input', () => {
    fullFiltered(pastEvents, "pastEventsContainer");
});

form.addEventListener ('submit', e => {
    e.preventDefault();
    fullFiltered(pastEvents, "pastEventsContainer");
})

document.addEventListener('change', e => {
    if (e.target.classList.contains('inputCheckbox')){
        fullFiltered(pastEvents, "pastEventsContainer");
    }
});