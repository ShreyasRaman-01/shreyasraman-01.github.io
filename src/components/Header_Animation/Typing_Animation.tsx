import React from "react";
import Typewriter from "typewriter-effect";
//importing the CSS styling for Navbar
import "./Typing_Animation.css";

//Typing Animation constant text containing the typing animation text component
const TypeAnimation = () => {
  return (
    <div className="typing-animation">
      <div className="typing-text">
        <div className="static-text">
          I am &nbsp;
          <Typewriter
            options={{
              autoStart: true,
              loop: true,
              delay: 70,

              strings: [
                "an embodied AI + robotics researcher 🤖",
                "obsessed with multimodal representation learning 🧠",
                "an engineer and tinkerer ⚙️",
                "a professional chess player ♟️",
                "a song-producing guitarist 🎸",
                "a poet 🖋️",
                "a martial artist 🥊",
                "",
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default TypeAnimation;
