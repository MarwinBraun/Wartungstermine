<?php




header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET,POST,OPTIONS");
header("Access-Control-Allow-Headers: *, Accept, Authorization, X-Requested-With, Content-Type, Origin");
header('Content-type: application/json');

$kdi = $_GET["TerminID"];





$serverName = "SRV-DB";
$connectionInfo = array("Database"=>"powerbird", "UID"=>"powerbird", "PWD"=>"powerbird", "CharacterSet" => "UTF-8");
$conn = sqlsrv_connect( $serverName, $connectionInfo);
if( $conn === false ) {
     die( print_r( sqlsrv_errors(), true));
}





$sql = "delete from [wartungstermine].[dbo].[daten] where ID = '".$kdi."'";

$stmt = sqlsrv_query( $conn, $sql);
if( $stmt === false ) {
     die( print_r( sqlsrv_errors(), true));
}













?>