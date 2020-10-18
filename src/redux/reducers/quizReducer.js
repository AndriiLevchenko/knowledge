//quizReducer.js    =    quiz.js
import axios from  './../../axios/axios-quiz';


const FETCH_QUIZES_START='FETCH_QUIZES_START';
const FETCH_QUIZES_SUCCESS='FETCH_QUIZES_SUCCESS';
const FETCH_RATING_SUCCESS='FETCH_RATING_SUCCESS';
const FETCH_QUIZES_ERROR='FETCH_QUIZES_ERROR';
const FETCH_QUIZ_SUCCESS='FETCH_QUIZ_SUCCESS';
const QUIZ_SET_STATE='QUIZ_SET_STATE';
const FINISH_QUIZ='FINISH_QUIZ';
const QUIZ_NEXT_QUESTION='QUIZ_NEXT_QUESTION';
const RETRY_QUIZ='RETRY_QUIZ';
const FETCH_RATE_SUCCESS="FETCH_RATE_SUCCESS";

const initialState={
	quizes: [], 
	rating: [],
	loading: false,
	error: null,
	results: {},			//   { [id]: 'success'    'error' }
	isFinished: false,
	activeQuestion: 0,
	answerState: null,  	//   { [id]: 'success'    'error' }
	quiz: null, 
	quizRate: "-MIuG3W-EVl_cpW1cWim"
};

export default function  quizReducer(state=initialState, action){
	switch(action.type){
		case FETCH_QUIZES_START:
			return {
				...state,
				loading: true
			}
		case FETCH_QUIZES_SUCCESS:
			return {
				...state,
				loading: false,
				quizes: action.quizes
			}
		case FETCH_RATING_SUCCESS:
			return {
				...state,
				loading: false,
				rating: action.rating
			}
		case FETCH_QUIZ_SUCCESS:
			return {
				...state,
				loading: false,
				quiz: action.quiz
			}
		case FETCH_RATE_SUCCESS:
			return {
				...state,
				loading: false,
				quizRate: action.quizRate
			}
		case FETCH_QUIZES_ERROR:
			return {
				...state,
				loading: false,
				error: action.error
			}
		case QUIZ_SET_STATE:
			return{
				...state,
				answerState: action.answerState,
				results: action.results
			}
		case FINISH_QUIZ:
			return{
				...state,
				isFinished: true
			}
		case QUIZ_NEXT_QUESTION:
			return{
				...state, 
				activeQuestion: action.number,
				answerState: null
			}
		case RETRY_QUIZ:
			return{
				...state,
				results: {},		
				isFinished: false,
				activeQuestion: 0,
				answerState: null 
			}
		default:
		return state
	}
}
export function quizSetState(answerState, results){
	return{
		type: QUIZ_SET_STATE,
		answerState,
		results
	}
}
export function finishQuiz(){
	return{
		type: FINISH_QUIZ
	}
}
export function quizNextQuestion(number){
		//{number = number >= state.quiz.length ? state.quiz.length : state.quiz.length}
		console.log("number = ", number);
	return{
		type: QUIZ_NEXT_QUESTION,
		number
	}
}
export function retryQuiz(){
	return{
		type: RETRY_QUIZ
	}
}
function isQuizFinished(state){
	console.log(state);
	return (state.activeQuestion +1 === state.quiz.length)
}
export function quizAnswerClick(answerId){
	return (dispatch, getState)=>{
		const state=getState().quizReducer;
		console.log(state);
		const question = state.quiz[state.activeQuestion];
			const results = state.results;
			if (question.rightAnswerId === answerId){
				//if( !results[answerId]){
						results[question.id] = 'success';
						dispatch(quizSetState( {[answerId]: 'success'}, results));
				//}
			
				const timeout=window.setTimeout(()=>{
					if (isQuizFinished(state)){
						dispatch(finishQuiz());
					} else {
						// this.setState({
						// 	activeQuestion: this.state.activeQuestion + 1,
						// 	answerState: null
						// });
						dispatch(quizNextQuestion(state.activeQuestion + 1));
					}
					window.clearTimeout(timeout);
				}, 1000);
				
			} else {
				results[question.id] = 'error';
				dispatch(quizSetState( {[answerId]: 'error'}, results));
				const timeout=window.setTimeout(()=>{
					if (isQuizFinished(state)){
						dispatch(finishQuiz());
					} else {
						// this.setState({
						// 	activeQuestion: this.state.activeQuestion + 1,
						// 	answerState: null
						// });
						dispatch(quizNextQuestion(state.activeQuestion + 1));
					}
					window.clearTimeout(timeout);
				}, 1000);
			}
	}		
}

