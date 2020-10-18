import React from 'react';
import classes from './Input.module.css';



function isInvalid ({valid, touched, shouldValidate}){
	//console.log('valid, touched, shouldValidate ', valid, touched, shouldValidate , 'return = ', !valid && shouldValidate && touched)
	return !valid && shouldValidate && touched
}
const Input =(props)=>{
	//console.log(props.valid, props.touched, props.shouldValidate);
	
	const inputType= props.type || 'text';
	
	const cls=[classes.Input];
	const htmlFor=`${inputType}-${Math.random()}`;
		//console.log('props.valid = ', props.valid, props.touched, props.shouldValidate);
	if (isInvalid(props)){
			
		cls.push(classes.invalid);
	}
		console.log(cls);
	return(
		<div className={cls.join(' ')} >
			<label htmlFor={htmlFor} > {props.label} </label>
			<input 
				type={inputType} 
				id={htmlFor}
				valid={props.valid}
				value={props.value}
				onChange={props.onChange}
			/>
			{isInvalid(props)  ? <span> {props.errorMessage || 'Введіть вірний параметр'} </span>  : null  }
		</div>
	)
}

export default Input;