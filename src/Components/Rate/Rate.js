import React, {Component} from 'react';
import classes from './Rate.module.css';
import {NavLink, withRouter} from "react-router-dom";
import ActiveQuiz from './../ActiveQuiz/ActiveQuiz';
import FinishedQuiz from './../FinishedQuiz/FinishedQuiz';
//import axios from './../../axios/axios-quiz';
import Loader from './../../UI/Loader/Loader';
import {connect} from 'react-redux';
import {fetchQuizById, quizAnswerClick, fetchRating, fetchRateById} from './../../redux/reducers/quizReducer';

class Rate extends Component {

	
	componentDidMount(){
		//console.log('Quiz ID = ', this.props.match.params.id)
		console.log(this.props.match.params.id);

		//this.props.fetchRateById(this.props.match.params.id);
		//this.props.fetchRating(this.props.match.params.id);
	}
	renderQuizes(){
				let quizName=this.props.quizName;
			
		  		return this.props.rating.map(quiz=>{
		  			
		  			// console.log("quiz = ", quiz);
		  			// console.log("quizResults = ", quiz.quizResults);
		  			// console.log("quizName = ", quizName);
		  			if(!!quiz.quizResults){
			  			return(
			  					<li
			  						key={quiz.id}
			  					>
			  						<NavLink to={'/quiz/' + quiz.id }>
			  							{quiz.surname + " " + quiz.quizResults.quizName + "         школа " + quiz.schoolnumber }
			  						</NavLink>
			  					</li>
			  			)
		  			}
		  		})		
	}
	
  render(){
  	console.log(this.props, this.props.rate);
  	console.log("this/props.rate = ", this.props.quizName);
  	//const {pathname} = this.props.location;
  	//console.log(pathname);
  
    return (
   
        <div className="boxed">
        		 <h2 className="heading"> {"Результати проходження тесту " + this.props.rating.quizName || "тестів"} </h2>
        	  	{this.props.loading
        	  		? <Loader />
	        			:   <div className="content" >
					              <ul>
					             {  this.renderQuizes() }
					               
					               
					              </ul>
					        </div>
        		  
        	  	}
        	  	
        </div>
    
    )
  }
}

function mapStateToProps(state){
	return{
		results: state.quizReducer.results,		
		isFinished: state.quizReducer.isFinished,
		activeQuestion: state.quizReducer.activeQuestion,
		answerState: state.quizReducer.answerState,  
		loading: state.quizReducer.loading,
		quizName: state.quizReducer.quizRate,
		rating: state.quizReducer.rating,
		rate: state.quizReducer.rate
		
	}
}
function mapDispatchToProps(dispatch){
	return{
		fetchRateById:id=>dispatch(fetchRateById(id)),
		fetchRating:id=>dispatch(fetchRating(id)),
		
	}
}

let withUrlDataRate = withRouter(Rate);
export default connect(mapStateToProps, mapDispatchToProps)(withUrlDataRate); 




