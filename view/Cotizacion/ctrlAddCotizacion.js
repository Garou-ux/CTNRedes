//#region Variables
var tabla;
var TmpMaestro = {};
var f = 0;

//#endregion
//aqui se obtiene el parametro enviado, que viene siendo el id de la cotizacion
window.$_GET = new URLSearchParams(location.search);
var CotizacionId = $_GET.get('CotizacionId');



//Si cotizacionid es 0, significa que sera una nueva, si es>0 es una cotizacion a editar
if(CotizacionId == 0){
    $('#TituloPagina').text('Nueva Cotización');
}
if(CotizacionId>0){
    $('#TituloPagina').text('Cotización #'+CotizacionId+''); 
}

//#region carga el dropdown de clientes(usuarios)
function CargaDropdownClientes(){
    $.post("../../controller/ctrlUsuario.php?op=ListaUsuariosClientes",
     function(data){
      $('#Cotizacion_ClienteId').html(data);
    });
}
//#endregion

//#region funcion que obtiene el evento onchange del select de clientes y asi cargamos el nombre del cliente al input
function GetUsuarioCliente(){
    //Se obtiene el valor seleccionado
    var select = document.getElementById('Cotizacion_ClienteId');
                  var option = select.options[select.selectedIndex];
          var UsuarioId = option.value;
          //llamamos al servicio para obtener los datos del cliente y mostrarlos en el input
    $.post("../../controller/ctrlUsuario.php?op=GetUsuario",
    {UsuarioId : UsuarioId }, function(data){
        data = JSON.parse(data);//parseamos a objeto json los valores de la bd
        $('#Cotizacion_NombreCliente').val(data.RazonSocial);
        $('#Cotizacion_Correo').val(data.Correo);
    });
}


//#endregion

//#region Seccion para el grid de material/productos

