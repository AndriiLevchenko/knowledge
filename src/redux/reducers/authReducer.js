//quizReducer.js    =    quiz.js
import axios from  'axios';
import fire from "./../../fire"

const AUTH_SUCCESS='AUTH_SUCCESS';
const AUTO_LOG_OUT='AUTO_LOG_OUT';
const AUTH_LOG_OUT='AUTH_LOG_OUT';

const initialState={
	currentUser: null,
	token: null
};

export default function  authReducer(state=initialState, action){
	switch(action.type){
		case AUTH_SUCCESS:
			return{
				...state,
				token: action.token,
				currentUser: action.currentUser
			}
		case AUTH_LOG_OUT:
			return{
				...state,
				token: null,
				currentUser: null
			}
		default:
		return state
	}
}
export function authSuccess(token, currentUser){
	return{
		type: AUTH_SUCCESS,
		token,
		currentUser
	}
}
export function autoLogOut(time){
	return dispatch=>{
		setTimeout(()=>{
			dispatch(logOut());
		}, time*1000);
	}
}
export function logOut(){
		localStorage.removeItem('token');
		localStorage.removeItem('userId');
		localStorage.removeItem('expirationDate');
		localStorage.removeItem('currentUser');
		alert("Вылогиниваемся");
	return{
		type: AUTH_LOG_OUT
	}
}

export function logOutUser () {
				console.log('пошло вылогинивание');
	return dispatch=>{
				
				
				fire.auth().signOut().then(() => {
					dispatch(logOut());
				}).catch(error => {
					console.log("LogOut error", error);
					//dispatch(logoutError(error));
				});
	}
}


export function autoLogin(){
	return dispatch=>{
		const token=localStorage.getItem('token');
		if(!token){
			dispatch(logOut());
		} else {
			const expirationDate=new Date(localStorage.getItem('expirationDate'));
			if(expirationDate<= new Date()){
				dispatch(logOut);
			} else {
				var currentUser = localStorage.getItem('currentUser');
				dispatch(authSuccess(token, currentUser));
				dispatch(autoLogOut((expirationDate.getTime()-new Date().getTime())/1000));
			}

		}
	}
}
export function auth(email, password, isLogin){
	//console.log(email, password, isLogin);
	return async dispatch=>{
		const authData={
			email,
			password,
			returnSecureToken: true
		}

		let url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBKs6rq7O9TkZTZ2Fvw_*';
		
		const response = await axios.post(url, authData);
		const data=response.data;
		console.log("response = ", response);
		var currentUser = await fire.auth().currentUser;

		//Вставить после выясненмя с data
		// const response = await fire.auth().signInWithEmailAndPassword(email, password);
		// console.log("response = ", response);
		// const data=response.data;
		// var currentUser = fire.auth().currentUser;

		console.log("currentUser = ", currentUser);
		const expirationDate = new Date(new Date().getTime() + data.expiresIn*1000);

		localStorage.setItem('token', data.idToken);
		localStorage.setItem('userId', data.localId);
		localStorage.setItem('expirationDate', expirationDate);
		localStorage.setItem('currentUser', data.email);

		dispatch(authSuccess(data.idToken, data.email));
		dispatch(autoLogOut(data.expiresIn));
	}
}
export function signUpUser (email, password, name, surname, schoolnumber, classnumber){
	console.log(email, password, name, surname, schoolnumber, classnumber);
	return async dispatch=>{
		const testResults=new Object;
		const authData={
			email, password, name, surname, schoolnumber, classnumber, testResults
		}
		let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBKs6rq7O9TkZTZ2Fvw_*';
		//const userCredentials = await axios.post(url, authData);
		const userCredentials = await fire.auth().createUserWithEmailAndPassword(email, password);
		const response = await axios.post("https://abzagencytest.firebaseio.com/rating.json", authData);
		console.log("response = ", response);
		const data=userCredentials.data;
		
				//fire.auth().createUserWithEmailAndPassword(email, password).then((userCredentials) =>{
					
					//userCredentials.user.updateProfile({displayName});
					alert('Ви зареєстровані');
					console.log(userCredentials.user);
					//dispatch(userSignUp());
					//dispatch(loginUser(email, password));
					//dispatch(loginUser(userCredentials.user.displayName, userCredentials.user.email));
					//this.props.history.push(`/Beginning`);
				// }).catch ((error) =>{
				// 	alert('Реєстрація невдала.');
				// 	console.log(error);

				// });	
	}
}

