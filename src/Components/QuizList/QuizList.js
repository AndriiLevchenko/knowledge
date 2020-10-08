import React, {Component}  from 'react';
import {NavLink, withRouter} from "react-router-dom";
import  './../../App.css';
//import axios from "axios";
import Loader from './../../UI/Loader/Loader';
import {connect} from 'react-redux';
import {fetchQuizes} from './../../redux/reducers/quizReducer';



class QuizList extends Component{
  
		  	renderQuizes(){
		  		return this.props.quizes.map(quiz=>{
		  			return(
		  					<li
		  						key={quiz.id}
		  					>
		  						<NavLink to={'/quiz/' + quiz.id }>
		  							{quiz.name}
		  						</NavLink>
		  					</li>
		  			)
		  		})		
			}

		  	componentDidMount(){
		  		this.props.fetchQuizes();
		   //    	axios.get("https://abzagencytest.firebaseio.com/quizes.json").then(response=>{
		   //      	console.log("response = ", response);
		   //    	})
		  	}

   	render(){
		console.log(this.props)
	    return (	      	
	      		 <div className="archives boxed">
					<h2 className="heading">Archives  Тести</h2>
					{ this.props.loading && this.props.quizes.length !== 0
						? <Loader />
						:	<div className="content" >
					              <ul>
					                {this.renderQuizes()}
					               
					              </ul>
					        </div>
					}
				</div>
	    )
	}
}

function mapStateToProps(state){
	return{
		quizes: state.quizReducer.quizes,
		loading: state.quizReducer.loading
	}
}
function mapDispatchToProps(dispatch){
	return{
		fetchQuizes: ()=>dispatch(fetchQuizes())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);


    //export default withRouter(QuizList);