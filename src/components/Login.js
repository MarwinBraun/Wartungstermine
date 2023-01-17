import React, { useState, useEffect } from 'react'
import {useNavigate} from "react-router-dom";
import bild from  '../App_Einstellungen.PNG';
import Alert from 'react-bootstrap/Alert';
import '../signin.css';

const Login = () => {

    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [Show, setShow] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
       
        if (localStorage.getItem("loginData") !== null) {
            
            navigate("/dhworld");
            
          } 

          
         

      });

      const checkEnter = (event) => {
        if (event.key === 'Enter') {
            onSubmit();
          }

      }


      const onSubmit = () => {

        if(username === 'admin' && password === 'World2023!'){
            let obj = {username: 'admin'};
            localStorage.setItem("loginData", JSON.stringify(obj));
            navigate("/dhworld");
         }

         else if(username === 'Bearbeiter' && password === 'Bearbeiter2023!'){
            let obj = {username: 'Bearbeiter'};
            localStorage.setItem("loginData", JSON.stringify(obj));
            navigate("/dhworld");
         }

         else if(username === 'Leser' && password === 'Leser2023!'){
            let obj = {username: 'Leser'};
            localStorage.setItem("loginData", JSON.stringify(obj));
            navigate("/dhworld");
         }

         else {
            setShow(true);
         }
      }

  return (
    <div className="text-center log">
    <main className="form-signin w-100 m-auto">

    <img className="mb-4" src={bild} alt="" width="272" height="157" />
    <h1 className="h3 mb-3 fw-normal"><b>DH World</b></h1><br></br>


    <div className="form-floating">
      <input onKeyDown={checkEnter} onChange={(e) => setusername(e.target.value)} type="text" className="form-control" id="floatingInput" placeholder="Benutzername" />
      <label for="floatingInput">Benutzername</label>
    </div>
    <br></br>
    <div className="form-floating">
      <input onKeyDown={checkEnter} onChange={(e) => setpassword(e.target.value)} type="password" className="form-control" id="floatingPassword" placeholder="Passwort" />
      <label for="floatingPassword">Passwort</label>
    </div> <br></br>

{Show === true ? (

<Alert variant="danger" onClose={() => setShow(false)} dismissible>
<p>
Falscher Benutzername oder Passwort!
</p>
</Alert>

) : (null)}

    

 
    <button onClick={onSubmit} className="w-100 btn btn-lg btn-primary" type="button">Anmelden</button>
  
  
</main>
</div>
  )
}

export default Login