const generateCards = (itemsArray, idContainer) => {
    let cardsHTML = "";
    itemsArray.forEach(item => {
        cardsHTML += `<div class="col-12 col-sm-6 col-lg-4 col-xl-3">
                     <div class="card bg-primary text-success rounded-4 border-3 border-danger">
                         <img src="${item.image}" class="card-img-top rounded-top-4" alt="${item.name}">
                         <div class="card-body">
                             <h5 class="card-title m-0 pb-2 text-center">${item.name}</h5>
                             <p class="card-text">${item.description}</p>
                             <div class="row pe-2 justify-content-between">
                                 <p class="align-self-center m-0 col-6">Price: $${item.price}</p>
                                 <a href="./details.html?id=${item._id}" class="col-6 btn btn-primary">Details</a>
                             </div>
                         </div>
                     </div>
                 </div>`;
    });
    document.getElementById(idContainer).innerHTML = cardsHTML;
}

const getUnrepiteCategories = (eventsArray) => {
    let categoriesArray = eventsArray.map(event => event.category);
    categoriesArray.sort();
    return categoriesArray.filter((category, index) => categoriesArray.indexOf(category) === index);
}

const generateCheckboxes = (itemsArray, idContainer) => {
    let checkboxesHTML = "";
    itemsArray.forEach ((item) =>{
        checkboxesHTML +=  `<div class="form-check form-check-inline">
                                <input class="inputCheckbox form-check-input" type="checkbox" id="${item}" value="${item}">
                                <label class="form-check-label" for="${item}">${item}</label>
                            </div>`
    });
    document.getElementById(idContainer).innerHTML = checkboxesHTML;
}

function fullFiltered (array, idContainer){
    let filtered = array.filter(event => event.name.toLowerCase().includes(searchBar.value.trim().toLowerCase()));
    let inputCheckboxes = document.querySelectorAll('.inputCheckbox');
    let checked = Array.from (inputCheckboxes);
    checked = checked.filter(input => input.checked).map(input => input.value);

        if (checked.length > 0) {
            filtered = filtered.filter(event => checked.includes(event.category));
        } 
        if (filtered.length > 0) {
            generateCards(filtered, idContainer); 
        } else {
            document.getElementById(idContainer).innerHTML = '<p class="text-info fs-4 text-center font-weight-bold font-italic py-5">Sorry, at the moment there are no events that match your search <i class="bi bi-emoji-frown"></i></p>'
        }
};