import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Product } from '../Models/products';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  produtcsCollection: AngularFirestoreCollection<Product>;
  products: Observable<Product[]>;
  productDoc: AngularFirestoreDocument<Product>;

  constructor(private db: AngularFirestore) {
    // this.products = this.db.collection('products').valueChanges();
    this.produtcsCollection = this.db.collection('products');
    this.products = this.produtcsCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {

        const data = a.payload.doc.data() as Product;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  getProducts() {
    return this.products;
  }

  addProduct(product: Product) {
    this.produtcsCollection.add(product);
  }

  deleteProduct(product: Product) {
    this.productDoc = this.db.doc(`products/${product.id}`);
    this.productDoc.delete();
  }

  updateProduct(product: Product) {
    this.productDoc = this.db.doc(`products/${product.id}`);
    this.productDoc.update(product);
  }

  warningAlert() {
    swal.fire({
      title: 'Error!',
      text: 'Pls Enter the Fields!',
      type: 'error'
    });
  }

  successAlert() {
    swal.fire({
      title: 'Good Job!',
      text: 'You Add a new Product!',
      type: 'success'
    });
  }

  deleteWarning() {
    swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this imaginary file!',
      type: 'warning',
      confirmButtonText: 'Yes, I Want to delete it'
    });
  }

  updateAlert() {
    swal.fire({
      title: 'Good Job!',
      text: 'You Updated a new Product!',
      type: 'success'
    });
  }
}
