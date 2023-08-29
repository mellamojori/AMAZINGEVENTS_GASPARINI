let pastEvents = [];
for (const event of data.events){
    if (event.date <= data.currentDate){
        pastEvents.push(event);
    }
}
generateCards(pastEvents, "pastEventsContainer");

const categories = getUnrepiteCategories (pastEvents);

generateCheckboxes (categories, "checkboxContainer");