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
import TimePicker from 'react-time-picker';
import DatePicker from 'react-date-picker';
import moment from 'moment'
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

function App() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setpostsPerPage] = useState(100);
  const [Daten, setDaten] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [LoadingModal, setLoadingModal] = useState(false);
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [alle, setalle] = useState(false);
  const [v_TerminBestaetigungsdatum, setv_TerminBestaetigungsdatum] = useState('');
  const [v_Dokument_Nummer, setv_Dokument_Nummer] = useState('');
  const [v_Datum_Dokument, setv_Datum_Dokument] = useState('');
  const [v_Zeit_Ersterfassung, setv_Zeit_Ersterfassung] = useState('');
  const [v_Liefer_AdressNummer, setv_Liefer_AdressNummer] = useState('');
  const [v_Liefer_Anrede, setv_Liefer_Anrede] = useState('');
  const [v_Liefer_Name1, setv_Liefer_Name1] = useState('');
  const [v_Liefer_Name2, setv_Liefer_Name2] = useState('');
  const [v_Liefer_Name3, setv_Liefer_Name3] = useState('');
  const [v_Liefer_Tel_LandWahl, setv_Liefer_Tel_LandWahl] = useState('');
  const [v_Liefer_Tel_Vorwahl, setv_Liefer_Tel_Vorwahl] = useState('');
  const [v_Liefer_Tel_Rufnummer, setv_Liefer_Tel_Rufnummer] = useState('');
  const [v_Liefer_Tel_Durchwahl, setv_Liefer_Tel_Durchwahl] = useState('');
  const [v_DOK_Phase, setv_DOK_Phase] = useState('');
  const [v_DOK_Disposition_Datum, setv_DOK_Disposition_Datum] = useState('');
  const [v_DOK_Disposition_Zeit, setv_DOK_Disposition_Zeit] = useState('');
  const [v_Kdi_Gruppe, setv_Kdi_Gruppe] = useState('');
  const [v_KdiWartung_VertragNr, setv_KdiWartung_VertragNr] = useState('');
  const [v_KdiEingang_AnsprPart, setv_KdiEingang_AnsprPart] = useState('');
  const [v_Kdi_AuftrBeschreibng, setv_Kdi_AuftrBeschreibng] = useState('');
  const [v_KdiTermin_Datum, setv_KdiTermin_Datum] = useState(new Date());
  const [v_KdiTermin_Uhrzeit, setv_KdiTermin_Uhrzeit] = useState('01:00');
  const [v_KdiTermin_BisUhrzeit, setv_KdiTermin_BisUhrzeit] = useState('01:00');
  const [v_KdiTermin_Dauer, setv_KdiTermin_Dauer] = useState('');
  const [v_Kdi_RechEMail, setv_Kdi_RechEMail] = useState('');
  const [v_Kdi_Terminwunsch, setv_Kdi_Terminwunsch] = useState('');
  const [v_Stoerungscode, setv_Stoerungscode] = useState('');
  const [v_Kdi_GebaeudeKomplex, setv_Kdi_GebaeudeKomplex] = useState('');
  const [v_Kdi_Gebaeude, setv_Kdi_Gebaeude] = useState('');
  const [v_KDI_WVAnlageArt, setv_KDI_WVAnlageArt] = useState('');
  const [v_Kunde_Anrede, setv_Kunde_Anrede] = useState('');
  const [v_Kunde_Name1, setv_Kunde_Name1] = useState('');
  const [v_Kunde_Name2, setv_Kunde_Name2] = useState('');
  const [v_Kunde_Strasse, setv_Kunde_Strasse] = useState('');
  const [v_Kunde_Landeskennz, setv_Kunde_Landeskennz] = useState('');
  const [v_Kunde_Postleitzahl, setv_Kunde_Postleitzahl] = useState('');
  const [v_Kunde_Ort, setv_Kunde_Ort] = useState('');
  const [v_Kdi_BesuchEMail, setv_Kdi_BesuchEMail] = useState('');
  const [v_Liefer_Strasse, setv_Liefer_Strasse] = useState('');
  const [v_Liefer_Postleitzahl, setv_Liefer_Postleitzahl] = useState('');
  const [v_Liefer_Ort, setv_Liefer_Ort] = useState('');
  const [v_Kunde_Tel_LandWahl, setv_Kunde_Tel_LandWahl] = useState('');
  const [v_Kunde_Tel_Vorwahl, setv_Kunde_Tel_Vorwahl] = useState('');
  const [v_Kunde_Tel_Rufnummer, setv_Kunde_Tel_Rufnummer] = useState('');
  const [v_Kunde_Tel_Durchwahl, setv_Kunde_Tel_Durchwahl ] = useState('');
  const [InputData, setInputData] = useState('');
  const [Laden, setLaden] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [value, onChange] = useState('10:00');
  const [valuee, onChangee] = useState('10:00');
  const [valueee, onChangeee] = useState('10:00');
  const [terminierung, setterminierung] = useState('');
  const [terminierungg, setterminierungg] = useState('');
  const [bestaetigteMail, setbestaetigteMail] = useState(false);
  const [bestaetigtePost, setbestaetigtePost] = useState(false);
  const [bestaetigteMit, setbestaetigteMit] = useState(false);
  const [bestaetigteGesamtanzahl, setbestaetigteGesamtanzahl] = useState(false);
  const [bestaetigtetermineesk1, setbestaetigtetermineesk1] = useState(false);
  const [bestaetigtetermineesk2, setbestaetigtetermineesk2] = useState(false);

  const handleClose = () => setShow(false);
  const handleCloseEdit = () => {setShowEdit(false);};
  const handleShow = () => setShow(true);