export function fetchQuizes(){
	return async dispatch=>{
		dispatch(fetchQuizesStart());
			try{
	  			const response = await axios.get('quizes.json'); 
	  			console.log(response.data);
	  			const quizes=[];
	  			Object.keys(response.data).forEach((key, index)=>{
	  				quizes.push({
	  					quizNumber: index,
	  					id: key,
	  				})
	  			});
	  			Object.values(response.data).forEach((value, index)=>{
	  				quizes[index].quizName = value[0].quizName
	  			});
	  			
	  	dispatch(fetchQuizesSuccess(quizes));
	  		} catch(error) {
	  			dispatch(fetchQuizesError(error));
	  		}
	}
}
export function fetchRating(){
	return async dispatch=>{
		dispatch(fetchQuizesStart());
			try{
	  			const response = await axios.get('rating.json'); 
	  			console.log(response.data);
	  			const rating=[];
	  			Object.values(response.data).forEach((value, index)=>{
	  				console.log("key = ", value.email);
	  				console.log("index = ", index);
	  				
	  				rating.push({
	  					id: index,
	  					quizRate: value.quizName,
	  					surname: value.surname,
	  					email: value.email,
	  					schoolnumber: value.schoolnumber,
	  					quizResults: value.quizResults
	  				})
	  			});
	  			//console.log(response.data.rating[0]);
	  	dispatch(fetchRatingSuccess(rating));
	  		} catch(error) {
	  			dispatch(fetchQuizesError(error));
	  		}
	}
}
export function fetchQuizById(quizId){
	console.log(quizId);
	return async dispatch=>{
		dispatch(fetchQuizesStart());
			try{
	  			const response = await axios.get(`quizes/${quizId}.json`); 
	  			const quiz=response.data;
	  			console.log(response.data);
	  			
	  	dispatch(fetchQuizSuccess(quiz));
	  		} catch(error) {
	  			dispatch(fetchQuizesError(error));
	  		}
	}
}
export function fetchRateById(rateId){
	console.log(rateId);
	return async dispatch=>{
		dispatch(fetchQuizesStart());
			try{
	  			const response = await axios.get(`quizes/${rateId}.json`); 
	  			const rate=response.data;
	  			console.log(response.data);
	  			
	  	dispatch(fetchRateSuccess(rate));
	  		} catch(error) {
	  			dispatch(fetchQuizesError(error));
	  		}
	}
}
export function fetchRateForQuiz(quizId){
	console.log(quizId);
	return async dispatch=>{
		dispatch(fetchQuizesStart());
			try{
	  			const response = await axios.get(`rating/${quizId}.json`); 
	  			const rate=response.data;
	  			console.log(response.data);
	  			
	  	dispatch(fetchRateSuccess(rate));
	  		} catch(error) {
	  			dispatch(fetchQuizesError(error));
	  		}
	}
}

export function fetchQuizesStart(){
	return {type: FETCH_QUIZES_START}
}
export function fetchQuizesSuccess(quizes){
	return {type: FETCH_QUIZES_SUCCESS,
			quizes
		   }
}
export function fetchRatingSuccess(rating){
	return {type: FETCH_RATING_SUCCESS,
			rating
		   }
}
export function fetchQuizSuccess(quiz){
	console.log(quiz);
	return {type: FETCH_QUIZ_SUCCESS,
			quiz
		   }
}
export function fetchRateSuccess(rate){
	console.log(rate);
	return {type: FETCH_QUIZ_SUCCESS,
			rate
		   }
}
export function fetchQuizesError(error){
	return {type: FETCH_QUIZES_ERROR,
			error
		   }
}
