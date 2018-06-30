import React, { Component } from 'react';
import axios from "axios";
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {message: 'no message received'}

  componentDidMount() {
    console.log('requesting from React test');
    axios.get("/react/test")
      .then((data) => {
        console.log('response from server');
        console.log(data);
        this.setState({message: data.data.message});
      })
    }

  render() {
    console.log(this.state);
    return (
      <div className="App">
      {this.state.message}
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      {this.state.message ? (<h1>MESSAGE: {this.state.message}</h1>) : null}

      </div>
    );
  }
}

export default App;
