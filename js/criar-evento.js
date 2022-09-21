
var nomeEventoCriado = ""

async function criarEventos(){
  try {
    const nomeEvento = document.querySelector("#nome");
    const bannerEvento = document.querySelector('#banner')
    const atracoesEvento = document.querySelector("#atracoes");
    const descricaoEvento = document.querySelector("#descricao");
    const dataEvento = document.querySelector("#data");
    const lotacaoEvento = document.querySelector("#lotacao");

    const datacerta = new Date(dataEvento.value).toISOString();
    
    const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com/events";
      let evento = {
          name: nomeEvento.value,
          poster: bannerEvento.value,
          attractions: [atracoesEvento.value], 
          description: descricaoEvento.value,
          scheduled: datacerta,
          number_tickets: Number(lotacaoEvento.value)
        }
      
      const response = await fetch(BASE_URL,{
          method:"POST",
          headers: {"Content-type": "application/json"},
          body:JSON.stringify(evento),
      })
      const dados = await response.json();
      console.log(dados)

      nomeEventoCriado = `${nomeEvento.value}`
      alerta(nomeEventoCriado)
      
  } catch (error) {
      console.log(error);
  }
}

function alerta (nomeEventoCriado){
   alert(`Você cadastrou o evento ${nomeEventoCriado}`);
   return window.location.assign("admin.html")
}
const btnCriar = document.querySelector(".btn-primary")

btnCriar.onclick = (event) =>{
  event.preventDefault()
  criarEventos();
}
