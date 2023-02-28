import { Component, Input, OnInit } from '@angular/core';
import { Action } from 'rxjs/internal/scheduler/Action';
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
  user: any[] = [];
  log: any[] = [];
  loginDate!: string;
  nomeCitta!: string;
  orario!: string;
  azione!: string;
  userNameActions: UserData[] = [];
  pageActions: DataInterface[] = [];

  constructor(private action: UserLogServiceService) { }
  public getData(){
    console.log(this.userNameActions);
    console.log(this.pageActions);
    this.userNameActions.forEach(user=>{
      this.username = user.userName;
      this.loginDate = user.date;
    })
   this.pageActions.forEach(action=>{
    console.log(action);
    this.orario = action.date;
    this.azione = action.currentPageData;
    this.nomeCitta = action.nomeCittàArray;
   })
  }

  ngOnInit(): void {
    this.userNameActions = this.action.getDataUser();
    this.pageActions = this.action.getDataActions();
    this.getData();
  }
}
