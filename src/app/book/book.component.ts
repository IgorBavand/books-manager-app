import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BookService } from './book.service';
import { Book } from './model/book.dto';

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
  ];
  dataSource = new MatTableDataSource<Book>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: BookService) {}

  ngOnInit() {
    this.service.getBooks().subscribe((res) => {
      this.dataSource.data = res;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
