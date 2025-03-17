import React, { Component, createContext, useState } from 'react';

import { About, Footer, Header, Skills, Testimonial, Work, Competences, Services, Projets } from './container';
import { Navbar } from './components';
import './App.scss';

import song from "./assets/luv.mp3";
import { Howl } from "howler";
import ReactSwitch from "react-switch";
import { HiMoon, HiSun } from "react-icons/hi";

export const ThemeContext = createContext(null);


var root = document.querySelector(':root');
var rootStyles = getComputedStyle(root);
var light = rootStyles.getPropertyValue('--primary-color');
//root.style.setProperty('--primary-color', 'green');


function App() {

  const [theme, setTheme] = useState('');

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
    if (theme === "light") {
      root.style.setProperty('--primary-color', '#ffffff');
      root.style.setProperty('--graybg-color', '#f5f3f4');
      root.style.setProperty('--gray-color', '#3d535f');
      root.style.setProperty('--blacktext-color', '#0f0f0f');
      root.style.setProperty('--whitetext-color', '#0f0f0f');
      root.style.setProperty('--lightgraybg-color', '#ffffff');
      root.style.setProperty('--topline-color', '#3d535f');
    }
    else {
      root.style.setProperty('--primary-color', '#181818');
      root.style.setProperty('--blacktext-color', '#fef8f8');
      root.style.setProperty('--whitetext-color', '#fef8f8');
      root.style.setProperty('--graybg-color', '#2e2e2e');
      root.style.setProperty('--lightgraybg-color', '#424242');
      root.style.setProperty('--gray-color', '#a2a2a2');
      root.style.setProperty('--topline-color', '#ffffff');
    }
  };

  // Create state
  /*
  state = {

    // Get audio file in a variable
    audio: new Audio(song),
 
    // Set initial state of song
    isPlaying: false,
  };
 
  // Main function to handle both play and pause operations
  playPause = () => {
 
    // Get state of song
    let isPlaying = this.state.isPlaying;
    this.state.audio.volume = 0.05;
 
    if (isPlaying) {
      // Pause the song if it is playing
      this.state.audio.pause();
    } else {
 
      // Play the song if it is paused
      this.state.audio.play();
    }
 
    // Change the state of song
    this.setState({ isPlaying: !isPlaying });
  };*/

  // render() {

  //désactive le clique droit sur le site

  window.addEventListener('contextmenu', function (e) {
    console.log('context menu disabled');
    e.preventDefault();
  }, false);
  
  document.addEventListener('mouseup', function (e) {
    if (e.button === 2) {
      console.log('right-click enabled');
    }
  }, false);
  

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className='app' id={theme}>
        <Navbar />
        <div className='switch'>
          <ReactSwitch className='switch-comp' onChange={toggleTheme} checked={theme === 'light'} checkedHandleIcon={<HiMoon className='moon' />} uncheckedHandleIcon={<HiSun className='light' />} onColor='#b92727' height={25} width={60} />
        </div>
        <Header />
        <div>
          {/* Show state of song on website */}
          {/*
          <p>
            {this.state.isPlaying ?
              "Song is Playing" :
              "Song is Paused"}
          </p>
          */}
          {/* Button to call our main function */}
          {/* <button onClick={this.playPause}>
            Play | Pause
            </button> */}
        </div>
        {/* <About /> */}
        <Services />
        {/* <Work /> */}
        <Projets />
        {/* <Skills /> */}
        <Competences />
        {/* <Testimonial /> */}
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
}
//}
export default App
