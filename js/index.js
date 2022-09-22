const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com";
const nomeEvento = document.querySelectorAll(".evento h2");
const atracoesEvento = document.querySelector(".evento h4")
const descricaoEvento = document.querySelector(".evento p")
const reservarEvento = document.querySelector(".evento btn");
const div = document.querySelectorAll("article");
const container = document.querySelectorAll(".container")[1];

div.forEach((tag) => {
  tag.remove();
});
const inputNome = document.querySelector(".input-nome-modal");
const inputEmail = document.querySelector(".input-email-modal");
const myModal = document.getElementById('meuModal')
const btnReservar = document.querySelector('.btn-reservas')

let idEvento = ""

myModal.addEventListener('shown.bs.modal', (elemento) => {
  idEvento = elemento.relatedTarget.pathname.split("/")[1];
})
btnReservar.onclick=(event)=>{
  event.preventDefault()
  reservaEvento(idEvento, inputNome.value, inputEmail.value)
}

async function get3Events() {
  try {
    const endPoint = await fetch(`${BASE_URL}/events`);
    const newEndPoint = await endPoint.json();

    for (let i = 0; i < 3; i++) {
      const evento = newEndPoint[i]
      const html = `
      <div class="container d-flex justify-content-center align-items-center flex-wrap">
        <article class="evento card p-5 m-3">
          <h2>${evento.name}</h2>
          <h4>${evento.attractions}</h4>
          <p>${evento.description}</p>
          <a href="${evento._id}" class="btn btn-primary" 
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

async function reservaEvento(idEvento, nome, email) {
  let cadastro = {
    owner_name: `${nome}`,
    owner_email: `${email}`,
    number_tickets: 1,
    event_id: `${idEvento}`,
  };
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
}
