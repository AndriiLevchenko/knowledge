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
	return{
		type: CREATE_QUIZ_QUESTION,
		item
	}
}

export function resetQuizCreation(){
	return{
		type: RESET_QUIZ_CREATION
	}
}

export function finishCreateQuiz(){
	return async (dispatch, getState)=>{
		await axios.post('quizes.json', getState().createReducer.quiz);
		dispatch(resetQuizCreation());
	}		
}

