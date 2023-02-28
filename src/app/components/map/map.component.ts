import { Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Router } from '@angular/router';
import { DataInterface } from 'src/app/interfaces/data-interface';
import { MapServiceService } from 'src/app/services/map-service.service';
import { Subscription } from 'rxjs';
import { WeatherInterface } from 'src/app/interfaces/weather-interface';
import { UserLogServiceService } from 'src/app/services/user-log-service.service';
import { UserLog } from 'src/app/interfaces/user-log';
import { UserData } from 'src/app/interfaces/user-data';

@Component({
  selector: '[app-map]',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input() data!: DataInterface
  map!: any;
  dataNew!: DataInterface;
  userNew!: UserData;
  firstCityCheck: boolean = false;
  nomeCittà!: string;
  latitude!: number;
  longitude!: number;
  cityCheck!: boolean;
  temperatura!: boolean;
  vento!: boolean;
  temperaturaAlsuolo!: boolean;
  weathercode!: boolean;
  requestSub = new Subscription;
  resp2!: any;
  dateToString!: string;
  date: Date = new Date();
  Day!: string;
  Month!: string;
  fullMonth!: string;
  Year!: number;
  DayMonthYear!: string;
  dateToNumber!: number;
  approximatedDate!: number;
  approximatedDateAgain!: string;
  approximatedDataAgainAgain!: string;
  dateToStringAgain!: string;
  fullHour!: string;
  toSearch!: string;
  console!: number;
  currentWeather!: number;
  currentSoil!: number;
  weatherName!: string;
  currentWind!: number;
  currentTemperature!: number;
  latMarker!: number;
  lenMarker!: number;
  freemarker: boolean = false;
  markerExists: boolean = false; 
  marker!: any;




  public Decide():void{
    if(this.data===undefined){
      return
    }
    let hourly;
    let time!: string[];
    let keys: string[] = [];
    let values: number[] = [];
    let keyPosition!: number;
    let soil_temperature!: number[];
    let weathercode!: number[];
    let windSpeed!: number[];
    let temperatura!: number[];
    this.firstCityCheck = this.data.cityCheck1;
    this.cityCheck = this.data.cityCheckArray;
    if(this.firstCityCheck){
      this.nomeCittà = this.data.nomeCittà;
      this.latitude = this.data.latitudine;
      this.longitude = this.data.longitudine;
    }else if(this.cityCheck){
      this.nomeCittà = this.data.nomeCittàArray;
      this.latitude = this.data.latitudeArray;
      this.longitude = this.data.longitudeArray;
    }else if (this.freemarker&&!this.firstCityCheck&&!this.cityCheck){
      this.nomeCittà = "Posizione Marker";
      this.latitude = this.latMarker;
      this.longitude = this.lenMarker;
    }else{
      window.alert('scegli se inserire i dati tu o scegliere una città, oppure per attivare il free marker mode, scegliere un punto a caso sulla mappa');
      return
    }if(this.firstCityCheck&&this.cityCheck){
      window.alert('scegliere o una città dal dropdown o immetterla manualmente, oppure per attivare il free marker mode, scegliere un punto a caso sulla mappa');
      return
    }
    this.temperatura = this.data.temperatura;
    this.vento = this.data.vento;
    this.temperaturaAlsuolo = this.data.soil_temperature;
    this.weathercode = this.data.weatherCode;
    this.requestSub = this.getData.getValues(this.latitude, this.longitude, this.temperaturaAlsuolo, this.temperatura, this.weathercode, this.vento).subscribe((resp)=>{
      hourly = resp['hourly'];
      time = hourly['time'];
      soil_temperature = hourly['soil_temperature_0cm'];
      weathercode = hourly['weathercode'];
      windSpeed = hourly['windspeed_10m'];
      temperatura = hourly['temperature_2m'];
      this.resp2 = JSON.stringify(this.date);
      this.dateToString = this.date.toLocaleTimeString();
      this.Day = this.date.getDate().toLocaleString('it-IT', {minimumIntegerDigits: 2, useGrouping: false});
      this.Month = (this.date.getUTCMonth() + 1).toString();
      this.fullMonth = this.Month.padStart(2, "0");
      this.Year = this.date.getFullYear();
      this.DayMonthYear = this.Year + "-" + this.fullMonth + "-" + this.Day;
      this.dateToNumber = parseInt(this.dateToString);
      this.approximatedDate = Math.round(this.dateToNumber);
      this.approximatedDateAgain = this.approximatedDate.toString();
      if (this.approximatedDateAgain.length===1){
        this.approximatedDataAgainAgain = this.approximatedDateAgain.padStart(2, "0");
        this.dateToStringAgain = this.approximatedDataAgainAgain;
      }else{
        this.dateToStringAgain = JSON.stringify(this.approximatedDate);
      }
      this.fullHour = this.dateToStringAgain+":00";
      this.toSearch = this.DayMonthYear+"T"+this.fullHour;
      this.console = time.indexOf(this.toSearch);
      if(this.weathercode){
        this.currentWeather = weathercode[this.console].valueOf();
        let weatherEnum = Object.values(WeatherInterface);
          weatherEnum.forEach(value=>{
            if(typeof(value)==='string'){
              keys.push(value);
            }
            if(typeof(value)==='number'){
              values.push(value);
            }
          });
          for(let i=0; i<values.length; i++){
            let value = values[i].valueOf();
            if(this.currentWeather===value){
              keyPosition = i;
            }
          }
        let weather = keys[keyPosition].valueOf();
        this.weatherName = weather;
        }
        if(this.temperaturaAlsuolo){
          this.currentSoil = soil_temperature[this.console].valueOf();
        }
        if(this.vento){
          this.currentWind = windSpeed[this.console].valueOf();
        }
        if(this.temperatura){
          this.currentTemperature = temperatura[this.console].valueOf();
        }
        this.map = this.map.setView([this.latitude, this.longitude], 13);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
        let stringWeather = "Non trovato, spuntare casella tempo";
        let stringTemperature = "Non trovato, spuntare casella temperatura";
        let stringSoil = "Non trovato, spuntare casella temperatura al suolo";
        let stringWind = "Non trovato, spuntare casella vento";

        let popup = L.popup().setContent(this.nomeCittà+", Tempo: "+(this.weathercode ? this.weatherName : stringWeather) +
        ", Temperatura: "+(this.temperatura ? this.currentTemperature : stringTemperature) + "°C" +
        ", Temperatura al suolo: "+(soil_temperature ? this.currentSoil : stringSoil) + "°C" +
        ", Vento: "+(this.vento ? this.currentWind : stringWind) +"Km/H");
        
        if(this.markerExists&&this.freemarker===true){
          this.marker.bindPopup(popup)
          .openPopup();
          this.freemarker = false;
        }
        if(this.markerExists&&this.firstCityCheck||this.cityCheck&&this.markerExists){
          if(this.markerExists){
            this.marker.removeFrom(this.map);
          } 
          this.marker = L.marker([this.latitude, this.longitude]).addTo(this.map)       
          .bindPopup(popup)
          .openPopup();
        }else if (this.firstCityCheck&&!this.markerExists||this.cityCheck&&!this.markerExists){
          this.marker = L.marker([this.latitude, this.longitude]).addTo(this.map)       
          .bindPopup(popup)
          .openPopup();
          this.markerExists = true;
        }else{
          return
        }

    });
  }


  public openMapNew(): void {
    this.map = L.map('map', {
      center:[41.902320136026475, 12.498225402554683],
      zoom: 3
    }).on('click', (e=>{ 
      if(this.markerExists){
        this.marker.removeFrom(this.map);
      }    
      this.marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(this.map);
      this.latMarker = e.latlng.lat;
      this.lenMarker = e.latlng.lng;
      this.freemarker = true;
      if(!this.weathercode&&!this.temperatura&&!this.vento&&!this.temperaturaAlsuolo){
        window.alert('scegli quali parametri vuoi vedere, poi clicca invia');
      }
      window.alert('free marker mode attivato')
      this.markerExists = true;
      this.Decide();
      this.dataNew = new DataInterface('map-freeMarker-component', this.date.toLocaleTimeString(), false, 'freeMarker', this.latMarker, this.lenMarker, false, 'freeMarker', this.latMarker, this.lenMarker, this.temperatura, this.vento, this.temperaturaAlsuolo, this.weathercode, 'map-component');
      this.action.sendDataActions(this.dataNew);
    }))
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);
  }
  
  constructor( private route: Router, public getData: MapServiceService, private action: UserLogServiceService) { }
  public naviga(destinatione: string){
    this.route.navigate([destinatione]);
  }
  ngAfterViewInit(): void{
    this.openMapNew();
    }  

    ngOnChanges():void{
      this.Decide();
    }
    ngOnDestroy():void{
      this.requestSub.unsubscribe();
    }
  ngOnInit(): void {
  }

}
