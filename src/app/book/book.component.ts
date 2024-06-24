import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BookService } from './book.service';
import { Router } from '@angular/router';
import { Book } from '../models/Book';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-book',
  styleUrls: ['book.component.scss'],
  templateUrl: 'book.component.html',
})
export class BookComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'id',
    'title',
    'author',
    'genre',
    'publicationYear',
    'publisher',
    'isbn',
    'pages',
    'language',
    'actions',
  ];
  dataSource = new MatTableDataSource<Book>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: BookService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadBooks();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadBooks() {
    this.service.getBooks().subscribe((res) => {
      this.dataSource.data = res;
    });
  }

  editBook(id: number) {
    this.router.navigate(['/edit-book', id]);
  }

  deleteBook(bookId: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {
        title: 'Tem certeza?',
        message: 'Tem certeza que deseja excluir este livro?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.service.deleteBook(bookId).subscribe(() => {
          this.loadBooks();
        });
      }
    });
  }
}
