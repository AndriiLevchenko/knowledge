import React, {Component}  from 'react';
import {NavLink, Route,  withRouter} from "react-router-dom";
import  './../../App.css';
//import axios from "axios";
import Loader from './../../UI/Loader/Loader';
import {connect} from 'react-redux';
import {fetchQuizes, fetchRateForQuiz, fetchQuizForRating} from './../../redux/reducers/quizReducer';
import Rate from "./../Rate/Rate";



class QuizListForRating extends Component{
  

  		
			renderQuizesResults(){
				return this.props.quizes.map(quiz=>{
					console.log(quiz);
		  			return(
		  					<li
		  						key={quiz.id}
		  					>
		  						<NavLink to={'/results/rate/' + quiz.id } onClick={()=>this.props.fetchQuizForRating(quiz.id, quiz.quizName)} >
		  							{"  " + quiz.quizName}
		  						</NavLink>
		  					</li>
		  			)
		  		})		
			}

		  	componentDidMount(){
		  			//console.log(" this props.match.params.id    in   componentDidMount", this.props.match.params.id);
		  		 	//let quizId=this.props.match.params.id;
		  		  	//this.props.fetchRateForQuiz(quizId);
		  			//this.props.fetchQuizes();
		  			//console.log("componentDidMount", this.props.match.params.id);
		   //    	axios.get("https://abzagencytest.firebaseio.com/quizes.json").then(response=>{
		   //      	console.log("response = ", response);
		   //    	})
		  	}
		  
   	render(){
		console.log(this.props);
		
		//console.log("this.props.match.params.id  in render", this.props.match.params.id);
		  			//let quizId=this.props.match.params.id;
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
				  
				 <Route path='/results/rate/:id'	   component= {Rate }/>
 <Route path='/results' exact  component= {Rate }/>

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
		fetchRateForQuiz: (quizId)=>dispatch(fetchRateForQuiz(quizId)),
		fetchQuizForRating: (quizId, quizName)=>dispatch(fetchQuizForRating(quizId, quizName))
	}
}

let withUrlQuizListForRating = withRouter(QuizListForRating);
export default connect(mapStateToProps, mapDispatchToProps)(withUrlQuizListForRating);

