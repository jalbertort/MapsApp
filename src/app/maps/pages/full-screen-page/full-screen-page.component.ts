import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Map, MapStyle } from '@maptiler/sdk';

@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css'
})
export class FullScreenPageComponent implements AfterViewInit, OnDestroy{

  map: Map | undefined;

  @ViewChild('map')
  private mapContainer?: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {

    if( !this.mapContainer ) throw 'El elemento html no fue encontrado';

    const initialState = { lng: -69.73 , lat: 18.32, zoom: 6 };

     const map = new Map({
      container: this.mapContainer.nativeElement,
      style: MapStyle.STREETS,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom
    });

  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

}
