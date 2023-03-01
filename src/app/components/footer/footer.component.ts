import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogServiceService } from 'src/app/services/user-log-service.service';

@Component({
  selector: '[app-footer]',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  auth!: any;
  isauth: boolean = false;
  isAuth: boolean = false;
  storageUser!: string|null;
  passwordUser!: string|null;
  user!: any;
  accesso!: any;
  ultimoAccesso!: any;
  realUser: string = 'undefined';
  realPassword: string = 'undefined';
  realDate: string = 'undefined';


  constructor(private router: Router, private getData: UserLogServiceService) { }
  public footer(){
    this.storageUser = localStorage.getItem('username');
    this.passwordUser = localStorage.getItem('passord');
    if(this.storageUser!=='undefined'&&this.passwordUser!=='undefined'){
      this.isAuth = true;
    }
    this.auth = this.getData.getDataUser();
    if(this.auth.length!==0){
      this.isauth = true;
    }
    if(this.isauth){
      this.auth.forEach((auth:any)=>{
        this.user = auth['userName'];
        this.accesso = auth['date'];
      })
    }else{
      return
    }
  }

  public goToChrono(){
    this.router.navigate(['crono']);
  }

  
  public exit(){
    localStorage.setItem('username', this.realUser);
    localStorage.setItem('password', this.realPassword);
    localStorage.setItem('date', this.realDate);
    this.router.navigate(['login']);
  }

  ngOnInit(): void {
    this.storageUser = localStorage.getItem('username');
    this.passwordUser = localStorage.getItem('passord');
    if(this.storageUser!=='undefined'&&this.passwordUser!=='undefined'){
      this.isAuth = false;
    }
    this.footer()
  }

}
