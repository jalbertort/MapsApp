import { Component } from '@angular/core';

interface MenuItem {
  name  : string;
  route : string;
  icon  : {
    src: string;
  };
}

@Component({
  selector: 'maps-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {

  menuItems: MenuItem[] = [
    { route: '/maps/fullscreen', name: 'Fullscreen', icon: { src: 'https://cdn.lordicon.com/pbbsmkso.json' }},
    { route: '/maps/zoom-range', name: 'Zoom-Range', icon: { src: 'https://cdn.lordicon.com/unukghxb.json' }},
    { route: '/maps/markers',    name: 'Markers', icon: { src: 'https://cdn.lordicon.com/surcxhka.json' }},
    { route: '/maps/properties', name: 'Houses', icon: { src: 'https://cdn.lordicon.com/laqlvddb.json' }},
  ]

}
