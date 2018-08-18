import { NgModule } from '../../../node_modules/@angular/core';
import {
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule
} from '../../../node_modules/@angular/material';

const adminMaterialModules = [
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule
];

@NgModule({
    imports: [...adminMaterialModules],
    exports: [...adminMaterialModules]
})
export class AdminMaterialModule { }
