let employees = [];
let gridContainer = document.querySelector(".grid-container");
let urlAPI = `https://randomuser.me/api/?results=12&inc=name,email,picture,location,phone,dob`;
let modalClose = document.querySelector(".modal-close");
let overlay = document.querySelector(".overlay");
let modalContainer = document.querySelector(".modal-container");


//gets data from api, formats as json, put in res.results
fetch(urlAPI)
.then(res => res.json())
.then(res => res.results)
.then(displayEmployees)
.catch(err => console.log(err))

//display employees function
function displayEmployees(employeeData) {
    employees = employeeData;
    let employeeHTML = "";
 // goes through each employee and gets their name, email, etc.
    employees.forEach((employee, index) => {
      let name = employee.name;
      let email = employee.email;
      let city = employee.location.city;
      let picture = employee.picture;

      employeeHTML += `
      <div class="card" data-index="${index}">
      <img class="avatar" src="${picture.large}" />
      <div class="text-container">
      <h2 class="name">${name.first} ${name.last}</h2>
      <p class="email">${email}</p>
      <p class="address">${city}</p>
      </div>
      </div>
      `;
    });
    gridContainer.innerHTML = employeeHTML;
  }

  function displayModal(index) {
    let {
      name,
      dob,
      phone,
      email,
      location: { city, street, state, postcode },
      picture,
    } = employees[index];
    console.log(street);
    let date = new Date(dob.date);
    const modalHTML = `
  <img class="avatar" src="${picture.large}" />
  <div class="text-container">
  <h2 class="name">${name.first} ${name.last}</h2>
  <p class="email">${email}</p>
  <p class="address">${city}</p>
  <hr />
  <p>${phone}</p>
  <p class="address">${street.number}, ${street.name},${state} ${postcode}</p>
  <p>Birthday:
  ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
  </div>
  `;
  
    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
  }
  
  gridContainer.addEventListener("click", (e) => {
    if (e.target !== gridContainer) {
      const card = e.target.closest(".card");
      const index = card.getAttribute("data-index");
  
      displayModal(index);
    }
  });
  
  modalClose.addEventListener("click", () => {
    overlay.classList.add("hidden");
  });