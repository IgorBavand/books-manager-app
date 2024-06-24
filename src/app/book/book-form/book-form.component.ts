import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book.service';
import { Book } from 'src/app/models/Book';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from 'src/app/components/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from 'src/app/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
})
export class BookFormComponent implements OnInit {
  bookForm: FormGroup;
  bookId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      genre: ['', Validators.required],
      publicationYear: [
        '',
        [
          Validators.required,
          Validators.min(1000),
          Validators.max(new Date().getFullYear()),
        ],
      ],
      publisher: ['', Validators.required],
      isbn: ['', Validators.required],
      pages: ['', [Validators.required, Validators.min(1)]],
      language: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.bookId = +this.route.snapshot.paramMap.get('id')!;
    if (this.bookId) {
      this.bookService.getBookById(this.bookId).subscribe((book: Book) => {
        this.bookForm.patchValue(book);
      });
    }
  }

  onSubmit() {
    if (this.bookForm.valid) {
      const book: Book = this.bookForm.value;
      if (this.bookId) {
        book.id = this.bookId;
        this.bookService.updateBook(book, this.bookId).subscribe(
          (response) => {
            this.dialog.open(SuccessDialogComponent);
            this.router.navigate(['/books']);
          },
          (error) => {
            this.dialog.open(ErrorDialogComponent);
          }
        );
      } else {
        this.bookService.saveBook(book).subscribe(
          (response) => {
            this.dialog.open(SuccessDialogComponent);
            this.router.navigate(['/books']);
          },
          (error) => {
            this.dialog.open(ErrorDialogComponent);
          }
        );
      }
    } else {
      this.bookForm.markAllAsTouched();
    }
  }
}
