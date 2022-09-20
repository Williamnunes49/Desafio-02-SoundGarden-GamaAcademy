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
    const botao = document.querySelectorAll(".btn");

    // seleciona o modal criado no eventos.html
    const modal = document.querySelector("#myModal");
    const span = document.querySelector(".close")
    const btnReservas = document.querySelector('.btn-reservas')
    
    function reservarEvento() {
      
      // precisei desse forEach pra selecionar todos os botões todos  
      botao.forEach((elemento) => {

        // faz aparecer o modal quando clica em 'reservar ingressos'
        elemento.onclick = (event) => {
          modal.style.display = "block";
          event.preventDefault();
        };
      });

        // faz sumir o modal quando clica em cancelar
        span.onclick = () => {
          modal.style.display = "none";
        };

        // AQUI EU TO PEGANDO O BOTÃO FAZER RESERVAS, DENTRO DO MODAL
        btnReservas.onclick = (event) => {
          console.log('clicou no btn reservas')
          event.preventDefault();
        }
    }
    reservarEvento();
  
  } catch (error) {
    console.log(error);
  }
}
todosEventos();
