<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require 'Exception.php';
require 'PHPMailer.php';
require 'SMTP.php';
require 'fpdf.php';


header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');
header("Access-Control-Allow-Headers: *, Accept, Authorization, X-Requested-With, Content-Type, Origin");
header("Content-Type: text/html; Charset-utf-8");


$serverName = "SRV-DB";
$connectionInfo = array("Database"=>"powerbird", "UID"=>"powerbird", "PWD"=>"powerbird", "CharacterSet" => "UTF-8");
$conn = sqlsrv_connect( $serverName, $connectionInfo);
$stautsPDF = false; 

if( $conn === false ) {
     die( print_r( sqlsrv_errors(), true));
}

//Selektion für Feld EM
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
  FROM [wartungstermine].[dbo].[daten]
where verarbeitet = 0 and KdiEingang_AnsprPart = 'EM' and KdiTermin_Datum IS NOT NULL";

$stmt = sqlsrv_query( $conn, $sql);
if( $stmt === false ) {
     die( print_r( sqlsrv_errors(), true));
}


while($obj = sqlsrv_fetch_object( $stmt)) {



$betreff = "Ihr Wartungsterminvorschlag am " . $obj->KdiTermin_Datum;
$text = "Guten Tag " . $obj->Liefer_Name2 . " " . $obj->Liefer_Name1 . ",</br></br>";
$text .= "gerne möchten wir die regelmäßige Wartung an Ihrer Anlage durchführen:</br></br>";
$text .= "<b>Hierfür haben wir folgenden Termin für Sie vorgesehen: </b>";
$text .= $obj->KdiTermin_Datum . " ca. gegen</br> " . $obj->KdiTermin_Uhrzeit . " Uhr (+/- 1 Stunde). Sollte der Termin auf 07:30 Uhr angesetzt sein, wird unser/e</br> Kundendiensttechniker*in ";
$text .= "zwischen 07:30 - 08:30 Uhr bei Ihnen eintreffen.</br></br>Sollten Sie Mieter sein, bitten wir Sie den Zugang zur Heizungsanlage unserem Servicetechniker zur</br>Verfügung zu stellen.</br></br>";
$text .= "Straße: " . $obj->Kunde_Strasse . "</br></br>";
$text .= "Auftragsnummer: " . $obj->Dokument_Nummer . "</br></br>";
$text .= "<b>Bitte bestätigen Sie den Termin über folgenden Link:</b></br></br>";
$d = "http://mail.dietenmeier-harsch.de:81/dhworld/bestaetigt/" . $obj->Dokument_Nummer;
$text .= "<a href='".$d."'>Klicken Sie hier um Ihren Termin zu bestätigen.</a></br></br></br>";
$text .= "Sollten Sie den Termin nicht wahrnehmen können oder haben Fragen, dann melden Sie sich</br> bitte unter:</br></br>";
$text .= "<b>E-Mail </b>";
$text .= '<a href="mailto:info@dietenmeier-harsch.de">info@dietenmeier-harsch.de</a><b> oder per Telefon: 0753159990</b></br></br>';
$text .= "Bitte teilen Sie uns zur schnellen Bearbeitung Ihre Auftragsnummer mit.<br/></br>";
$text .= "Viele Grüße</br></br> Dietenmeier + Harsch</br></br> Haustechnik GmbH</br></br></br>";
$text .= "Dietenmeier und Harsch Haustechnik GmbH</br> Conradin-Kreutzer-Straße 10</br> 78467 Konstanz</br> Deutschland</br> Geschäftsführer Thomas Dietenmeier, Michael Baur</br> Registergericht Freiburg HRB 381751</br> Te.: 0049(0)7531 599916</br>";
$text .= '<a href="https://www.dietenmeier-harsch.de">www.dietenmeier-harsch.de</a></br>';
$text .= "____________________________________________________________________________________________";


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

 
$abfrage = "update [wartungstermine].[dbo].[daten] set verarbeitet = 1 where ID = '".$obj->ID."'";
$setzen = sqlsrv_query( $conn, $abfrage);
if( $setzen === false ) {
     die( print_r( sqlsrv_errors(), true));
}

$datumHeute = date("d.m.Y");
$abfrage = "update [wartungstermine].[dbo].[daten] set logVersandDatum = '".$datumHeute."'  where ID = '".$obj->ID."'";
$setzen = sqlsrv_query( $conn, $abfrage);
if( $setzen === false ) {
     die( print_r( sqlsrv_errors(), true));
}









}



//Eskalation wenn Kunde nicht nach 7 Tage bestätigt für EM


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
where verarbeitet = 1 and KdiEingang_AnsprPart = 'EM' and KdiTermin_Datum IS NOT NULL and logVersandDatum != '0' and reaktion = 0 and eskalation = 0";

