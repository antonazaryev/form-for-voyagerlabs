import React, {Component} from 'react';
import logo from '../assets/logo.svg';
import '../styles/app.css';
import Form from "./form";

class App extends Component {
  render() {
    return (
        <div className="app">
          <header className="app-header">
            <img src={logo} className="app-logo" alt="logo"/>
          </header>
          <Form/>
        </div>
    );
  }
}

export default App;
