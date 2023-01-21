<?php
header('Content-type: text/plain; charset=utf-8');


$serverName = "SRV-DB";
$connectionInfo = array("Database"=>"powerbird", "UID"=>"powerbird", "PWD"=>"powerbird", "CharacterSet" => "UTF-8");
$conn = sqlsrv_connect( $serverName, $connectionInfo);
if( $conn === false ) {
     die( print_r( sqlsrv_errors(), true));
}


$sql = "INSERT INTO [wartungstermine].[dbo].[daten]
           ([Dokument_Nummer]
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
           ,[reaktion]
           ,[logVersandDatum]
           ,[eskalation]
           ,[erinnerungVersand])
     Select  CAST(Dokument_Nummer AS varchar) as Dokument_Nummer, Kunde_Anrede, Kunde_Name1,
  Kunde_Name2, LEFT(Kunde_Strasse,LEN(Kunde_Strasse) -3) as Kunde_Strasse, Kunde_Landeskennz, Kunde_Postleitzahl,
  Kunde_Ort, Kdi_BesuchEMail, FORMAT(Datum_Dokument, 'dd.MM.yyyy') as Datum_Dokument, 
  RIGHT(Liefer_AdressNummer, LEN(Liefer_AdressNummer) - 1) as Liefer_AdressNummer, Liefer_Anrede, Liefer_Name1, Liefer_Name2, Liefer_Name3,
  Liefer_Tel_LandWahl, Liefer_Tel_Vorwahl, Liefer_Tel_Rufnummer, Liefer_Tel_Durchwahl, FORMAT(Datum_Ersterfassung, 'dd.MM.yyyy') as Datum_Ersterfassung,
  FORMAT(Zeit_Ersterfassung, 'hh:mm') as Zeit_Ersterfassung, case DOK_Phase when '' THEN 0 else DOK_Phase end as DOK_Phase,
  FORMAT(DOK_Disposition_Datum, 'dd.MM.yyyy') as DOK_Disposition_Datum,  FORMAT(DOK_Disposition_Zeit, 'hh:mm') as DOK_Disposition_Zeit,
  Kdi_Gruppe, KdiWartung_VertragNr, KdiEingang_AnsprPart, Kdi_AuftrBeschreibng, FORMAT(KdiTermin_Datum, 'dd.MM.yyyy') as KdiTermin_Datum,
  FORMAT(KdiTermin_Uhrzeit, 'hh:mm') as KdiTermin_Uhrzeit, FORMAT(KdiTermin_BisUhrzeit , 'hh:mm') as KdiTermin_BisUhrzeit,
  FORMAT(KdiTermin_Dauer, 'hh:mm') as KdiTermin_Dauer, Kdi_RechEMail, FORMAT(Datum_AusliefWunsch, 'dd.MM.yyyy') as Kdi_Terminwunsch,
  Stoerungscode, Kdi_GebaeudeKomplex, Kdi_Gebaeude, KDI_WVAnlageArt, ('') as TerminBestaetigungsdatum, 0 as verarbeitet, 0 as reaktion, 0 as LogVersandDatum, 0 as eskalation, 0 as erinnerungVersand
  FROM [powerbird].[dbo].[ELKDI] 
  where CAST(Datum_Dokument AS DATE) = CAST( getdate() AS DATE)
  and KdiEingang_AnsprPart IN ('EM', 'EP', 'BP', 'BM')";

$stmt = sqlsrv_query( $conn, $sql);
if( $stmt === false ) {
     die( print_r( sqlsrv_errors(), true));
}

copy('\\\192.168.1.5\Daten\Automatischer_Terminkartenversand_Druckliste\Druckliste.pdf', '\\\192.168.1.5\Daten\Automatischer_Terminkartenversand_Druckliste\Erledigt' . '\\' . 'Druckliste.pdf');
unlink('\\\192.168.1.5\Daten\Automatischer_Terminkartenversand_Druckliste\Druckliste.pdf');







?>