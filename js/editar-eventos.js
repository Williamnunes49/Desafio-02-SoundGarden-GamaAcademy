const nomeEvento = document.querySelector("#nome");
const atracoesEvento = document.querySelector("#atracoes");
const descricaoEvento = document.querySelector("#descricao");
const dataEvento = document.querySelector("#data");
const lotacaoEvento = document.querySelector("#lotacao");
const datacerta = new Date(dataEvento.value).toISOString();



const urlId = (window.location.search).split("?")[1];
