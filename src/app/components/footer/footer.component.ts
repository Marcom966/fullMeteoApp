import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from 'src/app/interfaces/user-data';
import { UserLogServiceService } from 'src/app/services/user-log-service.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  auth!: any;
  actions!: any;
  isauth: boolean = false;
  isAuth: boolean = false;
  storageUser!: string|null;
  passwordUser!: string|null;
  userLogFt!: UserData;
  user!: any;
  accesso!: any;
  ultimoAccesso!: any;
  realUser: string = 'undefined';
  realPassword: string = 'undefined';
  realDate: string = 'undefined';
  date!: string|null;

  constructor(private router: Router, private getData: UserLogServiceService) { }
  public footer(){
    this.storageUser = localStorage.getItem('username');
    this.passwordUser = localStorage.getItem('password');
    this.date = localStorage.getItem('date');
    this.auth = this.getData.getDataUser();
    if(this.storageUser===null&&this.passwordUser==null){
      this.auth = [];
      this.actions = [];
    }
    if(this.auth.length!==0){
      this.isauth = true;
    }
    if(this.isauth){
      this.auth.forEach((auth:any)=>{
        this.user = auth['userName'];
        this.accesso = auth['date'];
      })
      if(this.user===undefined&&this.accesso===undefined){
        this.user = this.storageUser;
        this.accesso = this.date;
      }
    }else{
      return
    }
  }

  public goToChrono(){
    this.router.navigate(['crono']);
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
  ngOnChanges(): void{
    this.footer();
  }
  ngOnInit(): void {
    this.storageUser = localStorage.getItem('username');
    this.passwordUser = localStorage.getItem('password');
    if((this.storageUser!=='undefined'&&this.passwordUser!=='undefined')&&(this.storageUser!==null&&this.passwordUser!==null)){
      this.isauth = true;
    }else{
      this.isauth = false;
    }
    this.footer();
  }

}
