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
import { CategoriesService } from 'angular6/app/_services/categories.service';

@Component({
    selector: 'px-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
    /* Photo Uploader */
    options: UploaderOptions;
    formData: FormData;
    files: UploadFile[];
    uploadInput: EventEmitter<UploadInput>;
    humanizeBytes: Function;
    dragOver: boolean;

    /* Constructor */
    constructor(private categoryService: CategoriesService) {
        this.files = []; // local uploading files array
        this.uploadInput = new EventEmitter<UploadInput>();
        this.humanizeBytes = humanizeBytes;
    }

    /* Declarations */
    category = {
        name: '',
        slug: '',
        description: '',
        image: ''
    };

    categoryList = [];
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

    startUpload(obj): void {
        const imageData: UploadInput = {
            type: 'uploadAll',
            url: this.baseUrl + '/categories/images/' + obj.id,
            method: 'POST',
            data: { id: obj.id }
        };
        this.uploadInput.emit(imageData);
        setTimeout(() => {
            this.getCategories();
        }, 0);
    }

    /* INIT */
    ngOnInit() {
        this.getCategories();
    }

    /* Dialog  */
    openDialog(editing, singleCategory?, index?) {
        if (editing) {
            this.dialogIsOpen = true;
            this.dialogIsEditing = true;
            this.dialogTitle = 'Ažuriranje kategorije';
            this.category = Object.assign({}, singleCategory);
            if (index) {
                this.currentIndex = index;
            }
        }
        if (!editing) {
            this.dialogIsOpen = true;
            this.dialogIsEditing = false;
            this.dialogTitle = 'Dodavanje kategorije';
            this.clearForm();
        }
    }

    closeDialog() {
        this.dialogIsOpen = false;
        this.clearForm();
    }

    openImageDialog(index) {
        this.imageDialogIsOpen = true;
        this.imageInDialog = this.categoryList[index].image;
        this.imageID = this.categoryList[index].id;
        this.imageindex = index;
        this.dialogTitle = 'Dodavanje slike';
    }

    closeImageDialog() {
        this.imageDialogIsOpen = false;
    }

    clearForm() {
        this.category = {
            name: '',
            slug: '',
            description: '',
            image: ''
        };
    }
    /* Add new category */
    postCategory(category) {
        this.categoryService.post(category).subscribe(response => {
            this.closeDialog();
            this.getCategories();
        });
    }

    /* Update category */
    putCategory(category) {
        this.categoryService.put(category._id, category).subscribe(data => {
            this.closeDialog();
            this.getCategories();
        });
    }

    /* Update image */
    postImage() {
        const total = this.files.length - 1;
        const image = this.files[total].name || 'no-image';
        const thisCategory = this.categoryList[this.imageindex];
        thisCategory.image = image;
        this.categoryService
            .put(thisCategory._id, thisCategory)
            .subscribe(data => {
                this.closeImageDialog();
                this.startUpload(data);
                this.getCategories();
            });
    }

    /* Delete category */
    deleteCategory(id, index) {
        this.categoryService.delete(id).subscribe(() => {
            this.categoryList.splice(index, 1);
            this.closeDialog();
        });
    }

    /* Get category */
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
