class Storage {
    constructor() {
        this.station;
        this.timer;
    }


    // Récupère les données du SessionStorage
    getData() {
        if (sessionStorage.getItem('station') != null) {
            this.station = sessionStorage.getItem('station');
        }

        if (sessionStorage.getItem('timer') != null) {
            this.timer = sessionStorage.getItem('timer');
        }

        return {
            station: this.station,
            timer: this.timer
        }
    }


    // Ajoute les données dans SessionStorage
    setData(station, timer) {
        sessionStorage.setItem('station', station);
        sessionStorage.setItem('timer', timer);
    }


    // Supprime les données du SessionStorage
    removeData() {
        sessionStorage.removeItem('station');
        sessionStorage.removeItem('timer');
    }
}