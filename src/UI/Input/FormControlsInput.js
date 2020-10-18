import React from 'react';
import classes from './FormControls.module.css';

const FormControlsInput=({input, meta, ...props} )=>{

	const hasError=meta.touched && meta.error;
	console.log(meta, props);
	const inputType= props.type || 'text';
	const htmlFor=`${inputType}-${Math.random()}`;
	
	return (
		<div className={classes.formControl + ' ' + (hasError ? classes.error : ' ') }>
			<div className={classes.formControl}>
			<label htmlFor={htmlFor} > {props.label} </label>
				<input {...input} {...props} />
			</div>
			{hasError && <span>{meta.error}</span>}
		</div>
	)
}
export default FormControlsInput;