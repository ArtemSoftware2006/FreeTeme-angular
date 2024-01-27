import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { ExecutorsPageComponent } from './pages/executors-page/executors-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { AuthorizationPageComponent } from './pages/authorization-page/authorization-page.component';
import { DealsPageComponent } from './pages/deals-page/deals-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { DealCreatePageComponent } from './pages/deal-create-page/deal-create-page.component';
import { DealDetailsPageComponent } from './pages/deal-details-page/deal-details-page.component';
import { UserDealsPageComponent } from './pages/user-deals-page/user-deals-page.component';
import { UserProposalsPageComponent } from './pages/user-proposals-page/user-proposals-page.component';
import { UserDealDetailsPageComponent } from './pages/user-deal-details-page/user-deal-details-page.component';
import { ProposalsOnDealPageComponent } from './pages/proposals-on-deal-page/proposals-on-deal-page.component';

export const routes: Routes = [
    {path: "", component: HomePageComponent},
    {path: "home", component: HomePageComponent},
    {path: "authorization", component: AuthorizationPageComponent},
    {path: "profile", component: ProfilePageComponent}, 
    {path: "executors", component: ExecutorsPageComponent},
    {path: "deals", component: DealsPageComponent},
    {path: "about", component: AboutPageComponent},
    {path: "profile", component: ProfilePageComponent},
    {path : "deal-create", component: DealCreatePageComponent},
    {path : "user-deal-details/:id", component: UserDealDetailsPageComponent},
    {path : "user-deals", component: UserDealsPageComponent},
    {path : "proposals-on-deal/:id", component: ProposalsOnDealPageComponent},
    {path : "user-proposals", component: UserProposalsPageComponent},
    {path : "deal-details/:id", component: DealDetailsPageComponent},
    {path: "error", component: ErrorPageComponent},
    {path: '**', component: ErrorPageComponent}
];
