import { Component, OnInit } from '@angular/core';
import { CartService } from '../../shared/services/cart.service';
import { IProduct } from '../../shared/interfaces/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products: IProduct[] = [];
  private productSub: Subscription;
  totalCartAmount: number;

  constructor(public cartService: CartService) { }

  ngOnInit() {
    this.productSub = this.cartService.getCartUpdateListener()
      .subscribe((products: IProduct[]) => {
        this.products = products;
      });

    this.totalCartAmount = this.cartService.totalPrice;
      // this.cartService.getCartTotal()
  }

}
