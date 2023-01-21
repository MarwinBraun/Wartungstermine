<?php
$serverName = "SRV-DB";
$connectionInfo = array("Database"=>"powerbird", "UID"=>"powerbird", "PWD"=>"powerbird");
$conn = sqlsrv_connect( $serverName, $connectionInfo);
if( $conn === false ) {
     die( print_r( sqlsrv_errors(), true));
}

$wert = '';
$ersterDurchlauf = true;

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


$wert .= 'Dokument_Nummer' . ';';
$wert .= 'Datum_Dokument' . ';';
$wert .= 'Kunde_Strasse'  . ';';
$wert .= 'Liefer_AdressNummer'  . ';';
$wert .= 'Liefer_Anrede'  . ';';
$wert .= 'Liefer_Name1' . ';';
$wert .= 'Liefer_Name2' . ';';
$wert .= 'Liefer_Name3' . ';';
$wert .= 'Liefer_Tel_LandWahl' . ';';
$wert .= 'Liefer_Tel_Vorwahl' . ';';
$wert .= 'Liefer_Tel_Rufnummer' . ';';
$wert .= 'Liefer_Tel_Durchwahl' . ';';
$wert .= 'Datum_Ersterfassung' . ';';
$wert .= 'Zeit_Ersterfassung' . ';';
$wert .= 'DOK_Phase' . ';';
$wert .= 'DOK_Disposition_Datum' . ';';
$wert .= 'DOK_Disposition_Zeit' . ';';
$wert .= 'Kdi_Gruppe' . ';';
$wert .= 'KdiWartung_VertragNr' . ';';
$wert .= 'KdiEingang_AnsprPart' . ';';
$wert .= 'Kdi_AuftrBeschreibng' . ';';
$wert .= 'KdiTermin_Datum' . ';';
$wert .= 'KdiTermin_Uhrzeit' . ';';
$wert .= 'KdiTermin_BisUhrzeit' . ';';
$wert .= 'KdiTermin_Dauer' . ';';
$wert .= 'Kdi_RechEMail' . ';';
$wert .= 'Kdi_Terminwunsch' . ';';
$wert .= 'Stoerungscode' . ';';
$wert .= 'Kdi_GebaeudeKomplex' . ';';
$wert .= 'Kdi_Gebaeude' . ';';
$wert .= 'KDI_WVAnlageArt' . ';';
$wert .= "\n";


while($obj = sqlsrv_fetch_object( $stmt)) {
      if($ersterDurchlauf){
         $ersterDurchlauf = false;
 
$wert .= $obj->Dokument_Nummer . ';';
$wert .= $obj->Datum_Dokument . ';';
$wert .= $obj->Kunde_Strasse  . ';';
$wert .= $obj->Liefer_AdressNummer  . ';';
$wert .= $obj->Liefer_Anrede  . ';';
$wert .= $obj->Liefer_Name1 . ';';
$wert .= $obj->Liefer_Name2 . ';';
$wert .= $obj->Liefer_Name3 . ';';
$wert .= $obj->Liefer_Tel_LandWahl . ';';
$wert .= $obj->Liefer_Tel_Vorwahl . ';';
$wert .= $obj->Liefer_Tel_Rufnummer . ';';
$wert .= $obj->Liefer_Tel_Durchwahl . ';';
$wert .= $obj->Datum_Ersterfassung . ';';
$wert .= $obj->Zeit_Ersterfassung . ';';
$wert .= $obj->DOK_Phase . ';';
$wert .= $obj->DOK_Disposition_Datum . ';';
$wert .= $obj->DOK_Disposition_Zeit . ';';
$wert .= $obj->Kdi_Gruppe . ';';
$wert .= $obj->KdiWartung_VertragNr . ';';
$wert .= $obj->KdiEingang_AnsprPart . ';';
$wert .= $obj->Kdi_AuftrBeschreibng . ';';
$wert .= $obj->KdiTermin_Datum . ';';
$wert .= $obj->KdiTermin_Uhrzeit . ';';
$wert .= $obj->KdiTermin_BisUhrzeit . ';';
$wert .= $obj->KdiTermin_Dauer . ';';
$wert .= $obj->Kdi_RechEMail . ';';
$wert .= $obj->Kdi_Terminwunsch . ';';
$wert .= $obj->Stoerungscode . ';';
$wert .= $obj->Kdi_GebaeudeKomplex . ';';
$wert .= $obj->Kdi_Gebaeude . ';';
$wert .= $obj->KDI_WVAnlageArt . ';';
$wert .= "\n";

}else{

$wert .= $obj->Dokument_Nummer;
$wert .= ';' . $obj->Datum_Dokument;
$wert .= ';' . $obj->Kunde_Strasse;
$wert .= ';' . $obj->Liefer_AdressNummer;
$wert .= ';' . $obj->Liefer_Anrede;
$wert .= ';' . $obj->Liefer_Name1;
$wert .= ';' . $obj->Liefer_Name2;
$wert .= ';' . $obj->Liefer_Name3;
$wert .= ';' . $obj->Liefer_Tel_LandWahl;
$wert .= ';' . $obj->Liefer_Tel_Vorwahl;
$wert .= ';' . $obj->Liefer_Tel_Rufnummer;
$wert .= ';' . $obj->Liefer_Tel_Durchwahl;
$wert .= ';' . $obj->Datum_Ersterfassung;
$wert .= ';' . $obj->Zeit_Ersterfassung;
$wert .= ';' . $obj->DOK_Phase;
$wert .= ';' . $obj->DOK_Disposition_Datum;
$wert .= ';' . $obj->DOK_Disposition_Zeit;
$wert .= ';' . $obj->Kdi_Gruppe;
$wert .= ';' . $obj->KdiWartung_VertragNr;
$wert .= ';' . $obj->KdiEingang_AnsprPart;
$wert .= ';' . $obj->Kdi_AuftrBeschreibng;
$wert .= ';' . $obj->KdiTermin_Datum;
$wert .= ';' . $obj->KdiTermin_Uhrzeit;
$wert .= ';' . $obj->KdiTermin_BisUhrzeit;
$wert .= ';' . $obj->KdiTermin_Dauer;
$wert .= ';' . $obj->Kdi_RechEMail;
$wert .= ';' . $obj->Kdi_Terminwunsch;
$wert .= ';' . $obj->Stoerungscode;
$wert .= ';' . $obj->Kdi_GebaeudeKomplex;
$wert .=  ';' . $obj->Kdi_Gebaeude;
$wert .= ';' . $obj->KDI_WVAnlageArt . ';';
$wert .= "\n"; 


}
     
}

$datum = date("d-m-Y");
$dateiname = $datum . '.csv';
$myfile = fopen($dateiname, "w");
$p = "C:\Terminierung";
$a = "C:\Automatische Terminierung\Archiv";
fwrite($myfile, $wert);
copy($dateiname, $p . '/' . $dateiname);
copy($dateiname, $a . '/' . $dateiname);
unlink($dateiname);




?>