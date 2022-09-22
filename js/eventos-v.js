const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com";
const section = document.querySelector(".container ");
const div = document.querySelectorAll("article");

// remove tag article da tela
div.forEach((tag) => {
  tag.remove();
});

// Adiciona todos os eventos na tela
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
                    <a href="" class="btn btn-primary">reservar ingresso</a>
                </article>
             </div>
            `;

      section.innerHTML += html2;
    });
    // seleciona os botoes "reservar ingressos"
    const botao = document.querySelectorAll(".btn-primary");
    const modal = document.querySelector("#myModal");
    const inputNome = document.querySelector(".input-nome-modal");
    const inputEmail = document.querySelector(".input-email-modal");
    const span = document.querySelector(".close");
    const btnReservar = document.querySelector(".btn-danger")

    const modalEvento = document.querySelector("#modalNomeEvento");

    inputNome.onblur=function(event){
      console.log(event.target.value)
    }
    // faz sumir o modal quando clica em cancelar
    span.onclick = () => {
        modal.style.display = "none";
        console.log('cancelou')
      ;
    }
    // AQUI EU TO PEGANDO O BOTÃO FAZER RESERVAS, DENTRO DO MODAL
    btnReservar.onclick = (event) => {
      event.preventDefault()
      console.log("clicou no btn reservas");
      //reservaEvento(idEvento);
    };

    botao.forEach((elemento) => {
      elemento.onclick = (event) => {
        console.log('clicou')
        event.preventDefault();
        const idEvento = elemento.pathname.split("/")[1];
        newEndPoint.forEach((evento) => {
          if (evento._id == idEvento) {
            modalEvento.innerHTML = evento.name;
          }
        });
        modal.style.display = "block";
      };
    });    
   
  }
  catch (error) {
    console.log(error);
  }
}
todosEventos();





async function reservaEvento(idEvento) {
  let cadastro = {
    owner_name: "Vinicius",
    owner_email: "email@email.com",
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
