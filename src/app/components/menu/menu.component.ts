import { Component, OnInit } from '@angular/core';
import {faPaw} from '@fortawesome/free-solid-svg-icons'
import { faShoppingBasket} from '@fortawesome/free-solid-svg-icons'
import { faCartArrowDown} from '@fortawesome/free-solid-svg-icons'
import {HttpClient}  from '@angular/common/http';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {FormControl,FormGroup,Validators} from  '@angular/forms'
import {LoginService} from 'src/app/services/login.service';
import { resetFakeAsyncZone } from '@angular/core/testing';
import {Router} from '@angular/router'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  [x: string]: any;

  fapaw=faPaw;
  fashopping=faShoppingBasket;
  faout=faCartArrowDown;
  valorCategoria:any="";

  seleccionado:number=0;
  produId:any=""
  productos:any=[];
    producto:any ={
      nombre:'',
      categoria:'',
      fk_idcategoria:'',
      url:'',
      descripcion:''
  


    }

    productoId:any=[]
productiId:any={
  nombre:'',
  categoria:'',
  fk_idcategoria:'',
  url:'',
  descripcion:''

}


    productobyid:any ={
      nombre:'',
      categoria:'',
      fk_idcategoria:'',
      url:'',
      descripcion:''
  
    }




    categorias:any={
      idcategoria:'',
      nombrecategoria:'',
      descripcion:''
    }

categoriasDogs:any[]=[
  {
  nombre:"Ball",
  url:"assets/Imagenes/pelotas.jpg",
  precio:"7$",
  Descripcion:"soft colored balls",
  seleccion:""
  
  
  },
  {nombre:"Bowl DOG",
  url:"assets/Imagenes/plato.jpg",
  precio:"10$",
  Descripcion:"aluminum dog bowl",
  seleccion:""},

  {nombre:"Accesories DOG",
  url:"assets/Imagenes/accesoriesdog.jpg",
  precio:"15$",
  Descripcion:"Accesories for you dog of all the colors",
  seleccion:""},

  {nombre:"Toys DOG",
  url:"assets/Imagenes/imagen11.jpg",
  precio:"15$",
  Descripcion:"to stimulate their teeth",
  seleccion:""},
  
  {nombre:"Clothes DOG",
  url:"assets/Imagenes/imagen9.jpg",
  precio:"30$",
  Descripcion:"Beatifull clothes",
  seleccion:""},
  
  {nombre:"Clothes DOG",
  url:"assets/Imagenes/imagen4.jpg",
  precio:"20$",
  Descripcion:"cute green sweatshirt",
  seleccion:""},
  
  
  
  ];

  closeResult = '';
  
 

  
  constructor( private httpclient:HttpClient,private modalService: NgbModal, private loginService:LoginService,private router:Router) { }
  formid = new FormGroup({
    idproducto: new FormControl('',Validators.required),


  })
  modalReference = null;



  ngOnInit(): void {
    this.categorias
   this.seleccionado=4;
    this.obtenerCategorias();
    this.obtenerProductos();
this.loginService.validarUsuarioActual();

  

  }

  get obteneridproducto(){
    return this.formid.get('idproducto');
  }

  

  open(content:any,id:number) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    //  this.produId = (<HTMLSelectElement>(
    //     document.getElementById("select-idproducto")
    //   )).value;
     
     console.log(id);
   
    this.httpclient.get(`https://api-zooshop.herokuapp.com/productosid/${id}`)
      .subscribe(res=>{
    
       
  
       this.productoId=res;
       console.log(this.productoId);
      
      
      });
  
  


  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  obtenerProductos(){
  

   
   this.httpclient.get('https://api-zooshop.herokuapp.com/productos')
   .subscribe(res=>{
  
    
    this.productos=res;
    console.log(this.productos);
   });
  
  
  }


//obtener categorias

obtenerCategorias(){
this.httpclient.get('https://api-zooshop.herokuapp.com/categorias')
   .subscribe(res=>{
  
    this.categorias=res;
    
  
  
    console.log(this.categorias);
    
    
   });


  }
 



 obtenerproductosid(){

   this.valorCategoria = (<HTMLSelectElement>(
    document.getElementById("select-categoria")
  )).value;
  console.log(this.valorCategoria);

  this.httpclient.get(`https://api-zooshop.herokuapp.com/productos/${this.valorCategoria}`)
    .subscribe(res=>{
  
     

     this.productobyid=res;
     console.log(this.productobyid);
    
    
    });
}


obtenerIdproducto(){

  
}


guardarCompras(id_producto:any,descripcion:string){
  this.httpclient.post( 'https://api-zooshop.herokuapp.com/anadircompra',{

 fk_idproducto:id_producto,
 descripcion:descripcion,
 fk_idusuario:this.loginService.obtenerUsuarioActual()

 

  }).subscribe(res=>{
    
      console.log(res);
     
       this.router.navigateByUrl('/detallescompra');
       

      
     });
  
  
    }



compraProductos(){
  
  // console.log(this.formularioregistro.value);
  // this.httpclient.post('http://localhost:8888/crearcompra',this.formularioregistro.value)
  // .subscribe(res=>{
 
  //  console.log(res);
  // });
 
 
 //}


}


}




