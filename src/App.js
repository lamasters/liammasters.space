import React from 'react';
import './App.css';
import {Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineOppositeContent, TimelineDot} from "@material-ui/lab";
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import {getImages} from './images.js';

import gh from './gh.svg';
import li from './li.svg';
import uw from './uw.svg';
import ss from './ss.png';
import ec from './ec.jpg';
import ntc from './ntc.ico';
import volt from './volt.png';
import ast from './assistant.gif';
import clst from './Celesticom.gif';
import orbt from './orbiter.gif';
import trns from './translate.jpg';
import dig from './digit.jpg';

class App extends React.Component {
  constructor(props) {
    super(props);
    window.onscroll = this.onScrollFromTop.bind(this);
    window.onresize = this.setContentWidth.bind(this);

    let images = getImages();

    let playerWidth = "400";
    let showNav = false;
    let numStars = 30;
    if (window.innerWidth > 800) {
      playerWidth = "800";
      showNav = true;
      numStars = 50;
    }

    let initStarfield = this.initStarfield.bind(this);
    let stars = initStarfield(numStars);

    let titles = [
      "Software Engineer",
      "Astrophysicist",
      "Maker",
      "Musician",
      "Photographer",
      "Podcast Aficionado"
    ];

    this.state = {
      home: React.createRef(),
      toTop: null,
      playerWidth: playerWidth,
      showNav: showNav,
      photos: images,
      stars: stars,
      starDivs: [],
      numStars: numStars,
      title: "Software Engineer",
      titles: titles
    };

    this.renderStarfield(stars);
    this.changeTitle(0, titles);
  }

  changeTitle(n, titles) {
    n++;
    if (n >= titles.length) {
      n = 0;
    }
    this.setState({title: titles[n]});
    setTimeout(() => this.changeTitle(n, titles), 1000);
  }

  scrollToDiv(divRef) {
    divRef.current.scrollIntoView({behavior: "smooth", block: "start"});
  }

  initStarfield(numStars) {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let stars = [];
    let x, y, size, opac, vx, vy;
    let dirs = [-1, 1];

    for(let i = 0;  i < numStars; i++) {
      x = Math.floor(Math.random() * width);
      y = Math.floor(Math.random() * height);
      vx = ((1 + Math.random()) * dirs[Math.floor(Math.random() * dirs.length)]) / 4;
      vy = ((1 + Math.random()) * dirs[Math.floor(Math.random() * dirs.length)]) / 4;
      size = Math.floor(1 + Math.random() * 3);
      opac = Math.random();
      stars.push({
        x: x,
        y: y,
        vx: vx,
        vy: vy,
        size: size,
        opac: opac
      });
    }

    return stars;
  }

  renderStarfield(stars) {
    let starDivs = [];
    let starStyle;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let x, y, vx, vy, size, opac, star;
    let dirs = [-1, 1]

    for(let i = 0; i < stars.length; i++) {
      star = stars[i]; 
      if(star.x > width || star.x + star.size < 0 || star.y > height || star.y + star.size < 0) {
        stars.splice(i, 1);
        x = Math.floor(Math.random() * width);
        y = Math.floor(Math.random() * height);
        vx = ((1 + Math.random()) * dirs[Math.floor(Math.random() * dirs.length)]) / 4;
        vy = ((1 + Math.random()) * dirs[Math.floor(Math.random() * dirs.length)]) / 4;
        size = Math.floor(1 + Math.random() * 3);
        opac = Math.random();
        stars.push({
          x: x,
          y: y,
          vx: vx,
          vy: vy,
          size: size,
          opac: opac
        });
      } else {
        stars[i].x += stars[i].vx;
        stars[i].y += stars[i].vy;
      }

      starStyle = {
        left: String(star.x) + 'px',
        top: String(star.y) + 'px',
        width: String(star.size) + 'px',
        height: String(star.size) + 'px',
        borderRadius: '10px',
        opacity: star.opac
      }

      starDivs.push(<div className="star" style={starStyle}></div>);
    }

    this.setState({starDivs: starDivs})
    setTimeout(() => this.renderStarfield(stars), 20);
  }

