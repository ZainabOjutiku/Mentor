import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './http.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { createOfflineCompileUrlResolver } from '@angular/compiler';
import { DomSanitizer } from '@angular/platform-browser';
import { } from 'googlemaps';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'public';
  newMentor;
  newMentor2 = { location: '' };
  newMentee;
  allMentors;
  currentMentor;
  logComponent = false;
  createComponent = false;
  selectedFile = File;

  // map;
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  mapProp;
  locations = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI',
    'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN',
    'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH',
    'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA',
    'WI', 'WV', 'WY', 'AS', 'GU', 'MP', 'PR', 'VI', 'UM', 'FM', 'MH', 'PW']
  states = {
    'AL': [32.6010112, -86.6807365],
    'AK': [61.3025006, -158.7750198],
    'AZ': [34.1682185, -111.930907],
    'AR': [34.7519275, -92.1313784],
    'CA': [37.2718745, -119.2704153],
    'CO': [38.9979339, -105.550567],
    'CT': [41.5187835, -72.757507],
    'DE': [39.145251, -75.4189206],
    'DC': [38.8993487, -77.0145666],
    'FL': [25.7823907, -80.2994988],
    'GA': [32.6781248, -83.2229757],
    'HI': [20.46, -157.505],
    'ID': [45.4945756, -114.1424303],
    'IL': [39.739318, -89.504139],
    'IN': [39.7662195, -86.441277],
    'IA': [41.9383166, -93.389798],
    'KS': [38.4987789, -98.3200779],
    'KY': [37.8222935, -85.7682399],
    'LA': [30.9733766, -91.4299097],
    'ME': [45.2185133, -69.0148656],
    'MD': [38.8063524, -77.2684162],
    'MA': [42.0629398, -71.718067],
    'MI': [44.9435598, -86.4158049],
    'MN': [46.4418595, -93.3655146],
    'MS': [32.5851062, -89.8772196],
    'MO': [38.3046615, -92.437099],
    'MT': [46.6797995, -110.044783],
    'NE': [41.5008195, -99.680902],
    'NV': [38.502032, -117.0230604],
    'NH': [44.0012306, -71.5799231],
    'NJ': [40.1430058, -74.7311156],
    'NM': [34.1662325, -106.0260685],
    'NY': [40.7056258, -73.97968],
    'NC': [35.2145629, -79.8912675],
    'ND': [47.4678819, -100.3022655],
    'OH': [40.1903624, -82.6692525],
    'OK': [35.3097654, -98.7165585],
    'OR': [44.1419049, -120.5380993],
    'PA': [40.9945928, -77.6046984],
    'RI': [41.5827282, -71.5064508],
    'SC': [33.62505, -80.9470381],
    'SD': [44.2126995, -100.2471641],
    'TN': [35.830521, -85.9785989],
    'TX': [31.1693363, -100.0768425],
    'UT': [39.4997605, -111.547028],
    'VT': [43.8717545, -72.4477828],
    'VA': [38.0033855, -79.4587861],
    'WA': [38.8993487, -77.0145665],
    'WV': [38.9201705, -80.1816905],
    'WI': [44.7862968, -89.8267049],
    'WY': [43.000325, -107.5545669]
  }
  states2 = [
    [32.6010112, -86.6807365],
    [61.3025006, -158.7750198],
    [34.1682185, -111.930907],
    [34.7519275, -92.1313784],
    [37.2718745, -119.2704153],
    [38.9979339, -105.550567],
    [41.5187835, -72.757507],
    [39.145251, -75.4189206],
    [38.8993487, -77.0145666],
    [25.7823907, -80.2994988],
    [32.6781248, -83.2229757],
    [20.46, -157.505],
    [45.4945756, -114.1424303],
    [39.739318, -89.504139],
    [39.7662195, -86.441277],
    [41.9383166, -93.389798],
    [38.4987789, -98.3200779],
    [37.8222935, -85.7682399],
    [30.9733766, -91.4299097],
    [45.2185133, -69.0148656],
    [38.8063524, -77.2684162],
    [42.0629398, -71.718067],
    [44.9435598, -86.4158049],
    [46.4418595, -93.3655146],
    [32.5851062, -89.8772196],
    [38.3046615, -92.437099],
    [46.6797995, -110.044783],
    [41.5008195, -99.680902],
    [38.502032, -117.0230604],
    [44.0012306, -71.5799231],
    [40.1430058, -74.7311156],
    [34.1662325, -106.0260685],
    [40.7056258, -73.97968],
    [35.2145629, -79.8912675],
    [47.4678819, -100.3022655],
    [40.1903624, -82.6692525],
    [35.3097654, -98.7165585],
    [44.1419049, -120.5380993],
    [40.9945928, -77.6046984],
    [41.5827282, -71.5064508],
    [33.62505, -80.9470381],
    [44.2126995, -100.2471641],
    [35.830521, -85.9785989],
    [31.1693363, -100.0768425],
    [39.4997605, -111.547028],
    [43.8717545, -72.4477828],
    [38.0033855, -79.4587861],
    [38.8993487, -77.0145665],
    [38.9201705, -80.1816905],
    [44.7862968, -89.8267049],
    [43.000325, -107.5545669]
  ];



  constructor(
    private _httpService: HttpService,
    private _router: Router,
    public sanitizer: DomSanitizer
  ) {
  }

  ngOnInit() {
    this.newMentor = { name: ' ', url: ' ', description: '', skills: [''] };

    this.newMentee = { name: ' ', description: ' ' };
    this.allMentors = [];
    this.currentMentor = { id: '', ratings: [] };
    this.getAllMentors();
    var mapProp = {
      center: new google.maps.LatLng(38.4987789, -98.3200779),
      zoom: 4,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    let markers = [];
    for (let i = 0; i < this.states2.length; i++) {
      this["marker" + i] = new google.maps.Marker({
        position: { lat: this.states2[i][0], lng: this.states2[i][1] },
        map: this.map,
      });
    }
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

  getAllMentors() {
    console.log('getting mentors');
    let observable = this._httpService.getAllMentors();
    observable.subscribe(data => {
      console.log(this.allMentors);
      console.log(data['data']);
      this.allMentors = data['data'];
    });


  }
  createMentorComponent() {
    this.createComponent = true;

  }
  makeNewMentor() {
    let observable = this._httpService.createMentor(this.newMentor);
    observable.subscribe(data => {
      console.log('creating data', data);
      this.getAllMentors();
      this.newMentor = { name: ' ', url: ' ', description: '', skills: [''] };
      this._httpService.scrollTo('services');
      // this._router.navigate(["/"]);
      this.createComponent = false;



    });

  }
  loginComponent() {
    this.logComponent = true;
  }

  makeNewMentee() {
    let observable = this._httpService.createMentee(this.newMentee);
    observable.subscribe(data => {
      console.log('creating mentee', data);
      this.newMentee = { name: ' ', description: ' ' };
      // this._httpService.scrollTo("services");
      this.logComponent = false;



    });

  }
  viewMentor(id) {
    for (var i = 0; i < this.allMentors.length; i++) {
      if (this.allMentors[i]._id == id) {
        this.currentMentor = this.allMentors[i];
      }

    }
    this._httpService.scrollTo('person');

    console.log(this.currentMentor);
  }


  scrollTo(str) {
    let topPos = document.getElementById(str);
    window.scrollTo({
      top: topPos.offsetTop,
      left: 0,
      behavior: 'smooth'
    });
  }
  searchState() {
    console.log(this.newMentor2.location);
    var mapProp = {
      center: new google.maps.LatLng(this.states[this.newMentor2.location][0], this.states[this.newMentor2.location][1]),
      zoom: 9,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    let count = 0;
    let arr = [];
    for (let i = 0; i < this.allMentors.length; i++) {
      if (this.allMentors[i].location == this.newMentor2.location) {
        count++;
        arr.push(this.allMentors[i].name);
      }
    }
    let infowindows = [];
    let markers = [];
    let infowindow = new google.maps.InfoWindow();
    for (let i = 0; i < count; i++) {
      this["zmarker" + i] = new google.maps.Marker({
        position: {
          lat: this.states[this.newMentor2.location][0] + (
            Math.random() / 10), lng: this.states[this.newMentor2.location][1] + (Math.random() / 10)
        },
        map: this.map,
      });
      markers.push(this["zmarker" + i]);
      let markerDummy = markers[markers.length - 1];
      google.maps.event.addListener(markerDummy, 'click', function (event) {
        infowindow.setContent(arr[i]);
        infowindow.open(this.map, this);
      });
    }
  }
}
