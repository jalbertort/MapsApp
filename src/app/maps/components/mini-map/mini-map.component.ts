import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { MapStyle, Map, Marker } from '@maptiler/sdk';

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent {

  @Input() lngLat?: [number, number];

  @ViewChild('map') private mapDiv?: ElementRef;

  map?: Map;
  zoom: number = 15.20;

  ngAfterViewInit(): void {

    if( !this.lngLat ) throw 'La LngLat no estan cargados';
    if( !this.mapDiv ) throw 'Map div not fount';

     this.map = new Map({
      container: this.mapDiv.nativeElement,
      style: MapStyle.STREETS,
      center: this.lngLat,
      zoom: this.zoom,
      interactive: false,
    });

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));

    new Marker({
      color: color,
    })
      .setLngLat( this.lngLat )
      .addTo( this.map );
  }

}
