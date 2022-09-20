const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com";

const tbody = document.querySelector("tbody")

//btnExcluir.forEach((botao) => botao.setAttribute("href", "excluir-evento.html"));
//tbody.style.display = "none";
tbody.innerHTML = ``

async function adminEventos() {
    try{
        const endPoint = await fetch(`${BASE_URL}/events`);
        const newEndPoint = await endPoint.json();

        newEndPoint.forEach((evento, index)=> 
        {   
            const data = new Date (evento.scheduled);
            const cardEvento = `
            <tr>
                <th scope="row">${index+1}</th>
                <td>${data.toLocaleDateString('pt-br')}</td>
                <td>${evento.name}</td>
                <td>${evento.attractions}</td>
                <td>
                    <a href="reservas.html" class="btn btn-dark">ver reservas</a>
                    <a href="editar-evento.html" class="btn btn-secondary">editar</a>
                    <a href="excluir-evento.html?${evento._id}" class="btn btn-danger">excluir</a>
                </td>
            </tr>
            `
            tbody.innerHTML += cardEvento
        },
        )
    }
    catch(error) {
        console.log(error)
    }
}
adminEventos()

