import { NgModule } from '@angular/core';
import { MatPaginatorIntlSerb } from './admin.material.translations';
import {
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatButtonToggleModule,
    MatSortModule,
    MatPaginatorModule,
    MatPaginatorIntl,
    MatSnackBarModule,
    MatCheckboxModule,
    MatGridListModule
} from '@angular/material';

const adminMaterialModules = [
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatGridListModule
];

@NgModule({
    imports: [...adminMaterialModules],
    exports: [...adminMaterialModules],
    providers: [
        { provide: MatPaginatorIntl, useClass: MatPaginatorIntlSerb }
    ]
})
export class AdminMaterialModule { }
