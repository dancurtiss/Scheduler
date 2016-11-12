import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params }      from '@angular/router';
import * as moment from 'moment'

@Component({
    moduleId: module.id,
    selector: 'my-landing',
    templateUrl: 'landing.component.html',
    styleUrls: ['landing.component.css']
})
export class LandingComponent implements OnInit {
    constructor(
        private router: Router,
        private elementRef: ElementRef
    ) { }

    ngOnInit(): void {
        var defaultRouteUrl: string = this.elementRef.nativeElement.parentElement.getAttribute('default-route-url');
        this.router.navigate([defaultRouteUrl]);
    }
}
