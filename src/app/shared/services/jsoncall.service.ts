import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../interfaces/product';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
// import {} from '../../assets/data/products.json'

@Injectable({
  providedIn: 'root'
})
export class JsoncallService {

  getSelectedProductId: 0;

  selectedProduct: object;
  productData: IProduct[] = [];
  private defaultFilterConfig = {
    lowToHigh: false
  };
  filter$ = new BehaviorSubject<any>(this.defaultFilterConfig);
  public getFilters = this.filter$.asObservable();

  private url =  '../../assets/data/products.json';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
      console.log('Get Products called');
      return this.http.get<IProduct[]>(this.url)
      .pipe(
        map((products) => {
          const filters = this.filter$.value;
          if (filters.lowToHigh) {
            products = products.sort( (a: IProduct, b: IProduct) => a.price - b.price);
          }
          return products;
        })
      );
  }

  applyFilter(filterConfig) {
    this.filter$.next({ ...this.defaultFilterConfig, ...filterConfig});
  }

  getProductData(): Observable<IProduct[]> {
    console.log('getProductDta executed');
    return this.http.get<IProduct[]>(this.url);
  }

  firstProductsRender() {
    // this.getProducts().subscribe(data => this.productData = data);
    // console.log(this.productData, 'Product Data');
    this.getProducts().subscribe(data => {
      this.productData = data;
      console.log(data, 'Product data');
    });
  }
}
