let upcomingEvents = [];
for (const event of data.events) {
    if (event.date > data.currentDate ){
        upcomingEvents.push(event);
    }
}
generateCards(upcomingEvents, "upcomingEventsContainer");

const categories = getUnrepiteCategories (upcomingEvents);

generateCheckboxes (categories, "checkboxContainer");
