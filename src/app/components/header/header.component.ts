import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

menuShow:boolean = false;
selectedLanguage : string = '';

constructor(
  private router:Router,
  public _userService:UserService,
  public translateService:TranslateService
){
  if (localStorage.getItem('locale')) {
    this.selectedLanguage = localStorage['locale'];
}
}

ngOnInit(){
  const backdrop = document.querySelector('.left-side-mobile-backdrop');
  backdrop?.addEventListener("click",()=>{
    this.closeMenu();
  })
}
closeMenu(){
  this.menuShow = true;
  let leftSideMenus = document.querySelectorAll('.left-side-menu');
  leftSideMenus.forEach((item: HTMLElement | any) => {
    item.style.width = '0px';
  });
  let backdrop  : any = document.querySelector('.left-side-mobile-backdrop');
  backdrop.style.display = "none";
}
openMenu() {
  this.menuShow = true;
  let leftSideMenus = document.querySelectorAll('.left-side-menu');
  leftSideMenus.forEach((item: HTMLElement | any) => {
    item.style.width = '270px';
  });
  let backdrop  : any = document.querySelector('.left-side-mobile-backdrop');
  backdrop.style.display = "block";
}
public onChange(selectedLanguage: string): void {
  this.translateService.use(selectedLanguage);
  localStorage.setItem('locale', selectedLanguage)

}
logout(){
  localStorage.removeItem("a_access_token");
  this.router.navigate(['/Dashboard/login'])
}

}
