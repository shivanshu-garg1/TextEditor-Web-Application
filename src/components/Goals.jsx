import React from 'react'
import "../cssFiles/Goals.css";
import img3 from "../Images/g4.png";
import img4 from "../Images/g8.png";
import img5 from "../Images/g10.png";
import img6 from "../Images/g11.jpg";
export default function Goals() {
  return (<>
    <h1 className='goals'>Sustainable Goals</h1>
    <div className='cont'>
      <img src={img3} alt="" />&nbsp;
      <img src={img4} alt="" />&nbsp;
      <img src={img5} alt="" />&nbsp;
      <img src={img6} alt="" />&nbsp;
    </div>
    </>
  )
}
