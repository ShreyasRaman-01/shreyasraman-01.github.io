import React, { Component } from "react";
import CSS from "csstype";
import { Link } from 'react-router-dom';

//importing CSS styling for the about card + swipe animation
import "./About_Card.css";

const clicked_paragraph_style: CSS.Properties = {
  fontSize: "16px",
  width: "56vw",
  margin: "0",
};

class AboutCard extends Component {
  //boolean to track if the about card is clicked
  state = { clicked: false };

  //handleClick function to set the state for about me card i.e. either 3 lines or 'x' to close upon clicking menu
  handleClick = () => {
    //updating the 'state' to the opposite of the current 'state' (i.e. True if False and False if True) when menu clicked
    this.setState({ clicked: !this.state.clicked });
  };

  //variable storing card content
  about_me_summary_content = (
    <ul>
      <li>
        {" "}
        Welcome to my corner of the internet! My name is Shreyas Raman{" "}
      </li>
      <li>
        {" "}
        I am a Software Engineer (ML) at <a href="https://www.nuro.ai/nuro-lucid-uber-robotaxi" Nuro></a> working on learning useful representations for End-to-End Autonomous Driving
        {" "}
      </li>
      <li>
      {" "}
        Previously, I finsihed a 5-year <b>ScB & MSc (Honors) in Computer Science</b> at  Brown University  <Link to="/research">doing research</Link> with the BigAI initiative under <b><a href="https://h2r.cs.brown.edu/people/" style={{color:"black", textDecoration:"none"}}>Prof. Stefanie Tellex</a></b> and <b><a href="https://cs.brown.edu/people/gdk/index.html" style={{color:"black", textDecoration:"none"}}>Prof. George Konidaris</a></b>, <b><a href="https://randallbalestriero.github.io/" style={{color:"black", textDecoration:"none"}}>Prof. Randall Balestriero</a></b> as well as <b><a href="https://serre-lab.clps.brown.edu/person/thomas-serre/" style={{color:"black", textDecoration:"none"}}>Prof. Thomas Serre</a></b>
      {" "}
      </li>
      <li>
        {" "}
        I am obsessed with the problem of <b>learning composable abstractions for effective/general embodied decision making</b> from <b>multimodal observations</b> (vision, audio, language, haptic etc...). To hear more about my thoughts on this problem, checkout my <a href="https://medium.com/@shreyas_sundara_raman" blog post> </a>{" "}
      </li>
      <li>
        {" "}
        Outside research, I pursue representation learning  <Link to="/research">research</Link>{" "}, play competitive <a href="https://chess.com/member/shreyasraman" style={{color:"black", textDecoration:"none"}}>chess ♚</a>, actively review <a href="https://www.goodreads.com/user/show/185687235-shreyas-raman" style={{color:"black", textDecoration:"none"}}>books 📚 and films 🎬</a>, am an amateur boxer 🥊, write <a href="https://medium.com/@shreyas_sundara_raman" style={{color:"black", textDecoration:"none"}}>poetry</a> 🖊️, write music on my guitar 🎸 and tinker with technical <Link to="/projects">projects</Link>{" "}
      </li>
      <li>
        {" "}
        Please feel <b>reach out</b>, please use the social links above! To know more about me, please checkout my <a href="https://medium.com/@shreyas_sundara_raman" style={{color:"black", textDecoration:"none"}}>blog</a>{" "}
      </li>
    </ul>
  );

  
  about_me_long_content = (
    <p style={clicked_paragraph_style}>
      {" "}
      Hello fellow netizen (or AI agent), welcome to my corner of the web! My name is Shreyas Raman. I graduated with ScB & MSc (Honors) in Computer Science at Brown University<br />
      <br /> I am a <b>researcher and roboticist</b> at heart, eager
      to enable human-like reasoning for embodied AI through composable abstraction learning from multiple modalities e.g. across visual, audio, language or haptic data. Though I always enjoyed
      physics/engineering, in my first semester at Brown University, I{" "}
      <b>fell in love with a completely new world of computer science.</b>
      <br /> Over undergrad, my <Link to="/research" style={{color:"black", textDecoration:"none"}}>research experience</Link> across 9 research projects accepted at 6 conferences has cultivated a{" "}
      <b>strong passion for multimodal AI (computer vision, natural language processing or reinforcement learning) applied to help agents/robots improve generalization to novel tasks, thereby making agents meaningfully independent and simplifying human-agent interactions.</b> Several interesting <Link to="/projects" style={{color:"black", textDecoration:"none"}}>projects</Link> over this time have also made me familiar with <b>Python, Java, MATLAB, Solidity, Go and C</b>{" "}
      and am self-taught in <b>SQL, HTML, Javascript and Typescript</b>. Please check them out!{" "}
      <br /> Aside from research, I was actively involved in{" "}
      <b>Brown's Chess club</b>; I supported the{" "}
      <b>"Brown Space Engineering" (BSE)</b> group with CubeSAT missions; I served as a <b>head TA for CSCI1410</b>, <b>Meiklejohn</b> peer mentor and <b>tutor to local highschool students</b> in Providence; I also dabble in <Link to="/blog" style={{color:"black", textDecoration:"none"}}><b>creative writing + poetry</b></Link> and music writing. I am keen to leverage my unique background to bridge my work beyond theory towards tangible impact.{" "}
    </p>
  );

