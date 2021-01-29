export const sortRatingForQuiz =(rating, quiz) =>{
	console.log("сортируем rating", rating, "quiz = ", quiz);   //rating of each user
	
	//  let sortedRating = rating.map(rate=>{											//inserting quizResults for quiz = quiz 
	//  	console.log(rate.quizResults, quiz);										// for each user
	//  	if(!!rate.quizResults  ){													// so difficult day of doing it
	// 		return rate.quizResults													//bacause of quizes have names with "-" beginning 
	// 	//return rate.quizResults.rate
	// 	}
	// // 	//return rating.quizResults.quiz
	//  })
	//  console.log(sortedRating);
	//  const sortedRatingKeys = Object.keys(sortedRating[0]);
	//  console.log(sortedRatingKeys);
	//  let sortedRatingAgain = sortedRating.map((rate, index)=>{
	 	
	//  	if(!!rate && sortedRatingKeys[index] === quiz){
	//  		console.log(sortedRatingKeys[index] === quiz);
	//  		return {id: index, quizRate: Object.values(rate)[index]}
	//  	}
	//  })
	//   console.log(sortedRatingAgain);
	//return rating.sort((a, b) => a.rating.quizResults.quiz > b.rating.quizResults.quiz)

	let sortedRating = [];
	for ( let index=0; index < rating.length; index++){
		//console.log(rating[index].quizResults);
		
		if(typeof(rating[index].quizResults) === "undefined"){
			//sortedRating[index] = {...rating[index]};
			console.log( "index UNDEFINED  = ", index, rating[index].quizResults); 
			//alert(index + rating[index].quizResults);
			//console.log("rating[index] = ", rating[index]);
			//console.log("rating[index].quizResults = ", rating[index].quizResults);
		
			//sortedRating[index].quizRate="немає даних";
			//console.log("index = ", index);
			//console.log("sortedRating[index]    не попал", index,  sortedRating[index].quizRate);
		} else {
			const indexOfQuiz = Object.keys(rating[index].quizResults).indexOf(quiz);
			console.log( "index NUMBER = ", index, "quizResults = ", rating[index].quizResults, "indexOfQuiz = ", indexOfQuiz); 
		
			if (indexOfQuiz !==-1){
			
				
					sortedRating[index] = {...rating[index]};
					sortedRating[index].quizResults = {...rating[index].quizResults};
			
				//console.log("index = ", index, "SortedRating[index] = ", sortedRating[index]);
				//console.log("sortedRating[index]     попал", index,  sortedRating[index].quizRate);
				//console.log("index = ", index, " indexOfQuiz = ", indexOfQuiz);
				//console.log("rateByIndexOfQuiz = ", rateByIndexOfQuiz);
				
				//if(rating[index].quizResults === quiz)
			}
		}
	};
		//console.log(rating);
	 console.log(sortedRating);
	  
	 sortedRating.sort((a, b)=> a.quizResults[quiz] > b.quizResults[quiz] ? 1 : -1).reverse();
	 //console.log(sortedRating);

return sortedRating
}
