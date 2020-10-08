import React from "react";
import classes from "./Auth.module.css";
import Button from "./../../UI/Button/Button";
import Input from "./../../UI/Input/Input";
import FormControlsInput from "./../../UI/Input/FormControlsInput";
import {connect} from 'react-redux';
import {reduxForm, Field} from "redux-form";
import {required, maxLengthCreator} from "./../../utils/validations/validators";
import {auth} from "./../../redux/reducers/authReducer";

const maxLength18 = maxLengthCreator(18);

const LoginForm =(props)=> {
    return(
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={FormControlsInput} type="text"  name={"name"} label="Login"  validate={[required, maxLength18]} />
                <Field component={FormControlsInput} type="password"  name={"password"}  label="Password" validate={[required, maxLength18]} />
                <Field component={FormControlsInput} type="checkbox"  name={"rememberme"}   label="Remember me" />
                <Button value="Авторизуватись"/>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({
    form: "login"
})(LoginForm);

const Auth =(props)=> {
    const onSubmit =(formData)=>{
      console.log("formdata = ", formData);
      props.auth(formData.name, formData.password, true);
    }
    return(
        <div  className={classes.boxed}>  
            <h2 className={classes.heading}>Авторизація</h2> 
            <div className={classes.content}>
                <LoginReduxForm onSubmit={onSubmit} />
            </div>
        </div>
    )
}

function mapDispetchToProps(dispatch){
  return{
    auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
  }
}

export default connect(null, mapDispetchToProps)(Auth);