import React from 'react';
//import classes from './FinishedQuiz.module.css';
import "./../../App.css";
import Button from './../../UI/Button/Button';
import {Link} from 'react-router-dom';


const FinishedQuiz =(props)=> {
	
		 	console.log( 'props.quiz = ', props.quiz);
		 	console.log( 'props.results = ', props.results);
		 	const successCount = Object.keys(props.results).reduce((total, key)=>{
		 		if(props.results[key] === 'success'){
		 			total ++
		 		}
		 		return total
		 	}, 0);
    return (
      	<div className="FinishedQuiz">
    
      		<ul className="AnswersList" >
      			{props.quiz.map((quizItem, index)=>{
      				const cls=	[	'fa', 
      								props.results[quizItem.id] ==='error' ? 'fa-times' : 'fa-check',
      								props.results[quizItem.id]
      							];
      							console.log('cls = ', cls);
      							console.log('quizitem.id = ', quizItem.id);
      							//console.log('classes[props.results[quizItem.id]] = ', classes[props.results[quizItem.id]]);
      				return(
        					<li
        						key={index} className="AnswerItem"
        					>
        						<strong> {index+1 + '. ' } </strong>
        						{quizItem.question + ' ' }&nbsp;
        						<i className={cls.join(' ')} /> 
        					</li>
      				)
      			})}

			</ul>
	
			<p>  Вірно {successCount} з {props.quiz.length} </p>
				      <Button onClick={props.onRetry} value={'Повторити'} />
        			<Link to='/'>
        				<Button onClick={props.onRetry}  value={'Список тестів'} />
        			</Link>	
      	</div>
    )
  }



export default FinishedQuiz;
