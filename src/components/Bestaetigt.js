import React, {useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';
import bild from  '../App_Einstellungen.PNG';
import Spinner from 'react-bootstrap/Spinner';
import '../App.css';

const Bestaetigt = () => {

  const [bes, setbes] = useState(false);
  const [LoadingModal, setLoadingModal] = useState(false);

    var { id } = useParams();

    
    const onLoad = async () => {
      setLoadingModal(true);
      try {
              const res = await axios.get('http://mail.dietenmeier-harsch.de:81/done.php', {
              params: { id: id}, 
              
              
              });
              
              
        
             let response = res.data.best;
             
             setbes(true);
             setLoadingModal(false);
             
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

    {LoadingModal === true ? (
        <Row>
        <Col  xs={12} className="text-center">
        <Spinner animation="border" variant="primary" />
        </Col>
       
       </Row>
       ) : (
 
    bes === false ? ( 
     
     <div>
      <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
    <h4>Bitte klicken Sie auf den Button, um Ihren Termin zu bestätigen.</h4><br></br>
    <div class="d-grid col-md-3 col-5 mx-auto"><button onClick={onLoad} type="button" class="btn btn-success">Bestätigen</button></div>
    </div>
    )
     : (
        <div>
  <i className="bi bi-check-circle bigger"></i>
  <br></br><br></br>
  <b>Vielen Dank für Ihre Bestätigung!</b> <br></br><br></br>

<p>Unser Servicetechniker wird zur angegebenen Zeit zu Ihnen kommen und die Wartung durchführen. <br></br><br></br>

Sollten Sie noch Fragen haben, zögern Sie bitte nicht, sich über <a href="mailto:info@dietenmeier-harsch.de">info@dietenmeier-harsch.de</a> an uns zu wenden. Sie können das Fenster nun schließen. <br></br><br></br>
  
</p>
</div>
    )
    )
     }


  
    </Col>
</Row>

    </Container>
  )
}

export default Bestaetigt