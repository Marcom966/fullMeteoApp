import { Component, OnInit } from '@angular/core';
import { UserLogServiceService } from 'src/app/services/user-log-service.service';

@Component({
  selector: '[app-crono]',
  templateUrl: './crono.component.html',
  styleUrls: ['./crono.component.css']
})
export class CronoComponent implements OnInit {
  username!: any;
  actions!: any[];
  date: Date = new Date();

  constructor(private action: UserLogServiceService) { }

  public getActions(){
    this.action.getActions();
  }

  ngOnInit(): void {
    this.getActions();
  }

}