$stmt = sqlsrv_query( $conn, $sql);
if( $stmt === false ) {
     die( print_r( sqlsrv_errors(), true));
}

while($obj = sqlsrv_fetch_object( $stmt)) {

$now = time();
$time = strtotime($obj->logVersandDatum);

$datediff =  $now - $time;

$days = round($datediff / (60 * 60 * 24));


if($days >= 7) {

$betreff = "ESKALATION " . $obj->Dokument_Nummer . " wurde noch nicht bestätigt";
$text = "Hallo</br></br>der Kunde hat den vorgeschlagenen Termin am " . $obj->KdiTermin_Datum . " mit dem Auftrag</br>";
$text .= $obj->Dokument_Nummer . " nicht innerhalb der festgelegten Frist bestätigt. Bitte Kunde<br/>";
$text .= "kontaktieren, Termin bestätigen lassen oder Ausweichtermin vereinbaren.</br></br>";
$text .= "Kunde: " . $obj->Liefer_Name2 . " " . $obj->Liefer_Name1 . ",</br></br>";
$text .= "Telefonnummer: " . $obj->Liefer_Tel_LandWahl . " " . $obj->Liefer_Tel_Vorwahl .  " " . $obj->Liefer_Tel_Rufnummer ." </br>" . $obj->Liefer_Tel_Durchwahl . "</br></br>";
$text .= "<b>Straße: " .  $obj->Kunde_Strasse . "</br></br></br>";
$text .= "(dies ist eine automatisch generierte E-Mail)</br></br>";
$text .= "Viele Grüße</br></br>";
$text .= "Dietenmeier + Harsch</br></br>";
$text .= "Haustechnik GmbH</br>";
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

$abfrage = "update [wartungstermine].[dbo].[daten] set eskalation = 1  where ID = '".$obj->ID."'";
$setzen = sqlsrv_query( $conn, $abfrage);
if( $setzen === false ) {
     die( print_r( sqlsrv_errors(), true));
}


}

}



$pdf = new FPDF('P','mm','A4');;
$pdf->SetMargins(25, 40);
$pdf->SetFont('Arial','B',12);

////Selektion für Feld EP
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
  FROM [wartungstermine].[dbo].[daten]
where verarbeitet = 0 and KdiEingang_AnsprPart = 'EP' and KdiTermin_Datum IS NOT NULL";

$stmt = sqlsrv_query( $conn, $sql);
if( $stmt === false ) {
     die( print_r( sqlsrv_errors(), true));
}

