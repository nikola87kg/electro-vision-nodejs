/* Angular */
import { Component, OnInit, ViewChild } from '@angular/core';

/* Services */
import { ProductsService } from '../../_services/products.service';
import { GroupsService } from '../../_services/groups.service';
import { BrandsService } from '../../_services/brands.service';
import { CategoriesService } from '../../_services/categories.service';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';

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
        private brandService: BrandsService
    ) {
    }

    /* Declarations */
    product = {
        name: '',
        slug: '',
        description: '',
        category: { _id: '', name: '' },
        group: { _id: '', name: '' },
        brand: { _id: '', name: '' },
        image: ''
    };

    displayedColumns: string[] = [
        'position',
        'image',
        'name',
        'category',
        'group',
        'brand',
        'created'
    ];

    actualWidth = window.innerWidth;
    currentIndex: number;
    productList = [];
    dataSource;

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    filteredList = [];
    brandList = [];
    groupList = [];
    categoryList = [];

    isAddDialogOpen = false;
    isDialogEditing = false;
    dialogTitle;

    imageInDialog = '';
    isImageDialogOpen = false;
    imageFile;
    imagePreview;
    imageID;
    imageindex = 0;

    baseUrl: String = 'http://localhost:3000/api';
    // url: this.baseUrl + '/products/images/{{id}},


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
        this.imageID = this.productList[index]._id;
        console.log(1, this.imageID);

        this.imageindex = index;
        this.isImageDialogOpen = true;
        this.imageInDialog = this.productList[index].image;
        this.dialogTitle = 'Dodavanje slike';
    }

    closeImageDialog() {
        this.isImageDialogOpen = false;
    }

    clearForm() {
        this.product = {
            name: '',
            slug: '',
            description: '',
            category: { _id: '', name: '' },
            group: { _id: '', name: '' },
            brand: { _id: '', name: '' },
            image: ''
        };
    }

    /* Add new product */
    postProduct(product, event) {
        this.productService.post(product).subscribe(
            (response) => {
                this.closeDialog(event);
                this.getProducts();
            }
        );
    }

    /* Update product */
    putProduct(product, event) {
        this.productService.put(product._id, product).subscribe(
            data => {
                this.closeDialog(event);
                this.getProducts();
            }
        );
    }

    /* Delete product */
    deleteProduct(id, index, event) {
        let response: any = {
            title: ''
        };
        this.productService.delete(id).subscribe(
            (data) => {
                this.productList.splice(index, 1);
                this.closeDialog(event);
                response = data;
            },
            (error) => {
                response = error;
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

    /* Screens */
    public smallScreen() {
        if (this.actualWidth < 768) {
            return true;
        }
        return false;
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
        const filename = this.imageFile.name || 'no-image';
        const thisProduct = this.productList[this.imageindex];
        thisProduct.image = filename;
        this.productService.put(thisProduct._id, thisProduct).subscribe(
            (response) => {
                this.productService.postImage(this.imageID, this.imageFile).subscribe(
                    (response2) => {
                        this.closeImageDialog();
                        this.getProducts();
                    }
                );
            });
    }

}



