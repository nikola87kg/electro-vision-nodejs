/* Angular */
import { Component, OnInit, ViewChild } from '@angular/core';

/* Services */
import { PricelistService } from '../../_services/pricelist.service';

/* Material */
import { MatSort, MatPaginator, MatTableDataSource, MatSnackBar } from '@angular/material';
import { GlobalService } from '../../_services/global.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';

/* Interfaces */
import { PricelistModel, PricelistColumns } from '../admin.interfaces';

/* Decorator */
@Component({
    selector: 'px-pricelist-admin',
    templateUrl: './pricelist-admin.component.html'
})

export class PricelistAdminComponent implements OnInit {

    /* Constructor */
    constructor(
        private pricelistService: PricelistService,
        public global: GlobalService,
        public snackBar: MatSnackBar,
    ) {}

    pricelist: PricelistModel;
    displayedColumns = PricelistColumns;

    windowSize;
    pricelistList: Array<PricelistModel>;
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
        this.getPricelists();
    }

    /* Dialog  */
    openDialog(editing, singlePricelist?, index?) {
        if (editing) {
            this.isAddDialogOpen = true;
            this.isDialogEditing = true;
            this.dialogTitle = 'Ažuriranje slike';
            this.pricelist = Object.assign({}, singlePricelist);
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
        this.imageID = this.pricelistList[index]._id;
        this.imageindex = index;
        this.dialogTitle = 'Dodavanje slike';
    }

    closeImageDialog() {
        this.isImageDialogOpen = false;
    }

    clearForm() {
        this.pricelist = {
            _id: '',
            name: '',
            description: '',
            price: '',
            createdAt: null
        };
    }

    /* Add new pricelist */
    postPricelist(pricelist, event) {
        this.pricelistService.post(pricelist).subscribe(
            (response) => {
                this.closeDialog(event);
                this.getPricelists();
                this.openSnackBar({
                    action: 'create2',
                    type: 'pricelist'
                });
            }
        );
    }

    /* Update pricelist */
    putPricelist(pricelist, event) {
        this.pricelistService.put(pricelist._id, pricelist).subscribe(
            (data) => {
                this.closeDialog(event);
                this.getPricelists();
                this.openSnackBar({
                    action: 'update2',
                    type: 'pricelist'
                });
            }
        );
    }

    /* Delete Pricelist */
    deletePricelist(id, event) {
        this.pricelistService.delete(id).subscribe(
            (data) => {
                this.pricelistList.splice(this.currentIndex, 1);
                this.dataSource = new MatTableDataSource(this.pricelistList);
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
                this.closeDialog(event);
                this.openSnackBar({
                    action: 'delete2',
                    type: 'pricelist'
                });
            }
        );
    }

    /* Get pricelist */
    getPricelists() {
        this.pricelistService.get().subscribe(response => {
            this.pricelistList = response.object;
            this.dataSource = new MatTableDataSource(this.pricelistList);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
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
