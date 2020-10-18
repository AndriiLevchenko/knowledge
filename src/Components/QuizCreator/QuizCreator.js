import React, {Component} from 'react';
import classes from './QuizCreator.module.css';
import Button from './../../UI/Button/Button';
import Input from './../../UI/Input/Input';
import Select from './../../UI/Select/Select';
import {createControl, validate, validateForm} from './../../form/formFramework';
import Auxiliary from './../../hoc/Auxiliary';
import axios from "axios";
import {connect} from 'react-redux';
import {createQuizQuestion, finishCreateQuiz} from './../../redux/reducers/createReducer';

function createOptionControl(number){
	return createControl( { label: `Відповідь ${number}`, errorMessage: 'Відповідь не може бути порожньою', id: number}, 
				          {required: true})
}

function createFormControls(){
	return  {
			question: createControl(  { label: 'Введи питання', errorMessage: 'Питання не може бути порожнім'}, 
				                      {required: true},
				      			   ),
			option1: createOptionControl(1),
			option2: createOptionControl(2),
			option3: createOptionControl(3),
			option4: createOptionControl(4),
			option5: createOptionControl(5),
			option6: createOptionControl(6)
	}
}
class QuizCreator extends Component{
	state={
		isFormValid: false,
		rightAnswerId: 1,
		formControls: createFormControls()
	}

	submitHandler=(event)=>{
		event.preventDefault();
	}

	createQuizHandler= event=>{		
		event.preventDefault();
		console.log(this.props.quiz);
		axios.post("https://abzagencytest.firebaseio.com/quizes.json", this.props.quiz).then(response=>{
			console.log("post response = ", response);
		}).catch(error=>console.log("error = ", error));
			//this.props.finishCreateQuiz();
	}

	changeHandler =(value, controlName)=>{
		const formControls={...this.state.formControls};
		const control={...formControls[controlName]};
		control.touched=true;
		control.value=value;
		control.valid=validate(control.value, control.validation);
		//console.log('valid = ', control.valid);
		formControls[controlName]=control;
		//console.log(formControls[controlName], validateForm(formControls));
		this.setState({
			formControls,
			isFormValid: validateForm(formControls)
		});
	}

	addQuestionHandler = event=>{
		event.preventDefault();
		const {question, option1, option2, option3, option4, option5, option6} = this.state.formControls;
		const questionItem={
			question: question.value,
			id: this.props.quiz.length + 1,
			rightAnswerId: this.state.rightAnswerId,
			answers: [
				{text: option1.value, id: option1.id},
				{text: option2.value, id: option2.id},
				{text: option3.value, id: option3.id},
				{text: option4.value, id: option4.id},
				{text: option5.value, id: option5.id},
				{text: option6.value, id: option6.id}
			]

		}
		console.log("questionItem = ", questionItem);
		this.props.createQuizQuestion(questionItem);
	
		this.setState({
			isFormValid: false,
			rightAnswerId: 1,
			formControls: createFormControls()
		});
	}




	renderControls(){
		
		return Object.keys(this.state.formControls).map((controlName, index)=>{
			const control=this.state.formControls[controlName];
			//console.log('control.valid = ', control.valid)
			return( 
				<Auxiliary key={controlName + index} >
					<Input 
						key={control.name + index}
						label={control.label}
						type={control.type}
						value={control.value}
						valid={control.valid}
						shouldValidate={!!control.validation}
						touched={control.touched}
						errorMessage={control.errorMessage}
						onChange={event=>this.changeHandler(event.target.value, controlName)}
					/>
					{index === 0 ? <hr/> : null }
				</Auxiliary>
			)
		})
	}
	selectChangeHandler =(event)=>{
		this.setState({
			rightAnswerId: +event.target.value
		});
	}

	render(){
		 	console.log( this.props);

		 	console.log('isFormValid = ', this.state.isFormValid);
	    return (
	      	<div className={classes.QuizCreator}>
				<div>
					<h1>Створення тесту </h1>
					<form onSubmit={this.submitHandler}>
					{this.renderControls()}

					<Select 
						label='Виберіть вірну відповідь'
						value={this.state.rightAnswerId}
						onChange={this.selectChangeHandler}
						options={[
							{text: 1, value: 1},
							{text: 2, value: 2},
							{text: 3, value: 3},
							{text: 4, value: 4},
							{text: 5, value: 5},
							{text: 6, value: 6}
						]}
					/>
		
					<Button 
						onClick={this.addQuestionHandler} 
						disabled={!this.state.isFormValid}
						value='Додати питання'
					/>
					<Button 
						onClick={this.createQuizHandler} 
						disabled={this.props.quiz.length === 0}
						value='Створити тест'
					/>
					</form>
				</div> 
	      	</div>
	    )
	}
  }


function mapStateToProps(state){
	return{
		quiz: state.createReducer.quiz
	}
}
function mapDispatchToProps(dispatch){
	return{
		createQuizQuestion: item=>dispatch(createQuizQuestion(item)),
		finishCreateQuiz: ()=>dispatch(finishCreateQuiz())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);