$rows = sqlsrv_has_rows( $stmt );
if ($rows === true){
    $stautsPDF = true;

    while($obj = sqlsrv_fetch_object( $stmt)) {

        $pdf->AddPage();
        $pdf->Cell(40,5, iconv('UTF-8', 'ISO-8859-1',$obj->Kunde_Anrede) . " " .  iconv('UTF-8', 'ISO-8859-1',$obj->Kunde_Name1));
        $pdf->Ln();
        $pdf->Cell(40,5, iconv('UTF-8', 'ISO-8859-1',$obj->Kunde_Name2));
        $pdf->Ln();
        $pdf->Cell(40,5, iconv('UTF-8', 'ISO-8859-1',$obj->Kunde_Strasse));
        $pdf->Ln();
        $pdf->Cell(40,5,  iconv('UTF-8', 'ISO-8859-1',$obj->Kunde_Postleitzahl) . " " .  iconv('UTF-8', 'ISO-8859-1',$obj->Kunde_Ort));
        $pdf->Ln();
        $pdf->Ln();
        $pdf->Ln();
        $pdf->SetFont('Arial','',12);
        $pdf->Cell(40,5, "Guten Tag " . iconv('UTF-8', 'ISO-8859-1',$obj->Liefer_Name2) . " " . iconv('UTF-8', 'ISO-8859-1',$obj->Liefer_Name1));
        $pdf->Ln();
        $pdf->Ln();
        $pdf->Cell(40,5, iconv('UTF-8', 'ISO-8859-1',"die nächste Wartung an Ihrer Heizungsanlage steht an:"));
        $pdf->Ln();
        $pdf->Ln();
        $pdf->Cell(40,5, iconv('UTF-8', 'ISO-8859-1',"Hierfür haben wir folgenden Termin für Sie vorgesehen: ") . iconv('UTF-8', 'ISO-8859-1',$obj->KdiTermin_Datum . " ca. gegen"));
        $pdf->Ln();
        $pdf->Cell(40,5, iconv('UTF-8', 'ISO-8859-1',$obj->KdiTermin_Uhrzeit) . iconv('UTF-8', 'ISO-8859-1'," Uhr (+/- 1 Stunde). Sollte der Termin auf 07:30 Uhr angesetzt sein, wird unser/e"));
        $pdf->Ln(); 
        $pdf->Cell(40,5, iconv('UTF-8', 'ISO-8859-1',"Kundendiensttechniker*in zwischen 07:30 - 08:30 Uhr bei Ihnen eintreffen."));
        $pdf->Ln();
        $pdf->Ln();
        $pdf->Cell(40,5, iconv('UTF-8', 'ISO-8859-1',"Sollten Sie Mieter sein, bitten wir Sie den Zugang zur Heizungsanlage unserem"));
        $pdf->Ln();
        $pdf->Cell(40,5, iconv('UTF-8', 'ISO-8859-1',"Servicetechniker zur Verfügung zu stellen."));
        $pdf->Ln();
        $pdf->Ln();
        $pdf->Cell(40,5, iconv('UTF-8', 'ISO-8859-1',"Straße: " . $obj->Kunde_Strasse));
        $pdf->Ln();
        $pdf->Ln();
        $pdf->Cell(40,5, iconv('UTF-8', 'ISO-8859-1',"Auftragsnummer: " . $obj->Dokument_Nummer)); 
        $pdf->Ln();
        $pdf->Ln();
        $pdf->Cell(40,5, iconv('UTF-8', 'ISO-8859-1',"Sollten Sie den Termin nicht wahrnehmen können oder haben Fragen")); 
        $pdf->Ln();
        $pdf->Cell(40,5, iconv('UTF-8', 'ISO-8859-1',"dann melden Sie sich bitte unter:"));          
        $pdf->Ln();
        $pdf->Ln();
        $pdf->Cell(40,5, iconv('UTF-8', 'ISO-8859-1',"E-Mail info@dietenmeier-harsch.de oder per Telefon: 0753159990"));     
        $pdf->Ln();
        $pdf->Ln();
        $pdf->Cell(40,5, iconv('UTF-8', 'ISO-8859-1',"Bitte teilen Sie uns zur schnellen Bearbeitung Ihre Auftragsnummer mit."));   
        $pdf->Ln();
        $pdf->Ln();
        $pdf->Cell(40,5, iconv('UTF-8', 'ISO-8859-1',"Jetzt schnell und einfach den Termin bestätigen. Einfach mit Ihrem mobilen Gerät"));  
        $pdf->Ln();
        $link = "http://mail.dietenmeier-harsch.de:81/dhworld/bestaetigt/" . $obj->Dokument_Nummer;
        $pdf->Image("http://localhost:81/qr_generator.php?code=" . $link, 24, 189, 20, 20, "png");
        $pdf->Cell(40,5, iconv('UTF-8', 'ISO-8859-1',"diesen QR-Code abscannen.")); 
        $pdf->Ln();
        $pdf->Ln();
        $pdf->Ln();
        $pdf->Ln();
        $pdf->Ln();
        $pdf->Cell(40,5, iconv('UTF-8', 'ISO-8859-1',"Viele Grüße")); 
        $pdf->Ln();
        $pdf->Cell(40,5, iconv('UTF-8', 'ISO-8859-1',"Dietenmeier + Harsch"));
        $pdf->Ln();
        $pdf->Cell(40,5, iconv('UTF-8', 'ISO-8859-1',"Haustechnik GmbH"));  
        $pdf->Ln();
        $pdf->Ln();
        $pdf->Cell(40,5, iconv('UTF-8', 'ISO-8859-1',"Dietenmeier und Harsch Haustechnik GmbH"));  
        $pdf->Ln();
        $pdf->Cell(40,5, iconv('UTF-8', 'ISO-8859-1',"Conradin-Kreutzer-Straße 10"));  
        $pdf->Ln();
        $pdf->Cell(40,5, iconv('UTF-8', 'ISO-8859-1',"78467 Konstanz"));  
        $pdf->Ln();
        $pdf->Cell(40,5, iconv('UTF-8', 'ISO-8859-1',"Deutschland"));  
        $pdf->Ln();
        $pdf->Cell(40,5, iconv('UTF-8', 'ISO-8859-1',"Geschäftsführer Thomas Dietenmeier, Michael Baur"));  
        $pdf->Ln();
        $pdf->Cell(40,5, iconv('UTF-8', 'ISO-8859-1',"Registergericht Freiburg HRB 381751"));  
        $pdf->Ln();
        $pdf->Cell(40,5, iconv('UTF-8', 'ISO-8859-1',"Te.: 0049(0)7531 599916"));  
        $pdf->Ln();
        $pdf->Cell(40,5, iconv('UTF-8', 'ISO-8859-1',"www.dietenmeier-harsch.de"));  
        $pdf->Ln();
        $pdf->Cell(40,5, iconv('UTF-8', 'ISO-8859-1',"________________________________________________________________"));  
        $pdf->SetFont('Arial','B',12);
           
          
        
            
            
        
             
            $abfrage = "update [wartungstermine].[dbo].[daten] set verarbeitet = 1 where ID = '".$obj->ID."'";
            $setzen = sqlsrv_query( $conn, $abfrage);
            if( $setzen === false ) {
                 die( print_r( sqlsrv_errors(), true));
            }

            $datumHeute = date("d.m.Y");
            $abfrage = "update [wartungstermine].[dbo].[daten] set logVersandDatum = '".$datumHeute."'  where ID = '".$obj->ID."'";
            $setzen = sqlsrv_query( $conn, $abfrage);
            if( $setzen === false ) {
            die( print_r( sqlsrv_errors(), true));
            }
            
            
            
            
            
            
            
            
            }
            
        
        //unlink('Druckliste.pdf');
        

}

