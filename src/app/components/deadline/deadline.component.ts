import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Observable } from 'rxjs';
import {
  map,
  shareReplay,
  startWith,
  switchMap,
  takeWhile
} from 'rxjs/operators';

import {
  DeadlineResponse,
  DeadlineService
} from '../../services/deadline.service';

@Component({
  selector: 'app-deadline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './deadline.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeadlineComponent {

  readonly secondsLeft$: Observable<number>;

  constructor(private deadlineService: DeadlineService) {

    this.secondsLeft$ = this.deadlineService.getDeadline().pipe(
      switchMap(({ secondsLeft }: DeadlineResponse) => {
        const deadlineTimestamp = Date.now() + secondsLeft * 1000;

        return interval(1000).pipe(
          startWith(0),
          map(() =>
            Math.max(
              0,
              Math.ceil((deadlineTimestamp - Date.now()) / 1000)
            )
          ),
          takeWhile(seconds => seconds > 0, true)
        );
      }),
      shareReplay({
        bufferSize: 1,
        refCount: true
      })
    );
  }
}
