/* Angular */
import { Component, OnInit, ViewChild } from '@angular/core';

/* Services */
import { BrandsService } from '../../_services/brands.service';

/* Material */
import { MatSort, MatPaginator, MatTableDataSource } from '../../../../node_modules/@angular/material';

/* Decorator */
@Component({
    selector: 'px-brands',
    templateUrl: './brands.component.html'
})

export class BrandsComponent implements OnInit {

    /* Constructor */
    constructor(
        private brandService: BrandsService
    ) {}

    /* Declarations */
    brand = {
        name: '',
        slug: '',
        description: '',
        image: ''
    };

    displayedColumns: string[] = [
        'position',
        'image',
        'name',
        'created'
    ];

    actualWidth = window.innerWidth;
    brandList = [];
    currentIndex: number;
    dataSource;

    isAddDialogOpen: boolean;
    isImageDialogOpen: boolean;
    isDialogEditing: boolean;
    dialogTitle: string;

    imageFile: File;
    imagePreview;
    imageID;
    imageindex: number;

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    baseUrl: String = 'http://localhost:3000/api';


    /* INIT */
    ngOnInit() {
        this.getBrands();
    }

    /* Dialog  */
    openDialog(editing, singleBrand?, index?) {
        if (editing) {
            this.isAddDialogOpen = true;
            this.isDialogEditing = true;
            this.dialogTitle = 'Ažuriranje brenda';
            this.brand = Object.assign({}, singleBrand);
            if (index) {
                this.currentIndex = index;
            }
        }
        if (!editing) {
            this.isAddDialogOpen = true;
            this.isDialogEditing = false;
            this.dialogTitle = 'Dodavanje brenda';
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
        this.isImageDialogOpen = true;
        this.imageID = this.brandList[index]._id;
        this.imageindex = index;
        this.dialogTitle = 'Dodavanje slike';
    }

    closeImageDialog() {
        this.isImageDialogOpen = false;
    }

    clearForm() {
        this.brand = {
            name: '',
            slug: '',
            description: '',
            image: ''
        };
    }

    /* Add new brand */
    postBrand(brand, event) {
        this.brandService.post(brand).subscribe(
            (response) => {
                this.closeDialog(event);
                this.getBrands();
            }
        );
    }

    /* Update brand */
    putBrand(brand, event) {
        this.brandService.put(brand._id, brand).subscribe(
            (data) => {
                this.closeDialog(event);
                this.getBrands();
            }
        );
    }

    /* Delete Brand */
    deleteBrand(id, event) {
        let response: any = {
            title: ''
        };
        this.brandService.delete(id).subscribe(
            (data) => {
                this.brandList.splice(this.currentIndex, 1);
                this.dataSource = new MatTableDataSource(this.brandList);
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
                this.closeDialog(event);
                response = data;
            },
            (error) => {
                response = error;
            }
        );
    }

    /* Get brand */
    getBrands() {
        this.brandService.get().subscribe(response => {
            this.brandList = response.object;
            this.dataSource = new MatTableDataSource(this.brandList);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
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
        const formData = new FormData();
        const filename = this.imageFile.name ;
        formData.append('image', this.imageFile, filename);

        const thisBrand = this.brandList[this.imageindex];
        const brandId = thisBrand._id;
        thisBrand.image = filename;

        this.brandService.put(brandId, thisBrand).subscribe(
            (response) => {
                this.brandService.postImage(this.imageID, formData).subscribe(
                    (response2) => {
                        this.closeImageDialog();
                        this.getBrands();
                    }
                );
            });
    }
}
