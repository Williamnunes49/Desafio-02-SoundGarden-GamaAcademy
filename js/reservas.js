const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com";
const tabela = document.querySelector('.table')
const tabela02 = document.querySelectorAll('tbody tr')

const urlId = (window.location.search).split("?")[1]
console.log(urlId)

async function reservasEvent() {
    try{
        const endPoint = await fetch(`${BASE_URL}/bookings/event/${urlId}`);
        const newEndPoint = await endPoint.json();
        console.log(newEndPoint);

        newEndPoint.forEach((evento, indice) =>{
            const html = `

            <tbody>
            <tr>
            <th scope="row">${indice+1}</th>
            <td>${evento.owner_name}</td>
            <td>${evento.owner_email}</td>
            <td>${evento._id}</td>
            <td></td>
            </tr>
            </tbody>
           `
            tabela.innerHTML += html

        })
    }
    catch(error) {
        console.log(error)
    }
}
reservasEvent()