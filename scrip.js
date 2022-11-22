//Cuando ocurre el evento página Web cargada el navegador llama a la función DocumentoCargado()
window.onload=DocumentoCargado; 

//En esta función se capturan todos los eventos requeridos por el script
function DocumentoCargado(){
   let checkboxP1 = document.getElementById("P1"); //obtiene los elementos del documento html y los asigna a variables
   let checkboxP2 = document.getElementById("P2"); 
   let checkboxP3 = document.getElementById("P3"); 
   let cantpersonasP1 = document.getElementById("cantP1");
   let cantpersonasN1 = document.getElementById("cantN1");
   let cantpersonasM1 = document.getElementById("cantM1");
   let cantpersonasP2 = document.getElementById("cantP2");
   let cantpersonasN2 = document.getElementById("cantN2");
   let cantpersonasM2 = document.getElementById("cantM2");
   let cantpersonasP3 = document.getElementById("cantP3");
   let cantpersonasN3 = document.getElementById("cantN3");
   let cantpersonasM3 = document.getElementById("cantM3");
   cantpersonasP1.onchange = selectP1personas; // Se ejecuta la función selectp1personas() cuando ocurre el evento
   cantpersonasN1.onchange = selectN1personas;
   cantpersonasM1.onchange = selectM1personas;
   cantpersonasP2.onchange = selectP2personas;
   cantpersonasN2.onchange = selectN2personas;
   cantpersonasM2.onchange = selectM2personas;
   cantpersonasP3.onchange = selectP3personas;
   cantpersonasN3.onchange = selectN3personas;
   cantpersonasM3.onchange = selectM3personas;
   checkboxP1.onclick = checkboxP1Apretado; 
   checkboxP2.onclick = checkboxP2Apretado;
   checkboxP3.onclick = checkboxP3Apretado;

   MostrarPrecioTotal(); // llama a la función 
}
//Cuando el usuario aprieta el checkbox, se debe mostrar u ocultar el objeto select

function checkboxP1Apretado()
{
   if(document.getElementById("P1").checked == true)
   {
       document.getElementById("MostrarP1").style.display = "block";
       document.getElementById("ResumenP1").style.display = "block";
       
   }
   else
   {
       document.getElementById("MostrarP1").style.display = "none";
       document.getElementById("ResumenP1").style.display = "none";
       
   }
   MostrarPrecioTotal();
}
function checkboxP2Apretado()
{
   if(document.getElementById("P2").checked == true)
   {
       document.getElementById("MostrarP2").style.display = "block";
       document.getElementById("ResumenP2").style.display = "block";
   }
   else
   {
       document.getElementById("MostrarP2").style.display = "none";
       document.getElementById("ResumenP2").style.display = "none";
   }
   MostrarPrecioTotal();
}
function checkboxP3Apretado()
{
   if(document.getElementById("P3").checked == true)
   {
       document.getElementById("MostrarP3").style.display = "block";
       document.getElementById("ResumenP3").style.display = "block";
   }
   else
   {
       document.getElementById("MostrarP3").style.display = "none";
       document.getElementById("ResumenP3").style.display = "none";
   }
   MostrarPrecioTotal();
}
// En base a los checkbox y los objetos select, esta función calcula el precio total
function MostrarPrecioTotal()
{
  let parcialTour1 = 0;
  let parcialTour2 = 0;
  let parcialTour3 = 0;
  let precio = 0;
  let porcentajeDescuento = 0;
  let tours = ["Quinquela Martin Tour","Boca Boca Tour","Tango Tour"];
  let precioTour1 = [1000,1000,600,600];
  let precioTour2 = [1000,1000,500,500];
  let precioTour3 = [1000,1000,700,700];
  let contratados = [0,0,0];

  if (document.getElementById("P1").checked) {

    if ( hayGente("cantP1","cantN1","cantM1") ){
      contratados[0] = 1;
      parcialTour1 = calcularCostoTour(precioTour1,"cantP1","cantN1","cantM1");
    } 
    else {
      contratados[0] = 0;
      parcialTour1 = 0;
    }
      presentarResumen(1,tours,precioTour1);
    }

  if (document.getElementById("P2").checked)
  {
      if ( hayGente("cantP2","cantN2","cantM2") ){
        contratados[1] = 1;
        parcialTour2 = calcularCostoTour(precioTour2,"cantP2","cantN2","cantM2");
      }
      else{
         contratados[1] = 0;
         parcialTour2 = 0;
      
    }
    presentarResumen(2,tours,precioTour1);

  }
  if (document.getElementById("P3").checked)
  {
    if ( hayGente("cantP3","cantN3","cantM3") ){ 
        contratados[2] = 1;
        parcialTour3 = calcularCostoTour(precioTour3,"cantP3","cantN3","cantM3");
        
      }else{
        contratados[2] = 0;
        parcialTour3 = 0;
      } 
      
      presentarResumen(3,tours,precioTour1);

    }

  let cantContratados = contratados[0]+contratados[1]+contratados[2];
  precio = parcialTour1 + parcialTour2 + parcialTour3;
  mostrarDescuento(cantContratados);
  porcentajeDescuento = tipoDescuento(cantContratados);
  precio = (precio * (1-porcentajeDescuento));


  let formateado = precio.toLocaleString("en");  
  document.getElementById("preciototal").innerHTML= "Precio total: $" + formateado;

}

