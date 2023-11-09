import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  showPass=false;
  passType='password'
  loginForm:FormGroup;
  constructor(public loader:NgxUiLoaderService,private _service:GlobalService){
   this.loginForm=new FormGroup({
     username:new FormControl(''),
     email:new FormControl(''),
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
    this._service.postRequest('http://localhost:4000/api/user',this.loginForm.value).subscribe((res:any)=>{
      console.log(res);
      this.loginForm.reset()
    })
    console.log(this.loginForm.value)
    this.loader.stop();
  }
}
