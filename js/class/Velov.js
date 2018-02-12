class Velov {
    constructor() {
        this.contractName = 'Lyon';
        this.key= '6a6e728661cc08bff0fbd1d7103230aa91e7e9d5';
    }

    // Récupère les données de l'api JC Decaux
    async getData() {
        const resp = await fetch(`https://api.jcdecaux.com/vls/v1/stations?contract=${this.contractName}&apiKey=${this.key}`);
        const respData = await resp.json();

        return respData;
    }
}