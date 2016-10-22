//import './rxjs-extensions';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { RouterModule }  from '@angular/router';
import { AppComponent }         from './app.component';
//import { DashboardComponent }   from './dashboard.component';
import { HeroesComponent }      from './components/heroes.component';
import { OrganizationsComponent }      from './components/organizations.component';
//import { HeroDetailComponent }  from './hero-detail.component';
import { HeroService }          from './services/hero.service';
import { OrganizationService }          from './services/organization.service';
//import { HeroSearchComponent }  from './hero-search.component';
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot([
        {
            path: '',
            redirectTo: '/heroes',
            pathMatch: 'full'
        },
        //{
        //    path: 'dashboard',
        //    component: DashboardComponent
        //},
        //{
        //    path: 'detail/:id',
        //    component: HeroDetailComponent
        //},
        {
            path: 'heroes',
            component: HeroesComponent
        },
        {
            path: 'organizations',
            component: OrganizationsComponent
        }
    ])
],
    declarations: [
        AppComponent,
        //DashboardComponent,
        //HeroDetailComponent,
        HeroesComponent,
        OrganizationsComponent,
        //HeroSearchComponent
    ],
    providers: [
        HeroService,
        OrganizationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
