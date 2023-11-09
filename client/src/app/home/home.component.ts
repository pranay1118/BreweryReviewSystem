import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
   data:any=[];
   isVisible="1";
   bform:FormGroup;
   constructor(private _service:GlobalService,public loader:NgxUiLoaderService,private router:Router){
    this.bform=new FormGroup({
      searchType:new FormControl('1'),
      city:new FormControl(''),
      bname:new FormControl(''),
      btype:new FormControl('')
    })
   }
  ngOnInit(): void {
    this.loader.start();
    this._service.getRequest('https://api.openbrewerydb.org/v1/breweries').subscribe((res:any)=>{
      console.log(res);
      this.data=res;
      
    });
    
    this.loader.stop();
  }

  selectedType(e:any){
      this.isVisible=e.value;
      console.log(e.value,"sdfdsdf")
  }
  search(){
    this.loader.start();
    let url=''
    let query='';
    switch(this.isVisible){
      case '1':
        url='https://api.openbrewerydb.org/v1/breweries?by_city='
        query=this.bform.get('city')?.value  
        break;
      case '2':
        url='https://api.openbrewerydb.org/v1/breweries?by_name='
        query=this.bform.get('bname')?.value
        break;
      case '3':
        url='https://api.openbrewerydb.org/v1/breweries?by_type='
        query=this.bform.get('btype')?.value   
        break;
      default:console.log("error occured in switch case")     
    }
    this._service.getRequest(url+query).subscribe((res)=>{
      console.log(res,"d")
      this.data=res;
      this.loader.stop();
    })
  }
  singleBewery(id:string){
     this.router.navigateByUrl(`home/${id}`)
  }

}
