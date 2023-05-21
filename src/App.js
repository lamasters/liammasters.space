import React from "react";
import "./App.css";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
  TimelineDot,
} from "@material-ui/lab";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

class App extends React.Component {
  constructor(props) {
    super(props);
    window.onscroll = this.onScrollFromTop.bind(this);
    window.onresize = this.setContentWidth.bind(this);

    let images = [];
    for (let i = 1; i <= 15; i++) {
      images.push(
        `https://raw.githubusercontent.com/lamasters/liammasters.space/master/assets/photos/p${i}.jpg`
      );
    }

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

    let titles = ["Software", "Astronomy", "Music", "Photography"];

    this.state = {
      home: React.createRef(),
      toTop: null,
      playerWidth: playerWidth,
      showNav: showNav,
      photos: images,
      stars: stars,
      starDivs: [],
      numStars: numStars,
      title: "Software",
      titles: titles,
    };

    this.renderStarfield(stars);
    this.changeTitle(0, titles);
  }

  changeTitle(n, titles) {
    n++;
    if (n >= titles.length) {
      n = 0;
    }
    this.setState({ title: titles[n] });
    setTimeout(() => this.changeTitle(n, titles), 1000);
  }

  scrollToDiv(divRef) {
    divRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  initStarfield(numStars) {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let stars = [];
    let x, y, size, opac, vx, vy;
    let dirs = [-1, 1];

    for (let i = 0; i < numStars; i++) {
      x = Math.floor(Math.random() * width);
      y = Math.floor(Math.random() * height);
      vx =
        ((1 + Math.random()) * dirs[Math.floor(Math.random() * dirs.length)]) /
        4;
      vy =
        ((1 + Math.random()) * dirs[Math.floor(Math.random() * dirs.length)]) /
        4;
      size = Math.floor(1 + Math.random() * 3);
      opac = Math.random();
      stars.push({
        x: x,
        y: y,
        vx: vx,
        vy: vy,
        size: size,
        opac: opac,
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
    let dirs = [-1, 1];

    for (let i = 0; i < stars.length; i++) {
      star = stars[i];
      if (
        star.x > width ||
        star.x + star.size < 0 ||
        star.y > height ||
        star.y + star.size < 0
      ) {
        stars.splice(i, 1);
        x = Math.floor(Math.random() * width);
        y = Math.floor(Math.random() * height);
        vx =
          ((1 + Math.random()) *
            dirs[Math.floor(Math.random() * dirs.length)]) /
          4;
        vy =
          ((1 + Math.random()) *
            dirs[Math.floor(Math.random() * dirs.length)]) /
          4;
        size = Math.floor(1 + Math.random() * 3);
        opac = Math.random();
        stars.push({
          x: x,
          y: y,
          vx: vx,
          vy: vy,
          size: size,
          opac: opac,
        });
      } else {
        stars[i].x += stars[i].vx;
        stars[i].y += stars[i].vy;
      }

      starStyle = {
        left: String(star.x) + "px",
        top: String(star.y) + "px",
        width: String(star.size) + "px",
        height: String(star.size) + "px",
        borderRadius: "10px",
        opacity: star.opac,
      };

      starDivs.push(<div className="star" style={starStyle}></div>);
    }

    this.setState({ starDivs: starDivs });
    setTimeout(() => this.renderStarfield(stars), 20);
  }

  onScrollFromTop() {
    let toTop = null;
    if (window.scrollY > 250) {
      toTop = (
        <div id="to-top" onClick={() => this.scrollToDiv(this.state.home)}>
          Top
        </div>
      );
    }

    this.setState({ toTop: toTop });
  }

  setContentWidth() {
    let playerWidth = String(window.innerWidth - 50);
    let showNav = false;
    if (window.innerWidth > 800) {
      playerWidth = "800";
      showNav = true;
    }
    console.log(window.innerWidth);

    this.setState({ playerWidth: playerWidth, showNav: showNav });
  }

  render() {
    let sections = [];
    for (let i = 0; i < 5; i++) {
      sections.push(React.createRef());
    }

    return (
      <div className="App">
        <div id="star-container">{this.state.starDivs.map((star) => star)}</div>
        <div id="header" ref={this.state.home}>
          Liam Masters
        </div>
        <div className="subheader">{this.state.title}</div>
        <div>
          <a
            className="icon-link"
            href="https://github.com/lamasters"
            target="_blank"
          >
            <img
              src="https://raw.githubusercontent.com/lamasters/liammasters.space/master/assets/gh.svg"
              className="icon"
            />
          </a>
          <a
            className="icon-link"
            href="https://linkedin.com/in/liam-a-masters"
            target="_blank"
          >
            <img
              src="https://raw.githubusercontent.com/lamasters/liammasters.space/master/assets/li.svg"
              className="icon"
            />
          </a>
        </div>
        <div>
          <div className="section-header" ref={sections[0]}>
            Professional
          </div>
          <div className="proj-desc">
            As a scientist by training and an engineer by trade, I've had the
            fortunate experience of being exposed to many industries. I've
            gotten to work and learn in diverse environments with some amazing
            people. There's been some twists and turns on my path to where I am
            now but described here is a summary of some of the highlights along
            the way.
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
                  <a href="https://uwaterloo.ca/science/" target="_blank">
                    <img
                      className="timeline-icon"
                      src="https://raw.githubusercontent.com/lamasters/liammasters.space/master/assets/uw.svg"
                    />
                  </a>
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
                  <a
                    href="https://uwaterloo.ca/science-society/"
                    target="_blank"
                  >
                    <img
                      className="timeline-icon"
                      src="https://raw.githubusercontent.com/lamasters/liammasters.space/master/assets/ss.png"
                    />
                  </a>
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
                  <a
                    href="https://www.canada.ca/en/environment-climate-change.html"
                    target="_blank"
                  >
                    <img
                      className="timeline-icon round"
                      src="https://raw.githubusercontent.com/lamasters/liammasters.space/master/assets/ec.jpg"
                    />
                  </a>
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
                  <a href="https://www.neptectechnologies.com/" target="_blank">
                    <img
                      className="timeline-icon round"
                      src="https://raw.githubusercontent.com/lamasters/liammasters.space/master/assets/ntc.ico"
                    />
                  </a>
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
                  <a href="https://www.voltalabs.com" target="_blank">
                    <img
                      className="timeline-icon"
                      src="https://raw.githubusercontent.com/lamasters/liammasters.space/master/assets/volt.png"
                    />
                  </a>
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
                  <a href="https://uwaterloo.ca/science/" target="_blank">
                    <img
                      className="timeline-icon"
                      src="https://raw.githubusercontent.com/lamasters/liammasters.space/master/assets/uw.svg"
                    />
                  </a>
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
                  Jan 2020 - Present
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot>
                  <a href="https://www.voltalabs.com" target="_blank">
                    <img
                      className="timeline-icon"
                      src="https://raw.githubusercontent.com/lamasters/liammasters.space/master/assets/volt.png"
                    />
                  </a>
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
          <div className="section-header" ref={sections[1]}>
            Projects
          </div>
          <div className="proj-container">
            <div className="proj-title">SimpliFeed</div>
            <img
              src="https://raw.githubusercontent.com/lamasters/liammasters.space/master/assets/simplifeed.png"
              id="termcast-img"
              loading="lazy"
            />
            <div className="proj-desc">
              A web application for subscribing to RSS news feeds. I never found
              a news app that I liked, and other RSS readers limit the user or
              just display the news websites. I wanted a way to subscribe to the
              news feeds that I care about, without having to sift through all
              of the ads and distractions. This app is built with Next.js and
              uses Appwrite as a backend.
            </div>
          </div>
          <div className="proj-container">
            <div className="proj-title">TermCast</div>
            <img
              src="https://raw.githubusercontent.com/lamasters/liammasters.space/master/assets/term.png"
              id="termcast-img"
              loading="lazy"
            />
            <div className="proj-desc">
              A terminal-based podcast player. As someone who is always working
              in a terminal, I love having ways to streamline my workflow
              without having to leave my session (or keyboard). This player is
              based on RSS feeds, syncing listen time and show lists locally, or
              across devices using Github as a CMS.
            </div>
          </div>
          <div className="proj-container">
            <div className="proj-title">Virtual Assistant</div>
            <img
              src="https://raw.githubusercontent.com/lamasters/liammasters.space/master/assets/assistant.gif"
              id="assistant-img"
              loading="lazy"
            />
            <div className="proj-desc">
              A virtual assistant with an emotional touch. This assistant is
              powered by a Raspberry Pi and an Arduino nano housed inside of a
              3D printed body. Equipped with a custom version of Amazon Alexa
              software, it can express emotion with its digital eye based on
              voice prompts.
            </div>
          </div>
          <div className="proj-container">
            <div className="proj-title">Celesticom</div>
            <img
              src="https://raw.githubusercontent.com/lamasters/liammasters.space/master/assets/Celesticom.gif"
              id="celesticom-img"
              loading="lazy"
            />
            <div className="proj-desc">
              Celesticom is a concept for an interplanetary and interstellar
              satellite network. It operates similar to the SpaceX{" "}
              <a
                className="inline-link"
                target="_blank"
                href="https://www.starlink.com/"
              >
                Starlink{" "}
              </a>
              network but instead utilizes Lagrangian points and large networks
              of inexpensive satellites to establish efficient communication
              over vast distances.
            </div>
          </div>
          <div className="section-header" ref={sections[3]}>
            Photography
          </div>
          <div className="proj-desc">
            Photography has long been a passion of mine. Whether it be capturing
            nature on digital, city scapes on 35mm film, or long exposure shots
            of the night sky, I find the memories and experiences it creates
            immensely rewarding.
          </div>
          <div id="gallery-container">
            {this.state.photos.map((photo) => {
              return <img src={photo} id="gallery-photo" loading="lazy" />;
            })}
          </div>
          {/*<div className="section-header" ref={sections[4]}>Interests</div>*/}
        </div>
        <div id="footer">Liam Masters • 2021</div>
        {this.state.toTop}
        {this.state.showNav ? (
          <div id="navbar">
            <div
              className="navlink"
              onClick={() => this.scrollToDiv(this.state.home)}
            >
              Home
            </div>
            <div className="line"></div>
            <div
              className="navlink"
              onClick={() => this.scrollToDiv(sections[0])}
            >
              Professional
            </div>
            <div className="line"></div>
            <div
              className="navlink"
              onClick={() => this.scrollToDiv(sections[1])}
            >
              Projects
            </div>
            <div className="line"></div>
            <div
              className="navlink"
              onClick={() => this.scrollToDiv(sections[3])}
            >
              Photography
            </div>
            {/*<div className="line"></div>
          <div className="navlink" onClick={() => scrollToDiv(sections[4])}>Interests</div>*/}
          </div>
        ) : null}
      </div>
    );
  }
}

export default App;
