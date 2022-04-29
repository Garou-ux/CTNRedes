

//#region funcion que carga la tabla de las cotizaciones
function fnListaCotizaciones(){
    //#region Llenamos la tabla que contendra la lista de usuarios
    tabla=$('#GridCotizaciones').dataTable({
        "aProcessing": true,
        "aServerSide": true,
        dom: 'Bfrtip',
        "searching": true,
        lengthChange: false,
        colReorder: true,
        buttons: [		          
                
                'excelHtml5',
               
                ],
        "ajax":{
            url: '../../controller/ctrlCotizacion.php?op=ListaCotizacion',
            type : "post",
            dataType : "json",						
            error: function(e){
                console.log(e.responseText);	
            }
        },
        "bDestroy": true,
        "responsive": true,
        "bInfo":true,
        "iDisplayLength": 10,
        "autoWidth": false,
        "language": {
            "sProcessing":     "Procesando...",
            "sLengthMenu":     "Mostrar _MENU_ registros",
            "sZeroRecords":    "No se encontraron resultados",
            "sEmptyTable":     "Ningún dato disponible en esta tabla",
            "sInfo":           "Mostrando un total de _TOTAL_ registros",
            "sInfoEmpty":      "Mostrando un total de 0 registros",
            "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix":    "",
            "sSearch":         "Buscar:",
            "sUrl":            "",
            "sInfoThousands":  ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst":    "Primero",
                "sLast":     "Último",
                "sNext":     "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
        }     
    }).DataTable(); 
    //#endregion
    }


//#endregion

fnListaCotizaciones();


//#region funcion para mandar a imprimir el pdf de la cotizacion

function fnMostrarPDFCotizacion(Id){

  //local
   var _url = "http://localhost/TICKETSV1/Reportes/ReporteCotizacion.php?CotizacionId="+Id+"";
  
  //server
 
  
  //Mandamos a imprimir el reporte
  printJS({ printable: _url, type: 'pdf', showModal: true });
  }
  
  //#endregion