import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatStepperModule} from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatDialog, MatDialogModule } from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
@NgModule({
  declarations: [],
  imports: [
    CommonModule, MatStepperModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatRadioModule, MatSelectModule, MatListModule, MatCheckboxModule, MatExpansionModule,MatDialogModule
  ],
  exports : [ MatStepperModule, MatFormFieldModule, MatRadioModule, MatInputModule, MatButtonModule, MatExpansionModule,
    MatSelectModule, MatListModule, MatCheckboxModule,MatDialogModule ]
})
export class MaterialModule { }
