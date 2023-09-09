let events = [];
idContainer = "statsContainer"
errorMessage = 'Oh no! We were unable to retrieve events stats at this time <i class="bi bi-emoji-dizzy"></i> <br>Please try again later';
tbAll = document.getElementById("allStats");
tbUpcoming = document.getElementById("upcomingStats");
tbpast = document.getElementById("pastStats");

fetchData(getEventsStats);

function getEventsStats(currentDate, allEvents) {
    let tbodyHTML = "";
    const upcomingEvents = allEvents.filter(event => event.date > currentDate);
    const pastEvents = allEvents.filter(event => event.date <= currentDate);
    let assistancePercentageByEvent = getAssistancePercentageByEvent(pastEvents);
    let highestAssistanceEvents = assistancePercentageByEvent.slice(0, 3);

    let lowestAssistanceEvents = assistancePercentageByEvent.sort((eventA, eventB) => {
        if (eventB.percentage > eventA.percentage) {
            return -1;
        }
    }).slice(0, 3);

    let largerCapacityEvents = allEvents.sort((eventA, eventB) => {
        if (eventB.capacity < eventA.capacity) {
            return -1;
        }
    }).slice(0, 3)

    for (let i = 0; i < 3; i++) {
        tbodyHTML += `<tr>
            <td class="bg-transparent text-info">${highestAssistanceEvents[i].name}</td>
            <td class="bg-transparent text-info">${lowestAssistanceEvents[i].name}</td>
            <td class="bg-transparent text-info">${largerCapacityEvents[i].name}</td>
        </tr>`;
    }
    tbAll.innerHTML = tbodyHTML;

    tbodyHTML = "";
    let upcomingEventsCategories = getUnrepiteCategories (upcomingEvents);
    upcomingEventsCategories.forEach(category => {
        let filteredUpcomingEvents = upcomingEvents.filter(event => event.category === category);
        let revenueByCategory = getRevenueByCategory(filteredUpcomingEvents, true);
        let percentageEstimatedAssistance = getPercentageEstimatedAssistance(filteredUpcomingEvents, true);
        tbodyHTML += `<tr>
            <td class="bg-transparent text-info">${category}</td>
            <td class="bg-transparent text-info">$${revenueByCategory}</td>
            <td class="bg-transparent text-info">${percentageEstimatedAssistance}%</td>
        </tr>`;
    });
    
    tbUpcoming.innerHTML = tbodyHTML;
    
    tbodyHTML = "";
    let pastEventsCategories = getUnrepiteCategories (pastEvents);
    pastEventsCategories.forEach(category => {
        let filteredPastEvents = pastEvents.filter(event => event.category === category);
        let revenueByCategory = getRevenueByCategory(filteredPastEvents, false);
        let percentageEstimatedAssistance = getPercentageEstimatedAssistance(filteredPastEvents, false);
        tbodyHTML += `<tr>
            <td class="bg-transparent text-info">${category}</td>
            <td class="bg-transparent text-info">$${revenueByCategory}</td>
            <td class="bg-transparent text-info">${percentageEstimatedAssistance}%</td>
        </tr>`;
    });

    tbpast.innerHTML = tbodyHTML;
}

function getAssistancePercentageByEvent(pastEvents) {
    const assistancePercentageByEvent = [];
    pastEvents.forEach(event => {
        let eventAssistancePercentage = (event.assistance / event.capacity) * 100;
        let eventPercentage = { name: event.name, percentage: eventAssistancePercentage.toFixed(1) }
        assistancePercentageByEvent.push(eventPercentage);
    });

    return assistancePercentageByEvent.sort((eventA, eventB) => {
        if (eventB.percentage < eventA.percentage) {
            return -1;
        }
    });
}

function getRevenueByCategory(events, isUpcoming){
    let revenueByCategory = 0;
    events.forEach(event => {
        if(isUpcoming){
            revenueByCategory += event.price * event.estimate;
        }else{
            revenueByCategory += event.price * event.assistance;
        }
    });
    return revenueByCategory;
}   

function getPercentageEstimatedAssistance(events, isUpcoming){
    let totalCapacity = 0;
    let totalAssistance = 0;
    events.forEach(event => {
        totalCapacity += event.capacity;
        if(isUpcoming){
            totalAssistance += event.estimate;
        }else{
            totalAssistance += event.assistance;    
        }
    });
    let percentageEstimatedAssistance = (totalAssistance / totalCapacity) * 100;
    return percentageEstimatedAssistance.toFixed(1);
}