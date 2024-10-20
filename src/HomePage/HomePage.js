import './HomePage.css';
import {useState,useEffect} from 'react';

import MyImage from './TapLion.png';



const HomePage = () => {
  let [score,setScore]=useState(()=>{
  const savedScore=localStorage.getItem("score");

  return savedScore ?JSON.parse(savedScore):0;
  });  // Set global variable on the window object
   
 
  // Function to increase the score and automatically save it
const incrementScore=() =>{
    setScore(score =>score+1);
    
    
  }
  useEffect(()=>{
    localStorage.setItem("score", JSON.stringify(score));
  },[score]);
  const HomeHtml=
  <>
  
  
    <header>
      <h1>ProjectLion</h1>
      
    </header>

    
    <div class="score-container">
      <h2>PLcoin: {score}</h2>
    </div>
    <div id='DivBtn'>
    <button id='btn' onClick={incrementScore}><img id='LionPng' src={MyImage} alt="" /></button>

    </div>
    <p>The project Lion is coming soon</p>

 
  </>
  return HomeHtml;
};
export default HomePage;