import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router } from '@angular/router';
import { CityInterface } from 'src/app/interfaces/city-interface';
import { DataInterface } from 'src/app/interfaces/data-interface';
import { UserData } from 'src/app/interfaces/user-data';
import { UserLogServiceService } from 'src/app/services/user-log-service.service';

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
  //dataFooter!: UserData;
  userData!: UserData;
  date: Date = new Date() ;
  lastIn: any= '';
  currentPage = '';
  timeSpentOnPages = [];
  componentName!: string;
  realUser!: string;
  realPassword!: string;
  realDate!: string;
  params: string[] = [];
  getUser!: string|null;
  getPassword!: string|null;
  logged: boolean = false;
  

    constructor(private router: Router, private user: UserLogServiceService) { }
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
    this.getUser = localStorage.getItem('username');
    this.getPassword = localStorage.getItem('password');
    if(this.getUser!== undefined&&this.getPassword!==undefined){
      this.logged = true;
    }
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
    console.log(this.getUser);
    console.log(this.getPassword);
    this.weatherCode = form.value.weathercode;
    this.componentName = 'header-component';
    if(this.params.length>0){
      this.params.splice(0, this.params.length);
    }
    if(this.temperaturaAlsuolo){
      let nameParameter = 'soil_temperature'
      this.params.push(nameParameter)
    }
    if(this.temperatura){
      let nameParameter = 'temperatura';
      this.params.push(nameParameter);
    }
    if(this.vento){
      let nameParameter = 'wind'
      this.params.push(nameParameter);
    }
    if(this.weatherCode){
      let nameParameter = 'weatherCode';
      this.params.push(nameParameter);
    }
    this.data = new DataInterface('DataInterface', this.date.toLocaleTimeString() ,this.firstCityCheck, this.nomeCitta, this.latitudine, this.longitudine, this.checkBoxCityArray, this.nomeCittàArray, this.latitudeArray, this.longitudeArray, this.temperatura, this.vento, this.temperaturaAlsuolo, this.weatherCode, this.params, this.componentName);
    this.user.sendDataActions(this.data);
  }

  public logIn(){
    this.router.navigate(['login']);
  }
  ngOnInit(): void {
    this.cityArray.forEach(city=>{
      let string = city.cityName;
      this.cityToIterate.push(string);
    })
  }

}
