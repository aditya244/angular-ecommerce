import { Component, OnInit, Input } from '@angular/core';
import { JsoncallService } from '../../shared/services/jsoncall.service';
import { IProduct } from '../../shared/interfaces/product';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  sortedData: IProduct[] = [];
  productData: any = [];

  constructor(public jsoncallService: JsoncallService) { }

  ngOnInit() {
    this.jsoncallService.getFilters
    .pipe(
      switchMap(() => this.jsoncallService.getProducts())
    )
    .subscribe((product) => {
      this.productData = product;
    });
  }
}
