//import {loginUser, logoutUser} from './redux/authReducer';

import React, {Component} from 'react';
//import classes from './Auth.module.css';
//import Button from '../../Components/Button/Button';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import { logOutUser}  from './../../redux/reducers/authReducer';



  class LogOut extends Component {
      componentDidMount(){
          this.props.logOutUser();
      }

      render(){
        return <Redirect to={'/'}  />
      }
  }
  

  function mapDispatchToProps(dispatch){
    return{
      logOutUser: ()=>dispatch(logOutUser())
    }
  }

  export default connect(null, mapDispatchToProps)(LogOut);