  //function to render the about card
  render() {
    return (
      <div>
      <div className="about-card-container">
        <div className="about-card">
          <div className="about-header">
            <h2> About Me </h2>
            <span className="learn-more-me" onClick={this.handleClick}>
              {this.state.clicked ? "Close" : "Learn More"}
            </span>
          </div>

          <div
            className={
              this.state.clicked
                ? "about-card-content-clicked"
                : "about-card-content"
            }
          >
            {" "}
            {this.state.clicked
              ? this.about_me_long_content
              : this.about_me_summary_content}{" "}
          </div>
        </div>

        <div className="shreyas-card">
          <div className="shreyas-card-inner">
            <div className="shreyas-card-front">
              <img
                src="media/shreyas_card_icon1.jpg"
                alt="shreyas_card_icon1"
                className="shreyas-card-image-front"
              />
            </div>

            <div className="shreyas-card-back">
            <h3> Fun facts about me: </h3>
            <ul>
              <li>
                I am ambidextrous
              </li>
              <li>
                I have lived in 5 countries and can speak 6 languages
              </li>
              <li>
                I have been to Mt. Everest's peak...by plane 😅
              </li>
              <li> 
                I am fanatic about dogs: my fav breed is German Shepherds 🐶
              </li>
              <li>
                I mainly study the Sicilian and Danish gambit
              </li>
            </ul>
            </div>
          </div>
        </div>
      </div>

      {/* finally add recent news in the bottom */}
      <div className="recent-news-section">
        <h2>News</h2>
        <ul>
          <li>
            <span className="news-date">Oct 2025</span>
            <span>Started Day 1 as an E2E Autonomous Driving team at Nuro!</span>
          </li>
          <li>
            <span className="news-date">May 2025</span>
            <span>Graduated ScB CS (Honors) with Magna-cum-laude & <a href="https://awards.cs.brown.edu/2024/05/06/twenty-eight-students-win-2024-brown-cs-senior-prizes/" style={{color:"black", textDecoration:"none"}}>Senior Prize</a> at Brown University</span>
          </li>
          <li>
            <span className="news-date">Nov 2024</span>
            <span><a href="https://openreview.net/pdf?id=5z8AJP5G8c" style={{color:"black", textDecoration:"none"}}>SkillWrapper</a> was accepted at LEAP, CoRL 2024</span>
          </li>
          <li>
            <span className="news-date">Oct 2024</span>
            <span>Reviewing for 2nd ever <a href="https://leap-workshop.github.io/" style={{color:"black", textDecoration:"none"}}>LEAP Workshop at CoRL 2024</a>!</span>
          </li>
          <li>
            <span className="news-date">May 2024</span>
            <span>Received ScB CS (Honors) with Magna-cum-laude & <a href="https://awards.cs.brown.edu/2024/05/06/twenty-eight-students-win-2024-brown-cs-senior-prizes/" style={{color:"black", textDecoration:"none"}}>Senior Prize</a> at Brown University</span>
          </li>
          <li>
            <span className="news-date">Nov 2023</span>
            <span>At McKinsey & Co, developing a B2B AI Strategy </span>
          </li>
        </ul>
      </div>
      </div>

    );
  }


}

export default AboutCard;
