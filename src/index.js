import "babel-polyfill";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { addOffset, getAdress, tileLayer, validateIp } from "./helpers";
import icon from "../images/icon-location.svg";

const ipInput = document.querySelector(".search-bar__input");
const btn = document.querySelector("button");
btn.addEventListener("click", getDataFromApi);
ipInput.addEventListener("keydown", handleKey);

const ip = document.querySelector("#ip");
const location = document.querySelector("#location");
const timeZone = document.querySelector("#timezone");
const isp = document.querySelector("#isp");

const mapField = document.querySelector(".map");
const locationIcon = L.icon({
  iconUrl: icon,
  iconSize: [30, 40],
  className: "map-icon",
});

const map = L.map(mapField, {
  center: [59.9311, 30.3609],
  zoom: 13,
});
tileLayer(map);
L.marker([51.505, -0.09], { icon: locationIcon }).addTo(map);

function getDataFromApi() {
  if (!validateIp(ipInput.value)) {
    return;
  }
  getAdress(ipInput.value)
    .then(renderInfo)
    .catch((error) => console.error(error));
}

function handleKey(event) {
  if (event.key === "Enter") {
    getDataFromApi();
  }
}

function renderInfo(info) {
  const { country, region, city, timezone, lat, lng } = info.location;
  ip.textContent = info.ip;
  if ((country, region)) {
    location.textContent = `${country}, ${region}${city ? ", " + city : ""}`;
  } else {
    location.textContent = "Not found";
  }
  timeZone.textContent = timezone;
  isp.textContent = info.isp;
  if (lat && lng) {
    map.setView([lat, lng]);
    const marker = document.querySelector(".leaflet-marker-icon");
    if (!marker) {
      L.marker([lat, lng], { icon: locationIcon }).addTo(map);
    } else {
      marker.remove();
      L.marker([lat, lng], { icon: locationIcon }).addTo(map);
    }
    if (matchMedia("(max-width: 1024px)").matches) {
      addOffset(map);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  getAdress("195.70.196.197").then(renderInfo);
});
