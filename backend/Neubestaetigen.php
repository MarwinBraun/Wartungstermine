<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require 'Exception.php';
require 'PHPMailer.php';
require 'SMTP.php';



header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET,POST");
header("Access-Control-Allow-Headers: *, Accept, Authorization, X-Requested-With, Content-Type, Origin");
header('Content-type: application/json');

$kdi = $_GET["TerminID"];




$serverName = "SRV-DB";
$connectionInfo = array("Database"=>"powerbird", "UID"=>"powerbird", "PWD"=>"powerbird", "CharacterSet" => "UTF-8");
$conn = sqlsrv_connect( $serverName, $connectionInfo);
if( $conn === false ) {
     die( print_r( sqlsrv_errors(), true));
}


$datumHeute = 'TBK vom ' . date("d.m.Y H:i") . ' Uhr';



$sql = "update [wartungstermine].[dbo].[daten] set reaktion = 1, 
TerminBestaetigungsdatum = '".$datumHeute."' 

where ID = '".$kdi."'";

$stmt = sqlsrv_query( $conn, $sql);
if( $stmt === false ) {
     die( print_r( sqlsrv_errors(), true));
}





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
      ,[verarbeitet]
      ,[logVersandDatum]
  FROM [wartungstermine].[dbo].[daten]
where ID = " . $kdi;




$stmt = sqlsrv_query( $conn, $sql);
if( $stmt === false ) {
     die( print_r( sqlsrv_errors(), true));
}

while($obj = sqlsrv_fetch_object( $stmt)) {





$betreff = "Wartungstermin bestätigt " . $obj->Dokument_Nummer;
$text = "Hallo</br></br>der Kunde hat den vorgeschlagenen Wartungstermin bestätigt</br>";
$text .= "<b>Straße: " .  $obj->Kunde_Strasse . "</br></br>";
$text .= "<b>Auftragsnummer: " .  $obj->Dokument_Nummer . "</br></br>";
$text .= "<b>Auftragsdatum: " .  $obj->KdiTermin_Datum . "</br>";
$text .= "____________________________________________________________________________________________</br>";



    $mail = new PHPMailer(true);

try {
    $mail->CharSet   = 'UTF-8';
   $mail->Encoding  = 'base64';
    //Server settings
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = 'smtp.office365.com';                     //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = 'kd@dietenmeier-harsch.de';                     //SMTP username
    $mail->Password   = 'Guy90377';                               //SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;            //Enable implicit TLS encryption
    $mail->Port       = 587;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    //Recipients
    $mail->setFrom('kd@dietenmeier-harsch.de', 'kd@dietenmeier-harsch.de');
    $mail->addAddress('mb@itunds.de');              



    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = $betreff;
    $mail->Body    =  $text;
    $mail->AltBody = $text;

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}





}










?>