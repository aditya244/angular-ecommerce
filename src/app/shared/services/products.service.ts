import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/product';
import { JsoncallService } from './jsoncall.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private jsonCallService: JsoncallService) { }
  productArr: IProduct[] = [];
  private singleProdData: any;

  onIncrement(prodId) {
    this.jsonCallService.getProductData()
      .subscribe(data => {
        this.singleProdData = data[prodId];
        this.productArr.push(this.singleProdData);
        console.log(this.singleProdData, 'single data');
      });
    console.log(this.productArr, 'prodarr');
  }


}
