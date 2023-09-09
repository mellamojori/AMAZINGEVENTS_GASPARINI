let events = [];

fetchData(generateElements);

function generateElements(currentDate, allEvents){
    events = allEvents.filter (event => event.date <= currentDate);
    generateCards(events);
    const unrepiteCategories = getUnrepiteCategories (events);
    generateCheckboxes (unrepiteCategories);
};

addEventsListeners();