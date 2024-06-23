import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BodyComponent } from './body/body.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './shared/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BookComponent } from './book/book.component';
import { BookImportComponent } from './book/book-import/book-import.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { SuccessDialogComponent } from './components/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    BodyComponent,
    BookComponent,
    BookImportComponent,
    SuccessDialogComponent,
    ErrorDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    //remover depois
    FormsModule,
    MatInputModule,
    MatDialogModule,
    MatOptionModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
