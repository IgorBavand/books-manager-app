import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './book/book.component';
import { BookImportComponent } from './book/book-import/book-import.component';
import { BookFormComponent } from './book/book-form/book-form.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'books', component: BookComponent, canActivate: [AuthGuard] },
  {
    path: 'import-books',
    component: BookImportComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'register-book',
    component: BookFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-book/:id',
    component: BookFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
