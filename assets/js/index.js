generateCards(data.events, "eventsContainer");

const categories = getUnrepiteCategories (data.events);

generateCheckboxes (categories, "checkboxContainer");