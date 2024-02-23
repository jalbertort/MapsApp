import { Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, MapStyle, Map, Marker } from '@maptiler/sdk';

interface MarkerAndColor {
  color: string;
  marker: Marker;
}

interface PlainMarker {
  color: string;
  lngLat: number[];
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent {

  @ViewChild('map') private mapDiv?: ElementRef;

  map?: Map;
  zoom: number = 15.09;
  currentLngLat: LngLat = new LngLat(-70.0147, 18.5273);
  configZoom = { min: 3, max: 18 };
  markers: MarkerAndColor[] = [];

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

    this.readFromLocalStorage();

    // Creando los marker con otros iconos

    // const markerHtml = document.createElement('lord-icon')
    // markerHtml.setAttribute("trigger","loop-on-hover");
    // markerHtml.setAttribute("src","https://cdn.lordicon.com/surcxhka.json");
    // markerHtml.setAttribute("stroke","bold");
    // markerHtml.setAttribute("colors","primary:#e83a30,secondary:#000000");
    // markerHtml.setAttribute("style","width:50px;height:50px");

    // const marker = new Marker({
    //   element: markerHtml,
    // })
    // .setLngLat(this.currentLngLat)
    // .addTo(this.map);

  }

  createMarker() {

    if ( !this.map ) return;

    // Para generar codigo hexadecimal para colores ramdon
    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat = this.map.getCenter();

    this.addMarker(lngLat, color);

  }

  addMarker(  lngLat: LngLat, color: string ) {

    if(!this.map) return;

    const marker = new Marker({
      color: color,
      draggable:true,
    })
      .setLngLat( lngLat )
      .addTo( this.map );

    this.markers.push({ color, marker });
    this.saveToLocalStorage();

    marker.on('dragend', () => {
      this.saveToLocalStorage();
    })

  }

  deleteMarker(index: number) {
    this.markers[index].marker.remove();
    this.markers.splice( index, 1 );
  }

  flyTo( marker: Marker ) {
    this.map?.flyTo({
      zoom: 17,
      center: marker.getLngLat(),
    })
  }

  saveToLocalStorage() {

    const plainMarker: PlainMarker[] = this.markers.map(  ({ color, marker }) => {
      return {
        color,
        lngLat: marker.getLngLat().toArray()
      }
    })

    localStorage.setItem( 'plainMarkers', JSON.stringify( plainMarker ) )
  }

  readFromLocalStorage() {

    const plainMarkerString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PlainMarker[] = JSON.parse( plainMarkerString ); //! Ojo: esto no es seguro, al menos que conozcas bien el resultado!

    plainMarkers.forEach( ({ lngLat, color }) => {

      const [ lng, lat ] = lngLat;
      const coords = new LngLat( lng, lat )

      this.addMarker( coords, color );
    });
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

}