//#region Carga el array que contendra las columnas del gridmateriales
//Array que contendra los datos de la tabla de servicios
var GridProductoMaterial = [
    {
      Codigo: '<select style="width:150px"  id="ProductoMaterialId0"  class="form-control" onChange="fnSeleccProducto(0)"> '
    + '  <option value="">Seleccionar..</option> '
     + '</select>',
     Nombre: '<input style="width: 300px" type="text" id="txProductoConcatMaterial0" class="form-control" >',
      Cantidad: '<input type="number" id="txCantidadMaterial0" class="form-control" onChange="MontosRenglon(0)">',
      Precio: '<input type="number" id="txPrecio0" class="form-control" onChange="MontosRenglon(0)">',
      Total: '<input type="number" id="txTotal0" class="form-control" disabled>',
      Agregar_Eliminar : '<button type="button" id="AddFilaGridMaterial"  class="btn btn-inline btn-success btn-sm ladda-button"><div><i class="fa fa-plus"></i></div></button>',
    }
    ];
    //contendra el cuerpo de la tabla
    var tableBody = "";
    //almacenara las columnas
    var columns = [];
  
    // se crean las columnas dela tabla
    tableBody = tableBody + "<tr>";
    for(var prop in GridProductoMaterial[0]) {
      if(GridProductoMaterial[0].hasOwnProperty(prop)) {
  
        tableBody = tableBody + ("<th>" + prop + "</th>");
  
        // lista de columnas.
        columns.push(prop);
      }
    }
  
    tableBody = tableBody + "</tr>";
  
  
    // se crean las filas de la tabla
    GridProductoMaterial.forEach(function(row) {
      // se crea una fila por cada indice del array
      tableBody = tableBody + "<tr>";
  
      columns.forEach(function(cell) {
        // Cell es el nombre de cada columna
        // row[cell] obtiene el valor de cada fila
        tableBody = tableBody + "<td>" + row[cell] + "</td>";
      });
  
      tableBody = tableBody + "</tr>";
    });
    //agregamos el cuerpo de la tabla
    $("#GridMateriales").append(tableBody);
  
    //Se llena el primer dropdown
  $.post("../../controller/ctrlProducto.php?op=ListProducto",
  {Caso : 0}, function(data){
  $('#ProductoMaterialId0').html(data);
  });
  //funcion que llena el dropdown de servicios
  function CargaDropdownProductos(Id){
  $.post("../../controller/ctrlProducto.php?op=ListProducto",
  {Caso : 0}, function(data){
    $('#ProductoMaterialId'+Id+'').html(data);
  });
  }
  
  //#endregion
  
  //#region funcion selecciona producto: detecta cuando se selecciona un producto en el dropdown de gridservicios, obteniendo los datos del producto
  function fnSeleccProducto(index){
    var select = document.getElementById('ProductoMaterialId'+index+'');
                  var option = select.options[select.selectedIndex];
          var ProductoId = option.value;
          // console.log(ProductoId);
          $.post("../../controller/ctrlProducto.php?op=GetProducto",
          {ProductoId : ProductoId}, function(data){
            data = JSON.parse(data);//parseamos a objeto json los valores de la bd
  $('#txProductoConcatMaterial'+index+'').val(data.Descripcion);
            // console.log(data.Descripcion);
          });
  
  
  }
  //#endregion
  
  //#region Eliminar/Agregar filas al grid de servicios
  $("#AddFilaGridMaterial").click(function (){
    // alert('uwu');
    f+=1; //ira aumentando el indice por cada fila agregada
  
    GridProductoMaterial.push({
      Codigo: '<select style="width:150px"  id="ProductoMaterialId'+f+'"  class="form-control" onChange="fnSeleccProducto('+f+')"> '
    + '  <option value="">Seleccionar..</option> '
     + '</select>',
     Nombre: '<input style="width: 300px" type="text" id="txProductoConcatMaterial'+f+'" class="form-control" >',
      Cantidad: '<input type="number" id="txCantidadMaterial'+f+'" class="form-control" onChange="MontosRenglon('+f+')">',
      Precio: '<input type="number" id="txPrecio'+f+'" class="form-control" onChange="MontosRenglon('+f+')">',
      Total: '<input type="number" id="txTotal'+f+'" class="form-control" disabled>',
      Agregar_Eliminar : '<button type="button" id="'+f+'" class="btn btn-inline btn-danger btn-sm ladda-button btn_row_deleteMaterial"><div><i class="fa fa-trash"></i></div></button>'})
  
      //Cargamos el dropdown
      CargaDropdownProductos(f);
      // Se crean las filas
      GridProductoMaterial.forEach(function(row) {
        //se crea la fila de la tabla con su indice.
        tableBody = '<tr id="rowMaterial'+f+'">';
  
        columns.forEach(function(cell) {
          // Cell es el nombre de cada columna
            // row[cell] obtiene el valor de cada fila
          tableBody = tableBody + "<td>" + row[cell] + "</td>";
        });
  
        tableBody = tableBody + "</tr>";
      });
  
      $("#GridMateriales").append(tableBody);
  
    });
  
  
    //funcion para eliminar fila de la tabla gridservicios
    $(document).on('click','.btn_row_deleteMaterial', function(){
  
  
        var row_id = $(this).attr("id"); //se obtiene el id de la fila
        f-=1; //se resta el indice
        //Eliminanos el index del array
        GridProductoMaterial.splice(f,1);
        //elimina la fila de la tabla
        $('#rowMaterial'+row_id+'').remove();
        // console.log(GridProductoMaterial);
  
    });
  
    //#endregion
  
  //#endregion

  //#region Funcion para calcular lo totales de la cotizacion
function MontosRenglon(index){
    var Cantidad =0, Precio = 0, Total = 0;
    Cantidad= $('#txCantidadMaterial'+index+'').val();
    Precio = $('#txPrecio'+index+'').val(); 
  

    if (Cantidad>0 && Precio>0){
Total = Cantidad * Precio;
Total = parseFloat(Total).toFixed(2);
$('#txTotal'+index+'').val(Total); 

// SpanSubtotal SpanIVA SpanTotal
//Recorremos todos los valores de la tabla para asi obtener los totales de los productos ya sumados
let SubTotal = 0, TotalCot = 0, IVA = 0, TotalCantidad =0, TotalPrecio = 0;
for (var i = 0; i<GridProductoMaterial.length; i++){
    TotalPrecio += parseFloat(document.getElementById("GridMateriales").rows[i+1].cells[4].firstChild.value);
}

SubTotal = TotalPrecio;
IVA = SubTotal * 0.16;
TotalCot = SubTotal + IVA;


// TotalCot = TotalPrecio;
// SubTotal = TotalCot / 1.16;
// IVA  = TotalCot * 0.16;

TotalCot = parseFloat(TotalCot).toFixed(2);
SubTotal = parseFloat(SubTotal).toFixed(2);
IVA  = parseFloat(IVA).toFixed(2);
$('#SpanSubtotal').text(SubTotal); 
$('#SpanIVA').text(IVA); 
$('#SpanTotal').text(TotalCot); 
    }
}
  //#endregion


