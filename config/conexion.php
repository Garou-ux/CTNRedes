<?php
session_start();

class Conectar {
    protected $db;
    protected function Conexion(){
        try{
                     //local
            $conectar = $this ->db = 
          new PDO("mysql:host=localhost;dbname=conectotaldb", "root", "");


            return $conectar;
        }catch(Exception $e){
print "Ocurrio un error al establecer conexión con la base de datos, intentelo de nuevo" . $e->getMessage(). "<br/>";
die();
        }
    }

    public function set_names(){
        return $this->db->query("SET NAMES 'utf8'");
    }


public static function ruta(){

    //server
   
    
    //local
    return "http://localhost/TICKETSV1/";
}
}
?>