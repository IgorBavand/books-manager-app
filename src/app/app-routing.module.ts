import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './book/book.component';
import { BookImportComponent } from './book/book-import/book-import.component';
import { BookFormComponent } from './book/book-form/book-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'books', component: BookComponent },
  { path: 'import-books', component: BookImportComponent },
  { path: 'register-book', component: BookFormComponent },
  { path: 'edit-book/:id', component: BookFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
