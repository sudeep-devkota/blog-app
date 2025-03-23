import React from 'react';
import '../App.css';
import Heroimg from '../images/Heroimg.gif';

function Hero() {
  return (
    <>
      <div
        className="hero flex justify-around px-4 items-center"
        style={{ width: "100%", height: "calc(100vh - 100px)" }}
      >
        {/* Left Section */}
        <div className="left flex flex-col gap-8"> {/* Ensures spacing */}
          <h1 className="text-4xl px-6 mb-6" style={{ lineHeight: "1.4" }}>
            Unlock the secrets to<br />
            <span className="sp-text"> Masterful</span> Programming<br/>
             Here.
          </h1>

          <div className="flex items-center gap-4">
            <button className="btnNormal">Get Started</button>
            <button className="btnWhite">Learn More</button>
          </div> 
        
        </div>

        {/* Right Section */}
        <div className="right w-1/2 flex justify-center">
          <img className="rounded-2xl w-full" src={Heroimg} alt="Hero" />
        </div>
      </div>
    </>
  );
}

export default Hero;

  