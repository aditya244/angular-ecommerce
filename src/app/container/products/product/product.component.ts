import { Component, OnInit, Input } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(public cartService: CartService) { }
  @Input() productTitle: string;
  @Input() productPrice: number;
  @Input() productCategory: string;
  @Input() productId: number;
  @Input() productImgUrl: string;

  // declare a variable for quantity
  // declare methods for increment and decrement
  // pass the quantity data to cart service
  // add a new property to the product object and increase the value upon click of add to cart, set the default value to be one
  // multiply the price with the quanity of that product


  ngOnInit() {
  }

}
