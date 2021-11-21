const express = require('express');
const app = express();

/*const experiencias = [
  { "experiencia-laboral" : [ {"empresa":"cdargent","puesto":"interno","descripcion":"aburrido" , "fechaInicio": new Date("2020-07-15"), "fechaFin": new Date("2021-07-15") } ] }
]*/

const experiencias = [
  {"empresa":"cdargent","puesto":"interno","descripcion":"aburrido" , "fechaInicio": new Date("2020-07-15"), "fechaFin": new Date("2021-07-15")} 
]

app.get('/', function(req, res) {
  res.send("¡Hola mundo!")
});

app.get('/api/experiencia.json', function(req, res) {
  res.send(experiencias)
});

app.get('/api/experiencia/:empresa', function(req, res) {
  const experiencia = experiencias.find(c => c.empresa.localeCompare(req.params.empresa)===0);
  if(!experiencia) res.status(404).send("404 no existe esa empresa");
  res.send(experiencia);
});

app.listen(process.env.PORT || 3000, (a) => {
  console.log("Servidor disponible en http://localhost:3000")
});

module.exports=app;