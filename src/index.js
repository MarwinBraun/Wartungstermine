import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Bestaetigt from './components/Bestaetigt';
import Login from './components/Login';
import BestaetigtQR from './components/BestaetigtQR';
import NotFound from './components/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import $ from 'jquery';
import Popper from 'popper.js';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <BrowserRouter>
      <Routes>
          <Route path="/" element={ <NotFound/> }/>
          <Route path="/dhworld" element={<App />} />
          <Route path="/dhworld/bestaetigt/:id" element={<Bestaetigt />} />
          <Route path="/dhworld/bestaetigtQR/:id" element={<BestaetigtQR />} />
          <Route path="/dhworld/login" element={<Login />} />
      </Routes>
    </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
