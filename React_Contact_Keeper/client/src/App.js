import './App.css';
import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';

import ContactState from './context/contact/ContactState';


const App = () => {
  return (
    <ContactState>
      <Router>
      <Fragment>
      <Navbar />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
        </Switch>
      </div>
      </Fragment>
    </Router>
    </ContactState>
    
    
  );
}

export default App;
