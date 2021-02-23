import React, {Component} from 'react';
import classes from './Rate.module.css';
import {NavLink, withRouter} from "react-router-dom";
import ActiveQuiz from './../ActiveQuiz/ActiveQuiz';
import FinishedQuiz from './../FinishedQuiz/FinishedQuiz';
//import axios from './../../axios/axios-quiz';
import Loader from './../../UI/Loader/Loader';
import Select from './../../UI/Select/Select';
import {connect} from 'react-redux';
import {fetchQuizById, quizAnswerClick, fetchRating, fetchRateById} from './../../redux/reducers/quizReducer';
import {sortRatingForQuiz} from "./../../utils/functions/functions";

class Rate extends Component {

	
	componentDidMount(){
		//console.log('Quiz ID = ', this.props.match.params.id)
		//console.log(this.props.match.params.id);
		//console.log("rating = ", this.props.rating);

		//this.props.fetchRateById(this.props.match.params.id);
		//this.props.fetchRating(this.props.match.params.id);
	}
	renderQuizes(){
		let rating = this.props.rating;
		let quizForRating = this.props.quizForRating;		
		//console.log("rating = ", rating, "quizForRating = ", quizForRating);	
				if(this.props.quizForRating) {
					rating=sortRatingForQuiz(this.props.rating, this.props.quizForRating);
				} else {
					rating=sortRatingForQuiz(rating, "overall");
				}
				
		  		return rating.map(rate=>{
		  			 //console.log("rate = ", rate, "quizRate = ", rate.quizRate, "quizForRating = ", rate.quizResults);
		  			if(!!rate.quizResults){



		  			// 	let sum=0;
		  			// 	let arrayRate = Object.values(rate.quizResults);
							// for(let i=0;i<arrayRate.length;i++){
							//     sum = sum + parseInt(arrayRate[i]);
							// }

//console.log("rate = ", rate);

			  			return(
			  					<li
			  						key={rate.id}
			  					>
			  						<NavLink to={'/rate/' + rate.id }>
			  							<span>{ " " + rate.surname + " " + rate.name}</span><span>{"   школа " + rate.schoolnumber} </span><span> Rate { rate.quizResults[quizForRating] ? (rate.quizResults[quizForRating]/100).toFixed(2) : rate.overallResult.toFixed(2)}</span>
			  							
			  							
			  						</NavLink>
			  					</li>
			  			)
		  			}
		  		})		
	}
	
  render(){
  	console.log(this.props, this.props.quizName, this.props.quiz);
  	const quizNamequizName=this.props.quizName ? "тесту " + this.props.quizName : " всіх тестів";
  	console.log(this.props.quizName);
    return (
   
        <div className="boxed">
        		 <h2 className="heading"> Результати проходження  {quizNamequizName} </h2>
        		  
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
	console.log(state.quizReducer.quizForRating);
	return{
		results: state.quizReducer.results,		
		isFinished: state.quizReducer.isFinished,
		activeQuestion: state.quizReducer.activeQuestion,
		answerState: state.quizReducer.answerState,  
		loading: state.quizReducer.loading,
		quizName: state.quizReducer.quizName,	
		rating: state.quizReducer.rating,
		quizRate: state.quizReducer.quizRate,
		quiz: state.quizReducer.quiz,
		quizForRating: state.quizReducer.quizForRating
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




