function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /*recorrer una colección de todos los elementos HTML:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      /*buscar elementos con un determinado atributo:*/
      file = elmnt.getAttribute("include-html");
      if (file) {
        /*realice una solicitud HTTP utilizando el valor del atributo como nombre de archivo:*/
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;}
            if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
            /*elimine el atributo y llame a esta función una vez más:*/
            elmnt.removeAttribute("include-html");
            includeHTML();
          }
        }      
        xhttp.open("GET", file, true);
        xhttp.send();
        /*salir de la función:*/
        return;
      }
    }
  };
  includeHTML();