//import {loginUser, logoutUser} from './redux/authReducer';

import React, {Component} from 'react';
import classes from './Auth.module.css';
import Button from './../../UI/Button/Button';
import Input from './../../UI/Input/Input';
import axios from 'axios';
// import FormControlsInput from './../Input/FormControlsInput';
// import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import {auth, signUpUser} from './../../redux/reducers/authReducer';


// function validateEmail(email) {
//   const re = /\S+@\S+\.\S+/;
//   return re.test(email);
// }
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

class Auth extends Component{
	state={
		isFormValid: false,
		formControls:{
			name:{
				value: ' ',
				type:'text',
				label: "Ім'я",
				errorMessage: "Введіть своє ім'я",
				valid: false,
				touched: false,
				validation:{
					required: true
				}
			},
			surname:{
				value: ' ',
				type:'text',
				label: "Прізвище",
				errorMessage:"Введіть своє прізвище",
				valid: false,
				touched: false,
				validation:{
					required: true
				}
			},
			schoolnumber:{
				value: ' ',
				type:'text',
				label: 'Номер/назва школи',
				errorMessage: "В якій школі навчаєтесь",
				valid: false,
				touched: false,
				validation:{
					required: true
				}
			},
			classnumber:{
				value: ' ',
				type:'text',
				label: 'Клас',
				errorMessage: "В якому класі навчаєтесь",
				valid: false,
				touched: false,
				validation:{
					required: true
				}
			},
			email:{
				value: ' ',
				type:'email',
				label: 'E-mail',
				errorMessage: "Введіть вірний E-mail",
				valid: false,
				touched: false,
				validation:{
					required: true,
					email: true
				}
			},
			password:{
				value: '',
				type:'password',
				label: 'Password',
				errorMessage: "Введіть вірний пароль",
				valid: false,
				touched: false,
				validation:{
					required: true,
					minLength: 6
				}
			},
			passwordagain:{
				value: '',
				type:'password',
				label: 'The same Password again',
				errorMessage: "Введіть той самий пароль",
				valid: false,
				touched: false,
				validation:{
					required: true,
					minLength: 6
				}
			}
		}
	}
	// loginHandler = ()=>{
	// 	this.props.auth(this.state.formControls.email.value, this.state.formControls.password.value, true);
	// }
	registerHandler = ()=>{
		this.props.signUpUser(	this.state.formControls.email.value, 
								this.state.formControls.password.value,
								this.state.formControls.name.value,
								this.state.formControls.surname.value,
								this.state.formControls.schoolnumber.value,
								this.state.formControls.classnumber.value
							);
	}
	submitHandler =(event)=>{
		event.preventDefault();	
		
	}
	validateControl(value, validation){
		if(!validation){
			return true
		}
		let isValid=true;
		if(validation.required){
			isValid=value.trim() !=='' && isValid;
		}
		if(validation.email){
			isValid=validateEmail(value) && isValid;
		}
		if(validation.minLength){
			isValid=value.length >= validation.minLength && isValid;
		}
		return isValid
	}
	onChangeHandler =(event, controlName)=>{
		const formControls={...this.state.formControls};
		const control={...formControls[controlName]};
		control.value=event.target.value;
		control.touched=true;
		control.valid=this.validateControl(control.value, control.validation);
		formControls[controlName]=control;
		let isFormValid=true;
		Object.keys(formControls).forEach(name=>{
			isFormValid=formControls[name].valid && isFormValid;
		});
		//console.log(this.state.formControls.password.value);
		this.setState({
			formControls, 
			isFormValid
		});
	}
	renderInputs(){
		return Object.keys(this.state.formControls).map((controlName, index)=>{
			const control=this.state.formControls[controlName];
			return <Input 
						key={controlName + ' ' + index}
						type={control.type}
						value={control.value}
						valid={control.valid}
						touched={control.touched}
						label={control.label}
						errorMessage={control.errorMessage}
						shouldValidate={!!control.validation}
						onChange={(event)=>this.onChangeHandler(event, controlName)}
				   />
		})
	}
	render(){
		console.log(this.props);
		return(
			<div className={classes.Auth}>
				<div>
					<h1> Реєстрація </h1>
					<form className={classes.AuthForm} onSubmit={this.submitHandler}>
						{this.renderInputs()}
						
						<Button 
							onClick={this.registerHandler} 
							value={'Зареєструватись' } 
							disabled={!this.state.isFormValid}
						/>
					</form>
				</div>
			</div>
		)
	}

}


function mapDispatchToProps(dispatch){
	return{
		
		signUpUser: (email, password, name, surname, schoolnumber, classnumber) => dispatch(signUpUser(email, password, name, surname, schoolnumber, classnumber))
	}
}

export default connect(null, mapDispatchToProps)(Auth); 





