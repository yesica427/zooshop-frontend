import { Component, OnInit } from '@angular/core';
import {LoginService} from 'src/app/services/login.service'
import {HttpClient}  from '@angular/common/http';
import {faPaw} from '@fortawesome/free-solid-svg-icons'
import {faDog} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-detallescompra',
  templateUrl: './detallescompra.component.html',
  styleUrls: ['./detallescompra.component.css']
})

export class DetallescompraComponent implements OnInit {
  
  fapaw=faPaw;
  listaCompras:any ={
    descripcion:'',
    usuario:'',
    producto:''

  }

  constructor(private loginService:LoginService, private httpclient:HttpClient) { }

  ngOnInit(): void {
    this.loginService.validarUsuarioActual();
    this.verCompras();
  }


  verCompras(){
    console.log("de detalle compras");
    var  usuario=this.loginService.obtenerUsuarioActual()
    this.httpclient.get( `https://api-zooshop.herokuapp.com/detallescompras/${usuario}`
   
  
    ).subscribe(res=>{
      
      this.listaCompras=res
        console.log(res);
      
        
       });
    
   
      }



}