//Eskalation nach 7 Tagen für EP
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
where verarbeitet = 1 and KdiEingang_AnsprPart = 'EP' and KdiTermin_Datum IS NOT NULL and logVersandDatum != '0' and reaktion = 0 and eskalation = 0";

$stmt = sqlsrv_query( $conn, $sql);
if( $stmt === false ) {
     die( print_r( sqlsrv_errors(), true));
}

while($obj = sqlsrv_fetch_object( $stmt)) {

$now = time();
$time = strtotime($obj->logVersandDatum);

$datediff =  $now - $time;

$days = round($datediff / (60 * 60 * 24));


if($days >= 7) {

$betreff = "ESKALATION " . $obj->Dokument_Nummer . " wurde noch nicht bestätigt";
$text = "Hallo</br></br>der Kunde hat den vorgeschlagenen Termin am " . $obj->KdiTermin_Datum . " mit dem Auftrag</br>";
$text .= $obj->Dokument_Nummer . " nicht innerhalb der festgelegten Frist bestätigt. Bitte Kunde<br/>";
$text .= "kontaktieren, Termin bestätigen lassen oder Ausweichtermin vereinbaren.</br></br>";
$text .= "Kunde: " . $obj->Liefer_Name2 . " " . $obj->Liefer_Name1 . ",</br></br>";
$text .= "Telefonnummer: " . $obj->Liefer_Tel_LandWahl . " " . $obj->Liefer_Tel_Vorwahl .  " " . $obj->Liefer_Tel_Rufnummer ." </br>" . $obj->Liefer_Tel_Durchwahl . "</br></br>";
$text .= "<b>Straße: " .  $obj->Kunde_Strasse . "</br></br></br>";
$text .= "(dies ist eine automatisch generierte E-Mail)</br></br>";
$text .= "Viele Grüße</br></br>";
$text .= "Dietenmeier + Harsch</br></br>";
$text .= "Haustechnik GmbH</br>";
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

$abfrage = "update [wartungstermine].[dbo].[daten] set eskalation = 1  where ID = '".$obj->ID."'";
$setzen = sqlsrv_query( $conn, $abfrage);
if( $setzen === false ) {
     die( print_r( sqlsrv_errors(), true));
}


}

}


//Selektion für Feld BM
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
  FROM [wartungstermine].[dbo].[daten]
where verarbeitet = 0 and KdiEingang_AnsprPart = 'BM' and KdiTermin_Datum IS NOT NULL";

$stmt = sqlsrv_query( $conn, $sql);
if( $stmt === false ) {
     die( print_r( sqlsrv_errors(), true));
}


