const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com";

async function reservasEvent() {
    try{
        const endPoint = await fetch(`${BASE_URL}/bookings`);
        const newEndPoint = await endPoint.json();
        console.log(newEndPoint);
    }
    catch(error) {
        console.log(error)
    }
}
reservasEvent()