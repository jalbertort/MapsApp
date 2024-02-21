import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

import * as maptiler from '@maptiler/sdk';

import '@maptiler/sdk/dist/maptiler-sdk.css';
import { environment } from '../../../../environments/environment';

(maptiler as any).config.apiKey = environment.maptiler_key;

@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css'
})
export class FullScreenPageComponent implements AfterViewInit, OnDestroy{

  map: maptiler.Map | undefined;

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {

    const initialState = { lng: -69.73 , lat: 18.32, zoom: 6 };

     this.map = new maptiler.Map({
      container: this.mapContainer.nativeElement,
      style: maptiler.MapStyle.STREETS,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom
    });

  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

}
