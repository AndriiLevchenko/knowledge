import React from 'react';
import styles from './Button.module.css';


const Button =  props => {
        return(
            <React.Fragment >     
                <button
                    disabled={props.disabled}
                    onClick={props.onClick}
                    className={props.className}
                > 
                    {props.value}
                </button>
              
              
            </React.Fragment>
        ) 
}
export default Button;

