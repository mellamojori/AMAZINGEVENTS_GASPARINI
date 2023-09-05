const urlParams = new URLSearchParams(document.location.search);
const eventId = urlParams.get ('id');
const eventDetail = data.events.find (detail => detail._id === eventId);
const detailContainer = document.getElementById('detailContainer');

let wildcard = "";
if (data.currentDate > eventDetail.date) {
    wildcard = `<li class="bg-transparent text-white px-2 fs-5 list-group-item"><span class="fw-medium text-info">Assistance:</span> ${eventDetail.assistance}</li>`
} else {
    wildcard = `<li class="bg-transparent text-white px-2 fs-5 list-group-item"><span class="fw-medium text-info">Estimate:</span> ${eventDetail.estimate}</li>`
}

const detailCard = `<div class="row col-10 m-0 w-100">
                        <h5 id="dTitle" class="text-uppercase justify-content-center text-info m-0 fs-1 d-flex">${eventDetail.name}</h5>
                        <p class="text-center text-info m-0 pb-2 fs-5">${eventDetail.category}</p> 
                        <p class="bg-transparent text-center text-info px-0 fs-4 fst-italic fw-medium">${eventDetail.description}</p>
                        <div class="img-conteiner col-md-8 justify-content-center align-self-center">
                            <img src=${eventDetail.image} class="detailImage img-fluid" alt="Food fair">
                        </div>
                        <div class="detail-info col-md-4 ps-0 aligh-items-start">
                            <div class="card-body">
                                <ul class="list-group list-group-flush">
                                    <li class="bg-transparent text-white px-2 fs-5 list-group-item"><span class="fw-medium text-info">Date:</span> ${eventDetail.date}</li>
                                    <li class="bg-transparent text-white px-2 fs-5 list-group-item"><span class="fw-medium text-info">Location:</span> ${eventDetail.place}</li>
                                    <li class="bg-transparent text-white px-2 fs-5 list-group-item"><span class="fw-medium text-info">Capacity:</span> ${eventDetail.capacity}</li>
                                    ${wildcard}
                                    <li class="bg-transparent text-white px-2 fs-5 list-group-item"><span class="fw-medium text-info">Price:</span> $${eventDetail.price}</li>
                                </ul>
                            </div>
                        </div>
                    </div>`
detailContainer.innerHTML = detailCard;