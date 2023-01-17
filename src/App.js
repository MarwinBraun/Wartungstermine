import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import bild from  './App_Einstellungen.PNG';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

function App() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setpostsPerPage] = useState(10);
  const [Daten, setDaten] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [LoadingModal, setLoadingModal] = useState(false);
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [alle, setalle] = useState(false);
  const [InputData, setInputData] = useState('');

  const handleClose = () => setShow(false);
  const handleCloseEdit = () => {setShowEdit(false);};
  const handleShow = () => setShow(true);

  const handleShowEdit = (k) =>
   { 
    if(Rechte === 'admin' || Rechte === 'Bearbeiter'){
      setShowEdit(true); setInputField(false); setCurrentTerminID(k);
    }
   
  
  };
  const handleEdit = () => setShowEdit(true);

  const handleBestaetigen = async () => {
    setLoadingModal(true);
    try {
      const res = await axios.get('http://mail.dietenmeier-harsch.de:81/Neubestaetigen.php', {
        params: { TerminID: TerminID}, 
        
      
      });
      
      

      
      handleCloseEdit();
      Load();
      setLoadingModal(false);
     
    } catch (err) {
      if (err.response.status === 500) {
        alert('There was a problem with the server');
      } else {
        alert(err.response.data.msg);
      }
      
    }

  };

  const handleNeuerTermin = () => {
    setInputField(true);
  };


  const handleDeleteTermin = async () => {
    setLoadingModal(true);
    try {
      const res = await axios.get('http://mail.dietenmeier-harsch.de:81/delete.php', {
        params: { TerminID: TerminID}, 
        
      
      });
      
      

    
      handleCloseEdit();
      Load();
      setLoadingModal(false);
     
    } catch (err) {
      if (err.response.status === 500) {
        alert('There was a problem with the server');
      } else {
        alert(err.response.data.msg);
      }
      
    }
    
  };

  const bestaetigen = async () => {
    setLoadingModal(true);
    
    try {
      const res = await axios.get('http://mail.dietenmeier-harsch.de:81/Selbstbestaetigung.php', {
        params: { TerminID: TerminID, InputData: InputData}, 
        
      
      });
      
      

    
      handleCloseEdit();
      Load();
      setLoadingModal(false);
     
    } catch (err) {
      if (err.response.status === 500) {
        alert('There was a problem with the server');
      } else {
        alert(err.response.data.msg);
      }
      
    }
    
  };

  const seiten = (e) => {
    if(e.target.value === 'alle'){
      setpostsPerPage(e.target.value);
      setalle(true);
      paginate(1);
    }else{
     
      setpostsPerPage(e.target.value);
      setalle(false);
      paginate(1);
    }
 
  }

  const logOut = (e) => {
    localStorage.removeItem("loginData") 
    navigate("/dhworld/login");
 
  }

  const Load = async () => {
    setLoading(true);

    if(localStorage.getItem("settings") !== null){
      var einstellungen = localStorage.getItem("settings");
      var parsed = JSON.parse(einstellungen);
     setID(parsed.ID);
     setDokumentenNummer(parsed.DokumentenNummer);
     setKunde_Anrede(parsed.Kunde_Anrede);
setKunde_Name1(parsed.Kunde_Name1);
setKunde_Name2(parsed.Kunde_Name2);
setKunde_Strasse(parsed.Kunde_Strasse);
setKunde_Landeskennz(parsed.Kunde_Landeskennz);
setKunde_Postleitzahl(parsed.Kunde_Postleitzahl);
setKunde_Ort(parsed.Kunde_Ort);
setKdi_BesuchEMail(parsed.Kdi_BesuchEMail);
setDatum_Dokument(parsed.Datum_Dokument);
setLiefer_AdressNummer(parsed.Liefer_AdressNummer);
setLiefer_Anrede(parsed.Liefer_Anrede);
setLiefer_Name1(parsed.Liefer_Name1);
setLiefer_Name2(parsed.Liefer_Name2);
setLiefer_Name3(parsed.Liefer_Name3);
setLiefer_Tel_LandWahl(parsed.Liefer_Tel_LandWahl);
setLiefer_Tel_Vorwahl(parsed.Liefer_Tel_Vorwahl);
setLiefer_Tel_Rufnummer(parsed.Liefer_Tel_Rufnummer);
setLiefer_Tel_Durchwahl(parsed.Liefer_Tel_Durchwahl);
setDatum_Ersterfassung(parsed.Datum_Ersterfassung);
setZeit_Ersterfassung(parsed.Zeit_Ersterfassung);
setDOK_Phase(parsed.DOK_Phase);
setDOK_Disposition_Datum(parsed.DOK_Disposition_Datum);
setDOK_Disposition_Zeit(parsed.DOK_Disposition_Zeit);
setKdi_Gruppe(parsed.Kdi_Gruppe);
setKdiWartung_VertragNr(parsed.KdiWartung_VertragNr);
setKdiEingang_AnsprPart(parsed.KdiEingang_AnsprPart);
setKdi_AuftrBeschreibng(parsed.Kdi_AuftrBeschreibng);
setKdiTermin_Datum(parsed.KdiTermin_Datum);
setKdiTermin_Uhrzeit(parsed.KdiTermin_Uhrzeit);
setKdiTermin_BisUhrzeit(parsed.KdiTermin_BisUhrzeit);
setKdiTermin_Dauer(parsed.KdiTermin_Dauer);
setKdi_RechEMail(parsed.Kdi_RechEMail);
setKdi_Terminwunsch(parsed.Kdi_Terminwunsch);
setStoerungscode(parsed.Stoerungscode);
setKdi_GebaeudeKomplex(parsed.Kdi_GebaeudeKomplex);
setKdi_Gebaeude(parsed.Kdi_Gebaeude);
setKDI_WVAnlageArt(parsed.KDI_WVAnlageArt);
setTerminBestaetigungsdatum(parsed.TerminBestaetigungsdatum);


      
    }else{
      var obj = {
        ID : ID,
        DokumentenNummer: DokumentenNummer,
        Kunde_Anrede : Kunde_Anrede,
Kunde_Name1 : Kunde_Name1,
Kunde_Name2 : Kunde_Name2,
Kunde_Strasse : Kunde_Strasse,
Kunde_Landeskennz : Kunde_Landeskennz, 
Kunde_Postleitzahl : Kunde_Postleitzahl,
Kunde_Ort : Kunde_Ort,
Kdi_BesuchEMail : Kdi_BesuchEMail,
Datum_Dokument : Datum_Dokument,
Liefer_AdressNummer : Liefer_AdressNummer,
Liefer_Anrede : Liefer_Anrede,
Liefer_Name1 : Liefer_Name1,
Liefer_Name2 : Liefer_Name2,
Liefer_Name3 : Liefer_Name3,
Liefer_Tel_LandWahl : Liefer_Tel_LandWahl, 
Liefer_Tel_Vorwahl : Liefer_Tel_Vorwahl,
Liefer_Tel_Rufnummer : Liefer_Tel_Rufnummer,
Liefer_Tel_Durchwahl : Liefer_Tel_Durchwahl,
Datum_Ersterfassung : Datum_Ersterfassung,
Zeit_Ersterfassung : Zeit_Ersterfassung,
DOK_Phase : DOK_Phase,
DOK_Disposition_Datum : DOK_Disposition_Datum,
DOK_Disposition_Zeit : DOK_Disposition_Zeit,
Kdi_Gruppe : Kdi_Gruppe,
KdiWartung_VertragNr : KdiWartung_VertragNr,
KdiEingang_AnsprPart : KdiEingang_AnsprPart,
Kdi_AuftrBeschreibng : Kdi_AuftrBeschreibng,
KdiTermin_Datum : KdiTermin_Datum,
KdiTermin_Uhrzeit : KdiTermin_Uhrzeit,
KdiTermin_BisUhrzeit : KdiTermin_BisUhrzeit,
KdiTermin_Dauer : KdiTermin_Dauer,
Kdi_RechEMail : Kdi_RechEMail,
Kdi_Terminwunsch : Kdi_Terminwunsch,
Stoerungscode : Stoerungscode,
Kdi_GebaeudeKomplex : Kdi_GebaeudeKomplex,
Kdi_Gebaeude : Kdi_Gebaeude,
KDI_WVAnlageArt : KDI_WVAnlageArt, 
TerminBestaetigungsdatum : TerminBestaetigungsdatum
        
      }
     
      localStorage.setItem("settings", JSON.stringify(obj)); 
    }


    try {
      const res = await axios.get('http://mail.dietenmeier-harsch.de:81/load.php', {
        
      
      });
      
      

     setDaten(res.data.daten);
     setLoading(false);

     
    } catch (err) {
      if (err.response.status === 500) {
        alert('There was a problem with the server');
      } else {
        alert(err.response.data.msg);
      }
      
    }
  };





  const [ID, setID] = useState(true);
  const [DokumentenNummer, setDokumentenNummer] = useState(true);
  const [Kunde_Anrede, setKunde_Anrede] = useState(true);
  const [Kunde_Name1, setKunde_Name1] = useState(true);
  const [Kunde_Name2, setKunde_Name2] = useState(true);
  const [Kunde_Strasse, setKunde_Strasse] = useState(true);
  const [Kunde_Landeskennz, setKunde_Landeskennz] = useState(true);
  const [Kunde_Postleitzahl, setKunde_Postleitzahl] = useState(true);
  const [Kunde_Ort, setKunde_Ort] = useState(true);
  const [Kdi_BesuchEMail, setKdi_BesuchEMail] = useState(true);
  const [Datum_Dokument, setDatum_Dokument] = useState(true);
  const [Liefer_AdressNummer, setLiefer_AdressNummer] = useState(true);
  const [Liefer_Anrede, setLiefer_Anrede] = useState(true);
  const [Liefer_Name1, setLiefer_Name1] = useState(true);
  const [Liefer_Name2, setLiefer_Name2] = useState(true);
  const [Liefer_Name3, setLiefer_Name3] = useState(true);
  const [Liefer_Tel_LandWahl, setLiefer_Tel_LandWahl] = useState(true);
  const [Liefer_Tel_Vorwahl, setLiefer_Tel_Vorwahl] = useState(true);
  const [Liefer_Tel_Rufnummer, setLiefer_Tel_Rufnummer] = useState(true);
  const [Liefer_Tel_Durchwahl, setLiefer_Tel_Durchwahl] = useState(true);
  const [Datum_Ersterfassung, setDatum_Ersterfassung] = useState(true);
  const [Zeit_Ersterfassung, setZeit_Ersterfassung] = useState(true);
  const [DOK_Phase, setDOK_Phase] = useState(false);
  const [DOK_Disposition_Datum, setDOK_Disposition_Datum] = useState(false);
  const [DOK_Disposition_Zeit, setDOK_Disposition_Zeit] = useState(false);
  const [Kdi_Gruppe, setKdi_Gruppe] = useState(true);
  const [KdiWartung_VertragNr, setKdiWartung_VertragNr] = useState(true);
  const [KdiEingang_AnsprPart, setKdiEingang_AnsprPart] = useState(true);
  const [Kdi_AuftrBeschreibng, setKdi_AuftrBeschreibng] = useState(true);
  const [KdiTermin_Datum, setKdiTermin_Datum] = useState(true);
  const [KdiTermin_Uhrzeit, setKdiTermin_Uhrzeit] = useState(true);
  const [KdiTermin_BisUhrzeit, setKdiTermin_BisUhrzeit] = useState(true);
  const [KdiTermin_Dauer, setKdiTermin_Dauer] = useState(true);
  const [Kdi_RechEMail, setKdi_RechEMail] = useState(true);
  const [Kdi_Terminwunsch, setKdi_Terminwunsch] = useState(false);
  const [Stoerungscode, setStoerungscode] = useState(false);
  const [Kdi_GebaeudeKomplex, setKdi_GebaeudeKomplex] = useState(true);
  const [Kdi_Gebaeude, setKdi_Gebaeude] = useState(true);
  const [KDI_WVAnlageArt, setKDI_WVAnlageArt] = useState(true);
  const [TerminBestaetigungsdatum, setTerminBestaetigungsdatum] = useState(true);
  const [InputField, setInputField] = useState(false);
  const [TerminID, setCurrentTerminID] = useState(0);
  const [Rechte, setRechte] = useState('Leser');


  useEffect(() => {  
    
    if (localStorage.getItem("loginData") == null) {
            
      navigate("/dhworld/login");
      
    } else{
      var loginData = localStorage.getItem("loginData");
      var loginDataparsed = JSON.parse(loginData);
      setRechte(loginDataparsed.username);
    
    }

    
    const onLoad = async () => {
      setLoading(true);

      if(localStorage.getItem("settings") !== null){
        var einstellungen = localStorage.getItem("settings");
        var parsed = JSON.parse(einstellungen);
       setID(parsed.ID);
       setDokumentenNummer(parsed.DokumentenNummer);
       setKunde_Anrede(parsed.Kunde_Anrede);
setKunde_Name1(parsed.Kunde_Name1);
setKunde_Name2(parsed.Kunde_Name2);
setKunde_Strasse(parsed.Kunde_Strasse);
setKunde_Landeskennz(parsed.Kunde_Landeskennz);
setKunde_Postleitzahl(parsed.Kunde_Postleitzahl);
setKunde_Ort(parsed.Kunde_Ort);
setKdi_BesuchEMail(parsed.Kdi_BesuchEMail);
setDatum_Dokument(parsed.Datum_Dokument);
setLiefer_AdressNummer(parsed.Liefer_AdressNummer);
setLiefer_Anrede(parsed.Liefer_Anrede);
setLiefer_Name1(parsed.Liefer_Name1);
setLiefer_Name2(parsed.Liefer_Name2);
setLiefer_Name3(parsed.Liefer_Name3);
setLiefer_Tel_LandWahl(parsed.Liefer_Tel_LandWahl);
setLiefer_Tel_Vorwahl(parsed.Liefer_Tel_Vorwahl);
 setLiefer_Tel_Rufnummer(parsed.Liefer_Tel_Rufnummer);
setLiefer_Tel_Durchwahl(parsed.Liefer_Tel_Durchwahl);
setDatum_Ersterfassung(parsed.Datum_Ersterfassung);
setZeit_Ersterfassung(parsed.Zeit_Ersterfassung);
setDOK_Phase(parsed.DOK_Phase);
setDOK_Disposition_Datum(parsed.DOK_Disposition_Datum);
setDOK_Disposition_Zeit(parsed.DOK_Disposition_Zeit);
setKdi_Gruppe(parsed.Kdi_Gruppe);
setKdiWartung_VertragNr(parsed.KdiWartung_VertragNr);
setKdiEingang_AnsprPart(parsed.KdiEingang_AnsprPart);
setKdi_AuftrBeschreibng(parsed.Kdi_AuftrBeschreibng);
setKdiTermin_Datum(parsed.KdiTermin_Datum);
setKdiTermin_Uhrzeit(parsed.KdiTermin_Uhrzeit);
setKdiTermin_BisUhrzeit(parsed.KdiTermin_BisUhrzeit);
setKdiTermin_Dauer(parsed.KdiTermin_Dauer);
setKdi_RechEMail(parsed.Kdi_RechEMail);
setKdi_Terminwunsch(parsed.Kdi_Terminwunsch);
setStoerungscode(parsed.Stoerungscode);
setKdi_GebaeudeKomplex(parsed.Kdi_GebaeudeKomplex);
setKdi_Gebaeude(parsed.Kdi_Gebaeude);
setKDI_WVAnlageArt(parsed.KDI_WVAnlageArt);
setTerminBestaetigungsdatum(parsed.TerminBestaetigungsdatum);


        
      }else{
        var obj = {
          ID : ID,
          DokumentenNummer: DokumentenNummer,
          Kunde_Anrede : Kunde_Anrede,
Kunde_Name1 : Kunde_Name1,
Kunde_Name2 : Kunde_Name2,
Kunde_Strasse : Kunde_Strasse,
Kunde_Landeskennz : Kunde_Landeskennz, 
Kunde_Postleitzahl : Kunde_Postleitzahl,
Kunde_Ort : Kunde_Ort,
Kdi_BesuchEMail : Kdi_BesuchEMail,
Datum_Dokument : Datum_Dokument,
Liefer_AdressNummer : Liefer_AdressNummer,
Liefer_Anrede : Liefer_Anrede,
Liefer_Name1 : Liefer_Name1,
Liefer_Name2 : Liefer_Name2,
Liefer_Name3 : Liefer_Name3,
Liefer_Tel_LandWahl : Liefer_Tel_LandWahl, 
Liefer_Tel_Vorwahl : Liefer_Tel_Vorwahl,
Liefer_Tel_Rufnummer : Liefer_Tel_Rufnummer,
Liefer_Tel_Durchwahl : Liefer_Tel_Durchwahl,
Datum_Ersterfassung : Datum_Ersterfassung,
Zeit_Ersterfassung : Zeit_Ersterfassung,
DOK_Phase : DOK_Phase,
DOK_Disposition_Datum : DOK_Disposition_Datum,
DOK_Disposition_Zeit : DOK_Disposition_Zeit,
Kdi_Gruppe : Kdi_Gruppe,
KdiWartung_VertragNr : KdiWartung_VertragNr,
KdiEingang_AnsprPart : KdiEingang_AnsprPart,
Kdi_AuftrBeschreibng : Kdi_AuftrBeschreibng,
KdiTermin_Datum : KdiTermin_Datum,
KdiTermin_Uhrzeit : KdiTermin_Uhrzeit,
KdiTermin_BisUhrzeit : KdiTermin_BisUhrzeit,
KdiTermin_Dauer : KdiTermin_Dauer,
Kdi_RechEMail : Kdi_RechEMail,
Kdi_Terminwunsch : Kdi_Terminwunsch,
Stoerungscode : Stoerungscode,
Kdi_GebaeudeKomplex : Kdi_GebaeudeKomplex,
Kdi_Gebaeude : Kdi_Gebaeude,
KDI_WVAnlageArt : KDI_WVAnlageArt, 
TerminBestaetigungsdatum : TerminBestaetigungsdatum
          
        }
       
        localStorage.setItem("settings", JSON.stringify(obj)); 
      }


      try {
        const res = await axios.get('http://mail.dietenmeier-harsch.de:81/load.php', {
          
        
        });
        
        
  
       setDaten(res.data.daten);
       setLoading(false);
  
       
      } catch (err) {
        if (err.response.status === 500) {
          alert('There was a problem with the server');
        } else {
          alert(err.response.data.msg);
        }
        
      }
    };

     onLoad();

  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = Daten.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(Daten.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

const search = async (d) => {

  setLoading(true);
  
  var val = d.target.value;

 
    try {
        const res = await axios.get('http://mail.dietenmeier-harsch.de:81/autocomplete.php',  {
          params: {val: val}
        
        });
        
        
  
       setDaten(res.data.daten);
       setCurrentPage(1);
       setLoading(false);
  
       
      } catch (err) {
        if (err.response.status === 500) {
          alert('There was a problem with the server');
        } else {
          alert(err.response.data.msg);
        }
        
      }
}



  const filterc = (bez) => {

    if(bez === 'ID'){
      setID(!ID);
      if (localStorage.getItem("settings") === null) {

        var obj = {
          ID: !ID
        }
       
        localStorage.setItem("settings", JSON.stringify(obj)); 

      } else {
        var einstellungen = localStorage.getItem("settings");
        var parsed = JSON.parse(einstellungen);
        parsed.ID = !ID;
        localStorage.clear();
        localStorage.setItem("settings", JSON.stringify(parsed)); 

      }
    }

    if(bez === 'DokumentenNummer'){
      setDokumentenNummer(!DokumentenNummer)
      if (localStorage.getItem("settings") === null) {
        
        var obj = {
          DokumentenNummer: !DokumentenNummer
        }
       
        localStorage.setItem("settings", JSON.stringify(obj)); 

      } else {
        
        var einstellungen = localStorage.getItem("settings");
        var parsed = JSON.parse(einstellungen);
        parsed.DokumentenNummer = !DokumentenNummer;
        localStorage.clear();
        localStorage.setItem("settings", JSON.stringify(parsed)); 

      }
    }

    if(bez === 'Kunde_Anrede'){
      setKunde_Anrede(!Kunde_Anrede)
      if (localStorage.getItem("settings") === null) {
        
        var obj = {
          Kunde_Anrede: !Kunde_Anrede
        }
       
        localStorage.setItem("settings", JSON.stringify(obj)); 

      } else {
        
        var einstellungen = localStorage.getItem("settings");
        var parsed = JSON.parse(einstellungen);
        parsed.Kunde_Anrede = !Kunde_Anrede;
        localStorage.clear();
        localStorage.setItem("settings", JSON.stringify(parsed)); 

      }
    }

    if(bez === 'Kunde_Name1'){
      setKunde_Name1(!Kunde_Name1)
      if (localStorage.getItem("settings") === null) {
        
        var obj = {
          Kunde_Name1: !Kunde_Name1
        }
       
        localStorage.setItem("settings", JSON.stringify(obj)); 

      } else {
        
        var einstellungen = localStorage.getItem("settings");
        var parsed = JSON.parse(einstellungen);
        parsed.Kunde_Name1 = !Kunde_Name1;
        localStorage.clear();
        localStorage.setItem("settings", JSON.stringify(parsed)); 

      }
    }

    if(bez === 'Kunde_Name2'){
      setKunde_Name2(!Kunde_Name2)
      if (localStorage.getItem("settings") === null) {
        
        var obj = {
          Kunde_Name2: !Kunde_Name2
        }
       
        localStorage.setItem("settings", JSON.stringify(obj)); 

      } else {
        
        var einstellungen = localStorage.getItem("settings");
        var parsed = JSON.parse(einstellungen);
        parsed.Kunde_Name2 = !Kunde_Name2;
        localStorage.clear();
        localStorage.setItem("settings", JSON.stringify(parsed)); 

      }
    }

    if(bez === 'Kunde_Strasse'){
      setKunde_Strasse(!Kunde_Strasse)
      if (localStorage.getItem("settings") === null) {
        
        var obj = {
          Kunde_Strasse: !Kunde_Strasse
        }
       
        localStorage.setItem("settings", JSON.stringify(obj)); 

      } else {
        
        var einstellungen = localStorage.getItem("settings");
        var parsed = JSON.parse(einstellungen);
        parsed.Kunde_Strasse = !Kunde_Strasse;
        localStorage.clear();
        localStorage.setItem("settings", JSON.stringify(parsed)); 

      }
    }

    if(bez === 'Kunde_Landeskennz'){
      setKunde_Landeskennz(!Kunde_Landeskennz)
      if (localStorage.getItem("settings") === null) {
        
        var obj = {
          Kunde_Landeskennz: !Kunde_Landeskennz
        }
       
        localStorage.setItem("settings", JSON.stringify(obj)); 

      } else {
        
        var einstellungen = localStorage.getItem("settings");
        var parsed = JSON.parse(einstellungen);
        parsed.Kunde_Landeskennz = !Kunde_Landeskennz;
        localStorage.clear();
        localStorage.setItem("settings", JSON.stringify(parsed)); 

      }
    }

    if(bez === 'Kunde_Postleitzahl'){
      setKunde_Postleitzahl(!Kunde_Postleitzahl)
      if (localStorage.getItem("settings") === null) {
        
        var obj = {
          Kunde_Postleitzahl: !Kunde_Postleitzahl
        }
       
        localStorage.setItem("settings", JSON.stringify(obj)); 

      } else {
        
        var einstellungen = localStorage.getItem("settings");
        var parsed = JSON.parse(einstellungen);
        parsed.Kunde_Postleitzahl = !Kunde_Postleitzahl;
        localStorage.clear();
        localStorage.setItem("settings", JSON.stringify(parsed)); 

      }
    }

    if(bez === 'Kunde_Ort'){
      setKunde_Ort(!Kunde_Ort)
      if (localStorage.getItem("settings") === null) {
        
        var obj = {
          Kunde_Ort: !Kunde_Ort
        }
       
        localStorage.setItem("settings", JSON.stringify(obj)); 

      } else {
        
        var einstellungen = localStorage.getItem("settings");
        var parsed = JSON.parse(einstellungen);
        parsed.Kunde_Ort = !Kunde_Ort;
        localStorage.clear();
        localStorage.setItem("settings", JSON.stringify(parsed)); 

      }
    }

    if(bez === 'Kdi_BesuchEMail'){
      setKdi_BesuchEMail(!Kdi_BesuchEMail)
      if (localStorage.getItem("settings") === null) {
        
        var obj = {
          Kdi_BesuchEMail: !Kdi_BesuchEMail
        }
       
        localStorage.setItem("settings", JSON.stringify(obj)); 

      } else {
        
        var einstellungen = localStorage.getItem("settings");
        var parsed = JSON.parse(einstellungen);
        parsed.Kdi_BesuchEMail = !Kdi_BesuchEMail;
        localStorage.clear();
        localStorage.setItem("settings", JSON.stringify(parsed)); 

      }
    }

    if(bez === 'Datum_Dokument'){
      setDatum_Dokument(!Datum_Dokument)
      if (localStorage.getItem("settings") === null) {
        
        var obj = {
          Datum_Dokument: !Datum_Dokument
        }
       
        localStorage.setItem("settings", JSON.stringify(obj)); 

      } else {
        
        var einstellungen = localStorage.getItem("settings");
        var parsed = JSON.parse(einstellungen);
        parsed.Datum_Dokument = !Datum_Dokument;
        localStorage.clear();
        localStorage.setItem("settings", JSON.stringify(parsed)); 

      }
    }

    if(bez === 'Liefer_AdressNummer'){
      setLiefer_AdressNummer(!Liefer_AdressNummer)
      if (localStorage.getItem("settings") === null) {
        
        var obj = {
          Liefer_AdressNummer: !Liefer_AdressNummer
        }
       
        localStorage.setItem("settings", JSON.stringify(obj)); 

      } else {
        
        var einstellungen = localStorage.getItem("settings");
        var parsed = JSON.parse(einstellungen);
        parsed.Liefer_AdressNummer = !Liefer_AdressNummer;
        localStorage.clear();
        localStorage.setItem("settings", JSON.stringify(parsed)); 

      }
    }

    if(bez === 'Liefer_Anrede'){
      setLiefer_Anrede(!Liefer_Anrede)
      if (localStorage.getItem("settings") === null) {
        
        var obj = {
          Liefer_Anrede: !Liefer_Anrede
        }
       
        localStorage.setItem("settings", JSON.stringify(obj)); 

      } else {
        
        var einstellungen = localStorage.getItem("settings");
        var parsed = JSON.parse(einstellungen);
        parsed.Liefer_Anrede = !Liefer_Anrede;
        localStorage.clear();
        localStorage.setItem("settings", JSON.stringify(parsed)); 

      }
    }

    if(bez === 'Liefer_Name1'){
      setLiefer_Name1(!Liefer_Name1)
      if (localStorage.getItem("settings") === null) {
        
        var obj = {
          Liefer_Name1: !Liefer_Name1
        }
       
        localStorage.setItem("settings", JSON.stringify(obj)); 

      } else {
        
        var einstellungen = localStorage.getItem("settings");
        var parsed = JSON.parse(einstellungen);
        parsed.Liefer_Name1 = !Liefer_Name1;
        localStorage.clear();
        localStorage.setItem("settings", JSON.stringify(parsed)); 

      }
    }

    if(bez === 'Liefer_Name2'){
      setLiefer_Name2(!Liefer_Name2)
      if (localStorage.getItem("settings") === null) {
        
        var obj = {
          Liefer_Name2: !Liefer_Name2
        }
       
        localStorage.setItem("settings", JSON.stringify(obj)); 

      } else {
        
        var einstellungen = localStorage.getItem("settings");
        var parsed = JSON.parse(einstellungen);
        parsed.Liefer_Name2 = !Liefer_Name2;
        localStorage.clear();
        localStorage.setItem("settings", JSON.stringify(parsed)); 

      }
    }

    if(bez === 'Liefer_Name3'){
      setLiefer_Name3(!Liefer_Name3)
      if (localStorage.getItem("settings") === null) {
        
        var obj = {
          Liefer_Name3: !Liefer_Name3
        }
       
        localStorage.setItem("settings", JSON.stringify(obj)); 

      } else {
        
        var einstellungen = localStorage.getItem("settings");
        var parsed = JSON.parse(einstellungen);
        parsed.Liefer_Name3 = !Liefer_Name3;
        localStorage.clear();
        localStorage.setItem("settings", JSON.stringify(parsed)); 

      }
    }

    if(bez === 'Liefer_Tel_LandWahl'){
      setLiefer_Tel_LandWahl(!Liefer_Tel_LandWahl)
      if (localStorage.getItem("settings") === null) {
        
        var obj = {
          Liefer_Tel_LandWahl: !Liefer_Tel_LandWahl
        }
       
        localStorage.setItem("settings", JSON.stringify(obj)); 

      } else {
        
        var einstellungen = localStorage.getItem("settings");
        var parsed = JSON.parse(einstellungen);
        parsed.Liefer_Tel_LandWahl = !Liefer_Tel_LandWahl;
        localStorage.clear();
        localStorage.setItem("settings", JSON.stringify(parsed)); 

      }
    }

    if(bez === 'Liefer_Tel_Vorwahl'){
      setLiefer_Tel_Vorwahl(!Liefer_Tel_Vorwahl)
      if (localStorage.getItem("settings") === null) {
        
        var obj = {
          Liefer_Tel_Vorwahl: !Liefer_Tel_Vorwahl
        }
       
        localStorage.setItem("settings", JSON.stringify(obj)); 

      } else {
        
        var einstellungen = localStorage.getItem("settings");
        var parsed = JSON.parse(einstellungen);
        parsed.Liefer_Tel_Vorwahl = !Liefer_Tel_Vorwahl;
        localStorage.clear();
        localStorage.setItem("settings", JSON.stringify(parsed)); 

      }
    }

    if(bez === 'Liefer_Tel_Rufnummer'){
      setLiefer_Tel_Rufnummer(!Liefer_Tel_Rufnummer)
      if (localStorage.getItem("settings") === null) {
        
        var obj = {
          Liefer_Tel_Rufnummer: !Liefer_Tel_Rufnummer
        }
       
        localStorage.setItem("settings", JSON.stringify(obj)); 

      } else {
        
        var einstellungen = localStorage.getItem("settings");
        var parsed = JSON.parse(einstellungen);
        parsed.Liefer_Tel_Rufnummer = !Liefer_Tel_Rufnummer;
        localStorage.clear();
        localStorage.setItem("settings", JSON.stringify(parsed)); 

      }
    }

    if(bez === 'Liefer_Tel_Durchwahl'){
      setLiefer_Tel_Durchwahl(!Liefer_Tel_Durchwahl)
      if (localStorage.getItem("settings") === null) {
        
        var obj = {
          Liefer_Tel_Durchwahl: !Liefer_Tel_Durchwahl
        }
       
        localStorage.setItem("settings", JSON.stringify(obj)); 

      } else {
        
        var einstellungen = localStorage.getItem("settings");
        var parsed = JSON.parse(einstellungen);
        parsed.Liefer_Tel_Durchwahl = !Liefer_Tel_Durchwahl;
        localStorage.clear();
        localStorage.setItem("settings", JSON.stringify(parsed)); 

      }
    }

    if(bez === 'Datum_Ersterfassung'){
      setDatum_Ersterfassung(!Datum_Ersterfassung)
      if (localStorage.getItem("settings") === null) {
        
        var obj = {
          Datum_Ersterfassung: !Datum_Ersterfassung
        }
       
        localStorage.setItem("settings", JSON.stringify(obj)); 

      } else {
        
        var einstellungen = localStorage.getItem("settings");
        var parsed = JSON.parse(einstellungen);
        parsed.Datum_Ersterfassung = !Datum_Ersterfassung;
        localStorage.clear();
        localStorage.setItem("settings", JSON.stringify(parsed)); 

      }
    }

    if(bez === 'Zeit_Ersterfassung'){
      setZeit_Ersterfassung(!Zeit_Ersterfassung)
      if (localStorage.getItem("settings") === null) {
        
        var obj = {
          Zeit_Ersterfassung: !Zeit_Ersterfassung
        }
       
        localStorage.setItem("settings", JSON.stringify(obj)); 

      } else {
        
        var einstellungen = localStorage.getItem("settings");
        var parsed = JSON.parse(einstellungen);
        parsed.Zeit_Ersterfassung = !Zeit_Ersterfassung;
        localStorage.clear();
        localStorage.setItem("settings", JSON.stringify(parsed)); 

      }
    }

    if(bez === 'DOK_Phase'){
      setDOK_Phase(!DOK_Phase)
      if (localStorage.getItem("settings") === null) {
        
        var obj = {
          DOK_Phase: !DOK_Phase
        }
       
        localStorage.setItem("settings", JSON.stringify(obj)); 

      } else {
        
        var einstellungen = localStorage.getItem("settings");
        var parsed = JSON.parse(einstellungen);
        parsed.DOK_Phase = !DOK_Phase;
        localStorage.clear();
        localStorage.setItem("settings", JSON.stringify(parsed)); 

      }
    }

    if(bez === 'DOK_Disposition_Datum'){
      setDOK_Disposition_Datum(!DOK_Disposition_Datum)
      if (localStorage.getItem("settings") === null) {
        
        var obj = {
          DOK_Disposition_Datum: !DOK_Disposition_Datum
        }
       
        localStorage.setItem("settings", JSON.stringify(obj)); 

      } else {
        
        var einstellungen = localStorage.getItem("settings");
        var parsed = JSON.parse(einstellungen);
        parsed.DOK_Disposition_Datum = !DOK_Disposition_Datum;
        localStorage.clear();
        localStorage.setItem("settings", JSON.stringify(parsed)); 

      }
    }

    if(bez === 'DOK_Disposition_Zeit'){
      setDOK_Disposition_Zeit(!DOK_Disposition_Zeit)
      if (localStorage.getItem("settings") === null) {
        
        var obj = {
          DOK_Disposition_Zeit: !DOK_Disposition_Zeit
        }
       
        localStorage.setItem("settings", JSON.stringify(obj)); 

      } else {
        
        var einstellungen = localStorage.getItem("settings");
        var parsed = JSON.parse(einstellungen);
        parsed.DOK_Disposition_Zeit = !DOK_Disposition_Zeit;
        localStorage.clear();
        localStorage.setItem("settings", JSON.stringify(parsed)); 

      }
    }

    if(bez === 'Kdi_Gruppe'){
      setKdi_Gruppe(!Kdi_Gruppe)
      if (localStorage.getItem("settings") === null) {
        
        var obj = {
          Kdi_Gruppe: !Kdi_Gruppe
        }
       
        localStorage.setItem("settings", JSON.stringify(obj)); 

      } else {
        
        var einstellungen = localStorage.getItem("settings");
        var parsed = JSON.parse(einstellungen);
        parsed.Kdi_Gruppe = !Kdi_Gruppe;
        localStorage.clear();
        localStorage.setItem("settings", JSON.stringify(parsed)); 

      }
    }

    if(bez === 'KdiWartung_VertragNr'){
      setKdiWartung_VertragNr(!KdiWartung_VertragNr)
      if (localStorage.getItem("settings") === null) {
        
        var obj = {
          KdiWartung_VertragNr: !KdiWartung_VertragNr
        }
       
        localStorage.setItem("settings", JSON.stringify(obj)); 

      } else {
        
        var einstellungen = localStorage.getItem("settings");
        var parsed = JSON.parse(einstellungen);
        parsed.KdiWartung_VertragNr = !KdiWartung_VertragNr;
        localStorage.clear();
        localStorage.setItem("settings", JSON.stringify(parsed)); 

      }
    }

    if(bez === 'KdiEingang_AnsprPart'){
      setKdiEingang_AnsprPart(!KdiEingang_AnsprPart)
      if (localStorage.getItem("settings") === null) {
        
        var obj = {
          KdiEingang_AnsprPart: !KdiEingang_AnsprPart
        }
       
        localStorage.setItem("settings", JSON.stringify(obj)); 

      } else {
        
        var einstellungen = localStorage.getItem("settings");
        var parsed = JSON.parse(einstellungen);
        parsed.KdiEingang_AnsprPart = !KdiEingang_AnsprPart;
        localStorage.clear();
        localStorage.setItem("settings", JSON.stringify(parsed)); 

      }
    }

    if(bez === 'Kdi_AuftrBeschreibng'){
      setKdi_AuftrBeschreibng(!Kdi_AuftrBeschreibng)
      if (localStorage.getItem("settings") === null) {
        
        var obj = {
          Kdi_AuftrBeschreibng: !Kdi_AuftrBeschreibng
        }
       
        localStorage.setItem("settings", JSON.stringify(obj)); 

      } else {
        
        var einstellungen = localStorage.getItem("settings");
        var parsed = JSON.parse(einstellungen);
        parsed.Kdi_AuftrBeschreibng = !Kdi_AuftrBeschreibng;
        localStorage.clear();
        localStorage.setItem("settings", JSON.stringify(parsed)); 

      }
    }

    if(bez === 'KdiTermin_Datum'){
      setKdiTermin_Datum(!KdiTermin_Datum)
      if (localStorage.getItem("settings") === null) {
        
        var obj = {
          KdiTermin_Datum: !KdiTermin_Datum
        }
       
        localStorage.setItem("settings", JSON.stringify(obj)); 

      } else {
        
        var einstellungen = localStorage.getItem("settings");
        var parsed = JSON.parse(einstellungen);
        parsed.KdiTermin_Datum = !KdiTermin_Datum;
        localStorage.clear();
        localStorage.setItem("settings", JSON.stringify(parsed)); 

      }
    }

    if(bez === 'KdiTermin_Uhrzeit'){
      setKdiTermin_Uhrzeit(!KdiTermin_Uhrzeit)
      if (localStorage.getItem("settings") === null) {
        
        var obj = {
          KdiTermin_Uhrzeit: !KdiTermin_Uhrzeit
        }
       
        localStorage.setItem("settings", JSON.stringify(obj)); 

      } else {
        
        var einstellungen = localStorage.getItem("settings");
        var parsed = JSON.parse(einstellungen);
        parsed.KdiTermin_Uhrzeit = !KdiTermin_Uhrzeit;
        localStorage.clear();
        localStorage.setItem("settings", JSON.stringify(parsed)); 

      }
    }

    if(bez === 'KdiTermin_BisUhrzeit'){
      setKdiTermin_BisUhrzeit(!KdiTermin_BisUhrzeit)
      if (localStorage.getItem("settings") === null) {
        
        var obj = {
          KdiTermin_BisUhrzeit: !KdiTermin_BisUhrzeit
        }
       
        localStorage.setItem("settings", JSON.stringify(obj)); 

      } else {
        
        var einstellungen = localStorage.getItem("settings");
        var parsed = JSON.parse(einstellungen);
        parsed.KdiTermin_BisUhrzeit = !KdiTermin_BisUhrzeit;
        localStorage.clear();
        localStorage.setItem("settings", JSON.stringify(parsed)); 

      }
    }

    if(bez === 'KdiTermin_Dauer'){
      setKdiTermin_Dauer(!KdiTermin_Dauer)
      if (localStorage.getItem("settings") === null) {
        
        var obj = {
          KdiTermin_Dauer: !KdiTermin_Dauer
        }
       
        localStorage.setItem("settings", JSON.stringify(obj)); 

      } else {
        
        var einstellungen = localStorage.getItem("settings");
        var parsed = JSON.parse(einstellungen);
        parsed.KdiTermin_Dauer = !KdiTermin_Dauer;
        localStorage.clear();
        localStorage.setItem("settings", JSON.stringify(parsed)); 

      }
    }

    if(bez === 'Kdi_RechEMail'){
      setKdi_RechEMail(!Kdi_RechEMail)
      if (localStorage.getItem("settings") === null) {
        
        var obj = {
          Kdi_RechEMail: !Kdi_RechEMail
        }
       
        localStorage.setItem("settings", JSON.stringify(obj)); 

      } else {
        
        var einstellungen = localStorage.getItem("settings");
        var parsed = JSON.parse(einstellungen);
        parsed.Kdi_RechEMail = !Kdi_RechEMail;
        localStorage.clear();
        localStorage.setItem("settings", JSON.stringify(parsed)); 

      }
    }

    if(bez === 'Kdi_Terminwunsch'){
      setKdi_Terminwunsch(!Kdi_Terminwunsch)
      if (localStorage.getItem("settings") === null) {
        
        var obj = {
          Kdi_Terminwunsch: !Kdi_Terminwunsch
        }
       
        localStorage.setItem("settings", JSON.stringify(obj)); 

      } else {
        
        var einstellungen = localStorage.getItem("settings");
        var parsed = JSON.parse(einstellungen);
        parsed.Kdi_Terminwunsch = !Kdi_Terminwunsch;
        localStorage.clear();
        localStorage.setItem("settings", JSON.stringify(parsed)); 

      }
    }

    if(bez === 'Stoerungscode'){
      setStoerungscode(!Stoerungscode)
      if (localStorage.getItem("settings") === null) {
        
        var obj = {
          Stoerungscode: !Stoerungscode
        }
       
        localStorage.setItem("settings", JSON.stringify(obj)); 

      } else {
        
        var einstellungen = localStorage.getItem("settings");
        var parsed = JSON.parse(einstellungen);
        parsed.Stoerungscode = !Stoerungscode;
        localStorage.clear();
        localStorage.setItem("settings", JSON.stringify(parsed)); 

      }
    }

    if(bez === 'Kdi_GebaeudeKomplex'){
      setKdi_GebaeudeKomplex(!Kdi_GebaeudeKomplex)
      if (localStorage.getItem("settings") === null) {
        
        var obj = {
          Kdi_GebaeudeKomplex: !Kdi_GebaeudeKomplex
        }
       
        localStorage.setItem("settings", JSON.stringify(obj)); 

      } else {
        
        var einstellungen = localStorage.getItem("settings");
        var parsed = JSON.parse(einstellungen);
        parsed.Kdi_GebaeudeKomplex = !Kdi_GebaeudeKomplex;
        localStorage.clear();
        localStorage.setItem("settings", JSON.stringify(parsed)); 

      }
    }

    if(bez === 'Kdi_Gebaeude'){
      setKdi_Gebaeude(!Kdi_Gebaeude)
      if (localStorage.getItem("settings") === null) {
        
        var obj = {
          Kdi_Gebaeude: !Kdi_Gebaeude
        }
       
        localStorage.setItem("settings", JSON.stringify(obj)); 

      } else {
        
        var einstellungen = localStorage.getItem("settings");
        var parsed = JSON.parse(einstellungen);
        parsed.Kdi_Gebaeude = !Kdi_Gebaeude;
        localStorage.clear();
        localStorage.setItem("settings", JSON.stringify(parsed)); 

      }
    }

    if(bez === 'KDI_WVAnlageArt'){
      setKDI_WVAnlageArt(!KDI_WVAnlageArt)
      if (localStorage.getItem("settings") === null) {
        
        var obj = {
          KDI_WVAnlageArt: !KDI_WVAnlageArt
        }
       
        localStorage.setItem("settings", JSON.stringify(obj)); 

      } else {
        
        var einstellungen = localStorage.getItem("settings");
        var parsed = JSON.parse(einstellungen);
        parsed.KDI_WVAnlageArt = !KDI_WVAnlageArt;
        localStorage.clear();
        localStorage.setItem("settings", JSON.stringify(parsed)); 

      }
    }

    if(bez === 'TerminBestaetigungsdatum'){
      setTerminBestaetigungsdatum(!TerminBestaetigungsdatum)
      if (localStorage.getItem("settings") === null) {
        
        var obj = {
          TerminBestaetigungsdatum: !TerminBestaetigungsdatum
        }
       
        localStorage.setItem("settings", JSON.stringify(obj)); 

      } else {
        
        var einstellungen = localStorage.getItem("settings");
        var parsed = JSON.parse(einstellungen);
        parsed.TerminBestaetigungsdatum = !TerminBestaetigungsdatum;
        localStorage.clear();
        localStorage.setItem("settings", JSON.stringify(parsed)); 

      }
    }




  }


  return (


    
    <Container>

      
<Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Optionen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {LoadingModal === true ? (
 <Row>
 <Col  xs={12} className="text-center">
 <Spinner animation="border" variant="primary" />
 </Col>

</Row>
) : (
        <div className="d-grid gap-2">
        <Button size="lg" variant="success" onClick={handleBestaetigen}>
            Termin bestätigen
          </Button>
          <Button size="lg" variant="secondary" onClick={handleNeuerTermin}>Neuer Termin</Button>
            
            {InputField === true ? (
             <Form>
             <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
              
               <Col sm="8">
                 <Form.Control onChange={(e) => setInputData(e.target.value)} type="text" placeholder="Beispiel: 09.01.2023 09:46" /> <br></br>
                 <Button  variant="info" onClick={bestaetigen}>
            Bestätigen
          </Button>
               </Col>
             </Form.Group>
             </Form>
       
            ) : (null)}
         
         {Rechte === "admin" ? (
          <Button size="lg" variant="danger" onClick={handleDeleteTermin}>
          Termin löschen
        </Button>
         ) : (null)}
          
          </div>

) }

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Schließen
          </Button>
       
        </Modal.Footer>
      </Modal>

<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Spaltenfilter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
       
        <Form>
      
      <Form.Check 
        type="switch"
        label="ID"
        className="farbe"
        checked={ID === true ? true : false}
        onChange={() => filterc('ID')}
      /> 

<Form.Check 
        type="switch"
        label="Dokument_Nummer"
        className="farbe"
        checked={DokumentenNummer === true ? true : false}
        onChange={() => filterc('DokumentenNummer')}
      /> 

<Form.Check 
        type="switch"
        label="Kunde_Anrede"
        className="farbe"
        checked={Kunde_Anrede === true ? true : false}
        onChange={() => filterc('Kunde_Anrede')}
      /> 

<Form.Check 
        type="switch"
        label="Kunde_Name1"
        className="farbe"
        checked={Kunde_Name1 === true ? true : false}
        onChange={() => filterc('Kunde_Name1')}
      /> 

<Form.Check 
        type="switch"
        label="Kunde_Name2"
        className="farbe"
        checked={Kunde_Name2 === true ? true : false}
        onChange={() => filterc('Kunde_Name2')}
      /> 

<Form.Check 
        type="switch"
        label="Kunde_Strasse"
        className="farbe"
        checked={Kunde_Strasse === true ? true : false}
        onChange={() => filterc('Kunde_Strasse')}
      /> 

<Form.Check 
        type="switch"
        label="Kunde_Landeskennz"
        className="farbe"
        checked={Kunde_Landeskennz === true ? true : false}
        onChange={() => filterc('Kunde_Landeskennz')}
      /> 

<Form.Check 
        type="switch"
        label="Kunde_Postleitzahl"
        className="farbe"
        checked={Kunde_Postleitzahl === true ? true : false}
        onChange={() => filterc('Kunde_Postleitzahl')}
      /> 

<Form.Check 
        type="switch"
        label="Kunde_Ort"
        className="farbe"
        checked={Kunde_Ort === true ? true : false}
        onChange={() => filterc('Kunde_Ort')}
      /> 

<Form.Check 
        type="switch"
        label="Kdi_BesuchEMail"
        className="farbe"
        checked={Kdi_BesuchEMail === true ? true : false}
        onChange={() => filterc('Kdi_BesuchEMail')}
      /> 

<Form.Check 
        type="switch"
        label="Datum_Dokument"
        className="farbe"
        checked={Datum_Dokument === true ? true : false}
        onChange={() => filterc('Datum_Dokument')}
      /> 

<Form.Check 
        type="switch"
        label="Liefer_AdressNummer"
        className="farbe"
        checked={Liefer_AdressNummer === true ? true : false}
        onChange={() => filterc('Liefer_AdressNummer')}
      /> 

<Form.Check 
        type="switch"
        label="Liefer_Anrede"
        className="farbe"
        checked={Liefer_Anrede === true ? true : false}
        onChange={() => filterc('Liefer_Anrede')}
      /> 

<Form.Check 
        type="switch"
        label="Liefer_Name1"
        className="farbe"
        checked={Liefer_Name1 === true ? true : false}
        onChange={() => filterc('Liefer_Name1')}
      /> 

<Form.Check 
        type="switch"
        label="Liefer_Name2"
        className="farbe"
        checked={Liefer_Name2 === true ? true : false}
        onChange={() => filterc('Liefer_Name2')}
      /> 

<Form.Check 
        type="switch"
        label="Liefer_Name3"
        className="farbe"
        checked={Liefer_Name3 === true ? true : false}
        onChange={() => filterc('Liefer_Name3')}
      /> 

<Form.Check 
        type="switch"
        label="Liefer_Tel_LandWahl"
        className="farbe"
        checked={Liefer_Tel_LandWahl === true ? true : false}
        onChange={() => filterc('Liefer_Tel_LandWahl')}
      /> 

<Form.Check 
        type="switch"
        label="Liefer_Tel_Vorwahl"
        className="farbe"
        checked={Liefer_Tel_Vorwahl === true ? true : false}
        onChange={() => filterc('Liefer_Tel_Vorwahl')}
      /> 

<Form.Check 
        type="switch"
        label="Liefer_Tel_Rufnummer"
        className="farbe"
        checked={Liefer_Tel_Rufnummer === true ? true : false}
        onChange={() => filterc('Liefer_Tel_Rufnummer')}
      /> 

<Form.Check 
        type="switch"
        label="Liefer_Tel_Durchwahl"
        className="farbe"
        checked={Liefer_Tel_Durchwahl === true ? true : false}
        onChange={() => filterc('Liefer_Tel_Durchwahl')}
      /> 

<Form.Check 
        type="switch"
        label="Datum_Ersterfassung"
        className="farbe"
        checked={Datum_Ersterfassung === true ? true : false}
        onChange={() => filterc('Datum_Ersterfassung')}
      /> 

<Form.Check 
        type="switch"
        label="Zeit_Ersterfassung"
        className="farbe"
        checked={Zeit_Ersterfassung === true ? true : false}
        onChange={() => filterc('Zeit_Ersterfassung')}
      /> 

<Form.Check 
        type="switch"
        label="DOK_Phase"
        className="farbe"
        checked={DOK_Phase === true ? true : false}
        onChange={() => filterc('DOK_Phase')}
      /> 

<Form.Check 
        type="switch"
        label="DOK_Disposition_Datum"
        className="farbe"
        checked={DOK_Disposition_Datum === true ? true : false}
        onChange={() => filterc('DOK_Disposition_Datum')}
      /> 

<Form.Check 
        type="switch"
        label="DOK_Disposition_Zeit"
        className="farbe"
        checked={DOK_Disposition_Zeit === true ? true : false}
        onChange={() => filterc('DOK_Disposition_Zeit')}
      /> 

<Form.Check 
        type="switch"
        label="Kdi_Gruppe"
        className="farbe"
        checked={Kdi_Gruppe === true ? true : false}
        onChange={() => filterc('Kdi_Gruppe')}
      /> 

<Form.Check 
        type="switch"
        label="KdiWartung_VertragNr"
        className="farbe"
        checked={KdiWartung_VertragNr === true ? true : false}
        onChange={() => filterc('KdiWartung_VertragNr')}
      /> 

<Form.Check 
        type="switch"
        label="KdiEingang_AnsprPart"
        className="farbe"
        checked={KdiEingang_AnsprPart === true ? true : false}
        onChange={() => filterc('KdiEingang_AnsprPart')}
      /> 

<Form.Check 
        type="switch"
        label="Kdi_AuftrBeschreibung"
        className="farbe"
        checked={Kdi_AuftrBeschreibng === true ? true : false}
        onChange={() => filterc('Kdi_AuftrBeschreibng')}
      /> 

<Form.Check 
        type="switch"
        label="KdiTermin_Datum"
        className="farbe"
        checked={KdiTermin_Datum === true ? true : false}
        onChange={() => filterc('KdiTermin_Datum')}
      /> 

<Form.Check 
        type="switch"
        label="KdiTermin_Uhrzeit"
        className="farbe"
        checked={KdiTermin_Uhrzeit === true ? true : false}
        onChange={() => filterc('KdiTermin_Uhrzeit')}
      /> 

<Form.Check 
        type="switch"
        label="KdiTermin_BisUhrzeit"
        className="farbe"
        checked={KdiTermin_BisUhrzeit === true ? true : false}
        onChange={() => filterc('KdiTermin_BisUhrzeit')}
      /> 

<Form.Check 
        type="switch"
        label="KdiTermin_Dauer"
        className="farbe"
        checked={KdiTermin_Dauer === true ? true : false}
        onChange={() => filterc('KdiTermin_Dauer')}
      /> 

<Form.Check 
        type="switch"
        label="Kdi_RechEMail"
        className="farbe"
        checked={Kdi_RechEMail === true ? true : false}
        onChange={() => filterc('Kdi_RechEMail')}
      /> 

<Form.Check 
        type="switch"
        label="Kdi_Terminwunsch"
        className="farbe"
        checked={Kdi_Terminwunsch === true ? true : false}
        onChange={() => filterc('Kdi_Terminwunsch')}
      /> 

<Form.Check 
        type="switch"
        label="Stoerungscode"
        className="farbe"
        checked={Stoerungscode === true ? true : false}
        onChange={() => filterc('Stoerungscode')}
      /> 

<Form.Check 
        type="switch"
        label="Kdi_GebaeudeKomplex"
        className="farbe"
        checked={Kdi_GebaeudeKomplex === true ? true : false}
        onChange={() => filterc('Kdi_GebaeudeKomplex')}
      /> 

<Form.Check 
        type="switch"
        label="Kdi_Gebaeude"
        className="farbe"
        checked={Kdi_Gebaeude === true ? true : false}
        onChange={() => filterc('Kdi_Gebaeude')}
      /> 

<Form.Check 
        type="switch"
        label="KDI_WVAnlageArt"
        className="farbe"
        checked={KDI_WVAnlageArt === true ? true : false}
        onChange={() => filterc('KDI_WVAnlageArt')}
      /> 

<Form.Check 
        type="switch"
        label="TerminBestaetigungsdatum"
        className="farbe"
        checked={TerminBestaetigungsdatum === true ? true : false}
        onChange={() => filterc('TerminBestaetigungsdatum')}
      /> 
      
        
       
        </Form>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Schließen
          </Button>
        </Modal.Footer>
      </Modal>

      <br/>
{Loading === true ? (
 <Row>
 <Col  xs={12} className="text-center">
 <Spinner animation="border" variant="primary" />
 </Col>

</Row>
) : ( null) }

<Row>
 <Col onClick={logOut} xs={{ span: 2, offset: 10}} className="text-center p-3 mb-2 bg-danger text-white umrandung">
 <i class="bi bi-box-arrow-right stil"></i>  Logout
 </Col>

</Row>

<Row className="text-center justify-content-center">
  <Col xs={7} md={2}  >
    <h3>DH World</h3><br></br>
  <img className='img-fluid' src={bild}/>
  </Col>
</Row>
<br/>

<Row className="text-center justify-content-center">
  <Col xs={12} md={6}>
  <InputGroup className="mb-3">
      
        <Form.Control
          placeholder="Nach KDI-Nummer, Objekt, Auftragsdatum, Kundennummer, Nachname, Vorname suchen"
          aria-label="Username"
          aria-describedby="basic-addon1"
          onChange={(e) => search(e)}
          
        />
           <Button variant="primary" id="button-addon2">
          Suchen <i class="bi bi-search"></i>
        </Button>
        </InputGroup>
  </Col>
 
</Row>
<br/>

<Row className="justify-content-center">
  <Col className="d-grid gap-2" xs={12} md={3}>
  <Button onClick={handleShow} variant="outline-primary" size="lg"><i class="bi bi-filter-left"></i> Spaltenfilter</Button>
  </Col>
</Row>

<br/>


<Row>
        <Col xs={12}>

        <Table striped responsive bordered hover>
      <thead>
        <tr>
        {TerminBestaetigungsdatum === true ? (<th>TerminBestaetigungsdatum</th>) : (null)}
        {DokumentenNummer === true ? (<th>KDI-Nummer</th>) : (null)}
        {Datum_Dokument === true ? (<th>Anlegedatum</th>) : (null)}
        {Zeit_Ersterfassung === true ? (<th>Anlageuhrzeit</th>) : (null)}
        {Liefer_AdressNummer === true ? (<th>Kundennummer</th>) : (null)}
        {Liefer_Anrede === true ? ( <th>Anrede</th>) : (null)}
        {Liefer_Name1 === true ? ( <th>Nachname</th>) : (null)}
       {Liefer_Name2 === true ? (<th>Vorname</th>) : (null)}
       {Liefer_Name3 === true ? ( <th>Optionaler Namenszusatz</th>) : (null)}
       {Liefer_Tel_LandWahl === true ? ( <th>Landesvorwahl</th>) : (null)}
       {Liefer_Tel_Vorwahl === true ? ( <th>Ortsvorwahl</th>) : (null)}
       {Liefer_Tel_Rufnummer === true ? ( <th>Hauptnummer</th>) : (null)}
        {Liefer_Tel_Durchwahl === true ? ( <th>Durchwahl</th>) : (null)}
        {DOK_Phase === true ? (<th>DOK_Phase</th>) : (null)}
        {DOK_Disposition_Datum === true ? (<th>DOK_Disposition_Datum</th>) : (null)}
        {DOK_Disposition_Zeit === true ? ( <th>DOK_Disposition_Zeit</th>) : (null)}
        {Kdi_Gruppe === true ? ( <th>KDI-Gruppe</th>) : (null)}
        {KdiWartung_VertragNr === true ? ( <th>Vertragsnummer</th>) : (null)}
        {KdiEingang_AnsprPart === true ? ( <th>Versandart</th>) : (null)}
        {Kdi_AuftrBeschreibng === true ? (<th>Auftragsbeschreibung</th>) : (null)}
        {KdiTermin_Datum === true ? ( <th>Auftragsdatum</th>) : (null)}
        {KdiTermin_Uhrzeit === true ? (<th>Planuhrzeit Beginn</th>) : (null)}
        {KdiTermin_BisUhrzeit === true ? ( <th>Planuhrzeit Ende</th>) : (null)}
        {KdiTermin_Dauer === true ? ( <th>Planzeit</th>) : (null)}
        {Kdi_RechEMail === true ? ( <th>Mailadresse Kunde</th>) : (null)}
        {Kdi_Terminwunsch === true ? (<th>Terminwunsch</th>) : (null)}
        {Stoerungscode === true ? ( <th>Stoerungscode</th>) : (null)}
        {Kdi_GebaeudeKomplex === true ? ( <th>Schlüssel</th>) : (null)}
        {Kdi_Gebaeude === true ? ( <th>Objekt</th>) : (null)}
        {KDI_WVAnlageArt === true ? ( <th>Anlagenart</th>) : (null)}
        {Kunde_Anrede === true ? (<th>Anrede Mieter</th>) : (null)}
       {Kunde_Name1 === true ? ( <th>Name 1 Mieter</th>) : (null)}
       {Kunde_Name2 === true ? (<th>Name 2 Mieter</th>) : (null)}
       {Kunde_Strasse === true ? (<th>Straße Mieter</th>) : (null)}
       {Kunde_Landeskennz === true ? (<th>Land Mieter</th>) : (null)}
       {Kunde_Postleitzahl === true ? (<th>PLZ Mieter</th>) : (null)}
       {Kunde_Ort === true ? ( <th>Ort Mieter</th>) : (null)}
       {Kdi_BesuchEMail === true ? ( <th>Mail Mieter</th>) : (null)}
        </tr>
      </thead>
      <tbody>
      {alle === true ? (
        Daten.map((v, index) => (
      
      <tr key={index}  onClick={handleShowEdit(v.ID)}>

     
      
       {TerminBestaetigungsdatum === true ? ( <td >{v.TerminBestaetigungsdatum}</td>) : (null)}
       {DokumentenNummer === true ? (<td >{v.Dokument_Nummer}</td>) : (null)}
       {Datum_Dokument === true ? ( <td >{v.Datum_Dokument}</td>) : (null)}
       {Zeit_Ersterfassung === true ? ( <td >{v.Zeit_Ersterfassung}</td>) : (null)}
       {Liefer_AdressNummer === true ? ( <td >{v.Liefer_AdressNummer}</td>) : (null)}
       {Liefer_Anrede === true ? ( <td >{v.Liefer_Anrede}</td>) : (null)}
       {Liefer_Name1 === true ? ( <td >{v.Liefer_Name1}</td>) : (null)}
       {Liefer_Name2 === true ? ( <td >{v.Liefer_Name2}</td>) : (null)}
       {Liefer_Name3 === true ? ( <td >{v.Liefer_Name3}</td>) : (null)}
       {Liefer_Tel_LandWahl === true ? ( <td >{v.Liefer_Tel_LandWahl}</td>) : (null)}
       {Liefer_Tel_Vorwahl === true ? ( <td >{v.Liefer_Tel_Vorwahl}</td>) : (null)}
       {Liefer_Tel_Rufnummer === true ? ( <td >{v.Liefer_Tel_Rufnummer}</td>) : (null)}
       {Liefer_Tel_Durchwahl === true ? ( <td >{v.Liefer_Tel_Durchwahl}</td>) : (null)}
       {DOK_Phase === true ? ( <td >{v.DOK_Phase}</td>) : (null)}
       {DOK_Disposition_Datum === true ? ( <td >{v.DOK_Disposition_Datum}</td>) : (null)}
       {DOK_Disposition_Zeit === true ? ( <td >{v.DOK_Disposition_Zeit}</td>) : (null)}
       {Kdi_Gruppe === true ? ( <td >{v.Kdi_Gruppe}</td>) : (null)}
       {KdiWartung_VertragNr === true ? ( <td >{v.KdiWartung_VertragNr}</td>) : (null)}
       {KdiEingang_AnsprPart === true ? ( <td >{v.KdiEingang_AnsprPart}</td>) : (null)}
       {Kdi_AuftrBeschreibng === true ? ( <td >{v.Kdi_AuftrBeschreibng}</td>) : (null)}
       {KdiTermin_Datum === true ? ( <td >{v.KdiTermin_Datum}</td>) : (null)}
       {KdiTermin_Uhrzeit === true ? ( <td >{v.KdiTermin_Uhrzeit}</td>) : (null)}
       {KdiTermin_BisUhrzeit === true ? ( <td >{v.KdiTermin_BisUhrzeit}</td>) : (null)}
       {KdiTermin_Dauer === true ? (  <td >{v.KdiTermin_Dauer}</td>) : (null)}
       {Kdi_RechEMail === true ? ( <td >{v.Kdi_RechEMail}</td>) : (null)}
       {Kdi_Terminwunsch === true ? ( <td >{v.Kdi_Terminwunsch}</td>) : (null)}
       {Stoerungscode === true ? ( <td >{v.Stoerungscode}</td>) : (null)}
       {Kdi_GebaeudeKomplex === true ? ( <td >{v.Kdi_GebaeudeKomplex}</td>) : (null)}
       {Kdi_Gebaeude === true ? ( <td >{v.Kdi_Gebaeude}</td>) : (null)}
       {KDI_WVAnlageArt === true ? ( <td >{v.KDI_WVAnlageArt}</td>) : (null)}
       {Kunde_Anrede === true ? (<td >{v.Kunde_Anrede}</td>) : (null)}
       {Kunde_Name1 === true ? ( <td >{v.Kunde_Name1}</td>) : (null)}
       {Kunde_Name2 === true ? ( <td >{v.Kunde_Name2}</td>) : (null)}
       {Kunde_Strasse === true ? ( <td >{v.Kunde_Strasse}</td>) : (null)}
       {Kunde_Landeskennz === true ? ( <td >{v.Kunde_Landeskennz}</td>) : (null)}
       {Kunde_Postleitzahl === true ? ( <td >{v.Kunde_Postleitzahl}</td>) : (null)}
       {Kunde_Ort === true ? (<td >{v.Kunde_Ort}</td>) : (null)}
       {Kdi_BesuchEMail === true ? ( <td >{v.Kdi_BesuchEMail}</td>) : (null)}
      
      
          </tr>
          
      ))
      ) : (
        currentPosts.map((v, index) => (
          <tr key={index} onClick={() => handleShowEdit(v.ID)}>
       {TerminBestaetigungsdatum === true ? ( <td >{v.TerminBestaetigungsdatum}</td>) : (null)}
       {DokumentenNummer === true ? (<td >{v.Dokument_Nummer}</td>) : (null)}
       {Datum_Dokument === true ? ( <td >{v.Datum_Dokument}</td>) : (null)}
       {Zeit_Ersterfassung === true ? ( <td >{v.Zeit_Ersterfassung}</td>) : (null)}
       {Liefer_AdressNummer === true ? ( <td >{v.Liefer_AdressNummer}</td>) : (null)}
       {Liefer_Anrede === true ? ( <td >{v.Liefer_Anrede}</td>) : (null)}
       {Liefer_Name1 === true ? ( <td >{v.Liefer_Name1}</td>) : (null)}
       {Liefer_Name2 === true ? ( <td >{v.Liefer_Name2}</td>) : (null)}
       {Liefer_Name3 === true ? ( <td >{v.Liefer_Name3}</td>) : (null)}
       {Liefer_Tel_LandWahl === true ? ( <td >{v.Liefer_Tel_LandWahl}</td>) : (null)}
       {Liefer_Tel_Vorwahl === true ? ( <td >{v.Liefer_Tel_Vorwahl}</td>) : (null)}
       {Liefer_Tel_Rufnummer === true ? ( <td >{v.Liefer_Tel_Rufnummer}</td>) : (null)}
       {Liefer_Tel_Durchwahl === true ? ( <td >{v.Liefer_Tel_Durchwahl}</td>) : (null)}
       {DOK_Phase === true ? ( <td >{v.DOK_Phase}</td>) : (null)}
       {DOK_Disposition_Datum === true ? ( <td >{v.DOK_Disposition_Datum}</td>) : (null)}
       {DOK_Disposition_Zeit === true ? ( <td >{v.DOK_Disposition_Zeit}</td>) : (null)}
       {Kdi_Gruppe === true ? ( <td >{v.Kdi_Gruppe}</td>) : (null)}
       {KdiWartung_VertragNr === true ? ( <td >{v.KdiWartung_VertragNr}</td>) : (null)}
       {KdiEingang_AnsprPart === true ? ( <td >{v.KdiEingang_AnsprPart}</td>) : (null)}
       {Kdi_AuftrBeschreibng === true ? ( <td >{v.Kdi_AuftrBeschreibng}</td>) : (null)}
       {KdiTermin_Datum === true ? ( <td >{v.KdiTermin_Datum}</td>) : (null)}
       {KdiTermin_Uhrzeit === true ? ( <td >{v.KdiTermin_Uhrzeit}</td>) : (null)}
       {KdiTermin_BisUhrzeit === true ? ( <td >{v.KdiTermin_BisUhrzeit}</td>) : (null)}
       {KdiTermin_Dauer === true ? (  <td >{v.KdiTermin_Dauer}</td>) : (null)}
       {Kdi_RechEMail === true ? ( <td >{v.Kdi_RechEMail}</td>) : (null)}
       {Kdi_Terminwunsch === true ? ( <td >{v.Kdi_Terminwunsch}</td>) : (null)}
       {Stoerungscode === true ? ( <td >{v.Stoerungscode}</td>) : (null)}
       {Kdi_GebaeudeKomplex === true ? ( <td >{v.Kdi_GebaeudeKomplex}</td>) : (null)}
       {Kdi_Gebaeude === true ? ( <td >{v.Kdi_Gebaeude}</td>) : (null)}
       {KDI_WVAnlageArt === true ? ( <td >{v.KDI_WVAnlageArt}</td>) : (null)}
       {Kunde_Anrede === true ? (<td >{v.Kunde_Anrede}</td>) : (null)}
       {Kunde_Name1 === true ? ( <td >{v.Kunde_Name1}</td>) : (null)}
       {Kunde_Name2 === true ? ( <td >{v.Kunde_Name2}</td>) : (null)}
       {Kunde_Strasse === true ? ( <td >{v.Kunde_Strasse}</td>) : (null)}
       {Kunde_Landeskennz === true ? ( <td >{v.Kunde_Landeskennz}</td>) : (null)}
       {Kunde_Postleitzahl === true ? ( <td >{v.Kunde_Postleitzahl}</td>) : (null)}
       {Kunde_Ort === true ? (<td >{v.Kunde_Ort}</td>) : (null)}
       {Kdi_BesuchEMail === true ? ( <td >{v.Kdi_BesuchEMail}</td>) : (null)}
      
      
          </tr>
        )  
      ))}

      

      
    
        
        
      </tbody>
    </Table>



        </Col>
      </Row>
<br/>
      <div className='text-center'>
        <Row className='text-center justify-content-center'>
        <Col className='text-center justify-content-center' xs={3} md={1}>
      <Form.Select onChange={(e => seiten(e))} value={postsPerPage} aria-label="Default select example">
      <option value="1">1</option>
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="15">15</option>
      <option value="20">20</option>
      <option value="30">30</option>
      <option value="50">50</option>
      <option value="100">100</option>
      <option value="alle">Alle</option>
    </Form.Select>
    </Col>
    </Row>
    <br/>
    {alle === true ? (null) : (
      <div>
    <p>Seite {currentPage}</p>
    <ul className='pagination justify-content-center'>
      {pageNumbers.map(number => (
        <li key={number}  className={'page-item'}>
          <a onClick={() => paginate(number)} className={'page-link ' + (number == currentPage ? 'hinter' : 'k')}>
            {number}
          </a>
        </li>
      ))}
      
    </ul>
    </div>
    )}
      
    
       
      </div>

     
     
     
    </Container>
  );
}



export default App;
