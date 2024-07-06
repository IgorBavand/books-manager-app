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
  languages: string[] = [
    'Afrikaans', 'Albanian', 'Amharic', 'Arabic', 'Armenian', 'Azerbaijani', 'Basque', 'Belarusian',
    'Bengali', 'Bosnian', 'Bulgarian', 'Catalan', 'Cebuano', 'Chichewa', 'Chinese', 'Corsican',
    'Croatian', 'Czech', 'Danish', 'Dutch', 'English', 'Esperanto', 'Estonian', 'Filipino',
    'Finnish', 'French', 'Galician', 'Georgian', 'German', 'Greek', 'Gujarati', 'Haitian Creole',
    'Hausa', 'Hawaiian', 'Hebrew', 'Hindi', 'Hmong', 'Hungarian', 'Icelandic', 'Igbo', 'Indonesian',
    'Irish', 'Italian', 'Japanese', 'Javanese', 'Kannada', 'Kazakh', 'Khmer', 'Korean', 'Kurdish',
    'Kyrgyz', 'Lao', 'Latin', 'Latvian', 'Lithuanian', 'Luxembourgish', 'Macedonian', 'Malagasy',
    'Malay', 'Malayalam', 'Maltese', 'Maori', 'Marathi', 'Mongolian', 'Myanmar (Burmese)',
    'Nepali', 'Norwegian', 'Odia (Oriya)', 'Pashto', 'Persian', 'Polish', 'Portuguese', 'Punjabi',
    'Romanian', 'Russian', 'Samoan', 'Scots Gaelic', 'Serbian', 'Sesotho', 'Shona', 'Sindhi',
    'Sinhala', 'Slovak', 'Slovenian', 'Somali', 'Spanish', 'Sundanese', 'Swahili', 'Swedish',
    'Tajik', 'Tamil', 'Tatar', 'Telugu', 'Thai', 'Turkish', 'Turkmen', 'Ukrainian', 'Urdu',
    'Uyghur', 'Uzbek', 'Vietnamese', 'Welsh', 'Xhosa', 'Yiddish', 'Yoruba', 'Zulu'
  ];

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
            this.dialog.open(SuccessDialogComponent, {
              data: {
                title: 'Sucesso',
                message: 'Livro cadastrado com sucesso!',
              },
            });
            this.router.navigate(['/books']);
          },
          (error) => {
            this.dialog.open(ErrorDialogComponent, {
              data: {
                title: 'Sucesso',
                message: 'Erro ao cadastrar livro!',
              },
            });
          }
        );
      }
    } else {
      this.bookForm.markAllAsTouched();
    }
  }
}
