import { Injectable } from '@angular/core';
import { DataInterface } from '../interfaces/data-interface';
import { UserData } from '../interfaces/user-data';

@Injectable({
  providedIn: 'root'
})
export class UserLogServiceService {
  userArr: UserData[] = [];
  actionsArr: DataInterface[] = [];
    constructor()  { }

  public sendDataUser(user: UserData){
   this.userArr.push(user);
   
  }

  public sendDataActions(data: DataInterface){
    this.actionsArr.push(data);
  }

  public getDataUser(){
    return this.userArr;
    
  }

  public getDataActions(){
    return this.actionsArr;
  }

  public clearActions(){
    this.actionsArr=[];
  }
}
