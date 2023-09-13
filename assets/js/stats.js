let events = [];
idContainer = "statsContainer"
errorMessage = 'Oh no! We were unable to retrieve events stats at this time <i class="bi bi-emoji-dizzy"></i> <br>Please try again later';
const tbodyAll = document.getElementById("allStats");
const tbodyUpcoming = document.getElementById("upcomingStats");
const tbodyPast = document.getElementById("pastStats");

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
            <td class="bg-transparent text-info fs-5">${highestAssistanceEvents[i].name}</td>
            <td class="bg-transparent text-info fs-5">${lowestAssistanceEvents[i].name}</td>
            <td class="bg-transparent text-info fs-5">${largerCapacityEvents[i].name}</td>
        </tr>`;
    }

    tbodyAll.innerHTML = tbodyHTML;

    let upcomingEventsCategories = getUnrepiteCategories(upcomingEvents);
    let upcomingEventsStatsByCategory = upcomingEventsCategories.map(category => {
        let filteredUpcomingEvents = upcomingEvents.filter(event => event.category === category);
        let proyectedRevenueByCategory = getRevenueByCategory(filteredUpcomingEvents, true);
        let proyectedPercentageAssistance = getPercentageAssistance(filteredUpcomingEvents, true);
        return {
            category,
            proyectedRevenueByCategory,
            proyectedPercentageAssistance
        };
    });

    upcomingEventsStatsByCategory.sort((a, b) => b.proyectedRevenueByCategory - a.proyectedRevenueByCategory);
    tbodyHTML = "";
    upcomingEventsStatsByCategory.forEach(stats => {
        tbodyHTML += `<tr>
        <td class="bg-transparent text-info fs-5">${stats.category}</td>
        <td class="bg-transparent text-info fs-5">$${stats.proyectedRevenueByCategory}</td>
        <td class="bg-transparent text-info fs-5">${stats.proyectedPercentageAssistance}%</td>
    </tr>`;
    });

    tbodyUpcoming.innerHTML = tbodyHTML;
    
    let pastEventsCategories = getUnrepiteCategories(pastEvents);
    let pastEventsStatsByCategory = pastEventsCategories.map(category => {
        let filteredPastEvents = pastEvents.filter(event => event.category === category);
        let revenueByCategory = getRevenueByCategory(filteredPastEvents, false);
        let percentageAssistance = getPercentageAssistance(filteredPastEvents, false);
        return {
            category,
            revenueByCategory,
            percentageAssistance
        };
    });

    pastEventsStatsByCategory.sort((a, b) => b.revenueByCategory - a.revenueByCategory);
    tbodyHTML = "";
    pastEventsStatsByCategory.forEach(stats => {
        tbodyHTML += `<tr>
        <td class="bg-transparent text-info fs-5">${stats.category}</td>
        <td class="bg-transparent text-info fs-5">$${stats.revenueByCategory}</td>
        <td class="bg-transparent text-info fs-5">${stats.percentageAssistance}%</td>
    </tr>`;
    });

    tbodyPast.innerHTML = tbodyHTML;

    function getRevenueByCategory(events, isProyected) {
        let revenueByCategory = 0;
        events.forEach(event => {
            if (isProyected) {
                revenueByCategory += event.price * event.estimate;
            } else {
                revenueByCategory += event.price * event.assistance;
            }
        });
        return revenueByCategory;
    }

    function getPercentageAssistance(events, isProyected) {
        let totalCapacity = 0;
        let totalAssistance = 0;
        events.forEach(event => {
            totalCapacity += event.capacity;
            if (isProyected) {
                totalAssistance += event.estimate;
            } else {
                totalAssistance += event.assistance;
            }
        });
        let percentageEstimatedAssistance = (totalAssistance / totalCapacity) * 100;
        return percentageEstimatedAssistance.toFixed(1);
    }
}