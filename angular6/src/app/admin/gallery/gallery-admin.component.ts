/* Angular */
import { Component, OnInit, ViewChild } from '@angular/core';

/* Services */
import { GalleryService } from '../../_services/gallery.service';

/* Material */
import { MatSort, MatPaginator, MatTableDataSource, MatSnackBar } from '@angular/material';
import { GlobalService } from '../../_services/global.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';

/* Interfaces */
import { GalleryModel, GalleryColumns } from '../admin.interfaces';

/* Decorator */
@Component({
    selector: 'px-gallery-admin',
    templateUrl: './gallery-admin.component.html'
})

export class GalleryAdminComponent implements OnInit {

    /* Constructor */
    constructor(
        private galleryService: GalleryService,
        public global: GlobalService,
        public snackBar: MatSnackBar,
    ) {}

    gallery: GalleryModel;
    displayedColumns = GalleryColumns;

    windowSize;
    galleryList: Array<GalleryModel>;
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

    /* INIT */
    ngOnInit() {
        this.global.windowSize.subscribe(
            (result => this.windowSize = result)
        );
        this.getGalleries();
    }

    /* Dialog  */
    openDialog(editing, singleGallery?, index?) {
        if (editing) {
            this.isAddDialogOpen = true;
            this.isDialogEditing = true;
            this.dialogTitle = 'Ažuriranje slike';
            this.gallery = Object.assign({}, singleGallery);
            if (index) {
                this.currentIndex = index;
            }
        }
        if (!editing) {
            this.isAddDialogOpen = true;
            this.isDialogEditing = false;
            this.dialogTitle = 'Dodavanje slike';
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
        this.imageID = this.galleryList[index]._id;
        this.imageindex = index;
        this.dialogTitle = 'Dodavanje slike';
    }

    closeImageDialog() {
        this.isImageDialogOpen = false;
    }

    clearForm() {
        this.gallery = {
            _id: '',
            name: '',
            description: '',
            gallery: '',
            imagePath: '',
            createdAt: null
        };
    }

    /* Add new gallery */
    postGallery(gallery, event) {
        this.galleryService.post(gallery).subscribe(
            (response) => {
                this.closeDialog(event);
                this.getGalleries();
                this.openSnackBar({
                    action: 'create2',
                    type: 'gallery'
                });
            }
        );
    }

    /* Update gallery */
    putGallery(gallery, event) {
        this.galleryService.put(gallery._id, gallery).subscribe(
            (data) => {
                this.closeDialog(event);
                this.getGalleries();
                this.openSnackBar({
                    action: 'update2',
                    type: 'gallery'
                });
            }
        );
    }

    /* Delete Gallery */
    deleteGallery(id, event) {
        this.galleryService.delete(id).subscribe(
            (data) => {
                this.galleryList.splice(this.currentIndex, 1);
                this.dataSource = new MatTableDataSource(this.galleryList);
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
                this.closeDialog(event);
                this.openSnackBar({
                    action: 'delete2',
                    type: 'gallery'
                });
            }
        );
    }

    /* Get gallery */
    getGalleries() {
        this.galleryService.get().subscribe(response => {
            this.galleryList = response.object;
            this.dataSource = new MatTableDataSource(this.galleryList);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
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

        const thisGallery = this.galleryList[this.imageindex];
        const galleryId = thisGallery._id;
        thisGallery.imagePath = filename;

        this.galleryService.put(galleryId, thisGallery).subscribe(
            (response) => {
                this.galleryService.postImage(this.imageID, formData).subscribe(
                    (response2) => {
                        this.closeImageDialog();
                        this.getGalleries();
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
