import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Hi I am a react app</h1>
        <Person name="Max" age="28" />
        <Person name="Manu" age="32"/>
        <Person name="Stephanie" age="26"/>
      </div>
    );
  }
}

export default App;
