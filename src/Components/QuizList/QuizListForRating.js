import React, {Component}  from 'react';
import {NavLink, Route,  withRouter} from "react-router-dom";
import  './../../App.css';
//import axios from "axios";
import Loader from './../../UI/Loader/Loader';
import {connect} from 'react-redux';
import {fetchQuizes, fetchRateForQuiz} from './../../redux/reducers/quizReducer';
import Rate from "./../Rate/Rate";



class QuizListForRating extends Component{
  
			renderQuizesResults(){
				return this.props.quizes.map(rate=>{
						
		  			return(
		  					<li
		  						key={rate.id}
		  					>
		  						<NavLink to={'/results/rate/' + rate.id }>
		  							{"Тест для рейтинга " + rate.quizName}
		  						</NavLink>
		  					</li>
		  			)
		  		})		
			}

		  	componentDidMount(){
		  		// console.log("componentDidMount", this.props.match.params.id);
		  		// 	let quizId=this.props.match.params.id;
		  		//  	this.props.fetchRateForQuiz(quizId);
		  			this.props.fetchQuizes();
		  			console.log("componentDidMount", this.props.match.params.id);
		   //    	axios.get("https://abzagencytest.firebaseio.com/quizes.json").then(response=>{
		   //      	console.log("response = ", response);
		   //    	})
		  	}
		  	// componentDidUpdate(){		  		
		  	// 	console.log("componentDidUpdate");
		  	// 	let quizId=this.props.match.params.id;
		  	// 	this.props.fetchRateForQuiz(quizId);
		  	// }

   	render(){
		console.log(this.props);
		
		console.log("this.props.match.params.id  in render", this.props.match.params.id);
		  			let quizId=this.props.match.params.id;
		  		 	//this.props.fetchRateForQuiz(quizId);
  
  
   
   
	    return (
	    <div>	      	
	      		 <div className="boxed2">
					<h2 className="heading">Тести</h2>
					{   this.props.loading && this.props.quizes.length !== 0
						? <Loader />
						:	<div className="content" >
					              <ul>
					             { this.renderQuizesResults()  }
					               
					               
					              </ul>
					        </div>
					}
				</div>
				<Rate />
	    </div>
	    )
	}
}

function mapStateToProps(state){
	return{
		quizes: state.quizReducer.quizes,
		rating: state.quizReducer.rating,
		loading: state.quizReducer.loading
	}
}
function mapDispatchToProps(dispatch){
	return{
		fetchQuizes: ()=>dispatch(fetchQuizes()),
		fetchRateForQuiz: (quizId)=>dispatch(fetchRateForQuiz(quizId))
	}
}

let withUrlQuizListForRating = withRouter(QuizListForRating);
export default connect(mapStateToProps, mapDispatchToProps)(withUrlQuizListForRating);

