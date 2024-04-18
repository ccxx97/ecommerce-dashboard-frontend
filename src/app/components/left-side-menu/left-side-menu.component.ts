import { Component } from '@angular/core';

interface MenuItem {
  icon?: string;
  text: string;
  link?: string;
  isActive?: boolean;
  label?:boolean;
  exact?: boolean | any;
  openedChildren?:boolean;
  children?:Array<any>;
}

@Component({
  selector: 'app-left-side-menu',
  templateUrl: './left-side-menu.component.html',
  styleUrl: './left-side-menu.component.scss'
})
export class LeftSideMenuComponent {

  menuItems: MenuItem[] = [
    { icon: 'fa-house', text: 'home', link: '', isActive: true,exact:true },
    { icon: 'fa-box-dollar', text: 'orders', link: 'Orders', isActive: true },
    { icon: 'fa-boxes-stacked', text: 'products', link: 'Products', isActive: true },
    { icon: 'fa-users', text: 'customers', link: 'Customers', isActive: true },
    { icon: 'fa-tag', text: 'discount', link: 'Discounts', isActive: true },
    { label: true, text: 'generalSettings',isActive:true,openedChildren:true,children:[
      { icon: 'fa-gear', text: 'siteSettings', link: 'Settings/Site', isActive: true },
      { icon: 'fa-language', text: 'language', link: 'Languages', isActive: true },
      { icon: 'fa-earth-americas', text: 'country', link: 'Countries', isActive: true },
      { icon: 'fa-clock', text: 'timezone', link: 'Timezone', isActive: true },
      { icon: 'fa-credit-card', text: 'currency', link: 'Currency', isActive: true },
      { icon: 'fa-user', text: 'users', link: 'Users', isActive: true },
      // { icon: 'fa-display-chart-up', text: 'SEO and Analytics', link: 'Discounts3', isActive: true },
    ] },

  ];


}
