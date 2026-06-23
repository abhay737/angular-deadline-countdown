import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface DeadlineResponse {
  secondsLeft: number;
}

@Injectable({
  providedIn: 'root'
})
export class DeadlineService {

  constructor(private http: HttpClient) {}

  getDeadline(): Observable<DeadlineResponse> {

    // Mock implementation for local testing
    return of({
      secondsLeft: 600
    });

    // Production implementation
    // return this.http.get<DeadlineResponse>('/api/deadline');
  }
}
