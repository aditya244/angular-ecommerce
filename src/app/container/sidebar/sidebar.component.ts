import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';
import { IProduct } from '../../shared/interfaces/product';
import { JsoncallService } from 'src/app/shared/services/jsoncall.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Output() checkChange = new EventEmitter<any>();

  constructor(public jsonService: JsoncallService) { }

  ngOnInit() {

  }

  sortProductsByPrice($event) {
    this.jsonService.applyFilter({lowToHigh: true});
  }

}
