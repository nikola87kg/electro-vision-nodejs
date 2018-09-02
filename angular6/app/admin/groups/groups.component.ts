/* Angular */
import { Component, OnInit, ViewChild } from '@angular/core';

/* Services */
import { GroupsService } from '../../_services/groups.service';
import { CategoriesService } from '../../_services/categories.service';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
    selector: 'px-groups',
    templateUrl: './groups.component.html'
})

export class GroupsComponent implements OnInit {

    /* Constructor */
    constructor(
        private groupService: GroupsService,
        private categoryService: CategoriesService,
    ) {}

    /* Declarations */
    subcategory = {
        name: '',
        slug: '',
        description: '',
        category: { _id: '', name: '' },
        image: ''
    };

    displayedColumns: string[] = [
        'position',
        'image',
        'name',
        'category',
        'created'
    ];

    actualWidth = window.innerWidth;
    groupList = [];
    currentIndex: number;
    dataSource;

    filteredList = [];
    categoryList = [];

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
        this.getGroups();
        this.getCategories();
    }

    /* Dialog  */
    openDialog(editing, singleGroup?, index?) {
        if (editing) {
            this.isAddDialogOpen = true;
            this.isDialogEditing = true;
            this.dialogTitle = 'Ažuriranje potkategorije';
            this.subcategory = Object.assign({}, singleGroup);
            if (index) {
                this.currentIndex = index;
            }
        }
        if (!editing) {
            this.isAddDialogOpen = true;
            this.isDialogEditing = false;
            this.dialogTitle = 'Dodavanje potkategorije';
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
        this.imageID = this.groupList[index]._id;
        this.imageindex = index;
        this.dialogTitle = 'Dodavanje slike';
    }

    closeImageDialog() {
        this.isImageDialogOpen = false;
    }

    clearForm() {
        this.subcategory = {
            name: '',
            slug: '',
            category: { _id: '', name: '' },
            description: '',
            image: ''
        };
    }

    /* Add new group */
    postGroup(group, event) {
        this.groupService.post(group).subscribe(
            (response) => {
            this.closeDialog(event);
            this.getGroups();
            }
        );
    }

    /* Update group */
    putGroup(group, event) {
        this.groupService.put(group._id, group).subscribe(
            (response) => {
                this.closeDialog(event);
                this.getGroups();
            }
        );
    }

    /* Delete group */
    deleteGroup(id, index, event) {
        this.groupService.delete(id).subscribe(
            (response) => {
                this.groupList.splice(index, 1);
                this.closeDialog(event);
            }
        );
    }

    /* Get groups */
    getGroups(categoryFilter?) {
        this.groupService.get().subscribe(response => {
            if (categoryFilter) {
                this.groupList = response.object.filter(
                    g => g.category._id === categoryFilter
                );
            } else {
                this.groupList = response.object;
            }
            this.dataSource = new MatTableDataSource(this.groupList);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
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
        const formData = new FormData();
        const filename = this.imageFile.name ;
        formData.append('image', this.imageFile, filename);

        const thisGroup = this.groupList[this.imageindex];
        const groupId = thisGroup._id;
        thisGroup.image = filename;

        this.groupService.put(groupId, thisGroup).subscribe(
            (response) => {
                this.groupService.postImage(this.imageID, formData).subscribe(
                    (response2) => {
                        this.closeImageDialog();
                        this.getGroups();
                    }
                );
            });
    }
}
