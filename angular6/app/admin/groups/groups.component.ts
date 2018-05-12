/* Angular */
import { Component, OnInit } from '@angular/core';

/* Services */
import { GroupsService } from 'angular6/app/_services/groups.service';
import { CategoriesService } from 'angular6/app/_services/categories.service';

@Component({
  selector: 'px-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  constructor(
    private groupService: GroupsService,
    private categoryService: CategoriesService
  ) { }

  group = {};
  groupList = [];
  currentIndex;

  filteredList = [];
  categoryList = [];

  dialogIsOpen = false;
  dialogIsEditing = false;
  dialogTitle;


  ngOnInit() {
    this.getGroups();
    this.getCategories();
  }

  openDialog(editing, singleGroup?, index?) {
    if (editing) {
      this.dialogIsOpen = true;
      this.dialogIsEditing = true;
      this.dialogTitle = 'Ažuriranje grupe';
      this.group = Object.assign({}, singleGroup);
      if (index) { this.currentIndex = index; }
    }
    if (!editing) {
      this.dialogIsOpen = true;
      this.dialogIsEditing = false;
      this.dialogTitle = 'Dodavanje proizvoda';
      this.clearForm();
    }
  }

  closeDialog() {
    this.dialogIsOpen = false;
    this.clearForm();
  }

  clearForm() {
    this.group = {
      name: '',
      slug: '',
      category: { _id: '' },
      description: '',
    };
  }

  /* Add new group */
  postGroup(group) {
    this.groupService.post(group)
      .subscribe(
      data => {
        this.closeDialog();
        this.getGroups();
      }
      );
  }

  /* Update group */
  putGroup(group) {
    this.groupService.put(group._id, group)
      .subscribe(
      data => {
        this.closeDialog();
        this.getGroups();
      }
      );
  }


  /* Delete group */
  deleteGroup(id, index) {
    this.groupService.delete(id)
      .subscribe(() => {
        this.groupList.splice(index, 1);
        this.closeDialog();
      });
  }

  /* Get groups */
  getGroups(categoryFilter?) {
    let allGroups = [];
    this.groupService.get()
      .subscribe( response => {
        allGroups = [];
        if (categoryFilter) {
          this.groupList = allGroups.filter(
            (g) => g.category._id === categoryFilter
          );
        } else {
          this.groupList = allGroups;
        }
      }
    );
  }

  /* Get categories */
  getCategories() {
    this.categoryService.get()
      .subscribe(response => {
      });
  }

}
