//quizReducer.js    =    quiz.js
import axios from  './../../axios/axios-quiz';


const FETCH_QUIZES_START='quizReducer/FETCH_QUIZES_START';
const FETCH_QUIZES_SUCCESS='quizReducer/FETCH_QUIZES_SUCCESS';
const FETCH_RATING_SUCCESS='quizReducer/FETCH_RATING_SUCCESS';
const FETCH_QUIZES_ERROR='quizReducer/FETCH_QUIZES_ERROR';
const FETCH_QUIZ_SUCCESS='quizReducer/FETCH_QUIZ_SUCCESS';
const QUIZ_SET_STATE='quizReducer/QUIZ_SET_STATE';
const FINISH_QUIZ='quizReducer/FINISH_QUIZ';
const QUIZ_NEXT_QUESTION='quizReducer/QUIZ_NEXT_QUESTION';
const RETRY_QUIZ='quizReducer/RETRY_QUIZ';
const FETCH_RATE_SUCCESS='quizReducer/FETCH_RATE_SUCCESS';
const FETCH_QUIZ_FOR_RATING='quizReducer/FETCH_QUIZ_FOR_RATING';
const SAVE_RESULT='quizReducer/SAVE_RESULT';

const initialState={
	quizes: [], 
	rating: [],
	loading: false,
	error: null,
	results: {},			//   { [id]: 'success'    'error' }
	successCount: 0,
	rateForSave: 0,
	isFinished: false,
	activeQuestion: 0,
	answerState: null,  	//   { [id]: 'success'    'error' }
	quiz: null, 
	quizId: null,
	quizName: null,
	quizForRating: null,
	quizRate: " "
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
				quiz: action.quiz.quiz,
				quizId: action.quiz.quizId
			}
		case FETCH_QUIZ_FOR_RATING:
			return {
				...state,
				quizForRating: action.quizForRating,
				quizName: action.quizName
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
											const successCount = Object.keys(state.results).reduce((total, key)=>{
											 		if(state.results[key] === 'success'){
											 			total ++
											 		}
											 		return total
											 	}, 0);
											alert("successCount =  " +  successCount);
											const rateForSave = successCount/state.quiz.length*100;
											console.log("rateForSave in quizReducer = ", rateForSave);
			return{
				...state,
				successCount: successCount,
				rateForSave: rateForSave,
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
		// case SAVE_RESULT:
		// 		alert("rateForSave = " + state.successCount/state.quiz.length*100);
		// 	return{
		// 		...state
		// 	}
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
	//console.log("state = ", state);
		// const successCount = Object.keys(state.results).reduce((total, key)=>{
		//  		if(state.results[key] === 'success'){
		//  			total ++
		//  		}
		//  		return total
		//  	}, 0);
		// alert("successCount =  " +  successCount);
	return{
		type: FINISH_QUIZ
		//successCount
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
	console.log("state in quizreducer = ", state);
	return (state.activeQuestion +1 === state.quiz.length)
}
export function quizAnswerClick(answerId){
	console.log("answerId = ", answerId);
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
	console.log("запустился fetchRating");
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
	  					name: value.name,
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
	  			const quiz={"quiz": response.data,
	  						"quizId": quizId};
	  			console.log(response.data, "quiz (Object) = ", quiz);
	  			
	  	dispatch(fetchQuizSuccess(quiz));
	  		} catch(error) {
	  			dispatch(fetchQuizesError(error));
	  		}
	}
}
export function fetchRateById(rateId){
	console.log("fetchRateById = ", rateId);
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
	console.log("fetchRateForQuiz = ", quizId);
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
export function fetchQuizForRating(quizForRating, quizName){
	return {type: FETCH_QUIZ_FOR_RATING,
			quizForRating,
			quizName
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


export function saveResult(rateForSaveFromProps){
	//console.log("rateForSave = ", rateForSaveFromProps.target);
	return (dispatch, getState)=>{
		
		const rateForSave = Math.floor(getState().quizReducer.rateForSave*100)/100;  
		//let email = getState().authReducer.currentUserId;           // Это state.authReducer.currentUser
		const email = getState().authReducer.currentUser;
		console.log("rateForSave in TC= ",  rateForSave, " % , currentUser = ", getState().authReducer);
		const newRating={
				displayName: email,
				rightAnswersQuantity: rateForSave
			}
			console.log('запустился saveResult в ', newRating.displayName, newRating.rightAnswersQuantity);
		//return (dispatch)=>{
			axios.get('https://abzagencytest.firebaseio.com/rating.json').then(response => {	
								//Если нет такого теста в рейтинге юзера -  добавляем вместе с результатом
								console.log("Наш юзер = ", Object.values(response.data));
							  			const found=Object.values(response.data).findIndex(element=>element.email == email);
							  			console.log("found = ", found, found.email);
							  			const usersArrayElement = Object.keys(response.data)[found];
							  			console.log(usersArrayElement);
							  			const quizId = getState().quizReducer.quizId;
							if (!usersArrayElement){
								alert("there is no person. Авторизуйтеся. !!! ВАЖЛИВО !!! Відвідувачі, що вказали невірні дані при реєстрації, зможуть на загальних умовах проходити тести, підвищувати свій рейтинг. Але не зможуть отримувати призи за успішно пройдені тести ");
								// axios.post('https://abzagency.firebaseio.com/rate.json', newRating).then(response => {
								// 	console.log('добавился новый пользователь в рейтинг', displayName);
								// });
								//Иначе если есть такой тест - просто меняем его значение
							} else {			
								alert("идет запись рейтинга в редюсере");
								 axios.patch('https://abzagencytest.firebaseio.com/rating/' + usersArrayElement +'/quizResults.json',  {[quizId]: newRating.rightAnswersQuantity}).then(response => {
								 		console.log('Изменился рейтинг у пользователя ', newRating.displayName, 'в тесте ', quizId,  'на ', newRating.rightAnswersQuantity);
								 });
							}
								//dispatch(hideSaveResultButtonAC());
								//console.log('запустился hideSaveResultButtonAC', rightAnswersQuantity);
			})
	}
}

//this Reducer is from Maritexpert
export function editPerson(editedPerson){
	const idPerson=editedPerson.idPerson;
	console.log(editedPerson, idPerson);
	return  (dispatch)=>{
		axios.put("https://abzagencytest.firebaseio.com/persons/" + idPerson + ".json", editedPerson).then(response=>{
			console.log("post response = ", response);
			
			alert("New Person " + editedPerson.name + " was edited");
			//dispatch(resetPersonCreation());
		}).catch(error=>console.log("error = ", error));
	}		
}


