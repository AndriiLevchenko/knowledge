//quizReducer.js    =    quiz.js
import axios from  './../../axios/axios-quiz';

const CREATE_QUIZ_QUESTION='CREATE_QUIZ_QUESTION';
const RESET_QUIZ_CREATION='RESET_QUIZ_CREATION';
const OPEN_MODAL_WINDOW = "OPEN_MODAL_WINDOW";
const CLOSE_MODAL_WINDOW = "CLOSE_MODAL_WINDOW";

const initialState={
	quiz: [],
	isModalOpen: false,
	modalMessage: ""
};

export default function  createReducer(state=initialState, action){
	switch(action.type){
		case  CREATE_QUIZ_QUESTION:
			return {
				...state,
				quiz: [...state.quiz, action.item],
				isModalOpen: true,
				modalMessage: "Питання додано. Продовжуйте."
			}
		case RESET_QUIZ_CREATION:
			return {
				...state,
				quiz: [],
				isModalOpen: true,
				modalMessage: "Тест створено."
			}
		case OPEN_MODAL_WINDOW:
			alert(action.message + "case MODAL_WINDOW");
			return {
				...state,
				isModalOpen: true
			}
		case CLOSE_MODAL_WINDOW:
			return {
				...state,
				isModalOpen: false
			}	
		
		default:
		return state
	}
}
export function createQuizQuestion(item){
	if (item.id === 1){
		let quizName = prompt("введи назву всього тесту", "enter quiz Name");
		item.quizName = quizName;
	}
	return{
		type: CREATE_QUIZ_QUESTION,
		item
	}
}

export function resetQuizCreation(){
	console.log("передано в case createReducer-а " );
	return{
		type: RESET_QUIZ_CREATION
	}
}

export function finishCreateQuiz(newQuiz){
	return async (dispatch)=>{
		await axios.post("https://abzagencytest.firebaseio.com/quizes.json", newQuiz);
		dispatch(resetQuizCreation());
	}		

}

function openModalWindow(message){
	return({
		type: OPEN_MODAL_WINDOW,
		message
	})
}
export function closeModalWindow(){
	return({
		type: CLOSE_MODAL_WINDOW
	})
}

