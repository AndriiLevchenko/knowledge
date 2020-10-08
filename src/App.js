import React, {Component} from 'react';
//import logo from './gallardo.svg';
//import classes from './App.module.css';
import Layout from './Components/Layout/Layout';
import LogOut from './Components/Auth/LogOut';
import Quiz from './Components/Quiz/Quiz';
import QuizCreator from './Components/QuizCreator/QuizCreator';
import Tests from './Components/Tests';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {autoLogin} from './redux/reducers/authReducer';

import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Content from './Components/Content/Content';
import Home from './Components/Home';
import Results from './Components/Results';
import Auth from './Components/Auth/Auth';

class App extends Component{


  state={
    isLoggedIn: false
  }

  render(){
  let routes=(
        <Switch>
            <Route path='/tests' component={Tests} />
            <Route path='/results' component={Results} />
            <Route path='/auth' component={Auth} />
            <Route path='/quiz/:id' component={Quiz} />
            <Route path='/' exact component={Home} />
            <Redirect to='/' />
        </Switch>
    );
     if(this.props.isAuthenticated){
        routes=(
        <Switch>
            <Route path='/tests' component={Tests} />
            <Route path='/results' component={Results} />
            <Route path='/quiz-creator' component={QuizCreator} />
            <Route path='/quiz/:id' component={Quiz} />
            <Route path='/logout' component={LogOut} />
            <Route path='/' exact component={Home} />
            <Redirect to='/' />
        </Switch>
    );
    }                                                                                      
                                                                           
  return (
      <div className="App">


              <div className="wrapper">
              <a href="/">
                      <div className="header">
                        <h1>Знання</h1>
                        <h2>Тести з перевірки знань на різноманітну тематику.</h2>
                      </div>
              </a>
                      <Navigation />

                <Layout>
                    {routes}
                </Layout>
                      <div className="footer">
                        <p>Copyright &copy; 2020 www.knowledge.com.ua <strong> Knowledge</strong></p>
                      </div>

      
              </div>
              <div style={{border: "2px solid green"}}>
                <h3> isLoggedIn = {this.state.isLoggedIn ? "TRUE" : "FALSE"} </h3>   
                <button onClick={()=>this.setState({isLoggedIn: true})} > LOG IN </button>
              </div>
      </div>
  )
  }
}

function mapStateToProps(state){
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
