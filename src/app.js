var express = require('express');
var cors = require('cors');
var path = require("path");
var helmet = require("helmet");
var cookieparser = require("cookie-parser");
var app = express();

app.use(cors());
app.use(helmet());

// allow the app to use cookieparser

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// allow the express server to read and render the static css file
app.use(express.static(path.join(__dirname, "..", "public")));

app.use(cookieparser());
app.set("view engine", "ejs");

// render the ejs views
app.set("views", path.join(__dirname, "views"));
/*const experiencias = [
  { "experiencia-laboral" : [ {"empresa":"cdargent","puesto":"interno","descripcion":"aburrido" , "fechaInicio": new Date("2020-07-15"), "fechaFin": new Date("2021-07-15") } ] }
]*/
const formularios = [
  { "nombreContacto" : "aaaa"}
]
const experiencias = {"experiencia_laboral":[{"empresa":"cdargent" ,"puesto":"interno","descripcion":"aburrido" , "fechaInicio": new Date("2020-07-15"), "fechaFin": new Date("2021-07-15")}, {"empresa":"tata" ,"puesto":"chorro","descripcion":"malandro" , "fechaInicio": new Date("2020-07-15"), "fechaFin": new Date("2021-07-15")}, {"empresa":"devoto" ,"puesto":"chorro","descripcion":"malandro" , "fechaInicio": new Date("2020-07-15"), "fechaFin": new Date("2021-07-15")}]};

app.get('/', function(req, res) {
  res.send("¡Hola mundo!")
});

app.get('/experiencia-laboral', function(req, res) {
  res.send(experiencias)
});

app.get('/experiencia-laboral.json', function(req, res) {
  res.send(experiencias)
});

app.get('/experiencia-laboral/:empresa', function(req, res) {
  const experiencia = experiencias.find(c => c.empresa.localeCompare(req.params.empresa)===0);
  if(!experiencia) res.status(404).send("404 no existe esa empresa");
  res.send(experiencia);
});




app.post('/enviar-formulario', function(req, res) {
  let PW_2021_CV_Contacto_cookie = req.cookies.PW_2021_CV_Contacto;
  var nombre = req.body.nombreContacto;
  //console.log(nombre);
  const formu = {
    nombreContacto: nombre
  }
  
  console.log(res.cookie.PW_2021_CV_Contacto);
  if(nombre==undefined) res.status(400).send("Falta el nombre de contacto");
  if(!nombre.trim()) res.status(404).send("Falta el nombre de contacto");
  formularios.push(formu);
  res.cookie("PW_2021_CV_Contacto", nombre, {
    secure: true // If served over HTTPS
  });
  return res.send(formu);
});

app.post('/*', function(req, res) {
  res.status(404).send("404 - No fue encontrado");
});

app.listen(process.env.PORT || 3000, (a) => {
  console.log("Servidor disponible en http://localhost:3000")
});

module.exports=app;