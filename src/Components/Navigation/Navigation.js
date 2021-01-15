import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './Navigation.module.css';



const Navigation =(props)=> {
  return(
  	<div className={classes.pages}>
        
        <ul>
            <li><NavLink  activeStyle={{ backgroundColor: '#02BA95' }} to="/tests">ТЕСТИ</NavLink></li>
            <li><NavLink  activeStyle={{ backgroundColor: '#02BA95' }} to="/results">РЕЗУЛЬТАТИ</NavLink></li>
            <li><NavLink  activeStyle={{ backgroundColor: '#02BA95' }} to="/quizcreator">СТВОРИ СВІЙ ТЕСТ</NavLink></li>
        </ul>
    </div>
  )
}
export default Navigation;
