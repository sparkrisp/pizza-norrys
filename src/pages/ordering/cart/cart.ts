import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {CartService} from '../../../services/cart_service';
import {APIService} from '../../../services/api_service';

/**
 * Cart page component
 */
@IonicPage()
@Component({
  templateUrl: 'cart.html'
})
export class CartPage {
  public items;
  public loggedIn = false;
  public mediaMas:boolean;

  constructor(
    private cart: CartService,
    private navCtrl: NavController,
    private apiService: APIService
  ) {
    this.items = cart.getItems();
    cart.itemsCount$.subscribe((v) => {
      this.items == cart.getItems();
    });
    this.loggedIn = this.apiService.isLoggedIn();
  }

  ionViewWillEnter() {
    this.items = this.cart.getItems();
   // this.mediaMas = false;
  }

  increaseCart(item): any {
    if (item.product.category_id == 4525){
      this.cart.setItemCount(item.product, item.count + 0.5);
    }else{
      this.cart.setItemCount(item.product, item.count + 1);
    }
}

  mediaMasCart(item): any {
  // alert(item.product.category_id);
    if (item.count == 0 || item.count == 0.5 || item.count == -0.5 || item.count == -1) {
      this.cart.removeItem(item);
    }  
    if (this.mediaMas) {
      this.cart.setItemCount(item.product, -2);
    }else{
      this.cart.setItemCount(item.product, -3);
    }
    
  }

  decreaseCart(item): any {
    if (item.count == 0 || item.count == -0.5 || item.count == -1) {
      this.cart.removeItem(item);
    }
    else {
      if (item.product.category_id == 4525){
        this.cart.setItemCount(item.product, item.count - 0.5);
      }else{
        this.cart.setItemCount(item.product, item.count - 1);
      }
    }
  }

  showOrderModal() {
    console.log('order');
    this.navCtrl.push('OrderPage');
  }

  cartPrice() {
    let result = 0;
    this.items.forEach((item) => {
      result = result + item.product.price * item.count;
    });
    return result;
  }
}
