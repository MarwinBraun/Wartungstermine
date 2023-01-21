<?php
// configure the Google Client
header('Content-type: text/plain; charset=utf-8');
require __DIR__ . '/vendor/autoload.php';
$client = new \Google_Client();
$client->setApplicationName('Google Sheets API');
$client->setScopes([\Google_Service_Sheets::SPREADSHEETS]);
$client->setAccessType('offline');
// credentials.json is the key file we downloaded while setting up our Google Sheets API
$path = 'credentials.json';
$client->setAuthConfig($path);

// configure the Sheets Service
$service = new \Google_Service_Sheets($client);

$spreadsheetId = '1bKYTlXGa8tgMJeBVksq0maXEETfimcgwI4uapCJhv-4';

$serverName = "SRV-DB";
$connectionInfo = array("Database"=>"powerbird", "UID"=>"powerbird", "PWD"=>"powerbird", "CharacterSet" => "UTF-8");
$conn = sqlsrv_connect( $serverName, $connectionInfo);
if( $conn === false ) {
     die( print_r( sqlsrv_errors(), true));
}


$sql = "Select Dokument_Nummer,FORMAT(Datum_Dokument, 'dd.MM.yyyy') as Datum_Dokument, LEFT(Kunde_Strasse,LEN(Kunde_Strasse) -3) as Kunde_Strasse,
  RIGHT(Liefer_AdressNummer, LEN(Liefer_AdressNummer) - 1) as Liefer_AdressNummer, Liefer_Anrede, Liefer_Name1, Liefer_Name2, Liefer_Name3,
  Liefer_Tel_LandWahl, Liefer_Tel_Vorwahl, Liefer_Tel_Rufnummer, Liefer_Tel_Durchwahl, FORMAT(Datum_Ersterfassung, 'dd.MM.yyyy') as Datum_Ersterfassung,
  FORMAT(Zeit_Ersterfassung, 'hh:mm') as Zeit_Ersterfassung, case DOK_Phase when '' THEN 0 else DOK_Phase end as DOK_Phase,
  FORMAT(DOK_Disposition_Datum, 'dd.MM.yyyy') as DOK_Disposition_Datum,  FORMAT(DOK_Disposition_Zeit, 'hh:mm') as DOK_Disposition_Zeit,
  Kdi_Gruppe, KdiWartung_VertragNr, KdiEingang_AnsprPart, Kdi_AuftrBeschreibng, FORMAT(KdiTermin_Datum, 'dd.MM.yyyy') as KdiTermin_Datum,
  FORMAT(KdiTermin_Uhrzeit, 'hh:mm') as KdiTermin_Uhrzeit, FORMAT(KdiTermin_BisUhrzeit , 'hh:mm') as KdiTermin_BisUhrzeit,
  FORMAT(KdiTermin_Dauer, 'hh:mm') as KdiTermin_Dauer, Kdi_RechEMail, FORMAT(Datum_AusliefWunsch, 'dd.MM.yyyy') as Kdi_Terminwunsch,
  Stoerungscode, Kdi_GebaeudeKomplex, Kdi_Gebaeude, KDI_WVAnlageArt
  FROM [powerbird].[dbo].[ELKDI]
  where CAST(Datum_Dokument AS DATE) = CAST( getdate() AS DATE)
  and KdiEingang_AnsprPart = 'M'";

$stmt = sqlsrv_query( $conn, $sql);
if( $stmt === false ) {
     die( print_r( sqlsrv_errors(), true));
}


while($obj = sqlsrv_fetch_object( $stmt)) {
$newRow = [];

array_push($newRow, utf8_encode(utf8_decode($obj->Dokument_Nummer)), utf8_encode(utf8_decode($obj->Datum_Dokument)), 
utf8_encode(utf8_decode($obj->Kunde_Strasse)), utf8_encode(utf8_decode($obj->Liefer_AdressNummer)), 
utf8_encode(utf8_decode($obj->Liefer_Anrede)), utf8_encode(utf8_decode($obj->Liefer_Name1)), 
utf8_encode(utf8_decode($obj->Liefer_Name2)), utf8_encode(utf8_decode($obj->Liefer_Name3)), 
utf8_encode(utf8_decode($obj->Liefer_Tel_LandWahl)), 
utf8_encode(utf8_decode($obj->Liefer_Tel_Vorwahl)), utf8_encode(utf8_decode($obj->Liefer_Tel_Rufnummer)), 
utf8_encode(utf8_decode($obj->Liefer_Tel_Durchwahl)), utf8_encode(utf8_decode($obj->Datum_Ersterfassung)), 
utf8_encode(utf8_decode($obj->Zeit_Ersterfassung)), utf8_encode(utf8_decode($obj->DOK_Phase)), 
utf8_encode(utf8_decode($obj->DOK_Disposition_Datum)), 
utf8_encode(utf8_decode($obj->DOK_Disposition_Zeit)), 
utf8_encode(utf8_decode($obj->Kdi_Gruppe)), utf8_encode(utf8_decode($obj->KdiWartung_VertragNr)), 
utf8_encode(utf8_decode($obj->KdiEingang_AnsprPart)), utf8_encode(utf8_decode($obj->Kdi_AuftrBeschreibng)), 
utf8_encode(utf8_decode($obj->KdiTermin_Datum)), utf8_encode(utf8_decode($obj->KdiTermin_Uhrzeit)), 
utf8_encode(utf8_decode($obj->KdiTermin_BisUhrzeit)), utf8_encode(utf8_decode($obj->KdiTermin_Dauer)), 
utf8_encode(utf8_decode($obj->Kdi_RechEMail)), utf8_encode(utf8_decode($obj->Kdi_Terminwunsch)), 
utf8_encode(utf8_decode($obj->Stoerungscode)), utf8_encode(utf8_decode($obj->Kdi_GebaeudeKomplex)), 
utf8_encode(utf8_decode($obj->Kdi_Gebaeude)), utf8_encode(utf8_decode($obj->KDI_WVAnlageArt))
);

$rows = [$newRow];
$valueRange = new \Google_Service_Sheets_ValueRange();
$valueRange->setValues($rows);
$range = 'Tabellenblatt1'; // the service will detect the last row of this sheet
$options = ['valueInputOption' => 'USER_ENTERED'];
$service->spreadsheets_values->append($spreadsheetId, $range, $valueRange, $options);


}






?>