while($obj = sqlsrv_fetch_object( $stmt)) {



$betreff = "Ihr Wartungsterminvorschlag am " . $obj->KdiTermin_Datum;
$text = "Guten Tag " . $obj->Liefer_Name2 . " " . $obj->Liefer_Name1 . ",</br></br>";
$text .= "gerne möchten wir die regelmäßige Wartung an Ihrer Anlage durchführen:</br></br>";
$text .= "<b>Hierfür haben wir folgenden Termin für Sie vorgesehen: </b>";
$text .= $obj->KdiTermin_Datum . " ca. gegen</br> " . $obj->KdiTermin_Uhrzeit . " Uhr (+/- 1 Stunde). Sollte der Termin auf 07:30 Uhr angesetzt sein, wird unser/e</br> Kundendiensttechniker*in ";
$text .= "zwischen 07:30 - 08:30 Uhr bei Ihnen eintreffen.</br></br>Sollten Sie Mieter sein, bitten wir Sie den Zugang zur Heizungsanlage unserem Servicetechniker zur</br>Verfügung zu stellen.</br></br>";
$text .= "Straße: " . $obj->Kunde_Strasse . "</br></br>";
$text .= "Auftragsnummer: " . $obj->Dokument_Nummer . "</br></br>";
$text .= "<b>Bitte bestätigen Sie den Termin über folgenden Link:</b></br></br>";
$d = "http://mail.dietenmeier-harsch.de:81/dhworld/bestaetigt/" . $obj->Dokument_Nummer;
$text .= "<a href='".$d."'>Klicken Sie hier um Ihren Termin zu bestätigen.</a></br></br></br>";
$text .= "Sollten Sie den Termin nicht wahrnehmen können oder haben Fragen, dann melden Sie sich</br> bitte unter:</br></br>";
$text .= "<b>E-Mail </b>";
$text .= '<a href="mailto:info@dietenmeier-harsch.de">info@dietenmeier-harsch.de</a><b> oder per Telefon: 0753159990</b></br></br>';
$text .= "Bitte teilen Sie uns zur schnellen Bearbeitung Ihre Auftragsnummer mit.<br/></br>";
$text .= "Viele Grüße</br></br> Dietenmeier + Harsch</br></br> Haustechnik GmbH</br></br></br>";
$text .= "Dietenmeier und Harsch Haustechnik GmbH</br> Conradin-Kreutzer-Straße 10</br> 78467 Konstanz</br> Deutschland</br> Geschäftsführer Thomas Dietenmeier, Michael Baur</br> Registergericht Freiburg HRB 381751</br> Te.: 0049(0)7531 599916</br>";
$text .= '<a href="https://www.dietenmeier-harsch.de">www.dietenmeier-harsch.de</a></br>';
$text .= "____________________________________________________________________________________________";


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

 
$abfrage = "update [wartungstermine].[dbo].[daten] set verarbeitet = 1 where ID = '".$obj->ID."'";
$setzen = sqlsrv_query( $conn, $abfrage);
if( $setzen === false ) {
     die( print_r( sqlsrv_errors(), true));
}

$datumHeute = date("d.m.Y");
$abfrage = "update [wartungstermine].[dbo].[daten] set logVersandDatum = '".$datumHeute."'  where ID = '".$obj->ID."'";
$setzen = sqlsrv_query( $conn, $abfrage);
if( $setzen === false ) {
     die( print_r( sqlsrv_errors(), true));
}









}


//Eskalation wenn Kunde nicht nach 7 Tage bestätigt für BM


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
where verarbeitet = 1 and KdiEingang_AnsprPart = 'BM' and KdiTermin_Datum IS NOT NULL and logVersandDatum != '0' and reaktion = 0 and eskalation = 0";

$stmt = sqlsrv_query( $conn, $sql);
if( $stmt === false ) {
     die( print_r( sqlsrv_errors(), true));
}

while($obj = sqlsrv_fetch_object( $stmt)) {

$now = time();
$time = strtotime($obj->logVersandDatum);

$datediff =  $now - $time;

$days = round($datediff / (60 * 60 * 24));


if($days >= 7) {

$betreff = "ESKALATION " . $obj->Dokument_Nummer . " wurde noch nicht bestätigt";
$text = "Hallo</br></br>der Kunde hat den vorgeschlagenen Termin am " . $obj->KdiTermin_Datum . " mit dem Auftrag</br>";
$text .= $obj->Dokument_Nummer . " nicht innerhalb der festgelegten Frist bestätigt. Bitte Kunde<br/>";
$text .= "kontaktieren, Termin bestätigen lassen oder Ausweichtermin vereinbaren.</br></br>";
$text .= "Kunde: " . $obj->Liefer_Name2 . " " . $obj->Liefer_Name1 . ",</br></br>";
$text .= "Telefonnummer: " . $obj->Liefer_Tel_LandWahl . " " . $obj->Liefer_Tel_Vorwahl .  " " . $obj->Liefer_Tel_Rufnummer ." </br>" . $obj->Liefer_Tel_Durchwahl . "</br></br>";
$text .= "<b>Straße: " .  $obj->Kunde_Strasse . "</br></br></br>";
$text .= "(dies ist eine automatisch generierte E-Mail)</br></br>";
$text .= "Viele Grüße</br></br>";
$text .= "Dietenmeier + Harsch</br></br>";
$text .= "Haustechnik GmbH</br>";
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

$abfrage = "update [wartungstermine].[dbo].[daten] set eskalation = 1  where ID = '".$obj->ID."'";
$setzen = sqlsrv_query( $conn, $abfrage);
if( $setzen === false ) {
     die( print_r( sqlsrv_errors(), true));
}


}

}



