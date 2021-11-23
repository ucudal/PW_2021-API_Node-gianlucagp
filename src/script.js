var pageCounter = 1;
var animalContainer = document.getElementById("job-info");
var btn = document.getElementById("btn");

btn.addEventListener("click", function() {
  var ourRequest = new XMLHttpRequest();
  ourRequest.open('GET', 'http://localhost:3000/api/experiencia.json');
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


  for (i = 0; i < data.length; i++) {
    
    for (j = 0; j < data[i].experiencia_laboral.length; j++) {
      htmlString += "<p>" + data[i].experiencia_laboral[0].empresa + " , "+data[i].experiencia_laboral[0].puesto + " , "+data[i].experiencia_laboral[0].descripcion + " , "+data[i].experiencia_laboral[0].fechaInicio + " , "+data[i].experiencia_laboral[0].fechaFin;

    }

    htmlString += '.</p>';

  }

  animalContainer.insertAdjacentHTML('beforeend', htmlString);
}