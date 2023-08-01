import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  // templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  constructor(private productService: ProductService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }
  listProducts() {
    // check id id parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      // get the id parameter, convert string to number using the + symbol, the '!' is asseration operator to tell the compiler error.
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    else{
      this.currentCategoryId = 1;
    }
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => { 
        this.products = data;
  }
    )

}
}
