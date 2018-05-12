/* Angular */
import { Component, OnInit, EventEmitter } from '@angular/core';

/* 3rd party */
import {
  UploadOutput,
  UploadInput,
  UploadFile,
  humanizeBytes,
  UploaderOptions
} from 'ngx-uploader';

/* Services */
import { ProductsService } from 'angular6/app/_services/products.service';
import { GroupsService } from 'angular6/app/_services/groups.service';
import { BrandsService } from 'angular6/app/_services/brands.service';
import { CategoriesService } from 'angular6/app/_services/categories.service';

@Component({
  selector: 'px-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  options: UploaderOptions;
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;

  constructor(
    private productService: ProductsService,
    private groupService: GroupsService,
    private categoryService: CategoriesService,
    private brandService: BrandsService
  ) {
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
  }

  /* Declarations */
  product: Object;
  currentIndex: number;
  productList: Array<any>;

  filteredList: Array<any>;
  brandList: Array<any>;
  groupList: Array<any>;
  categoryList: Array<any>;

  dialogIsOpen: Boolean = false;
  dialogIsEditing: Boolean = false;
  dialogTitle: String;

  baseUrl: String = 'http://localhost:3000/api';

  createURL(slug) {
    return this.baseUrl + '/products/images/' + slug;
  }
  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue') {
    } else if (
      output.type === 'addedToQueue' &&
      typeof output.file !== 'undefined'
    ) {
      // add file to array when added
      this.files.push(output.file);
    } else if (
      output.type === 'uploading' &&
      typeof output.file !== 'undefined'
    ) {
      // update current data in files array for uploading file
      const index = this.files.findIndex(
        file => typeof output.file !== 'undefined' && file.id === output.file.id
      );
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      // remove file from array when removed
      this.files = this.files.filter(
        (file: UploadFile) => file !== output.file
      );
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
    } else if (output.type === 'drop') {
      this.dragOver = false;
    }
  }

  startUpload(slug): void {
    const event: UploadInput = {
      type: 'uploadAll',
      url: 'http://localhost:3000/api/products/images/' + slug,
      method: 'POST',
      data: { slug: slug }
    };

    this.uploadInput.emit(event);
  }

  /* INIT */
  ngOnInit() {
    this.getGroups();
    this.getBrands();
    this.getProducts();
    this.getCategories();
  }

  /* Dialog  */
  openDialog(editing, singleProduct?, index?) {
    if (editing) {
      this.dialogIsOpen = true;
      this.dialogIsEditing = true;
      this.dialogTitle = 'Ažuriranje proizvoda';
      this.product = Object.assign({}, singleProduct);
      if (index) {
        this.currentIndex = index;
      }
    }
    if (!editing) {
      this.dialogIsOpen = true;
      this.dialogIsEditing = false;
      this.dialogTitle = 'Dodavanje proizvoda';
      this.clearForm();
    }
  }

  closeDialog() {
    this.dialogIsOpen = false;
    this.clearForm();
  }

  clearForm() {
    this.product = {
      name: '',
      slug: '',
      group: { _id: '' },
      brand: { _id: '' },
      category: { _id: '' },
      description: '',
      image: ''
    };
    this.files = [];
  }

  /* Add new product */
  postProduct(product) {
    const image = this.files[0].name || 'no-image';
    const newProduct = product;
    newProduct.image = image;
    this.productService.post(newProduct).subscribe(data => {
      this.closeDialog();
      this.getProducts();
    });
  }

  /* Update product */
  putProduct(product) {
    this.productService.put(product._id, product).subscribe(data => {
      this.closeDialog();
      this.getProducts();
    });
  }

  /* Delete product */
  deleteProduct(id, index) {
    this.productService.delete(id).subscribe(() => {
      this.productList.splice(index, 1);
      this.closeDialog();
    });
  }

  /* Get products + filter */
  getProducts(categoryFilter?, groupFilter?, brandFilter?) {
    let allProducts = [];
    this.productService.get().subscribe(response => {
      allProducts =  [];
      if (categoryFilter) {
        this.productList = allProducts.filter(
          p => p.category._id === categoryFilter
        );
        if (brandFilter) {
          this.productList = this.productList.filter(
            p => p.brand._id === brandFilter
          );
        }
      } else if (groupFilter) {
        this.productList = allProducts.filter(p => p.group._id === groupFilter);
        if (brandFilter) {
          this.productList = this.productList.filter(
            p => p.brand._id === brandFilter
          );
        }
      } else if (brandFilter) {
        this.productList = allProducts.filter(p => p.brand._id === brandFilter);
      } else {
        this.productList = allProducts;
      }
    });
  }

  /* Get groups */
  getGroups() {
    this.groupService.get().subscribe(response => {
    });
  }

  /* Get brands */
  getBrands() {
    this.brandService.get().subscribe(response => {
    });
  }

  /* Get categories */
  getCategories() {
    this.categoryService.get().subscribe(response => {
    });
  }
}
