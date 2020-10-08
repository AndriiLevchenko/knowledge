import {combineReducers} from 'redux';
import quizReducer from './quizReducer';
import createReducer from './createReducer';
import authReducer from './authReducer';
import {reducer as formReducer} from "redux-form";

export default combineReducers({
	quizReducer,
	createReducer,
	authReducer,
	form: formReducer
});








