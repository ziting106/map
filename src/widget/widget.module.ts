import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog/dialog.component';

// dialog的套件
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
// import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [DialogComponent],
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatDialogModule,
    // MatInputModule,
  ],
  exports: [DialogComponent],
})
export class WidgetModule {}
