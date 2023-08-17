import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface ISidebar {
  containerClassnames: string;
  menuClickCount: number;
  selectedMenuHasSubItems: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private initialSidebar: ISidebar = { containerClassnames: environment.defaultMenuType, menuClickCount: 0, selectedMenuHasSubItems: environment.defaultMenuType === 'menu-default' };
  private sidebar = new BehaviorSubject<ISidebar>(this.initialSidebar);
  subHiddenBreakpoint: number = environment.subHiddenBreakpoint;
  menuHiddenBreakpoint: number = environment.menuHiddenBreakpoint;

  constructor() {
  }
  getSidebar(): Observable<ISidebar> {
    return this.sidebar.asObservable();
  }
  changeVal(str: string) {
    const before = this.sidebar.getValue();
    this.sidebar.next({ containerClassnames: str, menuClickCount: before.menuClickCount, selectedMenuHasSubItems: before.selectedMenuHasSubItems });
  }
  setContainerClassnames(clickIndex: number, strCurrentClasses: string, selectedMenuHasSubItems: boolean) {
    const currentClasses = strCurrentClasses ? strCurrentClasses.split(' ').filter(x => x !== '') : '';
    let nextClasses = '';
    if(clickIndex !== 5){
      if (!selectedMenuHasSubItems) {
        if (currentClasses.includes('menu-default') && (clickIndex % 4 === 0 || clickIndex % 4 === 3)) {
          clickIndex = 1;
        }else{
          clickIndex = 0;
        }
      }
    }
    if(clickIndex === 5){
      if ( currentClasses.includes('main-hidden')){
        nextClasses = 'menu-default';
      }else{
        nextClasses = 'menu-default main-hidden sub-hidden';
      }
    }
    if (currentClasses.includes('menu-mobile')) {
      if ( currentClasses.includes('main-hidden')){
        nextClasses = 'menu-default';
      }else{
        nextClasses = 'menu-default main-hidden sub-hidden';
      }
      nextClasses += ' menu-mobile';
    }
    this.sidebar.next({ containerClassnames: nextClasses, menuClickCount: clickIndex, selectedMenuHasSubItems });
  }


  addContainerClassname(classname: string, strCurrentClasses: string) {
    const newClasses = !(strCurrentClasses.indexOf(classname) > -1) ? strCurrentClasses + ' ' + classname : strCurrentClasses;
    const before = this.sidebar.getValue();
    this.sidebar.next({ containerClassnames: newClasses, menuClickCount: before.menuClickCount, selectedMenuHasSubItems: before.selectedMenuHasSubItems });
  }

  changeDefaultClassnames(strCurrentClasses: string) {
    const before = this.sidebar.getValue();
    this.sidebar.next({ containerClassnames: strCurrentClasses, menuClickCount: before.menuClickCount, selectedMenuHasSubItems: before.selectedMenuHasSubItems });
  }

  changeSelectedMenuHasSubItems(hasSubMenu: boolean = true) {
    const before = this.sidebar.getValue();
    this.sidebar.next({ containerClassnames: before.containerClassnames, menuClickCount: before.menuClickCount, selectedMenuHasSubItems: hasSubMenu });
  }



  clickOnMobileMenu = (strCurrentClasses: string) => {
    const before = this.sidebar.getValue();
    const currentClasses = strCurrentClasses ? strCurrentClasses.split(' ').filter(x => x !== '' && x !== 'sub-show-temporary') : [];
    let nextClasses = '';
    if (currentClasses.includes('main-show-temporary')) {
      nextClasses = (currentClasses.filter(x => x !== 'main-show-temporary')).join(' ');
    } else {
      nextClasses = currentClasses.join(' ') + ' main-show-temporary';
    }
    this.sidebar.next({ containerClassnames: nextClasses, menuClickCount: 0, selectedMenuHasSubItems: before.selectedMenuHasSubItems });
  }
}
