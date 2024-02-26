import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { defineElement } from '@lordicon/element';
import lottie from 'lottie-web';

interface MenuItem {
  name  : string;
  route : string;
  icon  : {
    src: string;
  };
}

@Component({
  standalone: true,
  imports: [ CommonModule, RouterModule ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {

  constructor() {
    defineElement(lottie.loadAnimation)
  }

  menuItems: MenuItem[] = [
    { route: '/maps/fullscreen', name: 'Fullscreen', icon: { src: 'https://cdn.lordicon.com/pbbsmkso.json' }},
    { route: '/maps/zoom-range', name: 'Zoom-Range', icon: { src: 'https://cdn.lordicon.com/unukghxb.json' }},
    { route: '/maps/markers',    name: 'Markers',    icon: { src: 'https://cdn.lordicon.com/surcxhka.json' }},
    { route: '/maps/properties', name: 'Houses',     icon: { src: 'https://cdn.lordicon.com/laqlvddb.json' }},
    { route: '/alone',           name: 'Alone Page', icon: { src: 'https://cdn.lordicon.com/uecgmesg.json' }},
  ]

}
