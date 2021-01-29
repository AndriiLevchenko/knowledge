import React from 'react';
import styles from './Modal.module.css';

const Modal = (props) =>{
	
	return(
		<div className={styles.finishWideScreen}>
			
				<div className={styles.finish}>
				 	<h4> {props.modalMessage}</h4>
				 	
				 	<button type='button' onClick={props.closeModalWindow}><span>OK</span></button>
				</div>
		 
		 </div>	
  		)
  	}
	export default Modal;