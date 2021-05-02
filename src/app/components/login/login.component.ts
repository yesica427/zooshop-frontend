import { Component, OnInit } from '@angular/core';
import {faPaw} from '@fortawesome/free-solid-svg-icons'
import {faDog} from '@fortawesome/free-solid-svg-icons'
import{faCat} from '@fortawesome/free-solid-svg-icons'
import{faLockOpen} from '@fortawesome/free-solid-svg-icons'
import { faSignInAlt} from '@fortawesome/free-solid-svg-icons'
import {FormControl,FormGroup,Validators} from  '@angular/forms'
import {Router} from '@angular/router'

import {HttpClient, JsonpClientBackend}  from '@angular/common/http';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  fapaw=faPaw;
  fadog=faDog;
  facat=faCat;
  faopen=faLockOpen;
  faalt=faSignInAlt;

  // usuarios:any=[];

   usuarios:any={
     nombre:'',
       correo:'',
   contrasenia:''
  };


  


  constructor(private httpclient:HttpClient, private router:Router) { }


  formularioiniciosesion = new FormGroup({
    usuario: new FormControl ('',[Validators.required,Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
    contrasenia: new FormControl ('',[Validators.required,Validators.minLength(8),Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,12}$/)])
  });





  ngOnInit(): void {
  }

    get usuario(){
      return this.formularioiniciosesion.get('usuario');
    }
    

    get contrasenia(){
      return this.formularioiniciosesion.get('contrasenia');
    }

  


 guardar() {
 
 console.log(this.formularioiniciosesion.value);
this.httpclient.post(`https://api-zooshop.herokuapp.com/login`,this.formularioiniciosesion.value)
  .subscribe(res=>{
  
    
  //  this.usuarios=res;
  console.log(res);
 

  
  var resJson = JSON.parse(JSON.stringify(res));
  if(resJson.codigo==1){
    console.log("correo correcto")
    localStorage.setItem('idUsuarioActual', JSON.stringify(resJson.body.usuario.id_usuario));
    this.router.navigateByUrl('/menu');


  }
  else if(resJson.codigo==0){
    console.log(resJson.message)

  }
  else {console.log(resJson.message)}
  });
  



    

     }





    


    }