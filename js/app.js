/* ---> INIT OBJECTS <--- */
// Init Storage Object
const storage = new Storage;
let storageData = storage.getData();

// Init Map Object
const map = new Map;
map.init();

// Init Velov Object
const velov = new Velov;

// Init UI Object
const ui = new UI;



/* ---> VARS <--- */
const infosContent = document.querySelector('.infos-content');
const modal = document.querySelector('.canvas');
const signature = document.querySelector('.canvas-sign');
const cancelSignature = document.querySelector('.canvas-cta-cancel');
const acceptSignature = document.querySelector('.canvas-cta-accept');
const rentConfirm = document.querySelector('.rent-confirmation');


/* ---> EVENTS <--- */
document.addEventListener('DOMContentLoaded', loadData);

// Au click sur le bouton de réservation
infosContent.addEventListener('click', rentBike);

// Gère les events du canvas
// Mouse
signature.addEventListener('mousedown', (e) => {
    ui.isDrawing = true;
    [ui.lastX, ui.lastY] = [e.offsetX, e.offsetY];
})
signature.addEventListener('mousemove', (e) => ui.drawSign(e));
signature.addEventListener('mouseup', () => ui.isDrawing = false);
signature.addEventListener('mouseout', () => ui.isDrawing = false);
// Touch
signature.addEventListener('touchstart', (e) => {
    e.preventDefault();

    ui.isDrawing = true;
    let touches = e.touches[0];
    [ui.lastX, ui.lastY] = [touches.pageX - touches.target.offsetLeft - modal.offsetLeft, touches.pageY - touches.target.offsetTop - modal.offsetTop];
})
signature.addEventListener('touchmove', (e) => ui.drawSign(e));
signature.addEventListener('touchend', () => ui.isDrawing = false);
signature.addEventListener('touchleave', () => ui.isDrawing = false);

// Gère l'annulation au moment de la signature
cancelSignature.addEventListener('click', ui.closeCanvas);

// Gère la réservation
acceptSignature.addEventListener('click', confirmRent);

// Gère l'annulation de la réservation
rentConfirm.addEventListener('click', (e) => ui.cancelRent(e));



/* ---> FUNCTIONS <--- */
function loadData() {
    velov.getData()
        .then(data => {
            data.forEach(station => {
                // Permet de définir de quel type sera l'icone
                let icon;
                if (station.available_bikes === 0) {
                    icon = map.icons.redBike.icon;
                } else {
                    icon = map.icons.greenBike.icon;
                }

                // Ajoute un Marker pour chaque station avec son icon
                map.addMarkers(station.position, icon);

                // Récupère les infos de la station au click sur le marker
                map.clickMarkers(station);
            });

            // On groupe les Markers grâce à MarkerClusterer
            map.markerClusterer(map.map, map.markersArr);

            // Si des données sont présentes dans SessionStorage
            if (storageData.station !== undefined) {
                ui.countDown();
            }
        })
        .catch(err => console.log(err));
}


function rentBike(e) {
    e.preventDefault();

    // On fait apparaître la box modal qui gère la signature
    ui.reservationClick(e.target);
    // On initialise le canvas
    ui.initCanvas();
}


function confirmRent() {
    ui.acceptSign();
    ui.closeCanvas();
}