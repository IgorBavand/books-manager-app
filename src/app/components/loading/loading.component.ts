import { Component, Inject, OnInit, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  isLoading = false;
  loadingService = inject(LoadingService);
  ngOnInit(): void {
    this.loadingService
      .getLoadingState()
      .subscribe((isLoading) => (this.isLoading = isLoading));
  }
}
