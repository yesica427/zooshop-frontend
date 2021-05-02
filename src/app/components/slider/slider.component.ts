import { Component, OnInit } from '@angular/core';
import{NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  imagenes :any[]=[
    {
      name:"Accesorios",
      url:'assets/Imagenes/camas-para-perros.jpeg',
      description:"Lo mejor para tus consentidos"
    },



    {
      name:"Accesorios zooshop",
      url:'assets/Imagenes/accesories1.jpg',
      description:""
    },



    {
      name:"clothes zooshop",
      url:'assets/Imagenes/imagen9.jpg',
      description:""
    },


    {
      name:"clothes Zooshop",
      url:'assets/Imagenes/imagen8.jpg',
      description:""
    },

    
    {
      name:"clothes Zooshop",
      url:'assets/Imagenes/cats1.jpg',
      description:""
    },

  ];

  constructor(_config:NgbCarouselConfig) {

    _config.interval=2000;
    _config.pauseOnHover=true;
    _config.showNavigationArrows=false;
   }

  ngOnInit(): void {
  }

}
