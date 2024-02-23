import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Map, MapStyle } from '@maptiler/sdk';

@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css'
})
export class FullScreenPageComponent implements AfterViewInit, OnDestroy{

  map: Map | undefined;

  @ViewChild('map')
  private mapDiv?: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {

    if( !this.mapDiv ) throw 'El elemento html no fue encontrado';

    // const initialState = { lng: -71.414, lat: 18.664, zoom: 7.46 };
    const initialState = { lng: -70.258, lat: 18.881, zoom: 8.03 };

     const map = new Map({
      container: this.mapDiv.nativeElement,
      style: MapStyle.STREETS,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom
    });

  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

}
