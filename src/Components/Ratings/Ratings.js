import React, {Component}  from 'react';
import {NavLink} from "react-router-dom";
import  './../../App.css';
//import axios from "axios";
import Loader from './../../UI/Loader/Loader';
import {connect} from 'react-redux';
import {fetchRating} from './../../redux/reducers/quizReducer';



class Ratings extends Component{
  
        renderRating(){
          return this.props.rating.map((rate, index)=>{
            console.log("rate=", rate, "index=", index);
            return(
                <li
                  key={rate.id}
                >
                  <NavLink to={'/rate/' + rate.id }>
                    {rate.name + " " + rate.surname + " школа " + rate.schoolnumber}
                  </NavLink>
                </li>
            )
          })    
      }

        componentDidMount(){
          this.props.fetchRating();
       //     axios.get("https://abzagencytest.firebaseio.com/quizes.json").then(response=>{
       //       console.log("response = ", response);
       //     })
        }

    render(){
    console.log(this.props);
    const pageName=(document.URL).toString();
    let cls = pageName.indexOf('results') == 22 ? "boxed" : "boxed2"; //RATING block is located either left(class boxed2) or roght (class boxed)
  
  
      return (          
              <div className={cls} >
          <h2 className="heading">ТОП 10 знавців</h2>
          { this.props.loading && this.props.rating.length !== 0
            ? <Loader />
            : <div className="content" >
                        <ul>
                          {this.renderRating()}
                         
                        </ul>
                  </div>
          }
        </div>
      )
  }
}

function mapStateToProps(state){
  return{
    rating: state.quizReducer.rating,
    loading: state.quizReducer.loading
  }
}
function mapDispatchToProps(dispatch){
  return{
    fetchRating: ()=>dispatch(fetchRating())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ratings);





// import React from 'react';
// import classes from './Ratings.module.css';



// const Ratings =(props)=> {
//     return(
//        <div id="categories" className={classes.boxed}>
//       <h2 className={classes.heading}>Categories ТОП 10 знавців</h2>
//       <div className={classes.content}>
//         <ul>
//           <li className={classes.first}><a href="#">Quisque vestibulum</a></li>
//           <li><a href="#">Sed a nisl a lacus</a></li>
//           <li><a href="#">Quisque sagittis</a></li>
//           <li><a href="#">Etiam volutpat</a></li>
//           <li><a href="#">In aliquet hendrerit</a></li>
//           <li><a href="#">Suspendisse iaculis</a></li>
//           <li><a href="#">Nam vel risus at</a></li>
//           <li><a href="#">Praesent sit amet</a></li>
//           <li><a href="#">Quisque vestibulum</a></li>
//           <li><a href="#">In aliquet hendrerit</a></li>
//         </ul>
//       </div>
//     </div>
//     )
// }
//     export default Ratings;