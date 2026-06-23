import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { DeadlineService } from '../../services/deadline.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-deadline',
  imports: [CommonModule],
  templateUrl: './deadline.component.html',
  styleUrl: './deadline.component.scss'
})
export class DeadlineComponent {

  secondsLeft:any = 0;

  private timerSubscription?: Subscription;

  constructor(private deadlineService: DeadlineService) {}

  ngOnInit(): void {
    this.getDeadlineTime();
  }

  getDeadlineTime(){
    this.deadlineService.getDeadline().subscribe({
      next: (response) => {
        this.secondsLeft = response.secondsLeft;

        this.timerSubscription = interval(1000).subscribe(() => {
          if(this.secondsLeft > 0){
            this.secondsLeft--;
          }
        });
      },
      error: (error) => {
        console.error('Failed to load deadline', error);
      }
    });
  }

  ngOnDestroy(): void {
    this.timerSubscription?.unsubscribe();
  }

}
