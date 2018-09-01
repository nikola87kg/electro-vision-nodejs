/* Angular */
import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';

/* 3rd party */
import {
    UploadOutput,
    UploadInput,
    UploadFile,
    humanizeBytes,
    UploaderOptions
} from 'ngx-uploader';

/* Services */
import { CategoriesService } from '../../_services/categories.service';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
    selector: 'px-categories',
    templateUrl: './categories.component.html'
})
export class CategoriesComponent implements OnInit {
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
        private categoryService: CategoriesService
    ) {
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

    displayedColumns: string[] = [
        'position',
        'image',
        'name',
        'created'
    ];

    dataSource;
    categoryList = [];
    currentIndex: number;

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
            this.isAddDialogOpen = true;
            this.isDialogEditing = true;
            this.dialogTitle = 'Ažuriranje kategorije';
            this.category = Object.assign({}, singleCategory);
            if (index) {
                this.currentIndex = index;
            }
        }
        if (!editing) {
            this.isAddDialogOpen = true;
            this.isDialogEditing = false;
            this.dialogTitle = 'Dodavanje kategorije';
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
        this.imageInDialog = this.categoryList[index].image;
        this.imageID = this.categoryList[index].id;
        this.imageindex = index;
        this.dialogTitle = 'Dodavanje slike';
    }

    closeImageDialog() {
        this.isImageDialogOpen = false;
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
    postCategory(category, event) {
        let response: any = {
            title: ''
        };
        this.categoryService.post(category).subscribe(
            (data) => {
                this.closeDialog(event);
                this.getCategories();
                response = data;
            },
            (error) => {
                response = error;
            }
        );
    }

    /* Update category */
    putCategory(category, event) {
        let response: any = {
            title: ''
        };
        this.categoryService.put(category._id, category).subscribe(
            (data) => {
                this.closeDialog(event);
                this.getCategories();
                response = data;
            },
            (error) => {
                response = error;
            }
        );
    }

    /* Update image */
    postImage() {
        const total = this.files.length - 1;
        const image = this.files[total].name || 'no-image';
        const thisCategory = this.categoryList[this.imageindex];
        thisCategory.image = image;
        this.categoryService.put(thisCategory._id, thisCategory).subscribe(
            (data) => {
                this.closeImageDialog();
                this.startUpload(data);
                this.getCategories();
            }
        );
    }

    /* Delete category */
    deleteCategory(id, index, event) {
        let response: any = {
            title: ''
        };
        this.categoryService.delete(id).subscribe(
            (data) => {
                this.categoryList.splice(index, 1);
                this.closeDialog(event);
                response = data;
            },
            (error) => {
                response = error;
            }
        );
    }

    /* Get category */
    getCategories() {
        this.categoryService.get().subscribe(response => {
            this.categoryList = response.object;
            this.dataSource = new MatTableDataSource(this.categoryList);
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
