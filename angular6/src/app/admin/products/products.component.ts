/* Angular */
import { Component, OnInit, ViewChild } from '@angular/core';

/* Services */
import { ProductsService } from '../../_services/products.service';
import { GroupsService } from '../../_services/groups.service';
import { BrandsService } from '../../_services/brands.service';
import { CategoriesService } from '../../_services/categories.service';

/* Material */
import { MatSort, MatTableDataSource, MatPaginator, MatSnackBar } from '@angular/material';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { GlobalService } from '../../_services/global.service';
import * as slugify from '../../../../node_modules/speakingurl/speakingurl.min.js';

/* Interfaces */
import { ProductModel, ProductColumns, BrandModel, GroupModel, CategoryModel } from '../admin.interfaces';

@Component({
    selector: 'px-products',
    templateUrl: './products.component.html'
})

export class ProductsComponent implements OnInit {

    /* Constructor */
    constructor(
        private productService: ProductsService,
        private groupService: GroupsService,
        private categoryService: CategoriesService,
        private brandService: BrandsService,
        public snackBar: MatSnackBar,
        public global: GlobalService
    ) { }

    product: ProductModel;
    displayedColumns = ProductColumns;

    windowSize;
    currentIndex: number;
    productList: Array<ProductModel> ;
    dataSource;

    brandList: Array<BrandModel>;
    groupList: Array<GroupModel>;
    categoryList: Array<CategoryModel>;

    isAddDialogOpen: boolean;
    isDialogEditing: boolean;
    isImageDialogOpen: boolean;
    dialogTitle;

    imageFile: File;
    imagePreview;
    imageID;
    imageindex: number;

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    /* INIT */
    ngOnInit() {
        this.global.windowSize.subscribe(
            (result => this.windowSize = result)
        );
        this.getGroups();
        this.getBrands();
        this.getProducts();
        this.getCategories();

    }

    /* Dialog  */
    openDialog(editing, singleProduct?, index?) {
        if (editing) {
            this.isAddDialogOpen = true;
            this.isDialogEditing = true;
            this.dialogTitle = 'Ažuriranje proizvoda';
            this.product = Object.assign({}, singleProduct);
            if (index) {
                this.currentIndex = index;
            }
        }
        if (!editing) {
            this.isAddDialogOpen = true;
            this.isDialogEditing = false;
            this.dialogTitle = 'Dodavanje proizvoda';
            this.clearForm();
        }
    }

    closeDialog(event) {
        event.stopPropagation();
    this.isAddDialogOpen = false;
        this.clearForm();
    }

    openImageDialog(event, index) {
        event.stopPropagation();
        this.imageFile = null;
        this.imagePreview = null;
        this.imageID = this.productList[index]._id;
        this.imageindex = index;
        this.isImageDialogOpen = true;
        this.dialogTitle = 'Dodavanje slike';
    }

    closeImageDialog() {
        this.isImageDialogOpen = false;
    }

    clearForm() {
        this.product = {
            _id: '',
            name: '',
            vip: false,
            slug: '',
            description: '',
            category: { _id: '', name: '' },
            group: { _id: '', name: '' },
            brand: { _id: '', name: '' },
            image: '',
            createdAt: null
        };
    }

    fixSlug(text: string) {
        const options = { maintainCase: false, separator: '-' };
        const mySlug = slugify.createSlug(options);
        const slug = mySlug(text);
        return slug;
    }

    /* Add new product */
    postProduct(product, event) {
        const fixedSlug = this.fixSlug(product.slug);
        product.slug = fixedSlug;
        this.productService.post(product).subscribe(
            (response) => {
                this.closeDialog(event);
                this.getProducts();
                this.openSnackBar({
                    action: 'create',
                    type: 'product'
                });
            }
        );
    }

    /* Update product */
    putProduct(product, event) {
        const fixedSlug = this.fixSlug(product.slug);
        product.slug = fixedSlug;
        this.productService.put(product._id, product).subscribe(
            (response) => {
                this.closeDialog(event);
                this.getProducts();
                this.openSnackBar({
                    action: 'update',
                    type: 'product'
                });
            }
        );
    }

    /* Delete product */
    deleteProduct(id, event) {
        this.productService.delete(id).subscribe(
            (response) => {
                this.productList.splice(this.currentIndex, 1);
                this.dataSource = new MatTableDataSource(this.productList);
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
                this.closeDialog(event);
                this.openSnackBar({
                    action: 'delete',
                    type: 'product'
                });
            }
        );
    }

    /* Get products + filter */
    getProducts(categoryFilter?, groupFilter?, brandFilter?) {
        this.productService.get().subscribe(
            (response) => {
                if (categoryFilter) {
                    this.productList = response.object.filter(
                        p => p.category._id === categoryFilter
                    );
                    if (brandFilter) {
                        this.productList = this.productList.filter(
                            p => p.brand._id === brandFilter
                        );
                    }
                } else if (groupFilter) {
                    this.productList = response.object.filter(
                        p => p.group._id === groupFilter
                    );
                    if (brandFilter) {
                        this.productList = this.productList.filter(
                            p => p.brand._id === brandFilter
                        );
                    }
                } else if (brandFilter) {
                    this.productList = response.object.filter(
                        p => p.brand._id === brandFilter
                    );
                } else {
                    this.productList = response.object;
                }
                this.dataSource = new MatTableDataSource(this.productList);
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;

            }
        );
    }

    /* Get brands */
    getBrands() {
        this.brandService.get().subscribe(response => {
            this.brandList = response.object;
        });
    }

    /* Get groups */
    getGroups() {
        this.groupService.get().subscribe(response => {
            this.groupList = response.object;
        });
    }

    /* Get categories */
    getCategories() {
        this.categoryService.get().subscribe(response => {
            this.categoryList = response.object;
        });
    }

    /* Image upload */

    onImagePicked(event: Event) {
        const file = (event.target as HTMLInputElement).files[0];
        this.imageFile = file;
        const reader = new FileReader();
        reader.onload = () => {
            this.imagePreview = reader.result;
        };
        reader.readAsDataURL(file);
    }

    postImage() {
        const formData = new FormData();
        const filename = this.imageFile.name ;
        formData.append('image', this.imageFile, filename);

        const thisProduct = this.productList[this.imageindex];
        const productId = thisProduct._id;
        thisProduct.image = filename;

        this.productService.put(productId, thisProduct).subscribe(
            (response) => {
                this.productService.postImage(this.imageID, formData).subscribe(
                    (response2) => {
                        this.closeImageDialog();
                        this.getProducts();
                        this.openSnackBar({
                            action: 'update2',
                            type: 'image'
                        });
                    }
                );
            });
    }

    /* Snackbar */
    openSnackBar(object) {
      this.snackBar.openFromComponent(SnackbarComponent, {
        duration: 2000,
        data: object,
      });
    }
}

