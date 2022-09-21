const nomeEvento = document.querySelector("#nome");
const atracoesEvento = document.querySelector("#atracoes");
const bannerEvento = document.querySelector("#banner")
const descricaoEvento = document.querySelector("#descricao");
const dataEvento = document.querySelector("#data");
const lotacaoEvento = document.querySelector("#lotacao");




const urlId = (window.location.search).split("?")[1];
const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com";

async function pegarEvento() {
    try {
        const endPoint = await fetch(`${BASE_URL}/events`);
        const newEndPoint = await endPoint.json();

        console.log("endpoint sem excluir:", newEndPoint)

        newEndPoint.forEach((evento, index) => {
            if (evento._id == urlId) {
                const data = new Date(evento.scheduled);
                nomeEvento.setAttribute("value", `${evento.name}`);
                bannerEvento.setAttribute("value", `${evento.poster}`);
                atracoesEvento.setAttribute("value", `${evento.attractions}`);
                descricaoEvento.innerHTML = `${evento.description}`;
                dataEvento.setAttribute("value", `${data.toLocaleDateString()}`);
                lotacaoEvento.setAttribute("value", `${evento.number_tickets}`);
                console.log(data);

                nomeEventoExcluido = `${evento.name}`;
            }
        })
    }
    catch (error) {
        console.log(error)
    }
}

pegarEvento();

async function editarEvento() {
    const datacerta = new Date(dataEvento.value).toISOString();
    console.log(datacerta);
    let evento = {
        name: nomeEvento.value,
        poster: bannerEvento.value,
        attractions: [atracoesEvento.value],
        description: descricaoEvento.value,
        scheduled: datacerta,
        number_tickets: Number(lotacaoEvento.value)
    }
    try {
        
        const response = await fetch(`${BASE_URL}/events/${urlId}`, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(evento),
        })
        const dados = await response.json();
        console.log(dados);
    }
        
    
    catch (error) {
    console.log(error);
}
}     

const btnEditar = document.querySelector(".btn-primary");

btnEditar.onclick = (event) => {
    event.preventDefault()
    editarEvento();

}