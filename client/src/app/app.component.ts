import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GlobalService } from './global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'client';
  isloggedIn:any;
  constructor(private _service:GlobalService,private router:Router) {
    
  }
  ngOnInit(): void {
    this._service.isLoggedIn.subscribe(res=>{
      this.isloggedIn=res;
    })
  }
  logout(){
    this._service.isLoggedIn.next(false);
    sessionStorage.removeItem('login');
    sessionStorage.removeItem('userId');
    this.router.navigateByUrl('/login')
  }

}
