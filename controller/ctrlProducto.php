<?php
require_once("../config/conexion.php");
require_once("../models/Producto.php");

$Producto =  new Producto();


switch($_GET["op"]){

    //Obtiene la categoria de los productos, se usa en dropdowns
    case "ListarProductoCategoria":
        $Datos = $Producto->ListProductoCategoria();
        //Se valida que se tengan datos
        if(is_array($Datos) == true and count($Datos)>0){
            $html = "<option></option>";
foreach($Datos as $row){
$html.="<option value='".$row["ProdCategoriaId"]."'>".$row["Categoria"]."</option>";
}
echo $html;
        }
        break;

        //Obtiene la lista de los productos, se usa en dropdowns
        case "ListProducto":
$Datos = $Producto->ListProducto($_POST["Caso"]);
//Se valida que se tengan datos
if(is_array($Datos) == true and count($Datos)>0){
    $html = "<option></option>";
    foreach($Datos as $row){
$html.="<option value='".$row["ProductoId"]."'>".$row["ProductoConcat"]."</option>";
    }
    echo $html;
}
            break;

            //Obtiene los datos de un producto x id
            case "GetProducto":
                $Datos=$Producto->GetProducto($_POST["ProductoId"]);  
                //Se valida que se tengan datos
                if(is_array($Datos)==true and count($Datos)>0){
                foreach($Datos as $row)
                {
                    $output["ProductoId"] = $row["ProductoId"];
                    $output["Clave"] = $row["Clave"];
                    $output["Descripcion"] = $row["Descripcion"];
            
                    $output["ClaveSat"] = $row["ClaveSat"];
                    $output["ProdCategoriaId"] = $row["ProdCategoriaId"];         
                    $output["EsServicio"] = $row["EsServicio"]; 
                    $output["Uso"] = $row["Uso"];             
                }
                echo json_encode($output);
                }   
                break;

                //agrega edita un producto/servicio
                case "AddProducto" :
                    $Datos = $Producto->AddProductoServicio($_POST["Maestro"]);
                    break;

                    //llena la tabla de productos
                    case "ListaProductosGrid":
                        $Datos = $Producto->ListProducto($_POST["Caso"]);
                        $DataTable = Array();
                        foreach ($Datos as $row){
                        $sub_array = array();
                        $sub_array[] = $row["ProductoId"];
                        $sub_array[] = $row["Clave"];
                        $sub_array[] = $row["ProductoConcat"];
                        $sub_array[] = $row["ClaveSat"];
                        $sub_array[] = $row["Categoria"];
                        switch($row["Uso"]){
                            case "1":
                            $sub_array[] = '<span class="label label-success">Activado</span>';
                            break;
                        
                            case "0":
                            $sub_array[] = '<span class="label label-warning">Desactivado</span>';
                            break;
                            }
                        $sub_array[] = '<button onClick="fnEditarProductoServicio('.$row["ProductoId"].',1,'.$row["EsServicio"].');" id="'.$row["ProductoId"].'" class="btn btn-inline btn-primary btn-sm ladda-button" title="Permite editar un producto"><div><i class="fa fa-edit"></div>';
                        $sub_array[] = '<button onClick="fnEditarProductoServicio('.$row["ProductoId"].',2,'.$row["EsServicio"].');" id="'.$row["ProductoId"].'" class="btn btn-inline btn-danger btn-sm ladda-button" title="Desactiva un producto"><div><i class="fa fa-trash"></div>';
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
}
?>