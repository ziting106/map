import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  map: any = [];
  constructor() {}

  LeafIcon: any = L.Icon.extend({
    options: {
      shadowUrl: '../assets/location-shadow.png',
      iconSize: [21, 30], //icon大小
      shadowSize: [30, 27], //陰影大小
      iconAnchor: [10.5, 30], //icon定位，[X/2,Y]
      shadowAnchor: [13, 13], //陰影定位，[X/2,Y]
      popupAnchor: [0, -30], //彈出視窗位置，Y軸為-的iconY軸
    },
  });
  greenIcon = new this.LeafIcon({ iconUrl: '../assets/location-green.png' });
  redIcon = new this.LeafIcon({ iconUrl: '../assets/location-red.png' });
  yellowIcon = new this.LeafIcon({ iconUrl: '../assets/location-yellow.png' });
  blueIcon = new this.LeafIcon({ iconUrl: '../assets/location-blue.png' });

  ngOnInit(): void {
    //指定欲繪製地圖在id為map的元素中，中心座標為[25.0249211,121.5075035]，縮放程度為16
    this.map = L.map('map', { center: [25.0249211, 121.5075035], zoom: 16 });
    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        attribution:
          '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    tiles.addTo(this.map);

    console.log('papaya');

    const marker = [
      L.marker([25.0249211, 121.5075035], {
        title: '我是座標',
        icon: this.yellowIcon,
      })
        .addTo(this.map)
        .bindPopup('<h1>豬豬一號</h1>'),
      L.marker([25.0259211, 121.5075035], {
        title: '我是座標',
        icon: this.blueIcon,
      })
        .addTo(this.map)
        .bindPopup('<h1>豬豬二號</h1>'),
      L.marker([25.0209211, 121.5075035], {
        title: '我是座標',
        icon: this.redIcon,
      })
        .addTo(this.map)
        .bindPopup('<h1>豬豬三號</h1>'),
    ];

    // 點擊座標後顯示
    for (const a of marker) {
      a.openPopup(); //開啟彈出視窗
      console.log(a);
    }
  }
}
