import React, {useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';
import bild from  '../App_Einstellungen.PNG';
import '../App.css';

const Bestaetigt = () => {

    var { id } = useParams();

    useEffect(() => {
        
        const onLoad = async () => {
            try {
                    const res = await axios.get('http://mail.dietenmeier-harsch.de:81/bestaetigen.php', {
                    params: { id: id}, 
                    
                    
                    });
                    
                    
              
                   let response = res.data.best;
                   
              
                   
                  } catch (err) {
                    if (err.response.status === 500) {
                      alert('There was a problem with the server');
                    } else {
                      alert(err.response.data.msg);
                    }
                    
                  } 
                }
                
                onLoad();
    });

  return (
    <Container>
        <br></br>
      <Row className="text-center justify-content-center">
  <Col xs={7} md={2}  >
  <h3>DH World</h3><br></br>
  <img className='img-fluid' src={bild}/>
  </Col>
</Row>
<br/>

<Row>
    <Col xs={12} className="text-center">
    <i className="bi bi-check-circle bigger"></i>
    <br></br><br></br>
    <b>Vielen Dank für Ihre Bestätigung!</b> <br></br><br></br>

Unser Servicetechniker wird zur angegebenen Zeit zu Ihnen kommen und die Wartung durchführen. <br></br><br></br>

Sollten Sie noch Fragen haben, zögern Sie bitte nicht, sich über <a href="mailto:info@dietenmeier-harsch.de">info@dietenmeier-harsch.de</a> an uns zu wenden. Sie können das Fenster nun schließen. <br></br><br></br>
    </Col>
</Row>

    </Container>
  )
}

export default Bestaetigt