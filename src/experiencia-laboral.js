const express = require('express');
const cors = require('cors')
var app = express();

/*const experiencias = [
  {"experiencia_laboral":[{"empresa":"cdargent" ,"puesto":"interno","descripcion":"aburrido" , "fechaInicio": new Date("2020-07-15"), "fechaFin": new Date("2021-07-15")}]} 
]*/
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

app.listen(process.env.PORT || 3000, (a) => {
  console.log("Servidor disponible en http://localhost:3000")
});

module.exports=app;