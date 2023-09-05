let upcomingEvents = data.events.filter (event => event.date > data.currentDate);

generateCards(upcomingEvents, "upcomingEventsContainer");

const unrepiteCategories = getUnrepiteCategories (upcomingEvents);

generateCheckboxes (unrepiteCategories, "checkboxContainer");

let searchBar = document.getElementById ('searchBarId');
let form = document.getElementById ('formId');

searchBar.addEventListener ('input', () => {
    fullFiltered(upcomingEvents, "upcomingEventsContainer");
});

form.addEventListener ('submit', e => {
    e.preventDefault();
    fullFiltered(upcomingEvents, "upcomingEventsContainer");
})

document.addEventListener('change', e => {
    if (e.target.classList.contains('inputCheckbox')){
        fullFiltered(upcomingEvents, "upcomingEventsContainer");
    }
});