import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../../_services/gallery.service';

@Component({
    selector: 'px-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

    selectedImagePath: String;
    selectedImageIndex;
    isGalleryModalOpen = false;

    imagesArray = [];

    constructor(private galleryService: GalleryService) {}

    ngOnInit() {
        this.galleryService.get().subscribe( (response) => {
            this.imagesArray = response.object;
        });
    }

    onSelectImage(index) {
        this.isGalleryModalOpen = true;
        this.selectedImageIndex = index;
        this.selectedImagePath = this.imagesArray[this.selectedImageIndex].imagePath;
    }

    OnCloseGallery() {
        this.isGalleryModalOpen = false;
    }

    onNextImage(e) {
        e.stopPropagation();
        if (this.selectedImageIndex === this.imagesArray.length - 1) {
            this.selectedImageIndex = 0;
        } else {
            this.selectedImageIndex++;
        }
        this.selectedImagePath = this.imagesArray[this.selectedImageIndex].imagePath;
    }

    onPreviousImage(e) {
        e.stopPropagation();
        if (this.selectedImageIndex === 0) {
            this.selectedImageIndex = this.imagesArray.length - 1;
        } else {
            this.selectedImageIndex--;
        }
        this.selectedImagePath = this.imagesArray[this.selectedImageIndex].imagePath;
    }

}
