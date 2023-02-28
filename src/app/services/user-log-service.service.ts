import { Injectable } from '@angular/core';
import { DataInterface } from '../interfaces/data-interface';
import { UserData } from '../interfaces/user-data';

@Injectable({
  providedIn: 'root'
})
export class UserLogServiceService {
  dataArr: (DataInterface|UserData)[] = [];
  constructor()  { }

  public sendData(data: DataInterface, user: UserData){
   this.dataArr.push(data);
   this.dataArr.push(user);
  }

  public getData(){
    return this.dataArr;
  }
}
