/* Angular */
import { Component, OnInit, ViewChild } from '@angular/core';

/* Services */
import { CategoriesService } from '../../_services/categories.service';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
    selector: 'px-categories',
    templateUrl: './categories.component.html'
})
export class CategoriesComponent implements OnInit {

    /* Constructor */
    constructor(
        private categoryService: CategoriesService
    ) {}

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

    actualWidth = window.innerWidth;
    categoryList = [];
    currentIndex: number;
    dataSource;

    isAddDialogOpen: boolean;
    isDialogEditing: boolean;
    isImageDialogOpen: boolean;
    dialogTitle;

    imageFile: File;
    imagePreview;
    imageID;
    imageindex: number;

    baseUrl: String = 'http://localhost:3000/api';

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

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

    openImageDialog(event, index) {
        event.stopPropagation();
        this.isImageDialogOpen = true;
        this.imageID = this.categoryList[index]._id;
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
        this.categoryService.post(category).subscribe(
            (response) => {
                this.closeDialog(event);
                this.getCategories();
            },
            (error) => {
            }
        );
    }

    /* Update category */
    putCategory(category, event) {
        this.categoryService.put(category._id, category).subscribe(
            (response) => {
                this.closeDialog(event);
                this.getCategories();
            }
        );
    }

    /* Delete category */
    deleteCategory(id, index, event) {
        this.categoryService.delete(id).subscribe(
            (response) => {
                this.categoryList.splice(index, 1);
                this.closeDialog(event);
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

        const thisCategory = this.categoryList[this.imageindex];
        const groupId = thisCategory._id;
        thisCategory.image = filename;

        this.categoryService.put(groupId, thisCategory).subscribe(
            (response) => {
                this.categoryService.postImage(this.imageID, formData).subscribe(
                    (response2) => {
                        this.closeImageDialog();
                        this.getCategories();
                    }
                );
            });
    }
}
