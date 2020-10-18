//quizReducer.js    =    quiz.js
import axios from  './../../axios/axios-quiz';

const CREATE_QUIZ_QUESTION='CREATE_QUIZ_QUESTION';
const RESET_QUIZ_CREATION='RESET_QUIZ_CREATION';

const initialState={
	quiz: []
};

export default function  createReducer(state=initialState, action){
	switch(action.type){
		case  CREATE_QUIZ_QUESTION:
			
			return {
				...state,
				quiz: [...state.quiz, action.item]
			}
		case RESET_QUIZ_CREATION:
			return {
				...state,
				quiz: []
			}
		
		default:
		return state
	}
}
export function createQuizQuestion(item){
	if (item.id === 1){
		let quizName = prompt("введи назву всього тесту", "enter quiz Name");
		item.quizName = quizName;
		console.log("передано в createReducer ", item.quizName);
	}
	
	return{
		type: CREATE_QUIZ_QUESTION,
		item
	}
}

export function resetQuizCreation(){
	alert("передано в case createReducer-а " );
	return{
		type: RESET_QUIZ_CREATION
	}
}

export function finishCreateQuiz(){
	console.log("передано в case createReducer-а ");
	return async (dispatch, getState)=>{
		await axios.post('quizes.json', getState().createReducer.quiz);
		dispatch(resetQuizCreation());
	}		
}