////Selektion für Feld BP
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
  FROM [wartungstermine].[dbo].[daten]
where verarbeitet = 0 and KdiEingang_AnsprPart = 'BP' and KdiTermin_Datum IS NOT NULL";

$stmt = sqlsrv_query( $conn, $sql);
if( $stmt === false ) {
     die( print_r( sqlsrv_errors(), true));
}

$rows = sqlsrv_has_rows( $stmt );
if ($rows === true){
    $stautsPDF = true;

    while($obj = sqlsrv_fetch_object( $stmt)) {

        $pdf->AddPage();
        $pdf->Cell(40,5, iconv('UTF-8', 'ISO-8859-1',$obj->Kunde_Anrede) . " " .  iconv('UTF-8', 'ISO-8859-1',$obj->Kunde_Name1));
        $pdf->Ln();
        $pdf->Cell(40,5, iconv('UTF-8', 'ISO-8859-1',$obj->Kunde_Name2));
        $pdf->Ln();
        $pdf->Cell(40,5, iconv('UTF-8', 'ISO-8859-1',$obj->Kunde_Strasse));
        $pdf->Ln();
        $pdf->Cell(40,5,  iconv('UTF-8', 'ISO-8859-1',$obj->Kunde_Postleitzahl) . " " .  iconv('UTF-8', 'ISO-8859-1',$obj->Kunde_Ort));
        $pdf->Ln();
        $pdf->Ln();
        $pdf->Ln();
        $pdf->SetFont('Arial','',12);
        $pdf->Cell(40,5, "Guten Tag " . iconv('UTF-8', 'ISO-8859-1',$obj->Liefer_Name2) . " " . iconv('UTF-8', 'ISO-8859-1',$obj->Liefer_Name1));
        $pdf->Ln();
        $pdf->Ln();
        $pdf->Cell(40,5, iconv('UTF-8', 'ISO-8859-1',"die nächste Wartung an Ihrer Heizungsanlage steht an:"));
        $pdf->Ln();
        $pdf->Ln();
        $pdf->Cell(40,5, iconv('UTF-8', 'ISO-8859-1',"Hierfür haben wir folgenden Termin für Sie vorgesehen: ") . iconv('UTF-8', 'ISO-8859-1',$obj->KdiTermin_Datum . " ca. gegen"));
        $pdf->Ln();
        $pdf->Cell(40,5, iconv('UTF-8', 'ISO-8859-1',$obj->KdiTermin_Uhrzeit) . iconv('UTF-8', 'ISO-8859-1'," Uhr (+/- 1 Stunde). Sollte der Termin auf 07:30 Uhr angesetzt sein, wird unser/e"));
        $pdf->Ln(); 
        $pdf->Cell(40,5, iconv('UTF-8', 'ISO-8859-1',"Kundendiensttechniker*in zwischen 07:30 - 08:30 Uhr bei Ihnen eintreffen."));
        $pdf->Ln();
        $pdf->Ln();
        $pdf->Cell(40,5, iconv('UTF-8', 'ISO-8859-1',"Sollten Sie Mieter sein, bitten wir Sie den Zugang zur Heizungsanlage unserem"));
        $pdf->Ln();
        $pdf->Cell(40,5, iconv('UTF-8', 'ISO-8859-1',"Servicetechniker zur Verfügung zu stellen."));
        $pdf->Ln();
        $pdf->Ln();
        $pdf->Cell(40,5, iconv('UTF-8', 'ISO-8859-1',"Straße: " . $obj->Kunde_Strasse));
        $pdf->Ln();
        $pdf->Ln();
        $pdf->Cell(40,5, iconv('UTF-8', 'ISO-8859-1',"Auftragsnummer: " . $obj->Dokument_Nummer)); 
        $pdf->Ln();
        $pdf->Ln();
        $pdf->Cell(40,5, iconv('UTF-8', 'ISO-8859-1',"Sollten Sie den Termin nicht wahrnehmen können oder haben Fragen")); 
        $pdf->Ln();
        $pdf->Cell(40,5, iconv('UTF-8', 'ISO-8859-1',"dann melden Sie sich bitte unter:"));          
        $pdf->Ln();
        $pdf->Ln();
        $pdf->Cell(40,5, iconv('UTF-8', 'ISO-8859-1',"E-Mail info@dietenmeier-harsch.de oder per Telefon: 0753159990"));     
        $pdf->Ln();
        $pdf->Ln();
        $pdf->Cell(40,5, iconv('UTF-8', 'ISO-8859-1',"Bitte teilen Sie uns zur schnellen Bearbeitung Ihre Auftragsnummer mit."));   
        $pdf->Ln();
        $pdf->Ln();
        $pdf->Cell(40,5, iconv('UTF-8', 'ISO-8859-1',"Jetzt schnell und einfach den Termin bestätigen. Einfach mit Ihrem mobilen Gerät"));  
        $pdf->Ln();
        $link = "http://mail.dietenmeier-harsch.de:81/dhworld/bestaetigt/" . $obj->Dokument_Nummer;
        $pdf->Image("http://localhost:81/qr_generator.php?code=" . $link, 24, 189, 20, 20, "png");
        $pdf->Cell(40,5, iconv('UTF-8', 'ISO-8859-1',"diesen QR-Code abscannen.")); 
        $pdf->Ln();
        $pdf->Ln();
        $pdf->Ln();
        $pdf->Ln();
        $pdf->Ln();
        $pdf->Cell(40,5, iconv('UTF-8', 'ISO-8859-1',"Viele Grüße")); 
        $pdf->Ln();
        $pdf->Cell(40,5, iconv('UTF-8', 'ISO-8859-1',"Dietenmeier + Harsch"));
        $pdf->Ln();
        $pdf->Cell(40,5, iconv('UTF-8', 'ISO-8859-1',"Haustechnik GmbH"));  
        $pdf->Ln();
        $pdf->Ln();
        $pdf->Cell(40,5, iconv('UTF-8', 'ISO-8859-1',"Dietenmeier und Harsch Haustechnik GmbH"));  
        $pdf->Ln();
        $pdf->Cell(40,5, iconv('UTF-8', 'ISO-8859-1',"Conradin-Kreutzer-Straße 10"));  
        $pdf->Ln();
        $pdf->Cell(40,5, iconv('UTF-8', 'ISO-8859-1',"78467 Konstanz"));  
        $pdf->Ln();
        $pdf->Cell(40,5, iconv('UTF-8', 'ISO-8859-1',"Deutschland"));  
        $pdf->Ln();
        $pdf->Cell(40,5, iconv('UTF-8', 'ISO-8859-1',"Geschäftsführer Thomas Dietenmeier, Michael Baur"));  
        $pdf->Ln();
        $pdf->Cell(40,5, iconv('UTF-8', 'ISO-8859-1',"Registergericht Freiburg HRB 381751"));  
        $pdf->Ln();
        $pdf->Cell(40,5, iconv('UTF-8', 'ISO-8859-1',"Te.: 0049(0)7531 599916"));  
        $pdf->Ln();
        $pdf->Cell(40,5, iconv('UTF-8', 'ISO-8859-1',"www.dietenmeier-harsch.de"));  
        $pdf->Ln();
        $pdf->Cell(40,5, iconv('UTF-8', 'ISO-8859-1',"________________________________________________________________"));  
        $pdf->SetFont('Arial','B',12);
           
          
        
            
            
        
             
            $abfrage = "update [wartungstermine].[dbo].[daten] set verarbeitet = 1 where ID = '".$obj->ID."'";
            $setzen = sqlsrv_query( $conn, $abfrage);
            if( $setzen === false ) {
                 die( print_r( sqlsrv_errors(), true));
            }

            $datumHeute = date("d.m.Y");
            $abfrage = "update [wartungstermine].[dbo].[daten] set logVersandDatum = '".$datumHeute."'  where ID = '".$obj->ID."'";
            $setzen = sqlsrv_query( $conn, $abfrage);
            if( $setzen === false ) {
            die( print_r( sqlsrv_errors(), true));
            }
            
            
            
            
            
            
            
            
            }
            
     
        

}

