import React from 'react'
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
import bild from  '../App_Einstellungen.PNG';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../signin.css';

const Login = () => {
  return (
    <div className="text-center log">
    <main className="form-signin w-100 m-auto">
  <form>
    <img className="mb-4" src={bild} alt="" width="272" height="157" />
    <h1 className="h3 mb-3 fw-normal"><b>DH World</b></h1><br></br>


    <div className="form-floating">
      <input type="text" className="form-control" id="floatingInput" placeholder="Benutzername" />
      <label for="floatingInput">Benutzername</label>
    </div>
    <br></br>
    <div className="form-floating">
      <input type="password" className="form-control" id="floatingPassword" placeholder="Passwort" />
      <label for="floatingPassword">Passwort</label>
    </div> <br></br>

 
    <button className="w-100 btn btn-lg btn-primary" type="submit">Anmelden</button>
  
  </form>
</main>
</div>
  )
}

export default Login