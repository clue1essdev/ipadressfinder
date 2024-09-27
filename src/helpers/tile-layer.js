import L from 'leaflet';

export function tileLayer (map) {
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors<div class="attribution">Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. Coded by <a href="https://github.com/clue1essdev">Tamerlan Halilov</a> .</div>'
      }).addTo(map);
    document.querySelector(".leaflet-attribution-flag").remove();
}