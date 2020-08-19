import React from 'react';
import gh from './gh.svg';
import li from './li.svg';
import './App.css';
import TextLoop from "react-text-loop";

function scrollToDiv(divRef) {
  divRef.current.scrollIntoView({behavior: "smooth", block: "start"})
}

function App() {
  let sections = [];
  for (let i = 0; i < 5; i++) {
    sections.push(React.createRef());
  }

  let home = React.createRef();
  console.log(document.documentElement.scrollTop);

  return (
    <div className="App">
      <div id="header" ref={home}>Liam Masters</div>
      {document.body.scrollTop > 50 ? <div id="to-top" onClick={() => scrollToDiv(home)}>Top</div> : null}
      <TextLoop 
        interval={1500}
        springConfig={{stiffness: 250, damping: 15}}
      >
        <div className="subheader" onClick={() => scrollToDiv(sections[0])}>Software Engineer</div>
        <div className="subheader" onClick={() => scrollToDiv(sections[1])}>Maker</div>
        <div className="subheader" onClick={() => scrollToDiv(sections[2])}>Musician</div>
        <div className="subheader" onClick={() => scrollToDiv(sections[3])}>Photographer</div>
        <div className="subheader" onClick={() => scrollToDiv(sections[4])}>Podcast Aficianado</div>
      </TextLoop>
      <div id="social-links">
        <a className="icon-link" href="https://github.com/lamasters" target="_blank"><img src={gh} className="icon"/></a>
        <a className="icon-link" href="https://linkedin.com/in/liam-a-masters" target="_blank"><img src={li} className="icon"/></a>
      </div>
      <div>
        <div className="section-header" ref={sections[0]}>Professional</div>
        <div className="section-header" ref={sections[1]}>Projects</div>
        <div className="section-header" ref={sections[2]}>Music</div>
        <iframe 
          width="800" height="400"
          scrolling="no" frameborder="no" allow="autoplay"
          src="https://bit.ly/34dfBF4">
        </iframe>
        <div className="section-header" ref={sections[3]}>Photography</div>
        <div className="section-header" ref={sections[4]}>Interests</div>
      </div>
    </div>
  );
}

export default App;