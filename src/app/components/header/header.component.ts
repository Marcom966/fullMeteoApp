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
  firstCityCheck!: string;
  firstCityCheckedPage: boolean = false;
  cityFirstChecked: boolean = false;
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
  freeMarkerCheck: boolean = false;
  data!: DataInterface;
  datafreeArray!: DataInterface;
  userData!: UserData;
  date!: Date;
  dateNew!: Date;
  getDate!: number;
  hoursToMilliseconds!: number;
  lastIn: any= '';
  currentPage = '';
  timeSpentOnPages = [];
  componentName!: string;
  componentName2!: string;
  realUser!: string;
  realPassword!: string;
  realDate!: string;
  getUser!: string|null;
  getPassword!: string|null;
  logged: boolean = false;
  typeOfRadio!: string;
  

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
    new CityInterface('Licata', 37.10129456061712, 13.93711594715709)
  ]

  public getCity(form: NgForm){
    
    let params: string[] = [];
    this.date = new Date();
    this.dateNew = new Date();
    this.getDate = this.dateNew.getTime();
    this.firstCityCheck = form.value.cityCheck;
    
    if(this.firstCityCheck==='cityCheck'){
      this.nomeCittàArray = form.value.nomeCittà;
      this.firstCityCheckedPage = true;
      this.checkBoxCityArray = false;
      this.freeMarkerCheck = false;
      this.typeOfRadio = 'cityCheck'
    }if (this.firstCityCheck ==='checkBoxCity'){
      this.cityToChoose = form.value.cityToChoose.cityName;
      this.checkBoxCityArray = true;
      this.firstCityCheckedPage = false;
      this.freeMarkerCheck = false;
      this.typeOfRadio = 'cityBoxCheck';
      
    }if(this.firstCityCheck==='freeMarker'){
      this.firstCityCheckedPage = false;
      this.freeMarkerCheck = true;
      this.checkBoxCityArray = false;
      this.typeOfRadio = 'freeMarker'
    }
    this.nomeCitta = form.value.nomeCittà;
    this.latitudine = form.value.latitude;
    this.longitudine = form.value.longitude;
    
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
    this.componentName = 'header-component';
    this.componentName2 = 'freeCity';
    if(params.length>0){
      params.splice(0, params.length);
    }
    if(this.temperaturaAlsuolo){
      let nameParameter = 'soil_temperature'
      params.push(nameParameter)
    }

    if(this.temperatura){
      let nameParameter = 'temperatura';
      params.push(nameParameter);
    }

    if(this.vento){
      let nameParameter = 'wind'
      params.push(nameParameter);
    }

    if(this.weatherCode){
      let nameParameter = 'weatherCode';
      params.push(nameParameter);
    }
    
    

    this.datafreeArray = new DataInterface('DataInterface', this.date.toLocaleTimeString() ,this.firstCityCheckedPage, this.nomeCitta, this.latitudine, this.longitudine, this.checkBoxCityArray, this.nomeCittàArray, this.latitudeArray, this.longitudeArray, this.temperatura, this.vento, this.temperaturaAlsuolo, this.weatherCode, params, this.componentName2)
    this.data = new DataInterface('DataInterface', this.date.toLocaleTimeString() ,this.firstCityCheckedPage, this.nomeCitta, this.latitudine, this.longitudine, this.checkBoxCityArray, this.nomeCittàArray, this.latitudeArray, this.longitudeArray, this.temperatura, this.vento, this.temperaturaAlsuolo, this.weatherCode, params, this.componentName);
    
    
    if(this.checkBoxCityArray||this.firstCityCheckedPage){
      this.user.sendDataActions(this.data);
      
    }else if (this.firstCityCheck){
      this.user.sendDataActions(this.datafreeArray);
    }
  }

  public logIn(){
    this.router.navigate(['login']);
  }

  public exit(){
    localStorage.setItem('username', this.realUser);
    localStorage.setItem('password', this.realPassword);
    localStorage.setItem('date', this.realDate);
    window.location.reload();
  }

  public oncheck(){
    this.cityFirstChecked = true;
    this.checkBoxCityArray = false;
    this.freeMarkerCheck = false;
  }

  public notChecked(){
    this.cityFirstChecked = false;
    this.checkBoxCityArray = false;
    this.freeMarkerCheck = false;
  }
  public cityArrayCheck(){
    this.checkBoxCityArray = true;
    this.cityFirstChecked = false;
    this.freeMarkerCheck = false;
  }
  public cityArrayNotChecked(){
    this.checkBoxCityArray = false;
    this.cityFirstChecked = false;
    this.freeMarkerCheck = false;
  }
  ngOnChanges():void{
    if(this.firstCityCheck){
      this.cityFirstChecked = true;
    }
    this.logged = false;

  }
  ngOnInit(): void {
    this.getUser = localStorage.getItem('username');
    this.getPassword = localStorage.getItem('password');
    if(this.getUser!=='undefined'&&this.getPassword!=='undefined'){
      this.logged = true;
    }
    if(this.firstCityCheck){
      this.cityFirstChecked = true;
    }
    this.cityArray.forEach(city=>{
      let string = city.cityName;
      this.cityToIterate.push(string);
    })
  }

}
