import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from 'src/app/components/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from 'src/app/components/error-dialog/error-dialog.component';
import { ColumnService } from 'src/app/services/column.service';
import { Column } from 'src/app/models/Colunm';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-import',
  templateUrl: './book-import.component.html',
  styleUrls: ['./book-import.component.scss'],
})
export class BookImportComponent implements OnInit {
  file: File | null = null;
  columnId: number | null = null;
  colunms?: Column[];
  selectedValue?: string;
  selectedCar?: string;

  constructor(
    private bookService: BookService,
    public dialog: MatDialog,
    private columnService: ColumnService,
    private router: Router
  ) {}

  ngOnInit() {
    this.columnService.getColumns().subscribe((res) => {
      this.colunms = res;
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  onSubmit() {
    if (this.file && this.columnId !== null) {
      const formData = new FormData();
      formData.append('file', this.file);
      formData.append('colunmId', this.columnId.toString());

      this.bookService.importBooks(formData).subscribe(
        (response) => {
          this.dialog.open(SuccessDialogComponent, {
            data: {
              title: 'Sucesso!',
              message: 'Arquivo importado com sucesso!',
            },
          });
          this.router.navigate(['/']);
        },
        (error) => {
          this.dialog.open(ErrorDialogComponent, {
            data: {
              title: 'Error',
              message: 'Erro ao importar arquivo.',
            },
          });
        }
      );
    }
  }
}
