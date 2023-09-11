let events = [];
idContainer = "statsContainer"
errorMessage = 'Oh no! We were unable to retrieve events stats at this time <i class="bi bi-emoji-dizzy"></i> <br>Please try again later';
const tbodyAll = document.getElementById("allStats");
const tbodyUpcoming = document.getElementById("upcomingStats");
const tbodypast = document.getElementById("pastStats");

fetchData(getEventsStats);

function getEventsStats(currentDate, allEvents) {
    let tbodyHTML = "";
    const upcomingEvents = allEvents.filter(event => event.date > currentDate);
    const pastEvents = allEvents.filter(event => event.date <= currentDate);
    
    let highestAssistanceEvents = pastEvents.sort((a, b) => (b.assistance * 100) / b.capacity - (a.assistance * 100) / a.capacity).slice(0, 3);

    let lowestAssistanceEvents = pastEvents.sort((a, b) => (a.assistance * 100) / a.capacity - (b.assistance * 100) / b.capacity).slice(0, 3);

    let largerCapacityEvents = allEvents.sort((a, b) => b.capacity - a.capacity).slice(0, 3);

    for (let i = 0; i < 3; i++) {
        tbodyHTML += `<tr>
            <td class="bg-transparent text-info">${highestAssistanceEvents[i].name}</td>
            <td class="bg-transparent text-info">${lowestAssistanceEvents[i].name}</td>
            <td class="bg-transparent text-info">${largerCapacityEvents[i].name}</td>
        </tr>`;
    }
    tbodyAll.innerHTML = tbodyHTML;

    tbodyHTML = "";
    let upcomingEventsCategories = getUnrepiteCategories (upcomingEvents);
    upcomingEventsCategories.forEach(category => {
        let filteredUpcomingEvents = upcomingEvents.filter(event => event.category === category);
        let proyectedRevenueByCategory = getRevenueByCategory(filteredUpcomingEvents, true);
        let proyectedPercentageAssistance = getPercentageAssistance(filteredUpcomingEvents, true);
        tbodyHTML += `<tr>
            <td class="bg-transparent text-info">${category}</td>
            <td class="bg-transparent text-info">$${proyectedRevenueByCategory}</td>
            <td class="bg-transparent text-info">${proyectedPercentageAssistance}%</td>
        </tr>`;
    });
    
    tbodyUpcoming.innerHTML = tbodyHTML;
    
    tbodyHTML = "";
    let pastEventsCategories = getUnrepiteCategories (pastEvents);
    pastEventsCategories.forEach(category => {
        let filteredPastEvents = pastEvents.filter(event => event.category === category);
        let revenueByCategory = getRevenueByCategory(filteredPastEvents, false);
        let percentageAssistance = getPercentageAssistance(filteredPastEvents, false);
        tbodyHTML += `<tr>
            <td class="bg-transparent text-info">${category}</td>
            <td class="bg-transparent text-info">$${revenueByCategory}</td>
            <td class="bg-transparent text-info">${percentageAssistance}%</td>
        </tr>`;
    });

    tbodypast.innerHTML = tbodyHTML;
}

function getRevenueByCategory(events, isProyected){
    let revenueByCategory = 0;
    events.forEach(event => {
        if(isProyected){
            revenueByCategory += event.price * event.estimate;
        }else{
            revenueByCategory += event.price * event.assistance;
        }
    });
    return revenueByCategory;
}   

function getPercentageAssistance(events, isProyected){
    let totalCapacity = 0;
    let totalAssistance = 0;
    events.forEach(event => {
        totalCapacity += event.capacity;
        if(isProyected){
            totalAssistance += event.estimate;
        }else{
            totalAssistance += event.assistance;    
        }
    });
    let percentageEstimatedAssistance = (totalAssistance / totalCapacity) * 100;
    return percentageEstimatedAssistance.toFixed(1);
}