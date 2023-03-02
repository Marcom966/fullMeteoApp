import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { DataInterface } from 'src/app/interfaces/data-interface';
import { UserData } from 'src/app/interfaces/user-data';
import { UserLogServiceService } from 'src/app/services/user-log-service.service';

@Component({
  selector: '[app-login-component]',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {
  usernameTocatch!: string;
  passwordToCatch!: string;
  date: Date = new Date();
  day!: string;
  userLog!: UserData;
  requestSub = new Subscription();
  emptyData!: DataInterface;
  date2!: string;
  username2!: string;
  passWord2!: string;
  componentName!: string;
  error!: boolean;
  jsonUrl = 'assets/users.json';
  actions = new Subscription();
  
  constructor(private router: Router, private _http: HttpClient, private userLogger: UserLogServiceService) { }

  public onSubmit(form: NgForm){
    this.usernameTocatch = form.value.Nickname;
    this.passwordToCatch = form.value.Password;
    this.date2 = this.date.toLocaleTimeString();
    this.day = this.date.getDay().toString()
    this.requestSub = this.getData().subscribe((resp)=>{
      let users = resp['users'];
      users.forEach((user: any)=>{
        this.username2 = user['username'];
        this.passWord2 = user['password'];
        if(this.usernameTocatch===this.username2&&this.passwordToCatch===this.passWord2){
          this.naviga('home');
          localStorage.setItem('username', this.username2);
          localStorage.setItem('password', this.passWord2);
          localStorage.setItem('date', this.date2);
          localStorage.setItem('day', this.day);
          this.componentName = 'login-component';
          this.userLog = new UserData('UserData', this.date.toLocaleTimeString(), 'login-component', this.username2);
          this.userLogger.sendDataUser(this.userLog);
        }else{
          this.formError();
        }
      })
    })
  }
  public formError(){
    this.error = true;
  }
  public getData(): Observable<any>{
    return this._http.get<any>(this.jsonUrl);
  }
  public naviga(destinatione: string){
    this.router.navigate([destinatione])
  }
  ngOnDestroy(): void{
    this.requestSub.unsubscribe();
  }

  ngOnInit(): void {
    
  }

}
