import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserLogServiceService {
  username!: any;
  actions!: any;
  date: Date = new Date();
  nameOfTheAction!: string;
  evento!: string;
  eventi: string[] = [];
  constructor() { }

  public logService(logame: string){
    this.username = localStorage.getItem('username');
    this.nameOfTheAction = logame;
    this.evento = this.username + "at" + this.date +"clicked on" + this.nameOfTheAction;
    this.eventi.push(this.evento);
  }
  public getActions(){
    console.log(this.eventi);
    return this.evento
  }
}
