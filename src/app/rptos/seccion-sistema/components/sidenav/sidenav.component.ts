import { Component, EventEmitter, Output, HostListener } from '@angular/core';

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
  isMobile = false;
  
  ngOnInit() {
    this.checkScreenWidth();
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenWidth();
  }
  
  checkScreenWidth() {
    this.screenWidth = window.innerWidth;
    this.isMobile = this.screenWidth <= 768;
    
    // Auto-close sidenav on mobile when screen is small
    if (this.isMobile && this.collapsed) {
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
  }
  
  toggleCollapse():void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  closeSidenav(): void{
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }
  
  toggleMobileMenu(): void {
    if (this.isMobile) {
      this.collapsed = !this.collapsed;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
  }
  
  closeMobileMenu(): void {
    if (this.isMobile && this.collapsed) {
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
  }
}