//Eskalation nach 7 Tagen für BP
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
where verarbeitet = 1 and KdiEingang_AnsprPart = 'BP' and KdiTermin_Datum IS NOT NULL and logVersandDatum != '0' and reaktion = 0 and eskalation = 0";

$stmt = sqlsrv_query( $conn, $sql);
if( $stmt === false ) {
     die( print_r( sqlsrv_errors(), true));
}

while($obj = sqlsrv_fetch_object( $stmt)) {

$now = time();
$time = strtotime($obj->logVersandDatum);

$datediff =  $now - $time;

$days = round($datediff / (60 * 60 * 24));


if($days >= 7) {

$betreff = "ESKALATION " . $obj->Dokument_Nummer . " wurde noch nicht bestätigt";
$text = "Hallo</br></br>der Kunde hat den vorgeschlagenen Termin am " . $obj->KdiTermin_Datum . " mit dem Auftrag</br>";
$text .= $obj->Dokument_Nummer . " nicht innerhalb der festgelegten Frist bestätigt. Bitte Kunde<br/>";
$text .= "kontaktieren, Termin bestätigen lassen oder Ausweichtermin vereinbaren.</br></br>";
$text .= "Kunde: " . $obj->Liefer_Name2 . " " . $obj->Liefer_Name1 . ",</br></br>";
$text .= "Telefonnummer: " . $obj->Liefer_Tel_LandWahl . " " . $obj->Liefer_Tel_Vorwahl .  " " . $obj->Liefer_Tel_Rufnummer ." </br>" . $obj->Liefer_Tel_Durchwahl . "</br></br>";
$text .= "<b>Straße: " .  $obj->Kunde_Strasse . "</br></br></br>";
$text .= "(dies ist eine automatisch generierte E-Mail)</br></br>";
$text .= "Viele Grüße</br></br>";
$text .= "Dietenmeier + Harsch</br></br>";
$text .= "Haustechnik GmbH</br>";
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

$abfrage = "update [wartungstermine].[dbo].[daten] set eskalation = 1  where ID = '".$obj->ID."'";
$setzen = sqlsrv_query( $conn, $abfrage);
if( $setzen === false ) {
     die( print_r( sqlsrv_errors(), true));
}


}

}


