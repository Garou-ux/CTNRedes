<?php 

class Producto extends Conectar{

    //Esta funcion obtiene la lista de las categorias de los productos, se utiliza en dropdowns
    public function ListProductoCategoria() {
        $conectar = parent::Conexion();
        parent::set_names();
        $query ="call Producto_ListProductoCategoria()";
        $query =$conectar->prepare($query);
        $query->execute();
        return $resultado =$query->fetchAll();
    }

//Esta funcion obtiene la lista de los productos
public function ListProducto($Caso){
    $conectar = parent::Conexion();
    parent::set_names();
    $query = "call Producto_ListProducto(?)";
    $query = $conectar->prepare($query);
    $query ->bindParam(1,$Caso);
    $query->execute();
    return $resultado = $query->fetchAll();
}

//Esta funcion obtiene los datos de un producto x id
    public function GetProducto ($ProductoId){
        $conectar = parent::Conexion();
        parent::set_names();
        $query = "call Producto_GetProducto(?)";
        $query = $conectar->prepare($query);
        $query->bindParam(1,$ProductoId);
        $query->execute();
        return $resultado = $query->fetchAll();
    }

    //esta funcion agrega/edita un producto/servicio x id
    public function AddProductoServicio($Maestro){
        $conectar = parent::Conexion();
        parent::set_names();
        $query = "call Producto_AddProductoServicio(?)";
        $query = $conectar->prepare($query);
        $query->bindParam(1,$Maestro);
        $query->execute();
        return $resultado = $query->fetchAll();
    }
}
?>