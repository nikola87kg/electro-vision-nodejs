/* Angular */
import { Component, OnInit } from '@angular/core';


/* Services */
import { CategoriesService } from 'angular6/app/_services/categories.service';

@Component({
  selector: 'px-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor(
    private categoryService: CategoriesService
  ) { }

  category = {};
  categoryList = [];
  currentIndex;

  dialogIsOpen = false;
  dialogIsEditing = false;
  dialogTitle;

  ngOnInit() {
    this.getCategories();
  }

  openDialog(editing, singleCategory?, index?) {
    if (editing) {
      this.dialogIsOpen = true;
      this.dialogIsEditing = true;
      this.dialogTitle = 'Ažuriranje kategorije';
      this.category = Object.assign({}, singleCategory);
      if (index) { this.currentIndex = index; }
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

  clearForm() {
    this.category = {
      name: '',
      slug: '',
      description: '',
    };
  }
  /* Add new category */
  postCategory(category) {
    this.categoryService.post(category)
      .subscribe(
      data => {
        this.closeDialog();
        this.getCategories();
      }
      );
  }

  /* Update category */
  putCategory(category) {
    this.categoryService.put(category._id, category)
      .subscribe(
      data => {
        this.closeDialog();
        this.getCategories();
      }
      );
  }


  /* Delete category */
  deleteCategory(id, index) {
    this.categoryService.delete(id)
      .subscribe(() => {
        this.categoryList.splice(index, 1);
        this.closeDialog();
    });
  }

  /* Get category */
  getCategories() {
    this.categoryService.get()
      .subscribe(
      );
  }

}
