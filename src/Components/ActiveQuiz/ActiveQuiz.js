import React from 'react';
import classes from './ActiveQuiz.module.css';
import AnswersList from './../AnswersList/AnswersList';

const ActiveQuiz =(props)=> {
	
		 	console.log( props);
		 
  
    return (
      	<div className={classes.ActiveQuiz}>
      		
			<div className={classes.Questions}>
				<h4 className={classes.Counter}> 
	    			<span>{props.question}</span>
	    			<span><small>{ props.answerNumber + ' з ' + props.quizLength}</small></span>
    			</h4>
				<AnswersList answers = {props.answers}
							 onAnswerClick={props.onAnswerClick}
							 state={props.state}
				/>
			</div >
				
	
			
      	</div>
    );
  }



export default ActiveQuiz;
