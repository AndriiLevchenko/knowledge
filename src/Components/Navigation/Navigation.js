import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './Navigation.module.css';



const Navigation =(props)=> {
  return(
  	<div className={classes.pages}>
        <h2>Pages</h2>
        <ul>
            <li><NavLink  activeStyle={{ color: '#BD4F21', fontWeight: "bold" }} to="/tests">Тести</NavLink></li>
            <li><NavLink  activeStyle={{ color: '#BD4F21', fontWeight: "bold" }} to="/results">Результати</NavLink></li>
            <li><NavLink  activeStyle={{ color: '#BD4F21', fontWeight: "bold" }} to="/quizcreator">Створи свій тест</NavLink></li>
        </ul>
    </div>
  )
}
export default Navigation;
