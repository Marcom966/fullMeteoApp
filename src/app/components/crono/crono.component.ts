import { Component, Input, OnInit } from '@angular/core';
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
  actions: (DataInterface|UserData)[] = [];

  constructor(private action: UserLogServiceService) { }
  public getData(){
    console.log(this.actions);
    
    this.user.forEach(utente=>{
      if(utente['currentPage']==='login-component'){
        this.loginDate = utente['date'];
      }if(utente['currentPage']==='header-component'){
        this.username = utente['userName'];
      }
    })
    this.log.forEach(loggin=>{
      console.log(loggin);
      if(loggin['currentPageData']==='header-component'){
        this.orario = loggin['date'];
        this.nomeCitta = loggin['nomeCittàArray'];
        this.azione = 'clicked on'+loggin['currentPageData'];
      }
    })
  }

  ngOnInit(): void {
    this.actions = this.action.getData();
    this.actions.forEach(action=>{
      if(action.id==='DataInterface'){
        this.log.push(action);
      }
      if(action.id==='UserData'){
        this.user.push(action);
      }  
    })
    this.getData();
  }
}
