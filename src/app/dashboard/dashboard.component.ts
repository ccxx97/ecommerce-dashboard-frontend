import { Component } from '@angular/core';
import { Router, ActivatedRoute, RouterEvent, NavigationEnd } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { filter } from 'rxjs';

export interface BreadcrumbItem {
  label: string;
  link: string;
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  breadcrumbItems: BreadcrumbItem[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    if(!localStorage["a_access_token"]){
      this.router.navigate(['/Dashboard/login']);
      return;
    }


    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateBreadcrumb();
    });

    this.updateBreadcrumb();
  }

  updateBreadcrumb(): void {
    this.breadcrumbItems = [];
    let route = this.activatedRoute.root;
    this.parseRoute(route);
  }

  parseRoute(route: ActivatedRoute): void {
    const breadcrumbData = route.snapshot.data['breadcrumb'];
    if (breadcrumbData) {
      const breadcrumbItem: BreadcrumbItem = { label: breadcrumbData, link: this.getPath(route) };
      if(breadcrumbItem.link == '/Dashboard'){
        breadcrumbItem.link = '';
      }
      this.breadcrumbItems.push(breadcrumbItem);
    }

    if (route.firstChild) {
      this.parseRoute(route.firstChild);
    }
  }

  getPath(route: ActivatedRoute): string {
    let path = '';
    const snapshot = route.snapshot;
    if (snapshot.url.length) {
      path += '/' + snapshot.url.map(segment => segment.path).join('/');
    }
    return path;
  }


}
