import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../global.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-single-bewery',
  templateUrl: './single-bewery.component.html',
  styleUrls: ['./single-bewery.component.scss'],
})
export class SingleBeweryComponent implements OnInit {
  data: any;
  RatingForm: FormGroup;
  isReviewData=false;
  review:string=''
  rating:number=0;
  userId = sessionStorage.getItem('userId');
  productId = '';
  constructor(
    private arout: ActivatedRoute,
    private _service: GlobalService,
    public loader: NgxUiLoaderService
  ) {
    this.RatingForm = new FormGroup({
      rating: new FormControl(0),
    });
  }

  ngOnInit(): void {
    this.loader.start();
    this.arout.params.subscribe((res) => {
      this.productId = res['id'];
      this._service
        .getRequest(`https://api.openbrewerydb.org/v1/breweries/${res['id']}`)
        .subscribe((data: any) => {
          
          console.log(data, 'sd');
          this.data = data;
          this._service.getRequest(`http://localhost:4000/api/product/${this.productId}`).subscribe((res:any)=>{
            this.loader.stop()
            console.log(res,"log");
            
              if(res.status===0){
                this.isReviewData=true;
                this.RatingForm.get('rating')?.setValue(res.data.rating);
                this.review=res.data.reviews.review;
              }
              else if(res.status===1){
                this.isReviewData=false
              }
          })
        });
    });
  }

  async addReview() {
    const { value: text } = await Swal.fire({
      input: 'textarea',
      inputLabel: 'Review',
      inputPlaceholder: 'Type your review here...',
      inputAttributes: {
        'aria-label': 'Type your review here',
      },
      showCancelButton: true,
    });
    if (text) {
      Swal.fire(text);
      const body = {
        productId: this.productId,
        reviews: {
          review: text,
          userId: this.userId,
        },
        rating: this.RatingForm.get('rating')?.value,
      };
      this._service.postRequest('http://localhost:4000/api/product',body).subscribe((res:any)=>{
        console.log(res);
        
      })
    }
  }
}
