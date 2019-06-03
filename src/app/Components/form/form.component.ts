import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { Product } from '../../Models/products';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  product = {} as Product;

  constructor(private productService: ProductService) { }

  ngOnInit() {
  }

  addProduct() {
    console.log(this.product);
    if (this.product.name !== '' && this.product.description !== '' && this.product.price > 0) {
      this.productService.addProduct(this.product);
      this.product = {} as Product;
      this.productService.successAlert();
    } else {
     this.productService.warningAlert();
    }

  }

}
