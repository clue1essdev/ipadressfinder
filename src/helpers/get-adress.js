export async function getAdress(ip = "22.22.22.22") {
    const url = `http://ip-api.com/json/`;
    let response;
    try {
        response = await fetch(`${url}${ip.replaceAll(" ", "")}`);
        response = await response.json();
    } catch (error) {
        console.error(error);
    }

    return response;
}