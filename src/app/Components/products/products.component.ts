import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { Product } from '../../Models/products';
import swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[];
  editingProduct: Product;
  editing = false;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {

      console.log(products);
      this.products = products;
    });
  }

  deleteProduct(event, product) {
    console.log(product);
    this.productService.deleteProduct(product);
    swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2500,
      type: 'success',
      title: 'Delete It'
    });

  }

  editProduct(event, product) {
    this.editingProduct = product;
    if (this.editingProduct.name.trim() !== '' && this.editingProduct.description.trim() !== '' && this.editingProduct.price > 0) {
      this.editing = !this.editing;
    } else {
      this.productService.warningAlert();
    }

  }

  updateProduct() {
    if (this.editingProduct.name.trim() !== '' && this.editingProduct.description.trim() !== '' && this.editingProduct.price > 0) {
      this.productService.updateProduct(this.editingProduct);
      this.productService.updateAlert();
      this.editingProduct = {} as Product;
      this.editing = false;
      swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2500,
        type: 'success',
        title: 'Updated it'
      });

    } else {
      this.productService.warningAlert();
    }

  }

}
