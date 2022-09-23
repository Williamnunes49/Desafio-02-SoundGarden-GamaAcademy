const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com";
const section = document.querySelector(".container ");
const div = document.querySelectorAll("article");

// remove tag article da tela
div.forEach((tag) => {
  tag.remove();
});

async function todosEventos() { //mostra todos os eventos
  try {
    const endPoint = await fetch(`${BASE_URL}/events`);
    const newEndPoint = await endPoint.json();

    newEndPoint.forEach((evento) => { 
      const html2 = `
            <div style="display: inline-grid; grid-template-columns: 200px 200px;">
                <article style="text-align:center;"  class="evento card p-5 m-3">
                    <h2>${evento.name}</h2>
                    <img src="${evento.poster}">
                    <h4>${evento.attractions}</h4>
                    <p>${evento.description}
                    <br> </p>
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

//abrir modal
const btnReservar = document.querySelector('.btn-reservas')

const inputNome = document.querySelector(".input-nome-modal");
const inputEmail = document.querySelector(".input-email-modal");
const myModal = document.getElementById('meuModal')
const modalNomeEvento = document.querySelector('#modalNomeEvento')

let idEvento = ""
let nomeEvento = ""

myModal.addEventListener('shown.bs.modal', (elemento) => {
  idEvento = elemento.relatedTarget.pathname.split("/")[2];
  nomeEvento = elemento.relatedTarget.pathname.split("/")[3].replace(/%20/g, " ");
  modalNomeEvento.innerHTML = nomeEvento
  inputNome.value = ""
  inputEmail.value = ""
})
btnReservar.onclick=(event)=>{
  event.preventDefault ();
  reservaEvento(idEvento, inputNome.value, inputEmail.value)
}

//valida email
function validaEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

async function reservaEvento(idEvento, nome, email) {
  let cadastro = {
    owner_name: `${nome}`,
    owner_email: `${email}`,
    number_tickets: 1,
    event_id: `${idEvento}`,
  };

  const resposta = validaEmail(email)

  if(!nome || !email || resposta ==false){
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
  window.location.assign("eventos.html")
}