//Erinnerungsmail für EM und BM

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
  FROM [wartungstermine].[dbo].[daten]
where verarbeitet = 1 and KdiEingang_AnsprPart IN ('BM', 'EM')  and KdiTermin_Datum IS NOT NULL and reaktion = 1 and logVersandDatum != '0' and erinnerungVersand = 0";

$stmt = sqlsrv_query( $conn, $sql);
if( $stmt === false ) {
     die( print_r( sqlsrv_errors(), true));
}


while($obj = sqlsrv_fetch_object($stmt)) {

$now = time();
$time = strtotime($obj->KdiTermin_Datum);

$datediff =  $time - $now;

$days = round($datediff / (60 * 60 * 24));



if($days <= 2) {

    $betreff = "Ihre Terminerinnerung am " . $obj->KdiTermin_Datum;
    $text = "Guten Tag " . $obj->Liefer_Name2 . " " . $obj->Liefer_Name1 . ",</br></br>";
    $text .= "wir möchten Sie an Ihren Termin am " . $obj->KdiTermin_Datum . " ca. gegen " . $obj->KdiTermin_Uhrzeit . " Uhr (+/- 1<br/>";
    $text .= "Stunde) erinnern. Sollte der Termin auf 07:30 Uhr angesetzt sein, wird unser/e Kundendiensttechniker*in </br>";
    $text .= "zwischen 07:30 Uhr – 08:30 Uhr bei Ihnen eintreffen. : </br></br>";
    $text .= "Sollten Sie den Termin absagen oder verschieben wollen, dann erreichen Sie uns unter </br>";
    $text .= "0753159990</br></br>";
    $text .= "Bitte teilen Sie uns zur schnellen Bearbeitung Ihre Auftragsnummer mit.</br></br>";
    $text .= "Viele Grüße</br></br>";
    $text .= "Dietenmeier + Harsch</br></br>";
    $text .= "Haustechnik GmbH</br></br></br>";
    $text .= "Dietenmeier und Harsch Haustechnik GmbH</br>";
    $text .= "Conradin-Kreutzer-Straße 10</br>";
    $text .= "78467 Konstanz</br>";
    $text .= "Deutschland</br>";
    $text .= "Geschäftsführer Thomas Dietenmeier, Michael Baur</br>";
    $text .= "Registergericht Freiburg HRB 381751</br>";
    $text .= "Te.: 0049(0)7531 599916</br>";
    $text .= "www.dietenmeier-harsch.de</br>";
    $text .= "_________________________________________________________________________________________</br>";

    $an = '';

    if($obj->KdiEingang_AnsprPart === 'EM'){

        $an = $obj->Kdi_RechEMail;

    } else {

        $an = $obj->Kdi_BesuchEMail;
    }
    
    
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
    
    $abfrage = "update [wartungstermine].[dbo].[daten] set erinnerungVersand = 1  where ID = '".$obj->ID."'";
    $setzen = sqlsrv_query( $conn, $abfrage);
    if( $setzen === false ) {
         die( print_r( sqlsrv_errors(), true));
    }
    
    
    }





}


if($stautsPDF === true){
    $filename="C:/xampp/htdocs/Druckliste.pdf";
    $pdf->Output($filename,'F');
    copy($filename, '\\\192.168.1.5\Daten\Automatischer_Terminkartenversand_Druckliste' . '\\' . 'Druckliste.pdf');
}











?>