//#region funcion que se encarga de guardar los datos de la cotizacion
$(() => {
    $('#BtnGuardaCotizacion').click(e => {



//Ahora obtenemos los datos del grid de Productos/Materiales

var TMaestroMateriales = [];
for(var i = 0;i<GridProductoMaterial.length;i++){
  TMaestroMateriales.push({
    //Se aplica el +1 ya que el primer tr es de las columnas y no de las filas
  CotizacionDetId : 0,
    ProductoId: Number(document.getElementById("GridMateriales").rows[i+1].cells[0].firstChild.value),
    Descripcion: document.getElementById("GridMateriales").rows[i+1].cells[1].firstChild.value,
    Cantidad: Number(document.getElementById("GridMateriales").rows[i+1].cells[2].firstChild.value),
    Precio: parseFloat(document.getElementById("GridMateriales").rows[i+1].cells[3].firstChild.value),
    Total: parseFloat(document.getElementById("GridMateriales").rows[i+1].cells[4].firstChild.value),
  });
  }
  //Parseamos a JSON el objeto para mandar como parametro al stored
  const Detalle = JSON.stringify(TMaestroMateriales);
  

//Ahora obtenemos los datos en general (Maestro)
let MaestroReporte ={};


MaestroReporte.CotizacionId = Number(CotizacionId);
MaestroReporte.ClienteId = $("#Cotizacion_ClienteId").val();
MaestroReporte.ClienteId = Number(MaestroReporte.ClienteId);
MaestroReporte.Contacto = $("#Cotizacion_Contacto").val();
MaestroReporte.Correo = $("#Cotizacion_Correo").val();
//totales
MaestroReporte.SubTotal = $("#SpanSubtotal").text();
MaestroReporte.IVA = $("#SpanIVA").text();
MaestroReporte.Total = $("#SpanTotal").text();

MaestroReporte.SubTotal =parseFloat(MaestroReporte.SubTotal);
MaestroReporte.IVA =parseFloat(MaestroReporte.IVA);
MaestroReporte.Total =parseFloat(MaestroReporte.Total);
// totales

//Ya con los datos listos, validamos que existan nulos



if(Detalle == undefined || Detalle.length<=0){
  swal('Agregue al menos un producto','','warning');
  return;
}


if(MaestroReporte.Total == undefined || MaestroReporte.Total <=0 || isNaN(MaestroReporte.Total)){
  swal('Capture los totales del reporte','','warning');
  return;
}

// console.log(MaestroReporte);
var vMaestro = [];
vMaestro.push(MaestroReporte);
const Maestro = JSON.stringify(vMaestro);
console.log(Maestro);
console.log(Detalle);

$.post("../../controller/ctrlCotizacion.php?op=AddCotizacion",
{ Maestro : Maestro, Detalle : Detalle}, 
function(data){
 //Obtenemos el Nuevo ReporteServicioId generado para mandarlo como parametro y que se genere el pdf
//  data = JSON.parse(data);

swal("Proceso Completado Correctamente","","success");

//Obtenemos el pdf que se genera
//local
 //var _url = "http://localhost/TICKETSV1/Reportes/ReporteServicio.php?ReporteServicioId="+data.ReporteServicioId+"";

//server
 var _url = "http://ctnredes.com/Reportes/ReporteServicio.php?ReporteServicioId="+data.ReporteServicioId+"";


// console.log(_url);
//Mandamos a imprimir el reporte
    //   printJS({ printable: _url, type: 'pdf', showModal: true })
// LimpiarDatosReporteServicio();
});

    });
})



//#endregion




  //Ejecutamos la funcion para llenar el select de los clientes
  CargaDropdownClientes();