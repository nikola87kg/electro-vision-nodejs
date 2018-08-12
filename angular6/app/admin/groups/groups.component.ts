/* Angular */
import { Component, OnInit, EventEmitter } from '@angular/core';

/* 3rd party */
import { ToastrService } from 'ngx-toastr';
import {
    UploadOutput,
    UploadInput,
    UploadFile,
    humanizeBytes,
    UploaderOptions
} from 'ngx-uploader';

/* Services */
import { GroupsService } from '../../_services/groups.service';
import { CategoriesService } from '../../_services/categories.service';

@Component({
    selector: 'px-groups',
    templateUrl: './groups.component.html',
    styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
    /* Photo Uploader */
    options: UploaderOptions;
    formData: FormData;
    files: UploadFile[];
    uploadInput: EventEmitter<UploadInput>;
    humanizeBytes: Function;
    dragOver: boolean;

    /* Constructor */
    constructor(
        private groupService: GroupsService,
        private categoryService: CategoriesService,
        private toastr: ToastrService
    ) {
        this.files = []; // local uploading files array
        this.uploadInput = new EventEmitter<UploadInput>();
        this.humanizeBytes = humanizeBytes;
    }

    /* Declarations */
    group = {
        name: '',
        slug: '',
        description: '',
        category: { _id: '', name: '' },
        image: ''
    };

    groupList = [];
    currentIndex: number;

    filteredList = [];
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
            url: this.baseUrl + '/groups/images/' + obj.id,
            method: 'POST',
            data: { id: obj.id }
        };
        this.uploadInput.emit(imageData);
        setTimeout(() => {
            this.getGroups();
        }, 0);
    }

    /* INIT */
    ngOnInit() {
        this.getGroups();
        this.getCategories();
    }

    /* Dialog  */
    openDialog(editing, singleGroup?, index?) {
        if (editing) {
            this.dialogIsOpen = true;
            this.dialogIsEditing = true;
            this.dialogTitle = 'Ažuriranje potkategorije';
            this.group = Object.assign({}, singleGroup);
            if (index) {
                this.currentIndex = index;
            }
        }
        if (!editing) {
            this.dialogIsOpen = true;
            this.dialogIsEditing = false;
            this.dialogTitle = 'Dodavanje potkategorije';
            this.clearForm();
        }
    }

    closeDialog() {
        this.dialogIsOpen = false;
        this.clearForm();
    }

    openImageDialog(index) {
        this.imageDialogIsOpen = true;
        this.imageInDialog = this.groupList[index].image;
        this.imageID = this.groupList[index].id;
        this.imageindex = index;
        this.dialogTitle = 'Dodavanje slike';
    }

    closeImageDialog() {
        this.imageDialogIsOpen = false;
    }

    clearForm() {
        this.group = {
            name: '',
            slug: '',
            category: { _id: '', name: '' },
            description: '',
            image: ''
        };
    }

    /* Add new group */
    postGroup(group) {
        let response: any = {
            title: ''
        };
        this.groupService.post(group).subscribe(
            (data) => {
            this.closeDialog();
            this.getGroups();
            response = data;
            this.toastr.success(JSON.stringify(response.title));
            },
            (error) => {
                response = error;
                this.toastr.error(JSON.stringify(response.title));
            }
        );
    }

    /* Update group */
    putGroup(group) {
        let response: any = {
            title: ''
        };
        this.groupService.put(group._id, group).subscribe(
            (data) => {
                this.closeDialog();
                this.getGroups();
                response = data;
                this.toastr.success(JSON.stringify(response.title));
            },
            (error) => {
                response = error;
                this.toastr.error(JSON.stringify(response.title));
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
        const thisGroup = this.groupList[this.imageindex];
        thisGroup.image = image;
        this.groupService.put(thisGroup._id, thisGroup).subscribe(
            (data) => {
                this.closeImageDialog();
                this.startUpload(data);
                this.getGroups();
                response = data;
                this.toastr.success(JSON.stringify(response.title));
            },
            (error) => {
                response = error;
                this.toastr.error(JSON.stringify(response.title));
            }
        );
    }

    /* Delete group */
    deleteGroup(id, index) {
        let response: any = {
            title: ''
        };
        this.groupService.delete(id).subscribe(
            (data) => {
                this.groupList.splice(index, 1);
                this.closeDialog();
                response = data;
                this.toastr.success(JSON.stringify(response.title));
            },
            (error) => {
                response = error;
                this.toastr.error(JSON.stringify(response.title));
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
        });
    }

    /* Get categories */
    getCategories() {
        this.categoryService.get().subscribe(response => {
            this.categoryList = response.object;
        });
    }
}
