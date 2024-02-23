import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Map, MapStyle, LngLat } from '@maptiler/sdk';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css'
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('map') private mapDiv?: ElementRef;

  map?: Map;
  zoom: number = 8.03;
  currentLngLat: LngLat = new LngLat(-70.258, 18.881);
  configZoom = { min: 3, max: 18 };
  // const initialState = { lng: -71.414, lat: 18.664, zoom: 7.46 };

  ngAfterViewInit(): void {

    if( !this.mapDiv ) throw 'El elemento html no fue encontrado';

     this.map = new Map({
      container: this.mapDiv.nativeElement,
      style: MapStyle.STREETS,
      center: this.currentLngLat,
      zoom: this.zoom,
      minZoom: this.configZoom.min,
      maxZoom: this.configZoom.max,
    });

    this.mapListeners();

  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  mapListeners(): void {
    if ( !this.map ) throw 'Map no inicializado';

    this.map.on('zoom', (env) => {
      this.zoom = this.map!.getZoom();
    })

    this.map.on('move', (env) => {
      this.currentLngLat = this.map!.getCenter()
    })
  }

  zoomIn() {
    this.map?.zoomIn();
  }

  zoomOut() {
    this.map?.zoomOut();
  }

  zoomChanged( value: string ) {
    this.zoom = Number(value);
    this.map?.zoomTo( this.zoom );
  }

}
