export class DataInterface {
    constructor(
        public id: string,
        public date: string,
        public cityCheck1: boolean,
        public nomeCittà: string,
        public latitudine: number,
        public longitudine: number,
        public cityCheckArray: boolean,
        public nomeCittàArray: string,
        public latitudeArray: number,
        public longitudeArray: number,
        public temperatura: boolean,
        public vento: boolean,
        public soil_temperature: boolean,
        public weatherCode: boolean,
        public currentPageData: string,
    ){}
}
