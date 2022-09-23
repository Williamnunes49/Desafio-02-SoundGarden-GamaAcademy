const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com";
const tbody = document.querySelector("tbody");
const eventoReservas = document.querySelector(".my-5 h1");

const urlId = window.location.search.split("?")[1];
const nomeEvento = window.location.search.split("?")[2].replace(/%20/g, " ");

eventoReservas.innerHTML += nomeEvento;

const bdExample = document.querySelector(".bd-example");

async function reservasEvent() {
  try {
    const endPoint = await fetch(`${BASE_URL}/bookings/event/${urlId}`);
    const newEndPoint = await endPoint.json();

    if (newEndPoint.length == 0) {
      bdExample.innerHTML = "<h4>Não há reservas para este evento</h4>";
    }

    newEndPoint.forEach((evento, indice) => {
      const html = `
                <tr>
                    <th scope="row">${indice + 1}</th>
                    <td>${evento.owner_name}</td>
                    <td>${evento.owner_email}</td>
                    <td>${evento._id}</td>
                </tr>     
           `;
      tbody.innerHTML += html;
    });
  } catch (error) {
    console.log(error);
  }
}
reservasEvent();
