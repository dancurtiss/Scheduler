import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { RouterModule }  from '@angular/router';
import { AppComponent }         from './app.component';
import { DashboardComponent }   from './components/dashboard.component';
import { OrganizationsComponent }      from './components/organizations.component';
import { HeroService }          from './services/hero.service';
import { OrganizationService }          from './services/organization.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot([
        {
            path: '',
            redirectTo: '/dashboard',
            pathMatch: 'full'
        },
        {
            path: 'dashboard',
            component: DashboardComponent
        },
        {
            path: 'organizations',
            component: OrganizationsComponent
        }
    ])
],
    declarations: [
        AppComponent,
        DashboardComponent,
        OrganizationsComponent,
    ],
    providers: [
        HeroService,
        OrganizationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
