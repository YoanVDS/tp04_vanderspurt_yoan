import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { Product } from '../product';
import { ProductsService } from '../products-service.service';

@Component({
  selector: 'app-products-search-bar',
  templateUrl: './products-search-bar.component.html',
  styleUrls: ['./products-search-bar.component.css']
})
export class ProductsSearchBarComponent implements OnInit {
  searchForm = new FormGroup({
    searchTerm: new FormControl(),
    criteria: new FormControl()
  });

  constructor(private productsService: ProductsService) { }

  productsList$: Observable<Array<Product>>;

  ngOnInit() {
    this.productsList$ = this.productsService.getProducts();
    this.setDefaultValues();
    this.onValueChanges();
  }

  setDefaultValues() {
    this.searchForm.patchValue({ criteria: 'refSearch'});
 }


  onValueChanges(){
    this.searchForm.valueChanges.subscribe(val =>{
      let newList: Promise<Array<Product>>;
      switch(val.criteria){
        case "refSearch": 
           if(val.searchTerm == '') break;
           newList = this.productsService.getProducts().toPromise()
               .then(list => list.filter(product => product.ref.toLowerCase().startsWith(val.searchTerm)));            
            break;
        case "labelSearch": 
           if(val.searchTerm == '') break;
           newList = this.productsService.getProducts().toPromise()
              .then(list => list.filter(product => product.label.toLowerCase().startsWith(val.searchTerm)));            
            break;
        case "less100Search":
            newList = this.productsService.getProducts().toPromise()
              .then(list => list.filter(product => product.price <= 100));
            break;
        case "less100Search":
            newList = this.productsService.getProducts().toPromise()
              .then(list => list.filter(product => product.price > 100));
            break;
        default: break;
      }
      if(newList == null) this.productsList$ = null;
      else this.productsList$ = from(newList);
    });
  }
}
