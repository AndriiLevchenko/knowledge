import React, {Component} from 'react';
//import logo from './gallardo.svg';
import  './../App.css';
//import Layout from './Components/Layout/Layout';
//import LogOut from './Components/Auth/LogOut';
import Quiz from './Quiz/Quiz';
//import QuizCreator from './Components/QuizCreator/QuizCreator';
import QuizList from './QuizList/QuizList';
//import {Route, Switch, Redirect, withRouter} from 'react-router-dom';

//import {autoLogin} from './redux/reducers/authReducer';

//import './App.css';
//import Navigation from './Components/Navigation/Navigation';
import Content from './Content/Content';

import Ratings from './Ratings/Ratings';
import Auth from './Auth/Auth';

const Results=()=>{
  return (
    


          <div className="wrapper">  
              <div className="results">
                 
                  <QuizList />
                  <Ratings />
              </div>
             
          </div>
  )
}

export default Results;
