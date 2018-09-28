/* Angular */
import { Component, OnInit, ViewChild } from '@angular/core';

/* Services */
import { GroupsService } from '../../_services/groups.service';
import { CategoriesService } from '../../_services/categories.service';

/* Material */
import { MatSort, MatPaginator, MatTableDataSource, MatSnackBar } from '@angular/material';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { GlobalService } from '../../_services/global.service';

/* Interfaces */
import { GroupModel, GroupColumns, CategoryModel } from '../admin.interfaces';

@Component({
    selector: 'px-groups',
    templateUrl: './groups.component.html'
})

export class GroupsComponent implements OnInit {

    /* Constructor */
    constructor(
        private groupService: GroupsService,
        private categoryService: CategoriesService,
        public global: GlobalService,
        public snackBar: MatSnackBar,
    ) {}

    subcategory: GroupModel;
    displayedColumns = GroupColumns;

    windowSize;
    groupList: Array<GroupModel>;
    categoryList: Array<CategoryModel>;
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
    existingImage: string;

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    /* INIT */
    ngOnInit() {
        this.global.windowSize.subscribe(
            (result => this.windowSize = result)
        );
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
        this.existingImage = this.groupList[index].image;
        this.imageindex = index;
        this.dialogTitle = 'Dodavanje slike';
    }

    closeImageDialog() {
        this.isImageDialogOpen = false;
        this.existingImage = null;
        this.imagePreview = null;
    }

    clearForm() {
        this.subcategory = {
            _id: '',
            name: '',
            slug: '',
            description: '',
            image: '',
            category: { _id: '', name: '' },
            createdAt: null
        };
    }

    /* Add new group */
    postGroup(group, event) {
        this.groupService.post(group).subscribe(
            (response) => {
            this.closeDialog(event);
            this.getGroups();
            this.openSnackBar({
                action: 'create2',
                type: 'group'
            });
            }
        );
    }

    /* Update group */
    putGroup(group, event) {
        this.groupService.put(group._id, group).subscribe(
            (response) => {
                this.closeDialog(event);
                this.getGroups();
                this.openSnackBar({
                    action: 'update2',
                    type: 'group'
                });
            }
        );
    }

    /* Delete group */
    deleteGroup(id, event) {
        this.groupService.delete(id).subscribe(
            (response) => {
                this.groupList.splice(this.currentIndex, 1);
                this.dataSource = new MatTableDataSource(this.groupList);
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
                this.closeDialog(event);
                this.openSnackBar({
                    action: 'delete2',
                    type: 'group'
                });
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
