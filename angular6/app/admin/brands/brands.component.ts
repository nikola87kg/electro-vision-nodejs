/* Angular */
import {
    Component,
    OnInit,
    EventEmitter,
    ViewChild
} from '@angular/core';

/* 3rd party */
import {
    UploadOutput,
    UploadInput,
    UploadFile,
    humanizeBytes,
    UploaderOptions
} from 'ngx-uploader';

/* Services */
import {
    BrandsService
} from '../../_services/brands.service';
import { MatSort, MatPaginator, MatTableDataSource } from '../../../../node_modules/@angular/material';

/* Decorator */
@Component({
    selector: 'px-brands',
    templateUrl: './brands.component.html'
})

/* Class */
export class BrandsComponent implements OnInit {
    /* Photo Uploader */
    options: UploaderOptions;
    formData: FormData;
    files: UploadFile[];
    uploadInput: EventEmitter<UploadInput>;
    humanizeBytes: Function;
    dragOver: boolean;
    actualWidth = window.innerWidth;

    /* Constructor */
    constructor(
        private brandService: BrandsService
    ) {
        this.files = []; // local uploading files array
        this.uploadInput = new EventEmitter<UploadInput>();
        this.humanizeBytes = humanizeBytes;
    }

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

    brandList = [];
    currentIndex: number;
    dataSource;

    isAddDialogOpen = false;
    isImageDialogOpen = false;
    imageInDialog = '';
    imageID = '';
    imageindex = 0;
    isDialogEditing = false;
    dialogTitle;

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

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

    startUpload(response): void {
        const imageData: UploadInput = {
            type: 'uploadAll',
            url: this.baseUrl + '/brands/images/' + response.id,
            method: 'POST',
            data: { id: response.id }
        };
        this.uploadInput.emit(imageData);
        setTimeout(() => {
            this.getBrands();
        }, 0);
    }

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

    openImageDialog(index) {
        this.isImageDialogOpen = true;
        this.imageInDialog = this.brandList[index].image;
        this.imageID = this.brandList[index].id;
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

    /* Update image */
    postImage() {
        let response: any = {
            title: ''
        };
        const total = this.files.length - 1;
        const image = this.files[total].name || 'no-image';
        const thisBrand = this.brandList[this.imageindex];
        thisBrand.image = image;
        this.brandService.put(thisBrand._id, thisBrand).subscribe(
            (data) => {
                this.closeImageDialog();
                this.startUpload(data);
                this.getBrands();
                response = data;
            },
            (error) => {
                response = error;
            }
        );
    }

    /* Delete Brand */
    deleteBrand(id, index, event) {
        let response: any = {
            title: ''
        };
        this.brandService.delete(id).subscribe(
            (data) => {
                this.brandList.splice(index, 1);
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
}