var p = '';
  const handleShowEdit = (ID,
    v_TerminBestaetigungsdatum,
v_Dokument_Nummer,
v_Datum_Dokument,
v_Zeit_Ersterfassung,
v_Liefer_AdressNummer,
v_Liefer_Anrede,
v_Liefer_Name1,
v_Liefer_Name2,
v_Liefer_Name3,
v_Liefer_Tel_LandWahl,
v_Liefer_Tel_Vorwahl,
v_Liefer_Tel_Rufnummer,
v_Liefer_Tel_Durchwahl,
v_DOK_Phase,
v_DOK_Disposition_Datum,
v_DOK_Disposition_Zeit,
v_Kdi_Gruppe,
v_KdiWartung_VertragNr,
v_KdiEingang_AnsprPart,
v_Kdi_AuftrBeschreibng,
v_KdiTermin_Datum,
v_KdiTermin_Uhrzeit,
v_KdiTermin_BisUhrzeit,
v_KdiTermin_Dauer,
v_Kdi_RechEMail,
v_Kdi_Terminwunsch,
v_Stoerungscode,
v_Kdi_GebaeudeKomplex,
v_Kdi_Gebaeude,
v_KDI_WVAnlageArt,
v_Kunde_Anrede,
v_Kunde_Name1,
v_Kunde_Name2,
v_Kunde_Strasse,
v_Kunde_Landeskennz,
v_Kunde_Postleitzahl,
v_Kunde_Ort,
v_Kdi_BesuchEMail,
v_Liefer_Strasse,
v_Liefer_Postleitzahl,
v_Liefer_Ort,
v_Kunde_Tel_LandWahl,
v_Kunde_Tel_Vorwahl,
v_Kunde_Tel_Rufnummer,
v_Kunde_Tel_Durchwahl
    
    
    
    ) =>
   { 
    if(Rechte === 'admin' || Rechte === 'Bearbeiter'){
      setShowEdit(true); setInputField(false); 
      setCurrentTerminID(ID);
      setv_TerminBestaetigungsdatum(v_TerminBestaetigungsdatum);
setv_Dokument_Nummer(v_Dokument_Nummer);
setv_Datum_Dokument(v_Datum_Dokument);
setv_Zeit_Ersterfassung(v_Zeit_Ersterfassung);
setv_Liefer_AdressNummer(v_Liefer_AdressNummer);
setv_Liefer_Anrede(v_Liefer_Anrede);
setv_Liefer_Name1(v_Liefer_Name1);
setv_Liefer_Name2(v_Liefer_Name2);
setv_Liefer_Name3(v_Liefer_Name3);
setv_Liefer_Tel_LandWahl(v_Liefer_Tel_LandWahl);
setv_Liefer_Tel_Vorwahl(v_Liefer_Tel_Vorwahl);
setv_Liefer_Tel_Rufnummer(v_Liefer_Tel_Rufnummer);
setv_Liefer_Tel_Durchwahl(v_Liefer_Tel_Durchwahl);
setv_DOK_Phase(v_DOK_Phase);
setv_DOK_Disposition_Datum(v_DOK_Disposition_Datum);
setv_DOK_Disposition_Zeit(v_DOK_Disposition_Zeit);
setv_Kdi_Gruppe(v_Kdi_Gruppe);
setv_KdiWartung_VertragNr(v_KdiWartung_VertragNr);
setv_KdiEingang_AnsprPart(v_KdiEingang_AnsprPart);
setv_Kdi_AuftrBeschreibng(v_Kdi_AuftrBeschreibng);
p = v_KdiTermin_Datum;
var myArray = v_KdiTermin_Datum.split(".");
var zusammen = myArray[2] + '-' + myArray[1] + '-' + myArray[0];
var parse = new Date(zusammen);
setv_KdiTermin_Datum(parse);
setStartDate(parse);
onChange(v_KdiTermin_Uhrzeit);
onChangee(v_KdiTermin_BisUhrzeit);
onChangeee(v_KdiTermin_Dauer);
setv_KdiTermin_Uhrzeit(v_KdiTermin_Uhrzeit);
setv_KdiTermin_BisUhrzeit(v_KdiTermin_BisUhrzeit);
setv_KdiTermin_Dauer(v_KdiTermin_Dauer);
setv_Kdi_RechEMail(v_Kdi_RechEMail);
setv_Kdi_Terminwunsch(v_Kdi_Terminwunsch);
setv_Stoerungscode(v_Stoerungscode);
setv_Kdi_GebaeudeKomplex(v_Kdi_GebaeudeKomplex);
setv_Kdi_Gebaeude(v_Kdi_Gebaeude);
setv_KDI_WVAnlageArt(v_KDI_WVAnlageArt);
setv_Kunde_Landeskennz(v_Kunde_Landeskennz);
setv_Kunde_Anrede(v_Kunde_Anrede);
setv_Kunde_Name1(v_Kunde_Name1);
setv_Kunde_Name2(v_Kunde_Name2);
setv_Kunde_Strasse(v_Kunde_Strasse);
setv_Kunde_Postleitzahl(v_Kunde_Postleitzahl);
setv_Kunde_Ort(v_Kunde_Ort);
setv_Kdi_BesuchEMail(v_Kdi_BesuchEMail);
setv_Liefer_Strasse(v_Liefer_Strasse);
setv_Liefer_Postleitzahl(v_Liefer_Postleitzahl);
setv_Liefer_Ort(v_Liefer_Ort);
setv_Kunde_Tel_LandWahl(v_Kunde_Tel_LandWahl);
setv_Kunde_Tel_Vorwahl(v_Kunde_Tel_Vorwahl);
setv_Kunde_Tel_Rufnummer(v_Kunde_Tel_Rufnummer);
setv_Kunde_Tel_Durchwahl(v_Kunde_Tel_Durchwahl);

    }
   
  
  };
 

  const handleBestaetigen = async () => {
    setLoadingModal(true);
    try {
      const res = await axios.get('https://dhworld.dietenmeier-harsch.de/Neubestaetigen.php', {
        params: { TerminID: TerminID}, 
        
      
      });
      
      

      
      handleCloseEdit();
      var d = Daten;
      var p = currentPage;
      Load();
      
      currentPosts = d;
      setCurrentPage(p);
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
      const res = await axios.get('https://dhworld.dietenmeier-harsch.de/delete.php', {
        params: { TerminID: TerminID}, 
        
      
      });
      
      

    
      handleCloseEdit();
      Load();
      var d = Daten;
      var p = currentPage;
      currentPosts = d;
      setCurrentPage(p);
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
    console.log(terminierung);
    console.log(value);
    console.log(valuee);
    console.log(valueee);
  var all = '';
 if(terminierung === ''){
     
      var mm = v_KdiTermin_Datum.getDate();
      var tt = mm < 10 ? ('0' + mm) : (mm);
      var m = v_KdiTermin_Datum.getMonth() + 1;
      var t = m < 10 ? ('0' + m) : (m);
      var ddd = tt + '.' + t + '.' + v_KdiTermin_Datum.getFullYear();

    

      
      all = ddd;
    
    }else{
      
      var arr = terminierung.split("-");
       all = arr[2]  + '.' + arr[1] + '.' + arr[0];
       if(arr[0].length <= 2){
        all = arr[2]  + '.' + arr[1] + '.20' + arr[0];
       }
       var m = moment(terminierung, 'YYYY-MM-DD');
       if(m.isValid() === false){
        var mm = v_KdiTermin_Datum.getDate();
        var tt = mm < 10 ? ('0' + mm) : (mm);
        var m = v_KdiTermin_Datum.getMonth() + 1;
        var t = m < 10 ? ('0' + m) : (m);
        var ddd = tt + '.' + t + '.' + v_KdiTermin_Datum.getFullYear();
        all = ddd;
       } 

      
    }
    
    try {
      const res = await axios.get('https://dhworld.dietenmeier-harsch.de/Selbstbestaetigung.php', {
        params: { TerminID: TerminID, auftragsdatum: all, start: value, bis: valuee, dauer: valueee}, 
        
      
      });
      
      

    
      handleCloseEdit();
      Load();
      var d = Daten;
      var p = currentPage;
      currentPosts = d;
      setCurrentPage(p);
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
      //setpostsPerPage(e.target.value);
      setalle(true);
      paginate(1);
      currentPosts = Daten;
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
setLiefer_Strasse(parsed.Liefer_Strasse);
setLiefer_Postleitzahl(parsed.Liefer_Postleitzahl);
setLiefer_Ort(parsed.Liefer_Ort);
setKunde_Tel_LandWahl(parsed.Kunde_Tel_LandWahl);
setKunde_Tel_Vorwahl(parsed.Kunde_Tel_Vorwahl);
setKunde_Tel_Rufnummer(parsed.Kunde_Tel_Rufnummer);
setKunde_Tel_Durchwahl(parsed.Kunde_Tel_Durchwahl);


      
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
TerminBestaetigungsdatum : TerminBestaetigungsdatum,
Liefer_Strasse : Liefer_Strasse,
Liefer_Postleitzahl : Liefer_Postleitzahl,
Liefer_Ort : Liefer_Ort,
Kunde_Tel_LandWahl : Kunde_Tel_LandWahl,
Kunde_Tel_Vorwahl : Kunde_Tel_Vorwahl,
Kunde_Tel_Rufnummer : Kunde_Tel_Rufnummer,
Kunde_Tel_Durchwahl : Kunde_Tel_Durchwahl,


        
      }
     
      localStorage.setItem("settings", JSON.stringify(obj)); 
    }


    try {
      const res = await axios.get('https://dhworld.dietenmeier-harsch.de/load.php', {
        
      
      });
      
      

     setDaten(res.data.daten);
     setbesMail(res.data.besMail);
     setbesPost(res.data.besPost);
     setbesMit(res.data.besMit);
     setGesamtanzahl(res.data.Gesamtanzahl);
     settermineesk1(res.data.termineesk1);
     settermineesk2(res.data.termineesk2);
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
  const [Liefer_Strasse, setLiefer_Strasse] = useState(true);
  const [Liefer_Postleitzahl, setLiefer_Postleitzahl] = useState(true);
  const [Liefer_Ort, setLiefer_Ort] = useState(true);
  const [Kunde_Tel_LandWahl, setKunde_Tel_LandWahl] = useState(true);
  const [Kunde_Tel_Vorwahl, setKunde_Tel_Vorwahl] = useState(true);
  const [Kunde_Tel_Rufnummer, setKunde_Tel_Rufnummer] = useState(true);
  const [Kunde_Tel_Durchwahl, setKunde_Tel_Durchwahl] = useState(true);
  const [besMail, setbesMail] = useState(0);
  const [besPost, setbesPost] = useState(0);
  const [besMit, setbesMit] = useState(0);
  const [Gesamtanzahl, setGesamtanzahl] = useState(0);
  const [termineesk1, settermineesk1] = useState(0);
  const [termineesk2, settermineesk2] = useState(0);

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
setLiefer_Strasse(parsed.Liefer_Strasse);
setLiefer_Postleitzahl(parsed.Liefer_Postleitzahl);
setLiefer_Ort(parsed.Liefer_Ort);
setKunde_Tel_LandWahl(parsed.Kunde_Tel_LandWahl);
setKunde_Tel_Vorwahl(parsed.Kunde_Tel_Vorwahl);
setKunde_Tel_Rufnummer(parsed.Kunde_Tel_Rufnummer);
setKunde_Tel_Durchwahl(parsed.Kunde_Tel_Durchwahl);


        
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
TerminBestaetigungsdatum : TerminBestaetigungsdatum,
Liefer_Strasse : Liefer_Strasse,
Liefer_Postleitzahl : Liefer_Postleitzahl,
Liefer_Ort : Liefer_Ort,
Kunde_Tel_LandWahl : Kunde_Tel_LandWahl,
Kunde_Tel_Vorwahl : Kunde_Tel_Vorwahl,
Kunde_Tel_Rufnummer : Kunde_Tel_Rufnummer,
Kunde_Tel_Durchwahl : Kunde_Tel_Durchwahl,
          
        }
       
        localStorage.setItem("settings", JSON.stringify(obj)); 
      }


      try {
        const res = await axios.get('https://dhworld.dietenmeier-harsch.de/load.php', {
          
        
        });
        
        
  
       setDaten(res.data.daten);
       
     setbesMail(res.data.besMail);
     setbesPost(res.data.besPost);
     setbesMit(res.data.besMit);
     setGesamtanzahl(res.data.Gesamtanzahl);
     settermineesk1(res.data.termineesk1);
     settermineesk2(res.data.termineesk2);
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
  var currentPosts = Daten.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  }

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(Daten.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

const search = async (d) => {

  setLoading(true);
  
  var val = d.target.value;
  var vall = val.replaceAll("'", "");


  if(bestaetigteMail){

    try {
      const res = await axios.get('https://dhworld.dietenmeier-harsch.de/autocompleteBesMail.php',  {
        params: {val: vall}
      
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

  } else if (bestaetigtePost) {

    try {
      const res = await axios.get('https://dhworld.dietenmeier-harsch.de/autocompleteBesPost.php',  {
        params: {val: vall}
      
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

  } else if (bestaetigteMit) {

    try {
      const res = await axios.get('https://dhworld.dietenmeier-harsch.de/autocompleteBesMit.php',  {
        params: {val: vall}
      
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

  } else if (bestaetigteGesamtanzahl) {

    try {
      const res = await axios.get('https://dhworld.dietenmeier-harsch.de/autocompleteBesbestaetigteGesamtanzahl.php',  {
        params: {val: vall}
      
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

  } else if (bestaetigtetermineesk1) {

    try {
      const res = await axios.get('https://dhworld.dietenmeier-harsch.de/autocompleteBesbestaetigtetermineesk1.php',  {
        params: {val: vall}
      
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

  } else if (bestaetigtetermineesk2) {

    try {
      const res = await axios.get('https://dhworld.dietenmeier-harsch.de/autocompleteBesbestaetigtetermineesk2.php',  {
        params: {val: vall}
      
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
     else {



 
    try {
        const res = await axios.get('https://dhworld.dietenmeier-harsch.de/autocomplete.php',  {
          params: {val: vall}
        
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
        localStorage.removeItem("settings");
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
        localStorage.removeItem("settings");
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
        localStorage.removeItem("settings");
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
        localStorage.removeItem("settings");
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
        localStorage.removeItem("settings");
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
        localStorage.removeItem("settings");
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
        localStorage.removeItem("settings");
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
        localStorage.removeItem("settings");
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
        localStorage.removeItem("settings");
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
        localStorage.removeItem("settings");
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
        localStorage.removeItem("settings");
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
        localStorage.removeItem("settings");
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
        localStorage.removeItem("settings");
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
        localStorage.removeItem("settings");
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
        localStorage.removeItem("settings");
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
        localStorage.removeItem("settings");
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
        localStorage.removeItem("settings");
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
        localStorage.removeItem("settings");
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
        localStorage.removeItem("settings");
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
        localStorage.removeItem("settings");
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
        localStorage.removeItem("settings");
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
        localStorage.removeItem("settings");
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
        localStorage.removeItem("settings");
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
        localStorage.removeItem("settings");
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
        localStorage.removeItem("settings");
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
        localStorage.removeItem("settings");
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
        localStorage.removeItem("settings");
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
        localStorage.removeItem("settings");
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
        localStorage.removeItem("settings");
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
        localStorage.removeItem("settings");
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
        localStorage.removeItem("settings");
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
        localStorage.removeItem("settings");
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
        localStorage.removeItem("settings");
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
        localStorage.removeItem("settings");
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
        localStorage.removeItem("settings");
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
        localStorage.removeItem("settings");
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
        localStorage.removeItem("settings");
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
        localStorage.removeItem("settings");
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
        localStorage.removeItem("settings");
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
        localStorage.removeItem("settings");
        localStorage.setItem("settings", JSON.stringify(parsed)); 

      }
    }

    if(bez === 'Liefer_Strasse'){
      setLiefer_Strasse(!Liefer_Strasse);
      if (localStorage.getItem("settings") === null) {

        var obj = {
          Liefer_Strasse: !Liefer_Strasse
        }
       
        localStorage.setItem("settings", JSON.stringify(obj)); 

      } else {
        var einstellungen = localStorage.getItem("settings");
        var parsed = JSON.parse(einstellungen);
        parsed.Liefer_Strasse = !Liefer_Strasse;
        localStorage.removeItem("settings");
        localStorage.setItem("settings", JSON.stringify(parsed)); 

      }
    }

    if(bez === 'Liefer_Postleitzahl'){
      setLiefer_Postleitzahl(!Liefer_Postleitzahl);
      if (localStorage.getItem("settings") === null) {

        var obj = {
          Liefer_Postleitzahl: !Liefer_Postleitzahl
        }
       
        localStorage.setItem("settings", JSON.stringify(obj)); 

      } else {
        var einstellungen = localStorage.getItem("settings");
        var parsed = JSON.parse(einstellungen);
        parsed.Liefer_Postleitzahl = !Liefer_Postleitzahl;
        localStorage.removeItem("settings");
        localStorage.setItem("settings", JSON.stringify(parsed)); 

      }
    }

    if(bez === 'Liefer_Ort'){
      setLiefer_Ort(!Liefer_Ort);
      if (localStorage.getItem("settings") === null) {

        var obj = {
          Liefer_Ort: !Liefer_Ort
        }
       
        localStorage.setItem("settings", JSON.stringify(obj)); 

      } else {
        var einstellungen = localStorage.getItem("settings");
        var parsed = JSON.parse(einstellungen);
        parsed.Liefer_Ort = !Liefer_Ort;
        localStorage.removeItem("settings");
        localStorage.setItem("settings", JSON.stringify(parsed)); 

      }
    }

    if(bez === 'Kunde_Tel_LandWahl'){
      setKunde_Tel_LandWahl(!Kunde_Tel_LandWahl);
      if (localStorage.getItem("settings") === null) {

        var obj = {
          Kunde_Tel_LandWahl: !Kunde_Tel_LandWahl
        }
       
        localStorage.setItem("settings", JSON.stringify(obj)); 

      } else {
        var einstellungen = localStorage.getItem("settings");
        var parsed = JSON.parse(einstellungen);
        parsed.Kunde_Tel_LandWahl = !Kunde_Tel_LandWahl;
        localStorage.removeItem("settings");
        localStorage.setItem("settings", JSON.stringify(parsed)); 

      }
    }

    if(bez === 'Kunde_Tel_Vorwahl'){
      setKunde_Tel_Vorwahl(!Kunde_Tel_Vorwahl);
      if (localStorage.getItem("settings") === null) {

        var obj = {
          Kunde_Tel_Vorwahl: !Kunde_Tel_Vorwahl
        }
       
        localStorage.setItem("settings", JSON.stringify(obj)); 

      } else {
        var einstellungen = localStorage.getItem("settings");
        var parsed = JSON.parse(einstellungen);
        parsed.Kunde_Tel_Vorwahl = !Kunde_Tel_Vorwahl;
        localStorage.removeItem("settings");
        localStorage.setItem("settings", JSON.stringify(parsed)); 

      }
    }

    if(bez === 'Kunde_Tel_Rufnummer'){
      setKunde_Tel_Rufnummer(!Kunde_Tel_Rufnummer);
      if (localStorage.getItem("settings") === null) {

        var obj = {
          Kunde_Tel_Rufnummer: !Kunde_Tel_Rufnummer
        }
       
        localStorage.setItem("settings", JSON.stringify(obj)); 

      } else {
        var einstellungen = localStorage.getItem("settings");
        var parsed = JSON.parse(einstellungen);
        parsed.Kunde_Tel_Rufnummer = !Kunde_Tel_Rufnummer;
        localStorage.removeItem("settings");
        localStorage.setItem("settings", JSON.stringify(parsed)); 

      }
    }

    if(bez === 'Kunde_Tel_Durchwahl'){
      setKunde_Tel_Durchwahl(!Kunde_Tel_Durchwahl);
      if (localStorage.getItem("settings") === null) {

        var obj = {
          Kunde_Tel_Durchwahl: !Kunde_Tel_Durchwahl
        }
       
        localStorage.setItem("settings", JSON.stringify(obj)); 

      } else {
        var einstellungen = localStorage.getItem("settings");
        var parsed = JSON.parse(einstellungen);
        parsed.Kunde_Tel_Durchwahl = !Kunde_Tel_Durchwahl;
        localStorage.removeItem("settings");
        localStorage.setItem("settings", JSON.stringify(parsed)); 

      }
    }




  }

  const [showSpaltenWerte, setshowSpaltenWerte] = useState(false);
  const handleCloseSpaltenWerte = () => setshowSpaltenWerte(false);
  const handleShowSpaltenWerte = () => setshowSpaltenWerte(true);

  const editSpaltenWerte = () => {

    handleShowSpaltenWerte(); 
    handleCloseEdit();
  }

  const handleCloseSpeichern = async () => {
    var all = '';
    setLaden(true);
    if(terminierungg === ''){
     
      var mm = v_KdiTermin_Datum.getDate();
      var tt = mm < 10 ? ('0' + mm) : (mm);
      var m = v_KdiTermin_Datum.getMonth() + 1;
      var t = m < 10 ? ('0' + m) : (m);
      var ddd = tt + '.' + t + '.' + v_KdiTermin_Datum.getFullYear();

    

      
      all = ddd;
    
    }else{
      
      var arr = terminierungg.split("-");
       all = arr[2]  + '.' + arr[1] + '.' + arr[0];
       if(arr[0].length <= 2){
        all = arr[2]  + '.' + arr[1] + '.20' + arr[0];
       }
       var m = moment(terminierungg, 'YYYY-MM-DD');
       if(m.isValid() === false){
        var mm = v_KdiTermin_Datum.getDate();
        var tt = mm < 10 ? ('0' + mm) : (mm);
        var m = v_KdiTermin_Datum.getMonth() + 1;
        var t = m < 10 ? ('0' + m) : (m);
        var ddd = tt + '.' + t + '.' + v_KdiTermin_Datum.getFullYear();
        all = ddd;
       } 
    }
 
    var params = {
      TerminID: TerminID, 
      v_Dokument_Nummer: v_Dokument_Nummer,
      v_TerminBestaetigungsdatum: v_TerminBestaetigungsdatum,
      v_Datum_Dokument: v_Datum_Dokument,
      v_Zeit_Ersterfassung: v_Zeit_Ersterfassung,
      v_Liefer_AdressNummer: v_Liefer_AdressNummer,
      v_Liefer_Anrede: v_Liefer_Anrede,
      v_Liefer_Name1: v_Liefer_Name1,
      v_Liefer_Name2: v_Liefer_Name2,
      v_Liefer_Name3: v_Liefer_Name3,
      v_Liefer_Tel_LandWahl: v_Liefer_Tel_LandWahl,
      v_Liefer_Tel_Vorwahl: v_Liefer_Tel_Vorwahl,
      v_Liefer_Tel_Rufnummer: v_Liefer_Tel_Rufnummer,
      v_Liefer_Tel_Durchwahl: v_Liefer_Tel_Durchwahl,
      v_DOK_Phase: v_DOK_Phase,
      v_DOK_Disposition_Datum: v_DOK_Disposition_Datum,
      v_DOK_Disposition_Zeit: v_DOK_Disposition_Zeit,
      v_Kdi_Gruppe: v_Kdi_Gruppe,
      v_KdiWartung_VertragNr: v_KdiWartung_VertragNr,
      v_KdiEingang_AnsprPart: v_KdiEingang_AnsprPart,
      v_Kdi_AuftrBeschreibng: v_Kdi_AuftrBeschreibng,
      v_KdiTermin_Datum: all,
      v_KdiTermin_Uhrzeit: v_KdiTermin_Uhrzeit,
      v_KdiTermin_BisUhrzeit: v_KdiTermin_BisUhrzeit,
      v_KdiTermin_Dauer: v_KdiTermin_Dauer,
      v_Kdi_RechEMail: v_Kdi_RechEMail,
      v_Kdi_Terminwunsch: v_Kdi_Terminwunsch,
      v_Stoerungscode: v_Stoerungscode,
      v_Kdi_GebaeudeKomplex: v_Kdi_GebaeudeKomplex,
      v_Kdi_Gebaeude: v_Kdi_Gebaeude,
      v_KDI_WVAnlageArt: v_KDI_WVAnlageArt,
      v_Kunde_Anrede: v_Kunde_Anrede,
      v_Kunde_Name1: v_Kunde_Name1,
      v_Kunde_Name2: v_Kunde_Name2,
      v_Kunde_Strasse: v_Kunde_Strasse,
      v_Kunde_Landeskennz: v_Kunde_Landeskennz,
      v_Kunde_Postleitzahl: v_Kunde_Postleitzahl,
      v_Kunde_Ort: v_Kunde_Ort,
      v_Kdi_BesuchEMail: v_Kdi_BesuchEMail,
      v_Liefer_Strasse: v_Liefer_Strasse,
      v_Liefer_Postleitzahl: v_Liefer_Postleitzahl,
      v_Liefer_Ort: v_Liefer_Ort,
      v_Kunde_Tel_LandWahl: v_Kunde_Tel_LandWahl,
      v_Kunde_Tel_Vorwahl: v_Kunde_Tel_Vorwahl,
      v_Kunde_Tel_Rufnummer: v_Kunde_Tel_Rufnummer,
      v_Kunde_Tel_Durchwahl: v_Kunde_Tel_Durchwahl

      
  }
    try {
      const res = await axios.post('https://dhworld.dietenmeier-harsch.de/Edit.php', params).then(function(response) {
      
      
      });
      
      

      Load();
      handleCloseSpaltenWerte();
      setLaden(false);
      
     
    
      
     
    } catch (err) {
      if (err.response.status === 500) {
        alert('There was a problem with the server');
      } else {
        alert(err.response.data.msg);
      }
      
    }


   
  }
var ff = '';
  const dd = (f) => {
    var e = new Date (f);
    var mm = e.getDate();
    var tt = mm < 10 ? ('0' + mm) : (mm);
    var m = e.getMonth() + 1;
    var t = m < 10 ? ('0' + m) : (m);
    var ddd = tt + '.' + t + '.' + e.getFullYear();
    var arr = ddd.split(".");
    var all = arr[2]  + '-' + arr[1] + '-' + arr[0];
    setterminierungg(all);
    ff = all;
    console.log(ff);

  }

  var fff = '';
  const tre = async (f) => {
    var e = new Date (f);
    var mm = e.getDate();
    var tt = mm < 10 ? ('0' + mm) : (mm);
    var m = e.getMonth() + 1;
    var t = m < 10 ? ('0' + m) : (m);
    var ddd = tt + '.' + t + '.' + e.getFullYear();
    var arr = ddd.split(".");
    var all = arr[2]  + '-' + arr[1] + '-' + arr[0];
    setterminierung(all);
    fff = all;
    console.log(fff);
    console.log(value);
    console.log(valuee);
    console.log(valueee);


  }


  const ZeigeMail = async () => {
   
    setbestaetigteMail(true);
    setbestaetigtePost(false);
    setbestaetigteMit(false);
    setbestaetigteGesamtanzahl(false);
    setbestaetigtetermineesk1(false);
    setbestaetigtetermineesk2(false);
  
    try {
      const res = await axios.get('https://dhworld.dietenmeier-harsch.de/ZeigeMail.php', {
       
        
      
      });
      
      
  
      
      setDaten(res.data.daten);
      
     
     
    } catch (err) {
      if (err.response.status === 500) {
        alert('There was a problem with the server');
      } else {
        alert(err.response.data.msg);
      }
      
    }


  }

  const ZeigeQR = async () => {
   
    setbestaetigtePost(true);
    setbestaetigteMail(false);
    setbestaetigteMit(false);
    setbestaetigteGesamtanzahl(false);
    setbestaetigtetermineesk1(false);
    setbestaetigtetermineesk2(false);
  
    try {
      const res = await axios.get('https://dhworld.dietenmeier-harsch.de/ZeigeQR.php', {
       
        
      
      });
      
      
  
      
      setDaten(res.data.daten);
      
     
     
    } catch (err) {
      if (err.response.status === 500) {
        alert('There was a problem with the server');
      } else {
        alert(err.response.data.msg);
      }
      
    }
    
  }

  const ZeigeMit = async () => {
   
    setbestaetigteMit(true);
    setbestaetigteMail(false);
    setbestaetigtePost(false);
    setbestaetigteGesamtanzahl(false);
    setbestaetigtetermineesk1(false);
    setbestaetigtetermineesk2(false);
  
    try {
      const res = await axios.get('https://dhworld.dietenmeier-harsch.de/ZeigeMit.php', {
       
        
      
      });
      
      
  
      
      setDaten(res.data.daten);
      
     
     
    } catch (err) {
      if (err.response.status === 500) {
        alert('There was a problem with the server');
      } else {
        alert(err.response.data.msg);
      }
      
    }

    
  }

  const ZeigeGesamt = async () => {
   
    setbestaetigteGesamtanzahl(true);
    setbestaetigteMail(false);
    setbestaetigtePost(false);
    setbestaetigteMit(false);
    setbestaetigtetermineesk1(false);
    setbestaetigtetermineesk2(false);
  
    try {
      const res = await axios.get('https://dhworld.dietenmeier-harsch.de/ZeigeGesamt.php', {
       
        
      
      });
      
      
  
      
      setDaten(res.data.daten);
      
     
     
    } catch (err) {
      if (err.response.status === 500) {
        alert('There was a problem with the server');
      } else {
        alert(err.response.data.msg);
      }
      
    }

    
  }

  const ZeigeErste = async () => {
   
    setbestaetigtetermineesk1(true);
    setbestaetigteMail(false);
    setbestaetigtePost(false);
    setbestaetigteMit(false);
    setbestaetigteGesamtanzahl(false);
    setbestaetigtetermineesk2(false);
  
    try {
      const res = await axios.get('https://dhworld.dietenmeier-harsch.de/ZeigeErste.php', {
       
        
      
      });
      
      
  
      
      setDaten(res.data.daten);
      
     
     
    } catch (err) {
      if (err.response.status === 500) {
        alert('There was a problem with the server');
      } else {
        alert(err.response.data.msg);
      }
      
    }

    
  }
 

  const ZeigeZweite = async () => {
   
    setbestaetigtetermineesk2(true);
    setbestaetigteMail(false);
    setbestaetigtePost(false);
    setbestaetigteMit(false);
    setbestaetigteGesamtanzahl(false);
    setbestaetigtetermineesk1(false);

  
    try {
      const res = await axios.get('https://dhworld.dietenmeier-harsch.de/ZeigeZweite.php', {
       
        
      
      });
      
      
  
      
      setDaten(res.data.daten);
      
     
     
    } catch (err) {
      if (err.response.status === 500) {
        alert('There was a problem with the server');
      } else {
        alert(err.response.data.msg);
      }
      
    }

    
  }
 
 
 
 
 

  return (


    
    <Container>

<Modal show={showSpaltenWerte} onHide={handleCloseSpaltenWerte}>
        <Modal.Header closeButton>
          <Modal.Title>Werte anpassen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {Laden === true ? (
 <Row>
 <Col  xs={12} className="text-center">
 <Spinner animation="border" variant="primary" />
 </Col>

</Row>
) : (

        <Form>
             <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
              
               <Col sm="12">
                 <span>ID</span> <br></br>
                 <Form.Control onChange={(e) => setCurrentTerminID(e.target.value)} value={TerminID} type="text" /> <br></br>
               </Col>

               <Col sm="12">
                 <span>Terminbestätigungsdatum</span> <br></br>
                 <Form.Control onChange={(e) => setv_TerminBestaetigungsdatum(e.target.value)} value={v_TerminBestaetigungsdatum} type="text" /> <br></br>
               </Col>

               <Col sm="12">
                 <span>KDI-Nummer</span> <br></br>
                 <Form.Control onChange={(e) => setv_Dokument_Nummer(e.target.value)} value={v_Dokument_Nummer} type="text" /> <br></br>
               </Col>

               <Col sm="12">
                 <span>Datum Dokument</span> <br></br>
                 <Form.Control onChange={(e) => setv_Datum_Dokument(e.target.value)} value={v_Datum_Dokument} type="text" /> <br></br>
               </Col>

               <Col sm="12">
                 <span>Zeit Ersterfassung</span> <br></br>
                 <Form.Control onChange={(e) => setv_Zeit_Ersterfassung(e.target.value)} value={v_Zeit_Ersterfassung} type="text" /> <br></br>
               </Col>

               <Col sm="12">
                 <span>Kundennummer</span> <br></br>
                 <Form.Control onChange={(e) => setv_Liefer_AdressNummer(e.target.value)} value={v_Liefer_AdressNummer} type="text" /> <br></br>
               </Col>

               <Col sm="12">
                 <span>Liefer_Anrede</span> <br></br>
                 <Form.Control onChange={(e) => setv_Liefer_Anrede(e.target.value)} value={v_Liefer_Anrede} type="text" /> <br></br>
               </Col>

               <Col sm="12">
                 <span>Liefer_Name1</span> <br></br>
                 <Form.Control onChange={(e) => setv_Liefer_Name1(e.target.value)} value={v_Liefer_Name1} type="text" /> <br></br>
               </Col>
               
               <Col sm="12">
                 <span>Liefer_Name2</span> <br></br>
                 <Form.Control onChange={(e) => setv_Liefer_Name2(e.target.value)} value={v_Liefer_Name2} type="text" /> <br></br>
               </Col>

               <Col sm="12">
                 <span>Liefer_Name3</span> <br></br>
                 <Form.Control onChange={(e) => setv_Liefer_Name3(e.target.value)} value={v_Liefer_Name3} type="text" /> <br></br>
               </Col>

               <Col sm="12">
                 <span>Liefer_Tel_LandWahl</span> <br></br>
                 <Form.Control onChange={(e) => setv_Liefer_Tel_LandWahl(e.target.value)} value={v_Liefer_Tel_LandWahl} type="text" /> <br></br>
               </Col>

               <Col sm="12">
                 <span>Liefer_Tel_Vorwahl</span> <br></br>
                 <Form.Control onChange={(e) => setv_Liefer_Tel_Vorwahl(e.target.value)} value={v_Liefer_Tel_Vorwahl} type="text" /> <br></br>
               </Col>

               <Col sm="12">
                 <span>Liefer_Tel_Rufnummer</span> <br></br>
                 <Form.Control onChange={(e) => setv_Liefer_Tel_Rufnummer(e.target.value)} value={v_Liefer_Tel_Rufnummer} type="text" /> <br></br>
               </Col>

               <Col sm="12">
                 <span>Liefer_Tel_Durchwahl</span> <br></br>
                 <Form.Control onChange={(e) => setv_Liefer_Tel_Durchwahl(e.target.value)} value={v_Liefer_Tel_Durchwahl} type="text" /> <br></br>
               </Col>

               <Col sm="12">
                 <span>_DOK_Phase</span> <br></br>
                 <Form.Control onChange={(e) => setv_DOK_Phase(e.target.value)} value={v_DOK_Phase} type="text" /> <br></br>
               </Col>

               <Col sm="12">
                 <span>DOK_Disposition_Datum</span> <br></br>
                 <Form.Control onChange={(e) => setv_DOK_Disposition_Datum(e.target.value)} value={v_DOK_Disposition_Datum} type="text" /> <br></br>
               </Col>

               <Col sm="12">
                 <span>DOK_Disposition_Zeit</span> <br></br>
                 <Form.Control onChange={(e) => setv_DOK_Disposition_Zeit(e.target.value)} value={v_DOK_Disposition_Zeit} type="text" /> <br></br>
               </Col>

               <Col sm="12">
                 <span>Kdi_Gruppe</span> <br></br>
                 <Form.Control onChange={(e) => setv_Kdi_Gruppe(e.target.value)} value={v_Kdi_Gruppe} type="text" /> <br></br>
               </Col>

               <Col sm="12">
                 <span>KdiWartung_VertragNr</span> <br></br>
                 <Form.Control onChange={(e) => setv_KdiWartung_VertragNr(e.target.value)} value={v_KdiWartung_VertragNr} type="text" /> <br></br>
               </Col>

               <Col sm="12">
                 <span>KdiEingang_AnsprPart</span> <br></br>
                 <Form.Control onChange={(e) => setv_KdiEingang_AnsprPart(e.target.value)} value={v_KdiEingang_AnsprPart} type="text" /> <br></br>
               </Col>

               <Col sm="12">
                 <span>Kdi_AuftrBeschreibng</span> <br></br>
                 <Form.Control onChange={(e) => setv_Kdi_AuftrBeschreibng(e.target.value)} value={v_Kdi_AuftrBeschreibng} type="text" /> <br></br>
               </Col>

               <Col sm="12">
                 <span>Auftragsdatum</span> <br></br>
                 <DatePicker disableCalendar={true} format={"dd-MM-yyyy"} onChange={dd} value={v_KdiTermin_Datum} />
              <br></br>
               </Col>

               <Col sm="12">
               <br></br>
                 <span>KdiTermin_Uhrzeit</span> <br></br>
                 <TimePicker disableClock={true} format={"HH:mm"} onChange={setv_KdiTermin_Uhrzeit} value={v_KdiTermin_Uhrzeit} />
              
               </Col>

               <Col sm="12">
               <br></br>
                 <span>KdiTermin_BisUhrzeit</span> <br></br>
                 <TimePicker disableClock={true} format={"HH:mm"} onChange={setv_KdiTermin_BisUhrzeit} value={v_KdiTermin_BisUhrzeit} />
               
               </Col>

               <Col sm="12">
               <br></br>
                 <span>KdiTermin_Dauer</span> <br></br>
                 <TimePicker disableClock={true} format={"HH:mm"} onChange={setv_KdiTermin_Dauer} value={v_KdiTermin_Dauer} />
            
               </Col>

               <Col sm="12">
               <br></br>
                 <span>Kdi_RechEMail</span> <br></br>
                 <Form.Control onChange={(e) => setv_Kdi_RechEMail(e.target.value)} value={v_Kdi_RechEMail} type="text" /> <br></br>
               </Col>

               <Col sm="12">
                 <span>Kdi_Terminwunsch</span> <br></br>
                 <Form.Control onChange={(e) => setv_Kdi_Terminwunsch(e.target.value)} value={v_Kdi_Terminwunsch} type="text" /> <br></br>
               </Col>

               <Col sm="12">
                 <span>Stoerungscode</span> <br></br>
                 <Form.Control onChange={(e) => setv_Stoerungscode(e.target.value)} value={v_Stoerungscode} type="text" /> <br></br>
               </Col>

               <Col sm="12">
                 <span>Kdi_GebaeudeKomplex</span> <br></br>
                 <Form.Control onChange={(e) => setv_Kdi_GebaeudeKomplex(e.target.value)} value={v_Kdi_GebaeudeKomplex} type="text" /> <br></br>
               </Col>

               <Col sm="12">
                 <span>Kdi_Gebaeude</span> <br></br>
                 <Form.Control onChange={(e) => setv_Kdi_Gebaeude(e.target.value)} value={v_Kdi_Gebaeude} type="text" /> <br></br>
               </Col>

               <Col sm="12">
                 <span>KDI_WVAnlageArt</span> <br></br>
                 <Form.Control onChange={(e) => setv_KDI_WVAnlageArt(e.target.value)} value={v_KDI_WVAnlageArt} type="text" /> <br></br>
               </Col>

               <Col sm="12">
                 <span>Kunde_Anrede</span> <br></br>
                 <Form.Control onChange={(e) => setv_Kunde_Anrede(e.target.value)} value={v_Kunde_Anrede} type="text" /> <br></br>
               </Col>

               <Col sm="12">
                 <span>Kunde_Name1</span> <br></br>
                 <Form.Control onChange={(e) => setv_Kunde_Name1(e.target.value)} value={v_Kunde_Name1} type="text" /> <br></br>
               </Col>

               <Col sm="12">
                 <span>Kunde_Name2</span> <br></br>
                 <Form.Control onChange={(e) => setv_Kunde_Name2(e.target.value)} value={v_Kunde_Name2} type="text" /> <br></br>
               </Col>

               <Col sm="12">
                 <span>Kunde_Strasse</span> <br></br>
                 <Form.Control onChange={(e) => setv_Kunde_Strasse(e.target.value)} value={v_Kunde_Strasse} type="text" /> <br></br>
               </Col>


               <Col sm="12">
                 <span>Kunde_Postleitzahl</span> <br></br>
                 <Form.Control onChange={(e) => setv_Kunde_Postleitzahl(e.target.value)} value={v_Kunde_Postleitzahl} type="text" /> <br></br>
               </Col>

               <Col sm="12">
                 <span>Kunde_Ort</span> <br></br>
                 <Form.Control onChange={(e) => setv_Kunde_Ort(e.target.value)} value={v_Kunde_Ort} type="text" /> <br></br>
               </Col>

               <Col sm="12">
                 <span>Kdi_BesuchEMail</span> <br></br>
                 <Form.Control onChange={(e) => setv_Kdi_BesuchEMail(e.target.value)} value={v_Kdi_BesuchEMail} type="text" /> <br></br>
               </Col>

               <Col sm="12">
                 <span>Liefer_Strasse</span> <br></br>
                 <Form.Control onChange={(e) => setv_Liefer_Strasse(e.target.value)} value={v_Liefer_Strasse} type="text" /> <br></br>
               </Col>

               <Col sm="12">
                 <span>Liefer_Postleitzahl</span> <br></br>
                 <Form.Control onChange={(e) => setv_Liefer_Postleitzahl(e.target.value)} value={v_Liefer_Postleitzahl} type="text" /> <br></br>
               </Col>

               <Col sm="12">
                 <span>Liefer_Ort</span> <br></br>
                 <Form.Control onChange={(e) => setv_Liefer_Ort(e.target.value)} value={v_Liefer_Ort} type="text" /> <br></br>
               </Col>

                <Col sm="12">
                 <span>Kunde_Tel_LandWahl</span> <br></br>
                 <Form.Control onChange={(e) => setv_Kunde_Tel_LandWahl(e.target.value)} value={v_Kunde_Tel_LandWahl} type="text" /> <br></br>
               </Col>

               <Col sm="12">
                 <span>Kunde_Tel_Vorwahl</span> <br></br>
                 <Form.Control onChange={(e) => setv_Kunde_Tel_Vorwahl(e.target.value)} value={v_Kunde_Tel_Vorwahl} type="text" /> <br></br>
               </Col>

               <Col sm="12">
                 <span>Kunde_Tel_Rufnummer</span> <br></br>
                 <Form.Control onChange={(e) => setv_Kunde_Tel_Rufnummer(e.target.value)} value={v_Kunde_Tel_Rufnummer} type="text" /> <br></br>
               </Col>

               <Col sm="12">
                 <span>Kunde_Tel_Durchwahl</span> <br></br>
                 <Form.Control onChange={(e) => setv_Kunde_Tel_Durchwahl(e.target.value)} value={v_Kunde_Tel_Durchwahl} type="text" /> <br></br>
               </Col>

               <Col sm="12">
                 <span>Kunde_Landeskennzeichen</span> <br></br>
                 <Form.Control onChange={(e) => setv_Kunde_Landeskennz(e.target.value)} value={v_Kunde_Landeskennz} type="text" /> <br></br>
               </Col>
               
             </Form.Group>
             </Form>
)}

        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseSpeichern}>
            Speichern
          </Button>
        </Modal.Footer>
      </Modal>

      
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
             <Row>
             
              
               <Col sm="8">
               <span>Auftragsdatum:</span><br></br><DatePicker disableCalendar={true} format={"dd-MM-yyyy"} onChange={tre} value={startDate} /><br></br><br></br>
               <span>Startuhrzeit:</span><br></br><TimePicker disableClock={true} format={"HH:mm"} onChange={onChange} value={value} /><br></br><br></br>
               <span>Endzeit:</span><br></br><TimePicker disableClock={true} format={"HH:mm"} onChange={onChangee} value={valuee} /><br></br><br></br>
               <span>Dauer:</span><br></br><TimePicker disableClock={true} format={"HH:mm"} onChange={onChangeee} value={valueee} /><br></br><br></br>
              
                 <Button  variant="info" onClick={bestaetigen}>
            Bestätigen
          </Button>
               </Col>
               </Row>
         
            
            ) : (null)}
         
         {Rechte === "admin" ? (
          <Button size="lg" variant="danger" onClick={handleDeleteTermin}>
          Termin löschen
        </Button>
         ) : (null)}

{Rechte === "admin" || Rechte === "Bearbeiter" ? (
          <Button size="lg" variant="info" onClick={editSpaltenWerte}>
          Spaltenwerte bearbeiten
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
      

<Form.Check 
        type="switch"
        label="Liefer_Strasse"
        className="farbe"
        checked={Liefer_Strasse === true ? true : false}
        onChange={() => filterc('Liefer_Strasse')}
      /> 

<Form.Check 
        type="switch"
        label="Liefer_Postleitzahl"
        className="farbe"
        checked={Liefer_Postleitzahl === true ? true : false}
        onChange={() => filterc('Liefer_Postleitzahl')}
      /> 

<Form.Check 
        type="switch"
        label="Liefer_Ort"
        className="farbe"
        checked={Liefer_Ort === true ? true : false}
        onChange={() => filterc('Liefer_Ort')}
      /> 

<Form.Check 
        type="switch"
        label="Kunde_Tel_LandWahl"
        className="farbe"
        checked={Kunde_Tel_LandWahl === true ? true : false}
        onChange={() => filterc('Kunde_Tel_LandWahl')}
      /> 

<Form.Check 
        type="switch"
        label="Kunde_Tel_Vorwahl"
        className="farbe"
        checked={Kunde_Tel_Vorwahl === true ? true : false}
        onChange={() => filterc('Kunde_Tel_Vorwahl')}
      /> 

<Form.Check 
        type="switch"
        label="Kunde_Tel_Rufnummer"
        className="farbe"
        checked={Kunde_Tel_Rufnummer === true ? true : false}
        onChange={() => filterc('Kunde_Tel_Rufnummer')}
      /> 

<Form.Check 
        type="switch"
        label="Kunde_Tel_Durchwahl"
        className="farbe"
        checked={Kunde_Tel_Durchwahl === true ? true : false}
        onChange={() => filterc('Kunde_Tel_Durchwahl')}
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
  <Col xs={7} md={4} lg={3} sm={7}>
    <h2>DH World</h2><br></br><br></br><br></br>
  <img className='img-fluid' src={bild}/> <br></br><br></br><br></br>
  </Col>
</Row>
<br/>

<Row className="text-center justify-content-center">
  <Col xs={12} md={12} lg={12} sm={12}>
<h5 onClick={ZeigeMail}>Anzahl Termine, die über den Link in der E-Mail bestätigt wurden: <span>{besMail}</span></h5> <br></br>
<h5 onClick={ZeigeQR}>Anzahl Termine, die über den QR-Code im Brief bestätigt wurden: <span>{besPost}</span></h5><br></br>
<h5 onClick={ZeigeMit}>Anzahl Termine, die manuell durch einen Mitarbeiter in der DH World bestätigt wurden: <span>{besMit}</span></h5><br></br>
<h5 onClick={ZeigeGesamt}>Anzahl Termine, die versendet wurden: <span>{Gesamtanzahl}</span></h5><br></br>
<h5 onClick={ZeigeErste}>Anzahl Termine, die in der ersten Eskalationsstufe sind: <span>{termineesk1}</span></h5><br></br>
<h5 onClick={ZeigeZweite}>Anzahl Termine, die in der zweiten Eskalationsstufe sind: <span>{termineesk2}</span></h5><br></br>
  </Col>
</Row>

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
<br/> <br></br>


{currentPosts.length < 1 ? (
  <Row className="text-center justify-content-center">
     <Col xs={12}>
     <br></br><br></br><br></br><br></br>
 <h3>Keine Datensätze vorhanden.</h3>
 </Col>
 </Row>
) : (

<div>

<Row className="justify-content-center">
  <Col className="d-grid gap-2" xs={12} md={3}>
  <Button onClick={handleShow} variant="outline-primary" size="lg"><i class="bi bi-filter-left"></i> Spaltenfilter</Button>
  </Col>
</Row>

<br/><br></br><br></br>


<Row>
        <Col xs={12}>

        <Table striped responsive bordered hover>
      <thead>
        <tr>
        {TerminBestaetigungsdatum === true ? (<th>Terminbestätigungsdatum</th>) : (null)}
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
       {Liefer_Strasse === true ? ( <th>Lieferstraße</th>) : (null)}
       {Liefer_Postleitzahl === true ? ( <th>LieferPLZ</th>) : (null)}
       {Liefer_Ort === true ? ( <th>Lieferort</th>) : (null)}
       {Kunde_Tel_LandWahl === true ? ( <th>Kunde_Landwahl</th>) : (null)}
       {Kunde_Tel_Vorwahl === true ? ( <th>Kunde_Vorwahl</th>) : (null)}
       {Kunde_Tel_Rufnummer === true ? ( <th>Kunde Rufnummer</th>) : (null)}
       {Kunde_Tel_Durchwahl === true ? ( <th>Kunde Durchwahl</th>) : (null)}
     
        </tr>
      </thead>
      <tbody>
      {
  
      
     
        currentPosts.map((v, index) => (
        <tr className={(v.TerminBestaetigungsdatum !== '' ? 'p-3 mb-2 bg-successs' : '')} key={index} onClick={() => handleShowEdit(v.ID,
          v.TerminBestaetigungsdatum,
          v.Dokument_Nummer,
          v.Datum_Dokument,
          v.Zeit_Ersterfassung,
          v.Liefer_AdressNummer,
          v.Liefer_Anrede,
          v.Liefer_Name1,
          v.Liefer_Name2,
          v.Liefer_Name3,
          v.Liefer_Tel_LandWahl,
          v.Liefer_Tel_Vorwahl,
          v.Liefer_Tel_Rufnummer,
          v.Liefer_Tel_Durchwahl,
          v.DOK_Phase,
          v.DOK_Disposition_Datum,
          v.DOK_Disposition_Zeit,
          v.Kdi_Gruppe,
          v.KdiWartung_VertragNr,
          v.KdiEingang_AnsprPart,
          v.Kdi_AuftrBeschreibng,
          v.KdiTermin_Datum,
          v.KdiTermin_Uhrzeit,
          v.KdiTermin_BisUhrzeit,
          v.KdiTermin_Dauer,
          v.Kdi_RechEMail,
          v.Kdi_Terminwunsch,
          v.Stoerungscode,
          v.Kdi_GebaeudeKomplex,
          v.Kdi_Gebaeude,
          v.KDI_WVAnlageArt,
          v.Kunde_Anrede,
          v.Kunde_Name1,
          v.Kunde_Name2,
          v.Kunde_Strasse,
          v.Kunde_Landeskennz,
          v.Kunde_Postleitzahl,
          v.Kunde_Ort,
          v.Kdi_BesuchEMail,
          v.Liefer_Strasse,
          v.Liefer_Postleitzahl,
          v.Liefer_Ort,
          v.Kunde_Tel_LandWahl,
          v.Kunde_Tel_Vorwahl,
          v.Kunde_Tel_Rufnummer,
          v.Kunde_Tel_Durchwahl
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        )}>
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
       {Liefer_Strasse === true ? ( <td>{v.Liefer_Strasse}</td>) : (null)}
       {Liefer_Postleitzahl === true ? ( <td>{v.Liefer_Postleitzahl}</td>) : (null)}
       {Liefer_Ort === true ? ( <td>{v.Liefer_Ort}</td>) : (null)}
       {Kunde_Tel_LandWahl === true ? ( <td>{v.Kunde_Tel_LandWahl}</td>) : (null)}
       {Kunde_Tel_Vorwahl === true ? ( <td>{v.Kunde_Tel_Vorwahl}</td>) : (null)}
       {Kunde_Tel_Rufnummer === true ? ( <td>{v.Kunde_Tel_Rufnummer}</td>) : (null)}
       {Kunde_Tel_Durchwahl === true ? ( <td>{v.Kunde_Tel_Durchwahl}</td>) : (null)}
      
      
          </tr>
        )  
      )}

      

      
    
        
        
      </tbody>
    </Table>



        </Col>
      </Row>
<br/> <br></br>
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

    </Form.Select>
    </Col>
    </Row>
    <br/> <br></br>
    {alle === true ? (null) : (
      <div>
  {currentPosts.length >= 1 ? (<p>Seite: {currentPage}</p>) : (null)}
  <br></br>
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
      <br></br><br></br><br></br><br></br>
      </div>

)

}

     
     
     
    </Container>
  );
}



export default App;
