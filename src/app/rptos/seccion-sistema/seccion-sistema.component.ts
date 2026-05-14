import { Component } from '@angular/core';

interface SideNavToggle{
  screenWidth: number;
  collapsed: boolean;
}


@Component({
  selector: 'app-seccion-productos',
  templateUrl: './seccion-sistema.component.html',
  styleUrls: ['./seccion-sistema.component.css']
})
export class SeccionSistemaComponent {

  isSideNavCollapsed = false;
  screenWidth = 0;

  onToggleSideNav(data: SideNavToggle): void{
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  // public sidebarItems = [
  //   {label: 'Listado', icon: 'label', url: './list'},
  //   {label: 'Añadir', icon: 'add', url: './new-hero'},
  //   {label: 'Buscar', icon: 'search', url: './search'},
  // ]

  public navbarData = [
    {
      url:'lista-producto',
      icon: 'list_alt',
      label: 'Llanito System'
    },
    // {
    //   url:'lista-producto-en-web',
    //   icon: 'travel_explore',
    //   label: 'Productos en la Web'
    // },
  ]
}
