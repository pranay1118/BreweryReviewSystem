import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GlobalService } from '../global.service';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
   showPass=false;
   passType='password'
   loginForm:FormGroup;
   constructor(private _service:GlobalService,private router:Router,public loader:NgxUiLoaderService){
    this.loginForm=new FormGroup({
      username:new FormControl(''),
      password:new FormControl('')
    })
   }
   togglePassword(){
    this.showPass=!this.showPass;
    if(this.showPass){
      this.passType='text'
    }
    else this.passType='password'
   }
   login(){
    this.loader.start();
    this._service.postRequest('http://localhost:4000/api/login',this.loginForm.value).subscribe((res:any)=>{
      console.log(res);
      sessionStorage.setItem('login','true');
      sessionStorage.setItem("userId",res.userId);
      this._service.isLoggedIn.next(true);
      this.router.navigateByUrl('/home')
      this.loginForm.reset()
      console.log(this.loginForm.value)
    })
    
    this.loader.stop();
   
   }
}
