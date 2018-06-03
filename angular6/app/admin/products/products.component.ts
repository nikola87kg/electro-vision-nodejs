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
    /* Photo Uploader */
    options: UploaderOptions;
    formData: FormData;
    files: UploadFile[];
    uploadInput: EventEmitter<UploadInput>;
    humanizeBytes: Function;
    dragOver: boolean;

    /* Constructor */
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
    product = {
        name: '',
        slug: '',
        description: '',
        category: { _id: '', name: '' },
        group: { _id: '', name: '' },
        brand: { _id: '', name: '' },
        image: ''
    };

    currentIndex: number;
    productList = [];

    filteredList = [];
    brandList = [];
    groupList = [];
    categoryList = [];

    dialogIsOpen = false;
    imageDialogIsOpen = false;
    imageInDialog = '';
    imageID = '';
    imageindex = 0;
    dialogIsEditing = false;
    dialogTitle;

    baseUrl: String = 'http://localhost:3000/api';

    /* Upload images */
    onUploadOutput(output: UploadOutput): void {
        if (output.type === 'allAddedToQueue') {
        } else if (
            output.type === 'addedToQueue' &&
            typeof output.file !== 'undefined'
        ) {
            this.files.push(output.file);
        } else if (
            output.type === 'uploading' &&
            typeof output.file !== 'undefined'
        ) {
            const index = this.files.findIndex(
                file =>
                    typeof output.file !== 'undefined' &&
                    file.id === output.file.id
            );
            this.files[index] = output.file;
        } else if (output.type === 'removed') {
            this.files = this.files.filter(
                (file: UploadFile) => file !== output.file
            );
        }
    }

    startUpload(obj): void {
        const imageData: UploadInput = {
            type: 'uploadAll',
            url: this.baseUrl + '/products/images/' + obj.id,
            method: 'POST',
            data: { id: obj.id }
        };
        this.uploadInput.emit(imageData);
        setTimeout(() => {
            this.getProducts();
        }, 0);
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

    openImageDialog(index) {
        this.imageDialogIsOpen = true;
        this.imageInDialog = this.productList[index].image;
        this.imageID = this.productList[index].id;
        this.imageindex = index;
        this.dialogTitle = 'Dodavanje slike';
    }

    closeImageDialog() {
        this.imageDialogIsOpen = false;
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
        this.files = [];
    }

    /* Add new product */
    postProduct(product) {
        this.productService.post(product).subscribe(data => {
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

    /* Update image */
    postImage() {
        const total = this.files.length - 1;
        const image = this.files[total].name || 'no-image';
        const thisProduct = this.productList[this.imageindex];
        thisProduct.image = image;
        this.productService
            .put(thisProduct._id, thisProduct)
            .subscribe(data => {
                this.closeImageDialog();
                this.startUpload(data);
                this.getGroups();
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
        this.productService.get().subscribe(response => {
            let productsResponse: any = {
                message: '',
                object: {}
            };
            productsResponse = response;
            if (categoryFilter) {
                this.productList = productsResponse.object.filter(
                    p => p.category._id === categoryFilter
                );
                if (brandFilter) {
                    this.productList = this.productList.filter(
                        p => p.brand._id === brandFilter
                    );
                }
            } else if (groupFilter) {
                this.productList = productsResponse.object.filter(
                    p => p.group._id === groupFilter
                );
                if (brandFilter) {
                    this.productList = this.productList.filter(
                        p => p.brand._id === brandFilter
                    );
                }
            } else if (brandFilter) {
                this.productList = productsResponse.object.filter(
                    p => p.brand._id === brandFilter
                );
            } else {
                this.productList = productsResponse.object;
            }
        });
    }

    /* Get brands */
    getBrands() {
        this.brandService.get().subscribe(result => {
            let brandsResponse: any = {
                message: '',
                object: {}
            };
            brandsResponse = result;
            this.brandList = brandsResponse.object;
        });
    }

    /* Get groups */
    getGroups() {
        this.groupService.get().subscribe(result => {
            let groupResponse: any = {
                message: '',
                object: {}
            };
            groupResponse = result;
            this.groupList = groupResponse.object;
        });
    }

    /* Get categories */
    getCategories() {
        this.categoryService.get().subscribe(result => {
            let categoriesResponse: any = {
                message: '',
                object: {}
            };
            categoriesResponse = result;
            this.categoryList = categoriesResponse.object;
        });
    }
}
