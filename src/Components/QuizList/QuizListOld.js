import React, {Component} from 'react';
import classes from './QuizList.module.css';
import {NavLink} from 'react-router-dom';
//import axios from './../../axios/axios-quiz';
import Loader from './../../UI/Loader/Loader';
import {connect} from 'react-redux';
import {fetchQuizes} from './../../redux/reducers/quizReducer';

class QuizList extends Component {
		// state={
		// 	quizes: [], 
		// 	loading: true
		// }
	  	renderQuizes(){
	  		return this.props.quizes.map(quiz=>{
	  			return(
	  					<li
	  						key={quiz.id}
	  					>
	  						<NavLink to={'/quiz' + quiz.id }>
	  							{quiz.name}
	  						</NavLink>
	  					</li>
	  				)

	  		})		
	  	}

	  	componentDidMount(){
	  		this.props.fetchQuizes();
	  		// try{
	  		// 	const response = await axios.get('quizes.json'); 
	  		// 	console.log(response.data);
	  		// 	const quizes=[];
	  		// 	Object.keys(response.data).forEach((key, index)=>{
	  		// 		quizes.push({
	  		// 			id: key,
	  		// 			name: `Тест № ${index + 1}`
	  		// 		})
	  		// 	});
	  		// 	this.setState({
	  		// 		quizes,
	  		// 		loading: false
	  		// 	});
	  		// } catch(error) {
	  		// 	console.log(error);
	  		// }
	  	}

	render(){
		console.log(this.props)
	    return (
	      	<div className={classes.QuizList}>
	      		<div className={classes.Tests}>
					<h1>Тести </h1> 
					{ this.props.loading && this.props.quizes.length !== 0
						? <Loader />
						:	<ul>
								{this.renderQuizes()}
							</ul>
					}
				</div>
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
