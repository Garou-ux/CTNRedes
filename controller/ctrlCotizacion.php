<?php 
require_once("../config/conexion.php");
require_once("../models/Cotizacion.php");

$Cotizacion = new Cotizacion();

switch($_GET["op"]){

    //Obtiene los datos para llenar el grid de listacotizacion
    case "ListaCotizacion" :
        $Datos = $Cotizacion->ListaCotizacion();
        $DataTable = Array();
        foreach ($Datos as $row){
        $sub_array = array();
        $sub_array[] = $row["CotizacionId"];
        $sub_array[] = $row["Nombre"];
        $sub_array[] = $row["SubTotal"];
        $sub_array[] = $row["IVA"];
        $sub_array[] = $row["Total"];
        $sub_array[] = '<button onClick="fnMostrarPDFCotizacion('.$row["CotizacionId"].');" id="'.$row["CotizacionId"].'" class="btn btn-inline btn-danger btn-sm ladda-button" title="Imprime un pdf con la información de la cotización"><div><i class="fa fa-file-pdf-o"></i></div>';
       
        $DataTable[] = $sub_array;
    
        }
    
        $DataTableProps = array(
        "sEcho"=>1,
        "iTotalRecords"=>count($DataTable),
        "iTotalDisplayRecords"=>count($DataTable),
        "aaData"=>$DataTable
        );
        echo json_encode($DataTableProps);
        break;


        //Agrega/Edita una cotizacion
        case "AddCotizacion":
$Datos = $Cotizacion->AddCotizacion($_POST["Maestro"], $_POST["Detalle"]);
            break;
}

?>