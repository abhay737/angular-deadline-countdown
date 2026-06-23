import { Routes } from '@angular/router';
import { DeadlineComponent } from './components/deadline/deadline.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'deadline',
        pathMatch: 'full',
    },
    {
        path: 'deadline',
        component: DeadlineComponent
    },
    {
        path: '**',
        redirectTo: 'deadline'
    }
];
