import { NgModule } from '../../node_modules/@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '../../node_modules/@angular/material/form-field';
import { MatRippleModule } from '../../node_modules/@angular/material/core';
import { MatInputModule } from '../../node_modules/@angular/material';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';



const materialModules = [
    MatButtonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatRippleModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule
];

@NgModule({
    imports: [...materialModules],
    exports: [...materialModules]
})
export class AppMaterialModule { }
