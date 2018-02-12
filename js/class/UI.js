class UI {
    constructor() {
        // Modal Box Canvas
        this.modal = document.querySelector('.canvas');

        // Canvas Signature
        this.canvas = document.querySelector('.canvas-sign');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        this.isDrawing = false;
        this.lastX = 0;
        this.lastY = 0;

        // Timer
        this.timeUp;

        this.infosContent = document.querySelector('.infos-content');

        this.currentStation;
    }


    // Permet d'initialiser le canvas
    initCanvas() {
        this.clearCanvas();

        this.ctx.strokeStyle = '#000';
        this.ctx.lineJoin = 'round';
        this.ctx.lineCap = 'round';
        this.ctx.lineWidth = 10;
    }


    // Permet de reset le canvas
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Le bouton j'accepte est désactivé par default
        document.querySelector('.canvas-cta-accept').disabled = true;
        document.querySelector('.canvas-cta-accept').style.opacity = '0.3';
    }


    // Permet d'afficher les infos relatives à la station
    showInfosStations(station) {
        // Si des vélos sont disponibles
        if (station.available_bikes > 0) {
            this.currentStation = station.name;
            this.infosContent.innerHTML = `
                <ul class="fade-in">
                    <li><span>Nom de la station:</span> ${station.name}</li>
                    <li><span>Adresse:</span> ${station.address}</li>
                    <li><span>Place:</span> ${station.bike_stands}</li>
                    <li><span>Vélo disponible:</span> ${station.available_bikes}</li>
                </ul>
                <a href="#" class="infos-content-reservation fade-in">Réserver</a>
            `;
        // Si aucun vélo est disponible
        } else {
            this.infosContent.innerHTML = `
                <ul class="fade-in">
                    <li><span>Nom de la station:</span> ${station.name}</li>
                    <li><span>Adresse:</span> ${station.address}</li>
                </ul>
                <p class="fade-in">
                Nous sommes désolés mais aucun vélo n'est disponible actuellement à cette station.
                </p>
            `;
        }
    }


    // Gère la boite modal de réservation contenant le canvas
    reservationClick(target) {
        // Si la cible du click est bien le bouton
        if (target.classList.contains('infos-content-reservation')) {
            // On crée un overlay d'arrière plan
            const overlay = document.createElement('div');
            overlay.className = 'overlay';
            overlay.style.display = 'block';
            overlay.style.position = 'absolute';
            overlay.style.zIndex = '1';
            overlay.style.top = '0';
            overlay.style.bottom = '0';
            overlay.style.left = '0';
            overlay.style.right = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundColor = 'rgba(0,0,0,.6)';
            document.body.appendChild(overlay);

            // On fait apparaître la boite modal    
            this.modal.style.opacity = '1';
            this.modal.style.visibility = 'visible';
            this.modal.style.transform = 'translateY(0)';
            this.modal.style.zIndex = '100';
        }
    }


    // Gère la signature
    drawSign(e) {
        if (!this.isDrawing) return;

        // Récupère le bouton Je réserve
        const jeReserve = document.querySelector('.canvas-cta-accept');

        // On vérifie que un dessin est bien présent sur le canva en vérifiant que le boutton gauche de la souris a bien été pressé
        if (e.buttons === 1) {
            this.ctx.beginPath();
            // Start From
            this.ctx.moveTo(this.lastX, this.lastY);
            // Go To
            this.ctx.lineTo(e.offsetX, e.offsetY);
            this.ctx.stroke();
            [this.lastX, this.lastY] = [e.offsetX, e.offsetY];

            // On réactive ainsi notre bouton j'accepte
            jeReserve.disabled = false;
            jeReserve.style.opacity = '1';
            jeReserve.style.cursor = 'pointer';
            jeReserve.addEventListener('mouseenter', (e) => {
                e.target.style.backgroundColor = '#3C6E65';
            });
            jeReserve.addEventListener('mouseleave', (e) => {
                e.target.style.backgroundColor = '#71A466';
            });

        }
    }


    // Permet de fermer la boite modal du canvas
    closeCanvas() {
        // On récupère la boite modal
        const modal = document.querySelector('.canvas');

        modal.style.opacity = '0';
        modal.style.visibility = 'hidden';
        modal.style.transform = 'translateY(-100%)';

        // On supprime l'overlay
        const overlay = document.querySelector('.overlay');
        if (overlay) {
            overlay.remove();
        }
    }


    // Gère la réservation
    acceptSign() {
        this.countDown();

        // On enregistre les infos dans le Session Storage
        storage.setData(this.currentStation, this.timeUp);

        this.infosContent.innerHTML = `
            <p>Veuillez selectionner une station.</p>
        `;  
    }


    // Gère le compte à rebours
    countDown() {
        if (storageData.timer) {
            this.timeUp = storageData.timer;
        } else {
            this.timeUp = new Date().getTime() + 1200000;
        }

        let countDownCtrl = setInterval(() => {

            let now = new Date().getTime();

            let timer = this.timeUp - now;

            let minutes = Math.floor(timer % (1000 * 60 * 60) / (1000 * 60));
            let seconds = Math.floor(timer % (1000 * 60) / 1000);

            if (timer > 0) {
                document.querySelector('.rent-confirmation').innerHTML = `
                    <p>Vous avez 1 vélo réservé à la station ${this.currentStation ? this.currentStation : storageData.station} pour ${minutes} mn ${seconds} s</p>
                    <a href="" class="cancelBike">Annuler votre réservation</a>
                `;
                
            } else {
                document.querySelector('.rent-confirmation').innerHTML = `
                    <p>Vous n'avez aucune réservation d'enregistrer actuellement.</p>
                `;

                // On Supprime les données enregistrer dans le Session Storage
                storage.removeData();
            }

        }, 1000);
    }
}