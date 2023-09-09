let events = [];

fetchData(generateElements);

function generateElements(currentDate, allEvents){
    events = allEvents
    generateCards(events);
    const unrepiteCategories = getUnrepiteCategories (events);
    generateCheckboxes (unrepiteCategories);
};

addEventsListeners();