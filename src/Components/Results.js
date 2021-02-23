import React, {Component} from 'react';
//import logo from './gallardo.svg';
import  './../App.css';
//import Layout from './Components/Layout/Layout';
//import LogOut from './Components/Auth/LogOut';

import QuizListForRating from './QuizList/QuizListForRating';
//import {Route, Switch, Redirect, withRouter} from 'react-router-dom';

import {connect} from 'react-redux';
import {fetchRating, fetchQuizes} from './../redux/reducers/quizReducer';


class Results extends Component{

        componentDidMount(){
          this.props.fetchRating();
          this.props.fetchQuizes();
        }

    render(){
    console.log(this.props.rating);

  return (
        <div className="wrapper">  
            <div className="results">   
                 	<QuizListForRating />
            </div>
        </div>
  )
}
}

function mapStateToProps(state){
  return{
    rating: state.quizReducer.rating,
    loading: state.quizReducer.loading,
    rate: state.quizReducer.rate
  }
}
function mapDispatchToProps(dispatch){
  return{
    fetchRating: ()=>dispatch(fetchRating()),
    fetchQuizes: ()=>dispatch(fetchQuizes())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Results);
