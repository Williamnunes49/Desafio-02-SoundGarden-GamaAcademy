const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com";
const section = document.querySelector(".container ");
const div = document.querySelectorAll("article");

// remove tag article da tela
div.forEach((tag) => {
  tag.remove();
});

const inputNome = document.querySelector(".input-nome-modal");
const inputEmail = document.querySelector(".input-email-modal");
const myModal = document.getElementById('meuModal')
const btnReservar = document.querySelector('.btn-reservas')

const modalNomeEvento = document.querySelector('#modalNomeEvento')

let idEvento = ""
let nomeEvento = ""

myModal.addEventListener('shown.bs.modal', (elemento) => {
  idEvento = elemento.relatedTarget.pathname.split("/")[1];
  nomeEvento = elemento.relatedTarget.pathname.split("/")[2].replace(/%20/g, " ");
  modalNomeEvento.innerHTML = nomeEvento
})
btnReservar.onclick=(event)=>{
  event.preventDefault()
  reservaEvento(idEvento, inputNome.value, inputEmail.value)
}

async function todosEventos() {
    try {
      const endPoint = await fetch(`${BASE_URL}/events`);
      const newEndPoint = await endPoint.json();
      console.log(newEndPoint);

      newEndPoint.forEach((evento) => {
       
        const html2 = `
              <div style="display: inline-grid; grid-template-columns: 200px 200px;">
                  <article style="text-align:center;"  class="evento card p-5 m-3">
                      <h2>${evento.name}</h2>
                      <h4>${evento.attractions}</h4>
                      <p>${evento.description}
                      <br> Lorem ipsum dolor sit amet, consectetur adipisicing elit. </p>
                      <a href="${evento._id}/${evento.name}" class="btn btn-primary" 
                      data-bs-toggle="modal" data-bs-target="#meuModal">fazer reserva</a>
                  </article>
               </div>
              `;
        
        section.innerHTML += html2;
      });
    } catch (error){
        console.log(error)
    }
}
todosEventos()

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