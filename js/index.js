const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com";
const div = document.querySelectorAll("article");
const container = document.querySelectorAll(".container")[2];

div.forEach((tag) => {
  tag.remove();
});

const banner = document.querySelector("#banner-poster");
const section = document.querySelectorAll(".full")[0];

const larguraBanner = "900px";
const alturaBanner = "400px";

function aparecerBanner(imgA, imgB, imgC, nomeA, nomeB, nomeC) {
  banner.style.width = larguraBanner;
  section.style.padding = "1px 0";

  const html = `
    <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="false">
      <div class="carousel-indicators mb-4" style="background-color: rgba(33, 37, 41, 0.5);" >
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active ">
          <img src="${imgA}" class="d-block" style="width: ${larguraBanner}; height:${alturaBanner}" alt="...">
          <div class="carousel-caption d-none d-md-block mb-4" style="background-color: rgba(33, 37, 41, 0.5)">
            <h5>${nomeA}</h5>
          </div>
        </div>
        <div class="carousel-item">
          <img src="${imgB}" class="d-block " style="width: ${larguraBanner}; height:${alturaBanner}" alt="...">
          <div class="carousel-caption d-none d-md-block mb-4" style="background-color: rgba(33, 37, 41, 0.5)">
            <h5>${nomeB}</h5>
          </div>
        </div>
        <div class="carousel-item ">
          <img src="${imgC}" class="d-block" style="width: ${larguraBanner}; height:${alturaBanner}" alt="...">
          <div class="carousel-caption d-none d-md-block mb-4" style="background-color: rgba(33, 37, 41, 0.5)">
            <h5>${nomeC}</h5>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    `;
  banner.innerHTML += html;
}

async function get3Events() {
  // apresenta os 3 últimos eventos criados
  try {
    const endPoint = await fetch(`${BASE_URL}/events`);
    const newEndPoint = await endPoint.json();

    for (let i = 0; i < 6; i++) {
      const evento = newEndPoint[i];
      const data = new Date(evento.scheduled);
      const html = `
      <div class="container d-flex justify-content-center align-items-center flex-wrap">
        <article class="evento card p-5 m-3">
          <h2>${evento.name}</h2>
          <h4>${data.toLocaleDateString()}</h4>
          <img src="${evento.poster}">
          <h4>${evento.attractions}</h4>
          <p>${evento.description}</p>
          <a href="${evento._id}/${evento.name}" class="btn btn-primary" 
          data-bs-toggle="modal" data-bs-target="#meuModal">reservar ingresso</a>
        </article>
      </div>
        `;
      container.innerHTML += html;
      i++; //pular um evento
    }
    aparecerBanner(
      newEndPoint[0].poster,
      newEndPoint[1].poster,
      newEndPoint[2].poster,
      newEndPoint[0].name,
      newEndPoint[1].name,
      newEndPoint[2].name
    );
  } catch (error) {
    console.log(error);
  }
}
get3Events();

//abrir modal
const btnReservar = document.querySelector(".btn-reservas");

const inputNome = document.querySelector(".input-nome-modal");
const inputEmail = document.querySelector(".input-email-modal");
const myModal = document.getElementById("meuModal");
const modalNomeEvento = document.querySelector("#modalNomeEvento");

let idEvento = "";
let nomeEvento = "";

myModal.addEventListener("shown.bs.modal", (elemento) => {
  idEvento = elemento.relatedTarget.pathname.split("/")[2];
  nomeEvento = elemento.relatedTarget.pathname
    .split("/")[3]
    .replace(/%20/g, " ");
  modalNomeEvento.innerHTML = nomeEvento;
  inputNome.innerHTML = "";
  inputEmail.innerHTML = "";
});

btnReservar.onclick = (event) => {
  event.preventDefault();
  reservaEvento(idEvento, inputNome.value, inputEmail.value);
};

//valida email
let valido = "";
inputEmail.onchange = () => {
  valido = inputEmail.checkValidity();
};

async function reservaEvento(idEvento, nome, email) {
  let cadastro = {
    owner_name: `${nome}`,
    owner_email: `${email}`,
    number_tickets: 1,
    event_id: `${idEvento}`,
  };
  if (!nome || !email || valido == false) {
    alert("Campos obrigatórios");
    return;
  }
  try {
    const response = await fetch(`${BASE_URL}/bookings`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(cadastro),
    });
    const dados = await response.json();
    console.log(dados);
  } catch (error) {
    console.log(error);
  }
  alert(`Ingresso para o evento ${nomeEvento} reservado!`);
  window.location.assign("index.html");
}
