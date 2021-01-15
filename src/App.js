import React, {Component} from 'react';
//import logo from './gallardo.svg';
//import classes from './App.module.css';
import Layout from './Components/Layout/Layout';
import LogOut from './Components/Auth/LogOut';
import Quiz from './Components/Quiz/Quiz';
import Rate from './Components/Rate/Rate';
import QuizCreator from './Components/QuizCreator/QuizCreator';
import Tests from './Components/Tests';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {autoLogin} from './redux/reducers/authReducer';

import './App.css';
import Navigation from './Components/Navigation/Navigation';
//import Content from './Components/Content/Content';
import Home from './Components/Home';
import Results from './Components/Results';
import Auth from './Components/Auth/Auth';
import SignUp from './Components/Auth/SignUp';

class App extends Component{


      componentDidMount(){
        this.props.autoLogin();
      }

  render(){

  let routes=(
        <Switch>
            <Route path='/tests' component={Tests} />
            <Route path='/results' component={Results} />
            <Route path='/auth' component={Auth} />
            <Route path='/signup' component={SignUp} />
            <Route path='/quiz/:id' component={Quiz} />
            <Route path='/' exact component={Home} />
            <Redirect to='/' />
        </Switch>
    );
     if(this.props.isAuthenticated){
        routes=(
        <Switch>
            <Route path='/tests' component={Tests} />
           
       
            <Route path='/quizcreator' component={QuizCreator} />
            <Route path='/quiz/:id' component={Quiz} />
        <Route path='/results'  component={Results} />		
            <Route path='/logout' component={LogOut} />
            <Route path='/' exact component={Home} />
            <Redirect to='/' />
        </Switch>
    );
    }                                                                                      
                                                                           
  return (
      <div className="App">


              <div className="wrapper">
              
                  <div className="header">
                      <a href="/">
                          <h1>ЗНАННЯ</h1>
                          <h2>Тести з перевірки знань на різноманітну тематику</h2>
                      </a>
                  </div>
                  <div className="headerRight">
                          <Navigation />
                  </div>
                  <Layout>
                        {routes}
                  </Layout>
                  <div className="footer">
                            <p>Copyright &copy; 2020 www.educated.com.ua <strong> Educated</strong></p>
                  </div>

          
              </div>
                  
      </div>
  )
  }
}

function mapStateToProps(state){
    console.log( state.authReducer);
  return{
    isAuthenticated: !!state.authReducer.token
  }
}
function mapDispatchToProps(dispatch){
  return{
    autoLogin: ()=>dispatch(autoLogin())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
