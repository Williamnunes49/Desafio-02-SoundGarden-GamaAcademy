const nomeEvento = document.querySelector("#nome");
const atracoesEvento = document.querySelector("#atracoes");
const bannerEvento = document.querySelector("#banner")
const descricaoEvento = document.querySelector("#descricao");
const dataEvento = document.querySelector("#data");
const lotacaoEvento = document.querySelector("#lotacao");
const datacerta = new Date(dataEvento.value).toISOString();



const urlId = (window.location.search).split("?")[1];
const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com/events";


async function editarEvento() {
    let evento = {
        name: nomeEvento.value,
        poster: bannerEvento.value,
        attractions: [atracoesEvento.value],
        description: descricaoEvento.value,
        scheduled: datacerta,
        number_tickets: Number(lotacaoEvento.value)
    }
try{
    const response = await fetch(BASE_URL.concat(urlId), {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(evento),
    })
    const dados = await response.json();
    console.log(dados);
}
catch(error){
    console.log(error);
}
}

const btnEditar = document.querySelector(".btn-primary");

btnEditar.onclick = (event) =>{
    event.preventDefault()
    editarEvento();
    
}