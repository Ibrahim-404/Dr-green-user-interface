import { AfterViewInit, Component, effect, Input, signal, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { MyAddress, MyAddressModel } from '../../interfaces/my-address';
export interface BranchMapMarker {
  branch: any;
  position: {
    lat: number;
    lng: number;
  };
  title: string;
  options: {
    animation: google.maps.Animation;
  };
  label: string;
  click?: () => void;
}
@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrl: './add-address.component.scss'
})
export class AddAddressComponent implements AfterViewInit {
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;
  @Input() addressData:MyAddress=new MyAddressModel();
  branches = signal<any[]>([]);
  center: google.maps.LatLngLiteral = { lat: 46.8182, lng: 8.2275 }; // Center of Switzerland
  zoom = 8;
  markers: BranchMapMarker[] = [];
  selectedBranch = signal<any | null>(null);
  locationCtrl:number|null=null
  isDefaultCtrl:boolean=false
  addAddressForm: FormGroup;
  constructor(fb:FormBuilder) {
    this.addAddressForm = fb.group({
      latitude: [''],
      longitude: [''],
      addressLocation: [''],
      detail: [''],
      phoneNumber: [''],
      fName: [''],
      lName: [''],
      location: this.locationCtrl,
      isDefault: [''],
      customerId: ['']
    });

    effect(
      () => {
        // Assign markers to data
        this.markers = this.getMarkers();
      },
      { allowSignalWrites: true }
    );
  }

  ngAfterViewInit(): void {
    if (this.addressData.id !== 0) {
      this.setValue();
    }
  }
  setValue(){
    this.addAddressForm.patchValue(this.addressData)
  }
  addAddress(){
    console.log(this.addAddressForm.value)
  }
  getMarkers() {
    return this.branches()
      .map((branch) => {
        const marker: BranchMapMarker = {
          label: '',
          position: { lat: branch.lat, lng: branch.lng },
          title: branch.name,
          options: { animation: google.maps.Animation.DROP },
          branch: branch,
        };
        return marker;
      })
      .filter(
        (marker) => !isNaN(marker.position.lat) && !isNaN(marker.position.lng)
      );
  }

  openInfoWindow(branch: any, marker: MapMarker): void {
    this.selectedBranch.set(branch);
    if (this.infoWindow) {
      this.infoWindow.open(marker);
    }
  }







  // @ViewChild(GoogleMap, {static: false}) map!: GoogleMap;
  // center: google.maps.LatLngLiteral = { lat: 24, lng: 12 };
  // zoom = 4;
  // mapStyle: google.maps.MapTypeStyle[] = [
  //   {
  //     featureType: 'administrative',
  //     elementType: 'geometry',
  //     stylers: [
  //       {
  //         visibility: 'off',
  //       },
  //     ],
  //   },
  //   {
  //     featureType: 'administrative.land_parcel',
  //     stylers: [
  //       {
  //         visibility: 'off',
  //       },
  //     ],
  //   },
  //   {
  //     featureType: 'administrative.neighborhood',
  //     stylers: [
  //       {
  //         visibility: 'off',
  //       },
  //     ],
  //   },
  //   {
  //     featureType: 'administrative.province',
  //     elementType: 'geometry',
  //     stylers: [
  //       {
  //         visibility: 'off',
  //       },
  //     ],
  //   },
  //   {
  //     featureType: 'poi',
  //     stylers: [
  //       {
  //         visibility: 'off',
  //       },
  //     ],
  //   },
  //   {
  //     featureType: 'poi',
  //     elementType: 'labels.text',
  //     stylers: [
  //       {
  //         visibility: 'off',
  //       },
  //     ],
  //   },
  //   {
  //     featureType: 'poi.attraction',
  //     stylers: [
  //       {
  //         visibility: 'off',
  //       },
  //     ],
  //   },
  //   {
  //     featureType: 'poi.business',
  //     stylers: [
  //       {
  //         visibility: 'off',
  //       },
  //     ],
  //   },
  //   {
  //     featureType: 'road',
  //     stylers: [
  //       {
  //         visibility: 'off',
  //       },
  //     ],
  //   },
  //   {
  //     featureType: 'road',
  //     elementType: 'labels',
  //     stylers: [
  //       {
  //         visibility: 'off',
  //       },
  //     ],
  //   },
  //   {
  //     featureType: 'road',
  //     elementType: 'labels.icon',
  //     stylers: [
  //       {
  //         visibility: 'off',
  //       },
  //     ],
  //   },
  //   {
  //     featureType: 'road.highway',
  //     stylers: [
  //       {
  //         visibility: 'off',
  //       },
  //     ],
  //   },
  //   {
  //     featureType: 'transit',
  //     stylers: [
  //       {
  //         visibility: 'off',
  //       },
  //     ],
  //   },
  //   {
  //     featureType: 'transit.line',
  //     stylers: [
  //       {
  //         visibility: 'off',
  //       },
  //     ],
  //   },
  //   {
  //     featureType: 'transit.station',
  //     stylers: [
  //       {
  //         visibility: 'off',
  //       },
  //     ],
  //   },
  //   {
  //     featureType: 'water',
  //     elementType: 'labels.text',
  //     stylers: [
  //       {
  //         visibility: 'off',
  //       },
  //     ],
  //   },
  // ];
  // options: google.maps.MapOptions = {
  //   zoomControl: true,
  //   scrollwheel: false,
  //   disableDoubleClickZoom: true,
  //   styles: this.mapStyle,
  //   gestureHandling: 'cooperative',
  //   mapTypeId : google.maps.MapTypeId.HYBRID,
  // };
}
