import { Component, EventEmitter, Output } from '@angular/core';

const navbarData = [
  {
    routerLink:'lista-producto',
    icon: 'list_alt',
    label: 'Lista de Producto'
  },
  {
    routerLink:'lista-producto-en-web',
    icon: 'travel_explore',
    label: 'Productos en la Web'
  },
]

interface SideNavToggle{
  screenWidth: number;
  collapsed: boolean;
}


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();

  collapsed=false;
  screenWidth = 0;
  navData = navbarData;
  
  toggleCollapse():void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  closeSidenav(): void{
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }
}
