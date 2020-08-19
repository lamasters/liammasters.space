import React from 'react';
import logo from './logo.svg';
import './App.css';
import TextLoop from "react-text-loop";

function App() {
  return (
    <div className="App">
      <div id="header">Liam Masters</div>
      <TextLoop 
        interval={2500}
        springConfig={{stiffness: 250, damping: 15}}
      >
        <div id="subheader">Software Engineer</div>
        <div id="subheader">Maker</div>
        <div id="subheader">Musician</div>
        <div id="subheader">Podcast Aficianado</div>
      </TextLoop>
    </div>
  );
}

export default App;
