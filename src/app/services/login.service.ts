import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router:Router) { }


  urlBackend='https://api-zooshop.herokuapp.com';

 listausuarios:any=[]

  idUsuarioActual=""
validarUsuarioActual(){
  
   this.idUsuarioActual = JSON.parse(localStorage.getItem('idUsuarioActual'));
console.log(this.idUsuarioActual)
if(this.idUsuarioActual){
  console.log("existe un usuario Logueado")


}
else{
  console.log("no existe usuario logeado")
  this.router.navigateByUrl('/login');
}
}
 
logOut() {
  localStorage.setItem('idUsuarioActual', JSON.stringify(null));
}
obtenerUsuarioActual(){
   return JSON.parse(localStorage.getItem('idUsuarioActual'));
  
}

}