  onScrollFromTop() {
    let toTop = null;
    if (window.scrollY > 250) {
      toTop = (<div id="to-top" onClick={() => this.scrollToDiv(this.state.home)}>Top</div>);
    }

    this.setState({toTop: toTop});
  }

  setContentWidth() {
    let playerWidth = String(window.innerWidth - 50);
    let showNav = false;
    if (window.innerWidth > 800) {
      playerWidth = "800";
      showNav = true;
    }
    console.log(window.innerWidth);

    this.setState({playerWidth: playerWidth, showNav: showNav});
  }

  render() {
    let sections = [];
    for (let i = 0; i < 5; i++) {
      sections.push(React.createRef());
    }

    return (
      <div className="App">
        <div id="star-container">
          {this.state.starDivs.map(star => star)}
        </div>
        <div id="header" ref={this.state.home}>Liam Masters</div>
        <div className="subheader">{this.state.title}</div>
        <div>
          <a className="icon-link" href="https://github.com/lamasters" target="_blank"><img src={gh} className="icon"/></a>
          <a className="icon-link" href="https://linkedin.com/in/liam-a-masters" target="_blank"><img src={li} className="icon"/></a>
        </div>
        <div>
          <div className="section-header" ref={sections[0]}>Professional</div>
          <div className="proj-desc">
            As a scientist by training and an engineer by trade, I've had the fortunate 
            experience of being exposed to many industries. I've gotten to work and 
            learn in diverse environments with some amazing people. There's been some 
            twists and turns on my path to where I am now but described here is a 
            summary of some of the highlights along the way.
          </div>
            <Timeline align="left">
              <TimelineItem>
                <TimelineOppositeContent>
                  <Typography variant="body2" className="timeframe">
                    Sep 2016 - Dec 2019
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot>
                    <a href="https://uwaterloo.ca/science/" target="_blank"><img className="timeline-icon" src={uw}/></a>
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
                    <a href="https://uwaterloo.ca/science-society/" target="_blank"><img className="timeline-icon" src={ss}/></a>
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
                    <a href="https://www.canada.ca/en/environment-climate-change.html" target="_blank"><img className="timeline-icon round" src={ec}/></a>
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
                    <a href="https://www.neptectechnologies.com/" target="_blank"><img className="timeline-icon round" src={ntc}/></a>
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
                    <a href="https://www.voltalabs.com" target="_blank"><img className="timeline-icon" src={volt}/></a>
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
                    <a href="https://uwaterloo.ca/science/" target="_blank"><img className="timeline-icon" src={uw}/></a>
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
                  < a href="https://www.voltalabs.com" target="_blank"><img className="timeline-icon" src={volt}/></a>
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
          <div className="proj-desc">
            It's a blessing and a curse that I am chronically bored (plane rides are tough). 
            As a result, in my free time I'm constantly working on projects and creating 
            things that I think are cool. Listed here are a few examples that I'm proud of.
          </div>
            <div className="proj-container">
              <div className="proj-title">Virtual Assistant</div>
              <img src={ast} id="assistant-img"/>
              <div className="proj-desc">
                A virtual assistant with an emotional touch. 
                This assistant is powered by a Raspberry Pi and an 
                Arduino nano housed inside of a 3D printed body. 
                Equipped with a custom version of Amazon Alexa software, 
                it can express emotion with its digital eye based on voice prompts.
              </div>
            </div>
            <div className="proj-container">
              <div className="proj-title">Messenger Translate Bot</div>
              <img src={trns} id="translate-img"/>
              <div className="proj-desc">
                A chat bot for Facebook Messenger written in Python 
                using the Facebook Chat API. It can be added as a third party 
                to any conversation. When a user enters the keyword before 
                their message, the chat bot automatically translates it to 
                the selected language and sends the message back.
              </div>
            </div>
            <div className="proj-container">
              <div className="proj-title">Mars Orbiter</div>
              <img src={orbt} id="orbiter-img"/>
              <div className="proj-desc">
                A satellite launching simulator written in Java using a custom 
                graphics library. It employs a machine learning genetic algorithm 
                to find a stable orbit around Mars. 5000 starting orbits are 
                launched and collapse to one final state. The fit of each orbit is 
                determined by calculating average orbital distance and variance of 
                orbital distance.
              </div>
            </div>
            <div className="proj-container">
              <div className="proj-title">Celesticom</div>
              <img src={clst} id="celesticom-img"/>
              <div className="proj-desc">
                Celesticom is a concept for an interplanetary and interstellar satellite 
                network. It operates similar to the SpaceX <a className="inline-link" target="_blank" href="https://www.starlink.com/">Starlink </a>
                network but instead utilizes Lagrangian points and large networks of inexpensive 
                satellites to establish efficient communication over vast distances.
              </div>
              </div>
            <div className="proj-container">
              <div className="proj-title">Messenger Digit Classifier</div>
              <img src={dig} id="digit-img"/>'
              <div className="proj-desc">
              A Facebook Messenger chat bot written in Python using Tensorflow and the 
              Facebook Chat API. The bot can be sent images of handwritten digits and will 
              send a message back with it's classification.
              </div>
            </div>
          <div className="section-header" ref={sections[2]}>Music</div>
          <div className="proj-desc">
            Ever since I first learned to play guitar when I was a kid, I've loved to play
            and create music in my free time. A favorite pass-time of mine is to record 
            instrumental pieces with a MIDI keyboard in Logic Pro. Below are a few examples
            that I've created in the past few years.
          </div>
          {/*<iframe 
              width={this.state.playerWidth} height="400"
              scrolling="no" frameborder="no" allow="autoplay"
              src="https://bit.ly/34dfBF4">
          </iframe>*/}
          <iframe src="https://open.spotify.com/embed/album/0ZMsEEgYRsYuvIzPCFuw8C" 
            width={this.state.playerWidth} height="300" 
            frameborder="0" allowtransparency="true" 
            allow="encrypted-media">
          </iframe>
          <div className="section-header" ref={sections[3]}>Photography</div>
          <div className="proj-desc">
            Another passion of mine is photography. I've always found it interesting to see 
            how other people view the world and how their unique voice can translate to the 
            images they capture. I mostly dabble in digital photography however I also have a
            keen affinity for the style and process of film photography. On top of all this, 
            the physicist in me is always excited to play with anything involving optics and 
            capturing astronomical objects.
          </div>
          <div id="gallery-container">
          {this.state.photos.map(photo => {return <img src={photo} id="gallery-photo"/>})}
          </div>
          {/*<div className="section-header" ref={sections[4]}>Interests</div>*/}
        </div>
        <div id='footer'>Liam Masters • 2021</div>
        {this.state.toTop}
        {this.state.showNav ? <div id="navbar">
          <div className="navlink" onClick={() => this.scrollToDiv(this.state.home)}>Home</div>
          <div className="line"></div>
          <div className="navlink" onClick={() => this.scrollToDiv(sections[0])}>Professional</div>
          <div className="line"></div>
          <div className="navlink" onClick={() => this.scrollToDiv(sections[1])}>Projects</div>
          <div className="line"></div>
          <div className="navlink" onClick={() => this.scrollToDiv(sections[2])}>Music</div>
          <div className="line"></div>
          <div className="navlink" onClick={() => this.scrollToDiv(sections[3])}>Photography</div>
          {/*<div className="line"></div>
          <div className="navlink" onClick={() => scrollToDiv(sections[4])}>Interests</div>*/}
        </div> : null}
      </div>
    );
  }
}

export default App;