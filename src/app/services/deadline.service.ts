import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";

export interface DeadlineResponse {
    secondsLeft: number;
}

@Injectable({
    providedIn: 'root'
})
export class DeadlineService {

    constructor(private http: HttpClient) {}

    getDeadline(): Observable<DeadlineResponse> {
        // Mock Data for local testing because the backend endpoint was not provided as part of the assignment.
        return of({
            secondsLeft: 600
        })

        // Actual Implementation:
        // return this.http.get<DeadlineResponse>('/api/deadline');
    }

}