function  tipoDescuento(cantContratados){
  if (cantContratados == 3) return 0.2;
  if (cantContratados == 2) return 0.1;
  return 0;
}

function mostrarDescuento(cantContratados){
  
  switch (cantContratados){
    case 2:
      document.getElementById("descuento").innerHTML= "Aplica un descuento del 10%";
      break;
    case 3:
      document.getElementById("descuento").innerHTML= "Aplica un descuento del 20%";
      break;
    default:
      document.getElementById("descuento").innerHTML= "Se aplicara un descuento del 10% cuando se contrate dos tours o del 20% cuando se contraten 3 tours.";
  }



  }





function presentarResumen(numTour,tour,precioTour){

  let textTour = "Precio base "+tour[0]+" = $"+ precioTour[0];
  let parcialAdulto = precioTour[1]*document.getElementById("cantP"+numTour).value;
  let textAdult = "Costo por adulto "+precioTour[1]+" X " + document.getElementById("cantP"+numTour).value+" = $"+parcialAdulto;
  let parcialMenor = precioTour[2]*document.getElementById("cantN"+numTour).value;
  let textMenor = "Costo por menor "+precioTour[2]+" X " + document.getElementById("cantN"+numTour).value+" = $"+parcialMenor;
  let parcialMayor = precioTour[3]*document.getElementById("cantM"+numTour).value;
  let textMayor = "Costo por adulto mayor "+precioTour[3]+" X " + document.getElementById("cantM"+numTour).value+" = $"+parcialMayor;
  let parciales =  parcialAdulto + parcialMenor + parcialMayor;
  let subtotal = 0;
  if (parciales>0) subtotal = precioTour[0] + parciales;
  let formateado = subtotal.toLocaleString("en");

  document.getElementById("tourP"+numTour).innerHTML = textTour ;
  document.getElementById("adultoP"+numTour).innerHTML = textAdult;
  document.getElementById("menorP"+numTour).innerHTML = textMenor;
  document.getElementById("adultoMayorP"+numTour).innerHTML = textMayor;
  document.getElementById("subTotalP"+numTour).innerHTML = "Subtotal: $"+formateado;


}


function hayGente(adulto, menorEdad, adultoMayor){
    return (document.getElementById(adulto).value > 0 || document.getElementById(adultoMayor).value > 0 || document.getElementById(menorEdad).value > 0 );
}

function calcularCostoTour(precioTour, adulto, menorEdad, adultoMayor){

    return precioTour[0] + precioTour[1] * document.getElementById(adulto).value + precioTour[2] * document.getElementById(menorEdad).value + precioTour[3] * document.getElementById(adultoMayor).value;

}


//Se ejecuta cuando cambia el valor del select
function selectP1personas()
{
  MostrarPrecioTotal();
}
function selectM1personas()
{
  MostrarPrecioTotal();
}
function selectN1personas()
{
  MostrarPrecioTotal();
}
function selectP2personas()
{
  MostrarPrecioTotal();
}
function selectM2personas()
{
  MostrarPrecioTotal();
}
function selectN2personas()
{
  MostrarPrecioTotal();
}

function selectP3personas()
{
  MostrarPrecioTotal();
}
function selectN3personas()
{
  MostrarPrecioTotal();
}
function selectM3personas()
{
  MostrarPrecioTotal();
}