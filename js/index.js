const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com";
const div = document.querySelectorAll("article");
const container = document.querySelectorAll(".container")[1];

div.forEach((tag) => {
  tag.remove();
});

const banner = document.querySelector(".text-center")

function aparecerBanner () {
  banner.style.width = "600px";
  banner.innerHTML=`
      <div id="carouselExampleControls" class="carousel slide carousel-fade" data-bs-ride="carousel">
            <div class="carousel-inner ">
              <div class="carousel-item active" data-bs-interval="3000" >
                <img src="./img/1.png" class="d-block " alt="...">
              </div>
              <div class="carousel-item " data-bs-interval="3000">
                <img src="./img/2.png" class="d-block " alt="...">
              </div>
              <div class="carousel-item" data-bs-interval="3000">
                <img src="./img/3.png" class="d-block " alt="...">
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
      </div>
  `
}
aparecerBanner()

async function get3Events() { // apresenta os 3 últimos eventos criados
  try {
    const endPoint = await fetch(`${BASE_URL}/events`);
    const newEndPoint = await endPoint.json();
    
    for (let i = 0; i < 3; i++) {
      const evento = newEndPoint[i]
      console.log(i)
      const html = `
      <div class="container d-flex justify-content-center align-items-center flex-wrap">
        <article class="evento card p-5 m-3">
          <h2>${evento.name}</h2>
          <h4>${evento.attractions}</h4>
          <p>${evento.description}</p>
          <a href="${evento._id}/${evento.name}" class="btn btn-primary" 
          data-bs-toggle="modal" data-bs-target="#meuModal">reservar ingresso</a>
        </article>
      </div>
        `
      container.innerHTML  += html  
    }
    
  }catch (error) {
    console.log(error);
  }
}
get3Events();

const inputNome = document.querySelector(".input-nome-modal");
const inputEmail = document.querySelector(".input-email-modal");
const myModal = document.getElementById('meuModal')
const btnReservar = document.querySelector('.btn-reservas')

const modalNomeEvento = document.querySelector('#modalNomeEvento')

let idEvento = ""
let nomeEvento = ""

myModal.addEventListener('shown.bs.modal', (elemento) => {
  idEvento = elemento.relatedTarget.pathname.split("/")[2];
  nomeEvento = elemento.relatedTarget.pathname.split("/")[3].replace(/%20/g, " ");
  modalNomeEvento.innerHTML = nomeEvento
})

btnReservar.onclick=(event)=>{
  event.preventDefault ();
  reservaEvento(idEvento, inputNome.value, inputEmail.value)
}

async function reservaEvento(idEvento, nome, email) {
  let cadastro = {
    owner_name: `${nome}`,
    owner_email: `${email}`,
    number_tickets: 1,
    event_id: `${idEvento}`,
  };
  if(!nome || !email){
    alert('Campos obrigatórios')
    return
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
  alert(`Ingresso para o evento ${nomeEvento} reservado!`)
  window.location.assign("index.html")
}
