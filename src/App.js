import React, {useState} from 'react';
import gh from './gh.svg';
import li from './li.svg';
import './App.css';
import TextLoop from "react-text-loop";

function scrollToDiv(divRef) {
  divRef.current.scrollIntoView({behavior: "smooth", block: "start"})
}

class App extends React.Component {
  constructor(props) {
    super(props);
    window.onscroll = this.onScrollFromTop.bind(this);
    window.onresize = this.setContentWidth.bind(this);

    let playerWidth = "400";
    if (window.innerWidth > 800) {
      playerWidth = "800";
    }

    this.state = {
      home: React.createRef(),
      toTop: null,
      playerWidth: playerWidth
    }
  }

  onScrollFromTop() {
    let toTop = null;
    if (window.scrollY > 250) {
      toTop = (<div id="to-top" onClick={() => scrollToDiv(this.state.home)}>Top</div>);
    }

    this.setState({toTop: toTop});
  }

  setContentWidth() {
    let playerWidth = String(window.innerWidth - 50);
    if (window.innerWidth > 800) {
      playerWidth = "800";
    }
    console.log(window.innerWidth);

    this.setState({playerWidth: playerWidth});
  }

  render() {
    let sections = [];
    for (let i = 0; i < 5; i++) {
      sections.push(React.createRef());
    }

    return (
      <div className="App">
        <div id="header" ref={this.state.home}>Liam Masters</div>
        {this.state.toTop}
        <TextLoop
          interval={1500}
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
            width={this.state.playerWidth} height="400"
            scrolling="no" frameborder="no" allow="autoplay"
            src="https://bit.ly/34dfBF4">
          </iframe>
          <div className="section-header" ref={sections[3]}>Photography</div>
          <div className="section-header" ref={sections[4]}>Interests</div>
        </div>
      </div>
    );
  }
}

export default App;