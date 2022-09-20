const nomeEvento = document.querySelector("#nome");
const bannerEvento = document.querySelector("#banner");
const atracoesEvento = document.querySelector("#atracoes");
const descricaoEvento = document.querySelector("#descricao");
const dataEvento = document.querySelector("#data");
const lotacaoEvento = document.querySelector("#lotacao");

function zerarCampos () {
    nomeEvento.setAttribute("value", "");
    bannerEvento.setAttribute("value", "");
    atracoesEvento.setAttribute("value", "");
    descricaoEvento.innerHTML="";
    dataEvento.setAttribute("value", "");
    lotacaoEvento.setAttribute("value", "");
}

zerarCampos();

const urlId = (window.location.search).split("?")[1]

const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com";

const btnExcluir = document.querySelector(".btn-danger")

var nomeEventoExcluido = ""

async function excluirEventosPagina () {
    try{
        const endPoint = await fetch(`${BASE_URL}/events`);
        const newEndPoint = await endPoint.json();

        console.log("endpoint sem excluir:", newEndPoint)

        newEndPoint.forEach((evento, index)=>{
            if (evento._id == urlId){
                nomeEvento.setAttribute("value", `${evento.name}`);
                bannerEvento.setAttribute("value", `${evento.poster}`);
                atracoesEvento.setAttribute("value", `${evento.attractions}`);
                descricaoEvento.innerHTML=`${evento.description}`;
                dataEvento.setAttribute("value", `${evento.scheduled}`);
                lotacaoEvento.setAttribute("value", `${evento.number_tickets}`);
                console.log(index)

                nomeEventoExcluido = `${evento.name}`;
            }
        })
    } 
    catch (error){
        console.log(error)
    }
}
excluirEventosPagina()

async function excluirParaSempre(){
    try{
        const response = await fetch( `${BASE_URL}/events/${urlId}`,{
            method: "DELETE",
        });
        console.log(response.status)
        console.log('excluiu')
        alert(`Você excluiu o evento ${nomeEventoExcluido}`)
        zerarCampos();
    }
    catch(error){
        console.log(error)
    }
}

btnExcluir.onclick = (event) =>{
    event.preventDefault()
    excluirParaSempre();
    
}
