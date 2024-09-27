export async function getAdress(ip = "22.22.22.22") {
    const url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_PNxK9IVXLidEkKRmy3QmEWJFZ8H59&ipAddress=`;
    let response;
    try {
        response = await fetch(`${url}${ip.replaceAll(" ", "")}`);
        response = await response.json();
    } catch (error) {
        console.error(error);
    }

    return response;
}