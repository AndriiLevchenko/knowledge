import React, {Component} from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from './../ActiveQuiz/ActiveQuiz';
import FinishedQuiz from './../FinishedQuiz/FinishedQuiz';
//import axios from './../../axios/axios-quiz';
import Loader from './../../UI/Loader/Loader';
import {connect} from 'react-redux';
import {fetchQuizById, quizAnswerClick, retryQuiz} from './../../redux/reducers/quizReducer';

class Quiz extends Component {

	//state={
		// results: {},			//   { [id]: 'success'    'error' }
		// isFinished: false,
		// activeQuestion: 0,
		// answerState: null,  	//   { [id]: 'success'    'error' }
		// loading: true,
		//quiz: [
				// {	question: "Якій країні належать Мальдіви?",
				// 	rightAnswerId: 3,
				// 	id: 1,
				// 	answers: [
				// 		{text: 'Індія', id: 1},
				// 		{text: 'Шрі-Ланка', id: 2},
				// 		{text: 'Окрема держава', id: 3},
				// 		{text: 'Іспанія', id: 4},
				// 		{text: 'Індонезія', id: 5},
				// 		{text: 'Британія', id: 6}
				// 	]
				// },
				// {	question: "Якій країні належать Галапагоські острови",
				// 	rightAnswerId: 2,
				// 	id: 2,
				// 	answers: [
				// 		{text: 'Колумбія', id: 1},
				// 		{text: 'Еквадор', id: 2},
				// 		{text: 'Окрема держава', id: 3},
				// 		{text: 'Іспанія', id: 4},
				// 		{text: 'Перу', id: 5},
				// 		{text: 'Британія', id: 6}
				// 	]
				// },
				// {	question: "Якій країні належать Канарські острови?",
				// 	rightAnswerId: 6,
				// 	id: 3,
				// 	answers: [
				// 		{text: 'Франція', id: 1},
				// 		{text: 'Окрема держава', id: 2},
				// 		{text: 'Марокко', id: 3},
				// 		{text: 'Західна Сахара', id: 4},
				// 		{text: 'Португалія', id: 5},
				// 		{text: 'Іспанія', id: 6}
				// 	]
				// }
				//  {	question: "Овочева культура",
				// 	rightAnswerId: 3,
				// 	id: 1,
				// 	answers: [
				// 		{text: 'Benedictius', id: 1},
				// 		{text: 'Альбатрос', id: 2},
				// 		{text: 'Рапунцель', id: 3},
				// 		{text: 'Бурунцель', id: 4},
				// 		{text: 'Бумбурун', id: 5},
				// 		{text: 'Бурун', id: 6}
				// 	]
				// },
				// {	question: 'На яке дерево перетворилася Мавка (" Лісова пісня")?',
				// 	rightAnswerId: 2,
				// 	id: 2,
				// 	answers: [
				// 		{text: 'Береза', id: 1},
				// 		{text: 'Верба', id: 2},
				// 		{text: 'Осика', id: 3},
				// 		{text: 'Ялина', id: 4},
				// 		{text: 'Смерека', id: 5},
				// 		{text: 'перетворилася не на дерево', id: 6}
				// 	]
				// },
				// {	question: 'Через яке дерево посварилися сімї Лаврина і Карпа в "Кайдашевій сімї" І.С. Нечуй-Левицького ?',
				// 	rightAnswerId: 3,
				// 	id: 3,
				// 	answers: [
				// 		{text: 'Вишня', id: 1},
				// 		{text: 'Яблуня', id: 2},
				// 		{text: 'Груша', id: 3},
				// 		{text: 'Тополя', id: 4},
				// 		{text: 'Осика', id: 5},
				// 		{text: 'Верба', id: 6}
				// 	]
				// },
				// {	question: 'Яка найдавніша рослина на планеті ?',
				// 	rightAnswerId: 2,
				// 	id: 4,
				// 	answers: [
				// 		{text: 'Дуб', id: 1},
				// 		{text: 'Морські водорості', id: 2},
				// 		{text: 'Папороть', id: 3},
				// 		{text: 'Хвощ', id: 4},
				// 		{text: 'Мох', id: 5},
				// 		{text: 'Пальма', id: 6}
				// 	]
				// },
				// {	question: 'Які квіти у жодному разі не можна поміщати в спальню, оскільки вони найінтенсивніше поглинають енергію людини? ',
				// 	rightAnswerId: 6,
				// 	id: 5,
				// 	answers: [
				// 		{text: 'Троянди', id: 1},
				// 		{text: 'Гвоздики', id: 2},
				// 		{text: 'Люпіни', id: 3},
				// 		{text: 'Фікуси', id: 4},
				// 		{text: 'Пуансетії', id: 5},
				// 		{text: 'Орхідеї', id: 6}
				// 	]
				// },
				// {	question: 'З яких рослин виробляється мескалін?',
				// 	rightAnswerId: 4,
				// 	id: 6,
				// 	answers: [
				// 		{text: 'Піони', id: 1},
				// 		{text: 'Гладіолуси', id: 2},
				// 		{text: 'Маки', id: 3},
				// 		{text: 'Кактуси', id: 4},
				// 		{text: 'Табак', id: 5},
				// 		{text: 'Виноград', id: 6}
				// 	]
				// },


		//]
	//}

	
	componentDidMount(){
		//console.log('Quiz ID = ', this.props.match.params.id)
		console.log(this.props);
		this.props.fetchQuizById(this.props.match.params.id);
	}
	componentWillUnmount(){
		this.props.retryQuiz();
	}
  render(){
  	console.log(this.props, this.props.loading, !this.props.quiz);
  	console.log(this.props.quiz);
  	console.log(this.props.activeQuestion);
    return (
      <div className={classes.Quiz}>
      
        <div className={classes.quizWrapper}>
        		<h1 >  {this.props.testname} </h1>
        	  	{this.props.loading || !this.props.quiz 
        	  		? <Loader />
        	  		: this.props.isFinished 
	        	  		? 	<FinishedQuiz 
	        	  				results={this.props.results}
	        	  				quiz={this.props.quiz}
	        	  				onRetry={this.props.retryQuiz}
	        	  			/>
	        			:   <ActiveQuiz 
	        					answers={this.props.quiz[this.props.activeQuestion].answers}
	        					question={this.props.quiz[this.props.activeQuestion].question}
	        					onAnswerClick={this.props.quizAnswerClick}
	        					quizLength={this.props.quiz.length}
	        					answerNumber={this.props.activeQuestion + 1}
	        					state={this.props.answerState}
	        				/>
        		  
        	  	}
        	  	
        </div>
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
		quiz: state.quizReducer.quiz
	}
}
function mapDispatchToProps(dispatch){
	return{
		fetchQuizById:id=>dispatch(fetchQuizById(id)),
		quizAnswerClick:answerId=>dispatch(quizAnswerClick(answerId)),
		retryQuiz: ()=>dispatch(retryQuiz())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz); 




