<?php

class Cotizacion extends Conectar{

    //Esta funcion obtiene la lista de las cotizaciones
    public function ListaCotizacion(){
        $conectar = parent::Conexion();
        parent::set_names();
        $query ="call Cotizacion_ListCotizacion()";
        $query =$conectar->prepare($query);
        $query->execute();
        return $resultado =$query->fetchAll();
    }

    //esta funcion agrega/edita una cotizacion
    public function AddCotizacion($Maestro, $Detalle){
        $conectar = parent::Conexion();
        parent::set_names();
        $query = "call Cotizacion_AddCotizacion(?,?)";
        $query = $conectar->prepare($query);
        $query->bindParam(1,$Maestro);
        $query->bindParam(2,$Detalle);
        $query->execute();
    return $resultado = $query->fetchAll();
    }

    
    public function GetCotizacion($CotizacionId){
        $conectar = parent::Conexion();
        parent::set_names();
        $query = "call Cotizacion_GetCotizacion(?)";
        $query = $conectar->prepare($query);
        $query->bindParam(1,$CotizacionId);
        $query->execute();
        return $resultado = $query->fetchAll();
    }

    
    //obtiene los datos para el encabezado del reporte
    public function ReporteCotizacion($CotizacionId){
$conectar = parent::Conexion();
parent::set_names();
$query = "call Cotizacion_ReporteCotizacion(?)";
$query = $conectar->prepare($query);
$query->bindParam(1,$CotizacionId);
$query->execute();
return $resultado = $query->fetchAll();
    }

    //Obtiene los datos para el detalle del reporte
    public function ReporteCotizacionDet($CotizacionId){
 $conectar = parent::Conexion();
 parent::set_names();
 $query = "call Cotizacion_ReporteCotizacionDet(?)";
 $query = $conectar->prepare($query);
 $query->bindParam(1,$CotizacionId);
 $query->execute();
 return $resultado = $query->fetchAll();
    }
}

?>