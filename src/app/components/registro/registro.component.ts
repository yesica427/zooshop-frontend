import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormControl,FormGroup,Validators} from  '@angular/forms'
import {faPaw} from '@fortawesome/free-solid-svg-icons'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import {faLock} from '@fortawesome/free-solid-svg-icons'
import {faEnvelope} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private httpclient:HttpClient) { }
faenvelope=faEnvelope;
fapaw=faPaw;
fauser=faUser;
falock=faLock;
  formularioregistro = new FormGroup({
    nombre: new FormControl('',Validators.required),
    correo: new FormControl ('',[Validators.required,Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),

    contrasenia: new FormControl ('',[Validators.required,Validators.minLength(8),Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,12}$/)])
  });

  ngOnInit(): void {
  }

  get nombre(){
    return this.formularioregistro.get('nombre');
  }
  

  get correo(){
    return this.formularioregistro.get('correo');
  }
  get contrasenia(){
    return this.formularioregistro.get('contrasenia');
  }


guardarUsuario(){
  

  console.log(this.formularioregistro.value);
 this.httpclient.post('https://api-zooshop.herokuapp.com/crearusuario',this.formularioregistro.value)
 .subscribe(res=>{

  console.log(res);
 });


}

}
