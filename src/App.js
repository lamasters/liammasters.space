import "./App.css";

import React from "react";

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
            rel="noreferrer"
          >
            <img
              src="https://raw.githubusercontent.com/lamasters/liammasters.space/master/assets/gh.svg"
              className="icon"
              alt="Github Icon"
            />
          </a>
          <a
            className="icon-link"
            href="https://linkedin.com/in/liam-a-masters"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://raw.githubusercontent.com/lamasters/liammasters.space/master/assets/li.svg"
              className="icon"
              alt="LinkedIn Icon"
            />
          </a>
        </div>
        <div>
          <div className="section-header" ref={sections[0]}>
            Professional
          </div>
          <div className="proj-desc">
            I'm a full stack engineer working in biotech for the last 5 years.
            With a background in physics, I have a passion for science and I
            love building tech to further research. I'm also a hobbyist
            photographer, musician, and homelabber.
          </div>
          <div className="section-header" ref={sections[1]}>
            Projects
          </div>
          <div className="proj-container">
            <div className="proj-title">SimpliFeed</div>
            <img
              src="https://raw.githubusercontent.com/lamasters/liammasters.space/master/assets/simplifeed.png"
              id="termcast-img"
              loading="lazy"
              alt="SimpliFeed website news feed screenshot"
            />
            <div className="proj-desc">
              A news app with no ads and AI summaries. SimpliFeed lets you get
              the news at a glance without the clutter and popups, and dive
              deeper into the stories you care about. Visit{" "}
              <a href="https://simplifeed.org" target="_blank" rel="noreferrer">
                SimpliFeed
              </a>{" "}
              to get started.
            </div>
          </div>
          <div className="proj-container">
            <div className="proj-title">Bonjour Bites</div>
            <img
              src="https://raw.githubusercontent.com/lamasters/liammasters.space/master/assets/bonjour.png"
              id="bonjour-img"
              loading="lazy"
              alt="Bonjour Bites site screenshot"
            />
            <div className="proj-desc">
              Bonjour Bites is everything good about meal delivery services
              without the overpriced boxes. It gives you a weekly menu with lots
              of additional recipes to choose from, and puts together a shopping
              list for you so that you can make sure you're getting the best
              deals.
            </div>
          </div>
          <div className="proj-container">
            <div className="proj-title">Entangled Tabs</div>
            <img
              src="https://raw.githubusercontent.com/lamasters/liammasters.space/master/assets/entangled.png"
              id="entangled-img"
              loading="lazy"
              alt="Entangled Tabs chrome extension screenshot"
            />
            <div className="proj-desc">
              Entangled is a tab synchronization website extension for
              chromium-based browsers. It allows you to synchronize tabs across
              your devices, making it easy to switch between devices and pick up
              where you left off. Visit{" "}
              <a
                href="https://extension.entangledtabs.com"
                target="_blank"
                rel="noreferrer"
              >
                Entangled
              </a>{" "}
              to install and{" "}
              <a
                href="https://entangledtabs.com"
                target="_blank"
                rel="noreferrer"
              >
                entangledtabs.com
              </a>{" "}
              to get started.
            </div>
          </div>
          <div className="proj-container">
            <div className="proj-title">TermCast</div>
            <img
              src="https://raw.githubusercontent.com/lamasters/liammasters.space/master/assets/term.png"
              id="termcast-img"
              loading="lazy"
              alt="TermCast terminal podcast player screenshot"
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
              alt="Animated gif of a robot assistant with a blinking eye"
            />
            <div className="proj-desc">
              A virtual assistant with an emotional touch. This assistant is
              powered by a Raspberry Pi and an Arduino nano housed inside of a
              3D printed body. Equipped with a custom version of Amazon Alexa
              software, it can express emotion with its digital eye based on
              voice prompts.
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
              return (
                <img
                  src={photo}
                  id="gallery-photo"
                  loading="lazy"
                  alt="Photography example"
                />
              );
            })}
          </div>
        </div>
        <div id="footer">
          Liam Masters • {new Date(Date.now()).getFullYear()}
        </div>
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
          </div>
        ) : null}
      </div>
    );
  }
}

export default App;
