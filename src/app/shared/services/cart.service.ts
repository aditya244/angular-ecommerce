import { Injectable, Output, EventEmitter } from '@angular/core';
import { JsoncallService } from './jsoncall.service';
import { IProduct } from '../interfaces/product';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private jsonCallService: JsoncallService, private router: Router) { }

  singleProductData: IProduct;
  cart: IProduct[] = [];
  private productSub: Subscription;
  productPrice: any[] = [];
  productData: IProduct[] = [];

  totalPrice: number;
  // implemented behaviorSubject instead of Subject as it keeps log of changes in the data and gives updated data.
  // behaviorSubject expects any data, so we have provided an empty array.
  private itemAddedToCart = new BehaviorSubject<IProduct[]>([]);
  private filterConfig$ = new BehaviorSubject<any>('');

  getCartUpdateListener() {
    return this.itemAddedToCart.asObservable();
  }

  addToCart(id: number) {
      this.jsonCallService.getProductData()
        .subscribe( data => {
          console.log(data, 'whole data');
          this.singleProductData = data[id];
          console.log(this.cart, 'cart');
          this.cart.push(this.singleProductData);
          this.itemAddedToCart.next([...this.cart]);
          this.productPrice.push(this.singleProductData.price);
          console.log('Product price', this.productPrice);
          const reducer = (accumulator, currentValue) => accumulator + currentValue;
          this.totalPrice = this.productPrice.reduce(reducer);
          console.log(this.totalPrice);
      }
    );
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  applyFilter(filterConfig: any) {
    this.filterConfig$.next(filterConfig);
  }

  getFilterConfig() {
    return this.filterConfig$.asObservable();
  }

  // Important concept, sort and compare
  // console.log(arr.sort(function(a,b){
  //   return a.sum -b.sum
  // }))

  sortProductsByPrice(event) {
    if (event.target.checked) {
      this.jsonCallService.getProducts().subscribe(
        data => {
          this.productData = data.sort( (a: IProduct, b: IProduct) =>
          a.price - b.price
        );
          console.log(data);
      });
    }
  }
  sortProductsByPrice2() {
      this.jsonCallService.getProducts().subscribe(data =>
        this.productData = data.sort( (a: IProduct, b: IProduct) =>
          a.price - b.price
        ));
      console.log('Sort Method done');
  }

  // filterProductsByCategory(categoryName: string){
  //   this.jsonCallService.getProducts().subscribe(data => {
  //     this.productData = data.forEach( (item: IProduct) => {

  //     })
  //   })
  // }
}
