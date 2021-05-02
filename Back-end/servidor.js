var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');




var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))

const jwt = require('jsonwebtoken')
app.use(cors());


//conexion

const {
  Pool
} = require('pg');
const {
  json
} = require('body-parser');
const pool = new Pool()

// This will be undefined since the property on pg is "Client" no "pgClient"


const config = {
  user: 'postgres',
  host: 'localhost',
  password: 'root',
  database: 'zooshop'
};



//query 









// conexion//



//obtener producto

app.get('/productos', function (req, res) {



  const pool = new Pool(config);
  const getproductos = async () => {
    try {
      const resu = await pool.query('select * from productos');
      console.log(resu.rows);
      res.send(resu.rows);

    } catch (error) {
      console.log(error);
    }
  }
  getproductos()
});



//obtener productos por categoria
app.get('/productos/:id', function (req, res) {



  const pool = new Pool(config);

  const getproductosbyid = async () => {
    try {
      const resu = await pool.query('select * from productos where fk_idcategoria=$1  ', [req.params.id]);
      console.log(resu.rows);
      res.send(resu.rows);

    } catch (error) {
      console.log(error);
    }
  }
  getproductosbyid()
});


//obtener productos por ID
app.get('/productosid/:id', function (req, res) {



  const pool = new Pool(config);

  const getProductosId = async () => {
    try {
      const resu = await pool.query('select * from productos where id_producto=$1  ', [req.params.id]);
      console.log(resu.rows);
      res.send(resu.rows);

    } catch (error) {
      console.log(error);
    }
  }
  getProductosId()
});


//obtener usuarios
app.get('/usuarios/:id', function (req, res) {

  const pool = new Pool(config);
  const getUsuarios = async () => {
    try {
      const resultado = await pool.query('select * from usuarios where id_usuario=$1', [req.params.id]);
      console.log(resultado.rows);
      res.send(resultado.rows);

      if (req.params.id != res.id_usuario) {
        console.log("Usuario no registrado")
      }

    } catch (error) {
      console.log(error);
      throw new Error(err.message)

    }
  }

  getUsuarios()
})



//probando


//Agregar usuario por id



app.post('/crearusuario', function (req, res) {


  const pool = new Pool(config);
  const {
    authentication
  } = {}

  postCrearUsuario = async () => {

    try {
      const {
        nombre,
        idusuario,
        correo,
        contrasenia
      } = req.body;


      console.log(req.body.nombre)
      const response = await pool.query('INSERT INTO usuarios (nombre,correo,contrasenia) VALUES ($1,$2,$3) ', [nombre, correo, contrasenia])

      console.log(response);
      res.json({
        message: 'registro exitoso',
        body: {
          usuario: {
            nombre,
            idusuario,
            correo,
            contrasenia
          }

        }
      })

      // const token= jwt.sign({idusuario:newUser.id_usuario},'secretKey')
      // res.status(200).json({token})

    } catch (error) {
      console.log(error);


    }








  }



  postCrearUsuario();

});


//login 
app.post('/login', function (req, res) {


  const pool = new Pool(config);


  postLogin = async () => {

    try {
      const {
        usuario,
        contrasenia
      } = req.body;



      console.log(req.body.nombre)
      const response = await pool.query('select * from usuarios where correo=$1; ', [usuario])

      console.log(response);
      if (response.rows.length > 0) {
        console.log("existe correo")
        const response2 = await pool.query('select * from usuarios where contrasenia=$1 and correo=$2; ', [contrasenia, usuario])

        if (response2.rows.length > 0) {
          console.log("correo y contrasenia correcto")
          res.json({
            message: 'login exitoso',
            codigo: 1,
            body: {
              usuario: {
                id_usuario: response2.rows[0].id_usuario
              }

            }
          })


        } else {
          console.log("la contrasenia es incorrecta")
          res.json({
            message: ' contrasenia Incorrecta',
            codigo: 0,
           
          })

        }

      } else {
        res.json({
            message:'correo no existe',
            codigo:2,
           
                })
        console.log("No existe el correo")
      }

      //  res.json({
      //  message:'registro exitoso',
      //  body:{
      //    usuario:{
      //       nombre,idusuario,correo,contrasenia}

      //        }
      //      })

      // const token= jwt.sign({idusuario:newUser.id_usuario},'secretKey')
      // res.status(200).json({token})

    } catch (error) {
      console.log(error);


    }








  }



  postLogin();

});









//obtener categorias



app.get('/categorias', function (req, res) {
  const pool = new Pool(config);

  const getCategorias = async () => {
    try {
      const resultado = await pool.query('select * from categorias');
      console.log(resultado.rows);
      res.send(resultado.rows);

    } catch (error) {
      console.log(error);

    }
  }

  getCategorias()
});


//mostrae compras
app.get('/detallescompras/:id', function (req, res) {
    const pool = new Pool(config);
  
    const getCompras = async () => {
      try {
        const resultado = await pool.query('select * from compras where fk_idusuario=$1',[req.params.id]);
        console.log(resultado.rows);
        res.send(resultado.rows);
  
      } catch (error) {
        console.log(error);
  
      }
    }
  
    getCompras()
  });
  



//crear compra

app.post('/anadircompra', function (req, res) {

  const pool = new Pool(config);
  const postCompras = async () => {

    const {
    
      descripcion,
      fk_idusuario,
      fk_idproducto
    } = req.body;
    const response = await pool.query('INSERT INTO compras (descripcion,fk_idusuario,fk_idproducto ) VALUES ($1,$2,$3)', [descripcion, fk_idusuario, fk_idproducto])
    console.log(response);
    res.json({
      message: 'compra exitosa',
      body: {
        compra: {
         
          descripcion,
          fk_idusuario,
          fk_idproducto
        }

      }
    })




  }

  postCompras()
});





//obtener compras

app.get('/compras', function (req, res) {

  const pool = new Pool(config);
  const getCompras = async () => {
    try {
      const resu = await pool.query('select * from compras');
      console.log(resu.rows);
      res.send(resu.rows);

    } catch (error) {
      console.log(error);

    }
  }

  getCompras()


});



app.listen(8888, function () {
  console.log("servidor levantado")
});


//crearcompra
