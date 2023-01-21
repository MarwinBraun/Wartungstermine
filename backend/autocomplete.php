<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');


$serverName = "SRV-DB";
$connectionInfo = array("Database"=>"powerbird", "UID"=>"powerbird", "PWD"=>"powerbird", "CharacterSet" => "UTF-8");
$conn = sqlsrv_connect( $serverName, $connectionInfo);
if( $conn === false ) {
     die( print_r( sqlsrv_errors(), true));
}

$kdi = $_GET['val'];



$sql = "Select [ID]
      ,[Dokument_Nummer]
      ,[Kunde_Anrede]
      ,[Kunde_Name1]
      ,[Kunde_Name2]
      ,[Kunde_Strasse]
      ,[Kunde_Landeskennz]
      ,[Kunde_Postleitzahl]
      ,[Kunde_Ort]
      ,[Kdi_BesuchEMail]
      ,[Datum_Dokument]
      ,[Liefer_AdressNummer]
      ,[Liefer_Anrede]
      ,[Liefer_Name1]
      ,[Liefer_Name2]
      ,[Liefer_Name3]
      ,[Liefer_Tel_LandWahl]
      ,[Liefer_Tel_Vorwahl]
      ,[Liefer_Tel_Rufnummer]
      ,[Liefer_Tel_Durchwahl]
      ,[Datum_Ersterfassung]
      ,[Zeit_Ersterfassung]
      ,[DOK_Phase]
      ,[DOK_Disposition_Datum]
      ,[DOK_Disposition_Zeit]
      ,[Kdi_Gruppe]
      ,[KdiWartung_VertragNr]
      ,[KdiEingang_AnsprPart]
      ,[Kdi_AuftrBeschreibng]
      ,[KdiTermin_Datum]
      ,[KdiTermin_Uhrzeit]
      ,[KdiTermin_BisUhrzeit]
      ,[KdiTermin_Dauer]
      ,[Kdi_RechEMail]
      ,[Kdi_Terminwunsch]
      ,[Stoerungscode]
      ,[Kdi_GebaeudeKomplex]
      ,[Kdi_Gebaeude]
      ,[KDI_WVAnlageArt]
      ,[TerminBestaetigungsdatum]
  FROM [wartungstermine].[dbo].[daten]

where Dokument_Nummer like '%$kdi%' or
Kdi_Gebaeude like '%$kdi%' or
KdiTermin_Datum like '%$kdi%' or
Liefer_AdressNummer like '%$kdi%' or
Liefer_Name1 like '%$kdi%' or
Liefer_Name2 like '%$kdi%'";

$stmt = sqlsrv_query( $conn, $sql);
if( $stmt === false ) {
     die( print_r( sqlsrv_errors(), true));
}

$json = new stdClass();
$json->daten = [];

while($obj = sqlsrv_fetch_object( $stmt)) {
$helper = new stdClass();

$helper->ID = utf8_encode(utf8_decode($obj->ID));
$helper->Dokument_Nummer = utf8_encode(utf8_decode($obj->Dokument_Nummer));
$helper->Kunde_Anrede = utf8_encode(utf8_decode($obj->Kunde_Anrede));
$helper->Kunde_Name1 = utf8_encode(utf8_decode($obj->Kunde_Name1));
$helper->Kunde_Name2 = utf8_encode(utf8_decode($obj->Kunde_Name2));
$helper->Kunde_Strasse = utf8_encode(utf8_decode($obj->Kunde_Strasse));
$helper->Kunde_Landeskennz = utf8_encode(utf8_decode($obj->Kunde_Landeskennz));
$helper->Kunde_Postleitzahl = utf8_encode(utf8_decode($obj->Kunde_Postleitzahl));
$helper->Kunde_Ort = utf8_encode(utf8_decode($obj->Kunde_Ort));
$helper->Kdi_BesuchEMail = utf8_encode(utf8_decode($obj->Kdi_BesuchEMail));
$helper->Datum_Dokument = utf8_encode(utf8_decode($obj->Datum_Dokument));
$helper->Liefer_AdressNummer = utf8_encode(utf8_decode($obj->Liefer_AdressNummer));
$helper->Liefer_Anrede = utf8_encode(utf8_decode($obj->Liefer_Anrede));
$helper->Liefer_Name1 = utf8_encode(utf8_decode($obj->Liefer_Name1));
$helper->Liefer_Name2 = utf8_encode(utf8_decode($obj->Liefer_Name2));
$helper->Liefer_Name3 = utf8_encode(utf8_decode($obj->Liefer_Name3));
$helper->Liefer_Tel_LandWahl = utf8_encode(utf8_decode($obj->Liefer_Tel_LandWahl));
$helper->Liefer_Tel_Vorwahl = utf8_encode(utf8_decode($obj->Liefer_Tel_Vorwahl));
$helper->Liefer_Tel_Rufnummer = utf8_encode(utf8_decode($obj->Liefer_Tel_Rufnummer));
$helper->Liefer_Tel_Durchwahl = utf8_encode(utf8_decode($obj->Liefer_Tel_Durchwahl));
$helper->Datum_Ersterfassung = utf8_encode(utf8_decode($obj->Datum_Ersterfassung));
$helper->Zeit_Ersterfassung = utf8_encode(utf8_decode($obj->Zeit_Ersterfassung));
$helper->DOK_Phase = utf8_encode(utf8_decode($obj->DOK_Phase));
$helper->DOK_Disposition_Datum = utf8_encode(utf8_decode($obj->DOK_Disposition_Datum));
$helper->DOK_Disposition_Zeit = utf8_encode(utf8_decode($obj->DOK_Disposition_Zeit));
$helper->Kdi_Gruppe = utf8_encode(utf8_decode($obj->Kdi_Gruppe));
$helper->KdiWartung_VertragNr = utf8_encode(utf8_decode($obj->KdiWartung_VertragNr));
$helper->KdiEingang_AnsprPart = utf8_encode(utf8_decode($obj->KdiEingang_AnsprPart));
$helper->Kdi_AuftrBeschreibng = utf8_encode(utf8_decode($obj->Kdi_AuftrBeschreibng));
$helper->KdiTermin_Datum = utf8_encode(utf8_decode($obj->KdiTermin_Datum));
$helper->KdiTermin_Uhrzeit = utf8_encode(utf8_decode($obj->KdiTermin_Uhrzeit));
$helper->KdiTermin_BisUhrzeit = utf8_encode(utf8_decode($obj->KdiTermin_BisUhrzeit));
$helper->KdiTermin_Dauer = utf8_encode(utf8_decode($obj->KdiTermin_Dauer));
$helper->Kdi_RechEMail = utf8_encode(utf8_decode($obj->Kdi_RechEMail));
$helper->Kdi_Terminwunsch = utf8_encode(utf8_decode($obj->Kdi_Terminwunsch));
$helper->Stoerungscode = utf8_encode(utf8_decode($obj->Stoerungscode));
$helper->Kdi_GebaeudeKomplex = utf8_encode(utf8_decode($obj->Kdi_GebaeudeKomplex));
$helper->Kdi_Gebaeude = utf8_encode(utf8_decode($obj->Kdi_Gebaeude));
$helper->KDI_WVAnlageArt = utf8_encode(utf8_decode($obj->KDI_WVAnlageArt));
$helper->TerminBestaetigungsdatum = utf8_encode(utf8_decode($obj->TerminBestaetigungsdatum));

array_push($json->daten, $helper);




}

echo json_encode($json);











?>