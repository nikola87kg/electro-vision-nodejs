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
    MatPaginatorIntl
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
    MatPaginatorModule
];

@NgModule({
    imports: [...adminMaterialModules],
    exports: [...adminMaterialModules],
    providers: [
        { provide: MatPaginatorIntl, useClass: MatPaginatorIntlSerb }
    ]
})
export class AdminMaterialModule { }
