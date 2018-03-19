import { Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';

export const appRoutes: Routes = [
    {
        path: 'about',
        component: AboutComponent,
    },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home' },
];
