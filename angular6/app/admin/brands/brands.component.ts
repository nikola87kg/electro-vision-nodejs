/* Angular */
import {
    Component,
    OnInit,
    EventEmitter
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

/* Decorator */
@Component({
    selector: 'px-brands',
    templateUrl: './brands.component.html',
    styleUrls: ['./brands.component.scss']
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

    brandList = [];
    currentIndex: number;

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

    startUpload(response): void {
        const imageData: UploadInput = {
            type: 'uploadAll',
            url: this.baseUrl + '/brands/images/' + response.object._id,
            method: 'POST',
            data: { id: response.object._id }
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
            this.dialogIsOpen = true;
            this.dialogIsEditing = true;
            this.dialogTitle = 'Ažuriranje brenda';
            this.brand = Object.assign({}, singleBrand);
            if (index) {
                this.currentIndex = index;
            }
        }
        if (!editing) {
            this.dialogIsOpen = true;
            this.dialogIsEditing = false;
            this.dialogTitle = 'Dodavanje brenda';
            this.clearForm();
        }
    }

    closeDialog() {
        this.dialogIsOpen = false;
        this.clearForm();
    }

    openImageDialog(index) {
        this.imageDialogIsOpen = true;
        this.imageInDialog = this.brandList[index].image;
        this.imageID = this.brandList[index].id;
        this.imageindex = index;
        this.dialogTitle = 'Dodavanje slike';
    }

    closeImageDialog() {
        this.imageDialogIsOpen = false;
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
    postBrand(brand) {
        let response: any = {
            title: ''
        };
        this.brandService.post(brand).subscribe(
            (data) => {
                this.closeDialog();
                this.getBrands();
                response = data;
            },
            (error) => {
                response = error;
            }
        );
    }

    /* Update brand */
    putBrand(brand) {
        let response: any = {
            title: ''
        };
        this.brandService.put(brand._id, brand).subscribe(
            (data) => {
                this.closeDialog();
                this.getBrands();
                response = data;
            },
            (error) => {
                response = error;
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
    deleteBrand(id, index) {
        let response: any = {
            title: ''
        };
        this.brandService.delete(id).subscribe(
            (data) => {
                this.brandList.splice(index, 1);
                this.closeDialog();
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
        });
    }
}
