import React from 'react';
import './App.css';
import TextLoop from "react-text-loop";
import {Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineOppositeContent, TimelineDot} from "@material-ui/lab";
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";

import gh from './gh.svg';
import li from './li.svg';
import uw from './uw.svg';
import ss from './ss.png';
import ec from './ec.jpg';
import ntc from './ntc.ico';
import volt from './volt.png';

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
          <div className="subheader" onClick={() => scrollToDiv(sections[0])}>Astrophysicist</div>
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
            <Timeline align="left">
              <TimelineItem>
                <TimelineOppositeContent>
                  <Typography variant="body2" className="timeframe">
                    Sep 2016 - Dec 2019
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot>
                    <img className="timeline-icon" src={uw}/>
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent className="timeline-item">
                  <Paper elevation={3} className="paper">
                    <Typography variant="h6" component="h1">
                      Began BSc Physics and Astronomy
                    </Typography>
                    <Typography>University of Waterloo</Typography>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineOppositeContent>
                  <Typography variant="body2" className="timeframe">
                    Sep 2017 - Dec 2019
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot>
                  <img className="timeline-icon" src={ss}/>
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent className="timeline-item">
                  <Paper elevation={3} className="paper">
                    <Typography variant="h6" component="h1">
                      Media Coordinator
                    </Typography>
                    <Typography>UW Science Society</Typography>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineOppositeContent>
                  <Typography variant="body2" className="timeframe">
                    Jan 2018 - Apr 2018
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot>
                  <img className="timeline-icon round" src={ec}/>
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent className="timeline-item">
                  <Paper elevation={3} className="paper">
                    <Typography variant="h6" component="h1">
                      Modelling Technician
                    </Typography>
                    <Typography>Environment and Climate Change Canada</Typography>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineOppositeContent>
                  <Typography variant="body2" className="timeframe">
                    Sep 2018 - Apr 2019
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot>
                    <img className="timeline-icon round" src={ntc}/>
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent className="timeline-item">
                  <Paper elevation={3} className="paper">
                    <Typography variant="h6" component="h1">
                      Software Co-op
                    </Typography>
                    <Typography>Neptec Technologies</Typography>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineOppositeContent>
                  <Typography variant="body2" className="timeframe">
                    Sep 2019 - Dec 2019
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot>
                    <img className="timeline-icon" src={volt}/>
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent className="timeline-item">
                  <Paper elevation={3} className="paper">
                    <Typography variant="h6" component="h1">
                      Software Intern
                    </Typography>
                    <Typography>Volta Labs, Inc.</Typography>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineOppositeContent>
                  <Typography variant="body2" className="timeframe">
                    Apr 2020
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot>
                    <img className="timeline-icon" src={uw}/>
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent className="timeline-item">
                  <Paper elevation={3} className="paper">
                    <Typography variant="h6" component="h1">
                      Graduated BSc General Science, Astrophysics Minor
                    </Typography>
                    <Typography>University of Waterloo</Typography>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineOppositeContent>
                  <Typography variant="body2" className="timeframe">
                    Jan 2019 - Present
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot>
                    <img className="timeline-icon" src={volt}/>
                  </TimelineDot>
                </TimelineSeparator>
                <TimelineContent className="timeline-item">
                  <Paper elevation={3} className="paper">
                    <Typography variant="h6" component="h1">
                      Software Engineer
                    </Typography>
                    <Typography>Volta Labs, Inc.</Typography>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
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
        <div id="navbar">
          <div className="navlink" onClick={() => scrollToDiv(this.state.home)}>Home</div>
          <div className="line"></div>
          <div className="navlink" onClick={() => scrollToDiv(sections[0])}>Professional</div>
          <div className="line"></div>
          <div className="navlink" onClick={() => scrollToDiv(sections[1])}>Projects</div>
          <div className="line"></div>
          <div className="navlink" onClick={() => scrollToDiv(sections[2])}>Music</div>
          <div className="line"></div>
          <div className="navlink" onClick={() => scrollToDiv(sections[3])}>Photography</div>
          <div className="line"></div>
          <div className="navlink" onClick={() => scrollToDiv(sections[4])}>Interests</div>
        </div>
      </div>
    );
  }
}

export default App;