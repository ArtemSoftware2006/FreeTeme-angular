import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { ExecutorsPageComponent } from './pages/executors-page/executors-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { AuthorizationPageComponent } from './pages/authorization-page/authorization-page.component';
import { DealsPageComponent } from './pages/deals-page/deals-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { DealCreatePageComponent } from './pages/deal-create-page/deal-create-page.component';

export const routes: Routes = [
    {path: '', component: HomePageComponent},
    {path: 'home', component: HomePageComponent},
    {path: 'authorization', component: AuthorizationPageComponent},
    {path: "profile", component: ProfilePageComponent},
    {path: "executors", component: ExecutorsPageComponent},
    {path: "deals", component: DealsPageComponent},
    {path: "about", component: AboutPageComponent},
    {path: "profile", component: ProfilePageComponent},
    {path : "deal-create", component: DealCreatePageComponent},
    {path: "error", component: ErrorPageComponent},
    {path: '**', component: ErrorPageComponent}
];
