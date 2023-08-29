function generateCards(itemsArray, idContainer) {
    for (const item of itemsArray) {
        let card = `<div id="${item._id}" class="col-12 col-sm-6 col-lg-4 col-xl-3">
                        <div class="card bg-primary text-success rounded-4 border-3 border-danger">
                            <img src="${item.image}" class="card-img-top rounded-top-4"
                            alt="${item.name}">
                            <div class="card-body">
                                <h5 class="card-title m-0 pb-2 text-center">${item.name}</h5>
                                <p class="card-text">${item.description}</p>
                                <div class="row pe-2 justify-content-between">
                                    <p class="align-self-center m-0 col-6">Price: $${item.price}</p>
                                    <a href="./details.html" class="col-6 btn btn-primary">Details</a>
                                </div>
                            </div>
                        </div>
                    </div>`;
        document.getElementById(idContainer).innerHTML += card;
    }
}

function getUnrepiteCategories(eventsArray) {
    const categories = [];
    for (const event of eventsArray) {
        if (!categories.includes(event.category)) {
            categories.push(event.category);
        }
    }
    return categories;
}


function generateCheckboxes(itemsArray, idContainer) {
    let index = 1;
    for (const item of itemsArray) {
        let checkbox = `<div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="${item}" value="option${index}">
                            <label class="form-check-label" for="${item}">${item}</label>
                        </div>`
        document.getElementById(idContainer).innerHTML += checkbox;
        index++;
    }
}

