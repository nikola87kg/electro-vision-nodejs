/* Angular */
import { Component, OnInit,  EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/* 3rd party */
import {
  UploadOutput,
  UploadInput,
  UploadFile,
  humanizeBytes,
  UploaderOptions
} from 'ngx-uploader';

/* Services */
import { BrandsService } from 'angular6/app/_services/brands.service';

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
    private brandService: BrandsService,
    private sanitizer: DomSanitizer
  ) {
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
  }


  /* Declarations */
  brand = {
    name: '',
    slug: '',
    description: '',
    image: '',
  };

  brandList = [];
  currentIndex: number;

  dialogIsOpen = false;
  dialogIsEditing = false;
  dialogTitle;

  baseUrl: String = 'http://localhost:3000/api';

  /* Upload images */
  createURL(slug) {
    return this.baseUrl + '/brands/images/' + slug;
  }
  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue') {
    } else if (
      output.type === 'addedToQueue' &&
      typeof output.file !== 'undefined'
    ) {
      // add file to array when added
      this.files.push(output.file);
    } else if (
      output.type === 'uploading' &&
      typeof output.file !== 'undefined'
    ) {
      // update current data in files array for uploading file
      const index = this.files.findIndex(
        file => typeof output.file !== 'undefined' && file.id === output.file.id
      );
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      // remove file from array when removed
      this.files = this.files.filter(
        (file: UploadFile) => file !== output.file
      );
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
    } else if (output.type === 'drop') {
      this.dragOver = false;
    }
  }

  startUpload(slug): void {
    const event: UploadInput = {
      type: 'uploadAll',
      url: 'http://localhost:3000/api/brands/images/' + slug,
      method: 'POST',
      data: { slug: slug }
    };

    this.uploadInput.emit(event);
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
      if (index) { this.currentIndex = index; }
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
    // const image = this.files[0].name || 'no-image';
    const newBrand = brand;
    // newBrand.image = image;
    this.brandService.post(brand)
      .subscribe(
      data => {
        this.closeDialog();
        this.getBrands();
      }
      );
  }

  /* Update brand */
  putBrand(brand) {
    this.brandService.put(brand._id, brand)
      .subscribe(
      data => {
        this.closeDialog();
        this.getBrands();
      }
      );
  }


  /* Delete Brand */
  deleteBrand(id, index) {
    this.brandService.delete(id)
      .subscribe(() => {
        this.brandList.splice(index, 1);
        this.closeDialog();
    });
  }

  /* Get brand */
  getBrands() {
    this.brandService.get()
      .subscribe((result) => {
        let brandsResponse: any = {
          message: '',
          object: {}
        };
        brandsResponse = result;
        this.brandList = brandsResponse.object;
      }
      );
  }

}
