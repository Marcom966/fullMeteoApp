import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CityInterface } from 'src/app/interfaces/city-interface';
import { DataInterface } from 'src/app/interfaces/data-interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cityToIterate:  string[] = [];
  firstCityCheck!: boolean;
  nomeCitta!: string;
  latitudine!: number;
  longitudine!: number;
  cityCheck!: boolean;
  cityToChoose!: string;
  nomeCittàArray!: string;
  latitudeArray!: number;
  longitudeArray!: number;
  checkBoxCityArray!: boolean;
  temperatura!: boolean;
  vento!: boolean;
  temperaturaAlsuolo!: boolean;
  weatherCode!: boolean;
  data!: DataInterface; 

    constructor() { }
  public cityArray: CityInterface[] = [
    new CityInterface('Stoccolma', 59.319334136785365, 18.056126191896496),
    new CityInterface('Berlino', 52.53226122863974, 13.40814694211475),
    new CityInterface('Roma', 41.882130594997136, 12.447971811989868),
    new CityInterface('Dusseldorf', 51.22952153956273, 6.797842511150187),
    new CityInterface('Praga', 50.06361025888636, 14.46001809992745),
    new CityInterface('Barcellona', 41.39206788241594, 2.164213015561956),
    new CityInterface('Parigi', 48.85761189898115, 2.340138730406049),
    new CityInterface('Lisbona', 38.72693894853355, -9.162958874599044),
    new CityInterface('Helsinki', 60.17051658651637, 24.982893278314606),
    new CityInterface('Kiev', 50.454930397195575, 30.540818672742326),
    new CityInterface('Londra', 51.513529176375634, -0.12691382760206052),
    new CityInterface('Brussels', 50.84246787280349, 4.347944053460554),
    new CityInterface('Amsterdam', 52.36666186946462, 4.838632843798664),
    new CityInterface('Split', 43.514863817479636, 16.443418674506557),
    new CityInterface('Atene', 37.98696596168469, 23.723910651473233),
    new CityInterface('Berna', 46.94862721636571, 7.4457163606307155),
    new CityInterface('Andorra', 42.5072311121304, 1.5215666413053193),
    new CityInterface('Dublino', 53.34104934043175, -6.267779642170287),
    new CityInterface('Reykjavik', 64.14939349875657, -21.94309826985793),
    new CityInterface('Varsavia', 52.23095779338282, 21.017340750337276),
    new CityInterface('Vienna', 48.56765959885256, 16.83312787627829),
  ]

  public getCity(form: NgForm){
    this.firstCityCheck = form.value.cityCheck;
    this.nomeCitta = form.value.nomeCittà;
    this.latitudine = form.value.latitude;
    this.longitudine = form.value.longitude;
    this.checkBoxCityArray = form.value.checkboxCity;
    this.cityToChoose = form.value.cityToChoose.cityName;
    this.cityArray.forEach(city=>{
      let citynamenew = city.cityName;
      if(citynamenew===this.cityToChoose){
        this.latitudeArray = city.cityLatitude;
        this.longitudeArray = city.cityLongitude;
        this.nomeCittàArray = city.cityName;
      }
    })
    this.temperatura = form.value.temperatura;
    this.vento = form.value.wind;
    this.temperaturaAlsuolo = form.value.soil_temperature;
    this.weatherCode = form.value.weathercode;
    this.data = new DataInterface(this.firstCityCheck, this.nomeCitta, this.latitudine, this.longitudine, this.checkBoxCityArray, this.nomeCittàArray, this.latitudeArray, this.longitudeArray, this.temperatura, this.vento, this.temperaturaAlsuolo, this.weatherCode);

  }
  ngOnInit(): void {
    this.cityArray.forEach(city=>{
      let string = city.cityName;
      this.cityToIterate.push(string);
    })
  }

}
