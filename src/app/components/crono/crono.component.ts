import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataInterface } from 'src/app/interfaces/data-interface';
import { UserData } from 'src/app/interfaces/user-data';
import { UserLog } from 'src/app/interfaces/user-log';
import { UserLogServiceService } from 'src/app/services/user-log-service.service';

@Component({
  selector: '[app-crono]',
  templateUrl: './crono.component.html',
  styleUrls: ['./crono.component.css']
})
export class CronoComponent implements OnInit {
  @Input() data!: UserLog;
  username!: any;
  storageUser!: string|null;
  passwordUser!: string|null;
  user: any[] = [];
  soilTemperature!: boolean;
  wind!: boolean;
  temperature!: boolean;
  weatherCode!: boolean;
  loginDate!: string|null;
  nomeCitta!: string;
  orario!: string;
  azione!: string;
  userNameActions: UserData[] = [];
  pageActions: DataInterface[] = [];
  params: any[] = [];
  paramsName!: string;
  isAuth: boolean = false;
  notpopolated: boolean = false;
  realUser: string = "";
  realPassword: string = "";
  realDate: string = "";

  constructor(private action: UserLogServiceService, private route: Router) { }
  public getData(){
    this.userNameActions.forEach(user=>{
      this.username = user.userName;
      this.loginDate = user.date;    
      
    })
    if(this.username===undefined&&this.loginDate===undefined){
      this.username = localStorage.getItem('username')
      this.loginDate = localStorage.getItem('date');
    }if(this.pageActions.length===0){
      this.notpopolated = true;
    }else{
      this.notpopolated = false;
    }
  }

  public getBack(){
    this.route.navigate(['home'])
  }

  public exitCrono(){
    localStorage.clear();
    this.route.navigate(['home']);
    this.action.clearActions();
  }

  ngOnInit(): void {
    this.userNameActions = this.action.getDataUser();
    this.pageActions = this.action.getDataActions();
    this.getData();
  }
}
