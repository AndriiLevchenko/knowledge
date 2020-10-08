import React from 'react';
import classes from './Ratings.module.css';



const Ratings =(props)=> {
    return(
       <div id="categories" className={classes.boxed}>
      <h2 className={classes.heading}>Categories ТОП 10 знавців</h2>
      <div className={classes.content}>
        <ul>
          <li className={classes.first}><a href="#">Quisque vestibulum</a></li>
          <li><a href="#">Sed a nisl a lacus</a></li>
          <li><a href="#">Quisque sagittis</a></li>
          <li><a href="#">Etiam volutpat</a></li>
          <li><a href="#">In aliquet hendrerit</a></li>
          <li><a href="#">Suspendisse iaculis</a></li>
          <li><a href="#">Nam vel risus at</a></li>
          <li><a href="#">Praesent sit amet</a></li>
          <li><a href="#">Quisque vestibulum</a></li>
          <li><a href="#">In aliquet hendrerit</a></li>
        </ul>
      </div>
    </div>
    )
}
    export default Ratings;