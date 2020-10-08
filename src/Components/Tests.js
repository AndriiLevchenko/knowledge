import React from 'react';
import  QuizList from "./QuizList/QuizList";



const Tests =(props)=> {
  console.log(props);
    return(
        <div className="wrapper">  
            <div className="tests">
                <QuizList {...props}/>
            </div>  
        </div>
    )
}
    export default Tests;