var pageCounter = 1;
var animalContainer = document.getElementById("job-info");
var btn = document.getElementById("btn");

btn.addEventListener("click", function() {
  var ourRequest = new XMLHttpRequest();
  ourRequest.open('GET', 'http://localhost:3000/experiencia-laboral.json');
  ourRequest.onload = function() {
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
      console.log("connection was a success");
      var ourData = JSON.parse(ourRequest.responseText);
      renderHTML(ourData);
    } else {
      console.log("We connected to the server, but it returned an error.");
    }
    
  };

  ourRequest.onerror = function() {
    console.log("Connection error");
  };

  ourRequest.send();
  pageCounter++;
  if (pageCounter > 3) {
    btn.classList.add("hide-me");
  }
});

function renderHTML(data) {
  var htmlString = "";

  for (j = 0; j < data.experiencia_laboral.length; j++) {
    htmlString += "<p>"+ data.experiencia_laboral.length + " , "+ data.experiencia_laboral[j].empresa + " , "+data.experiencia_laboral[j].puesto + " , "+data.experiencia_laboral[j].descripcion + " , "+data.experiencia_laboral[j].fechaInicio + " , "+data.experiencia_laboral[j].fechaFin;

  }

  htmlString += '.</p>';

  animalContainer.insertAdjacentHTML('beforeend', htmlString);
}