import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout'; // deprecated
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatBadgeModule } from '@angular/material/badge';

const angularImports = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  FlexLayoutModule,
];

const materialImports = [
  MatProgressSpinnerModule,
  MatCardModule,
  MatListModule,
  MatIconModule,
  MatButtonModule,
  MatTabsModule,
  MatDialogModule,
  MatSelectModule,
  MatDividerModule,
  MatMenuModule,
  MatGridListModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatInputModule,
  MatCheckboxModule,
  MatRadioModule,
  MatSnackBarModule,
  MatAutocompleteModule,
  MatSortModule,
  MatTableModule,
  MatProgressBarModule,
  MatChipsModule,
  MatTooltipModule,
  MatSlideToggleModule,
  MatExpansionModule,
  MatRippleModule,
  MatStepperModule,
  MatSliderModule,
  MatSidenavModule,
  MatToolbarModule,
  DragDropModule,
  MatButtonToggleModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatBadgeModule,
];

@NgModule({
  imports: [...angularImports, ...materialImports],
  exports: [...angularImports, ...materialImports],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {},
    },
  ],
})
export class CoreModule {}
