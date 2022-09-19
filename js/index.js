const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com";
const section = document.querySelectorAll(".full")[1];

section.style.display = "none";

async function get3Events() {
  try {
    const endPoint = await fetch(`${BASE_URL}/events`);
    const newEndPoint = await endPoint.json();

    // Adiciona apenas 3 eventos na pagina inicial
    //for (let i = 0; i < newEndPoint.length; i++) {
    const html = `<div class="container text-center">
    <h2>Próximos eventos</h2>
    </div>
    <div class="container d-flex justify-content-center align-items-center">
    <article class="evento card p-5 m-3">
      <h2>${newEndPoint[0].name}</h2>
      <h4>${newEndPoint[0].attractions}</h4>
      <p>${newEndPoint[0].description}</p>
      <a href="modal.html" class="btn btn-primary">reservar ingresso</a>
    </article>

    <article class="evento card p-5 m-3">
      <h2>${newEndPoint[10].name}</h2>
      <h4>${newEndPoint[10].attractions}</h4>
      <p>${newEndPoint[10].description}</p>
      <a href="modal.html" class="btn btn-primary">reservar ingresso</a>
    </article>

    <article class="evento card p-5 m-3">
      <h2>${newEndPoint[5].name}</h2>
      <h4>${newEndPoint[5].attractions}</h4>
      <p>${newEndPoint[5].description}</p>
      <a href="modal.html" class="btn btn-primary">reservar ingresso</a>
    </article>
    </div>
    <div class="container text-center">
      <a href="eventos.html" class="btn btn-secondary">ver todos os eventos</a>
    </div>`

    section.style.display = "block";
    section.innerHTML = html;
    //}
  } catch (error) {
    console.log(error);
  }
}
get3Events();
