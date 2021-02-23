export const sortRatingForQuiz =(rating, quiz) =>{
	//console.log("сортируем rating", rating, "quiz = ", quiz);   //rating of each user
	let sortedRating;
	if(quiz === "overall"){
			sortedRating = [];
			let sum=0;
			for ( let index=0; index < rating.length; index++){
				if(!rating[index].quizResults){
					//console.log( "index UNDEFINED  = ", index, rating[index].quizResults); 
					sortedRating[index] = {...rating[index]};
					sortedRating[index].overallResult = 0;
				} else {
					//console.log( "index UNDEFINED  = ", index, rating[index].quizResults); 
						let sortedRatingForSum = Object.values(rating[index].quizResults);
						 console.log( "index UNDEFINED  = ", index, sortedRatingForSum);
						for(let i=0;i<sortedRatingForSum.length;i++){
						    sum = sum + sortedRatingForSum[i]/100;  
						}
						//console.log("sortedRatingForSum = ", sortedRatingForSum, "sum = ", sum);
						sortedRating[index] = {...rating[index]};
						sortedRating[index].overallResult = Math.floor(sum * 100) / 100;
						sum =0;
				}
			}	
			 //console.log(sortedRating);
	} else {
		sortedRating = [];
		for ( let index=0; index < rating.length; index++){
			if(typeof(rating[index].quizResults) === "undefined"){
				//console.log( "index UNDEFINED  = ", index, rating[index].quizResults); 
			} else {
				const indexOfQuiz = Object.keys(rating[index].quizResults).indexOf(quiz);
				//console.log( "index NUMBER = ", index, "quizResults = ", rating[index].quizResults, "indexOfQuiz = ", indexOfQuiz); 
			
				if (indexOfQuiz !==-1){
						sortedRating[index] = {...rating[index]};
						sortedRating[index].quizResults = {...rating[index].quizResults};
				}
			}
		};
	}
	 console.log(sortedRating);
	 if(quiz !== "overall"){
	 	sortedRating.sort((a, b)=> a.quizResults[quiz] > b.quizResults[quiz] ? 1 : -1).reverse();
	 } else {
	 	sortedRating.sort((a, b)=> a.overallResult > b.overallResult ? 1 : -1).reverse();
	 }
return sortedRating
}
