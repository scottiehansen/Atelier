import React, { useState, useEffect } from "react";
import axios from "axios";
import ReviewTiles from "./ReviewTiles.jsx";

var Reviews = () => {

  // PRODUCT ID IS HARDCODED IN. USE A AXIOS CALL TO GET THEM OR GET THEM FROM THE MAIN STORE IF USING REDUX
  let [productID, makeProductID] = useState(16057)
  let [reviews, makeReviews] = useState([]);
  let [numberOfReviews, makeNumberOfReviews] = useState(2);


  // This useEffect is fetching the reviews from a specific product ID. It is then changing the state of the reviews var to include all of the review data.
  useEffect(() => {
    axios.get(`/api/reviews?product_id=${productID}`)
      .then(response => {
        console.log(response.data);
        makeReviews(response.data.results)
      })
      .catch(error => {
        console.log(error)
      });
  }, [])

  return (
    <div className='reviewTiles'>
      {filterReviewsByLength(reviews, numberOfReviews).map((review, index) => (
         <ReviewTiles review={review} key={index} />
       ))}
      <button onClick={() => makeNumberOfReviews(numberOfReviews + 2)}>Click for more reviews</button>
    </div>

  )

}

const filterReviewsByLength = (reviews, length) => {
  return reviews.filter((review, index) => (
    index < length
  ))
}

export default Reviews;




// ----------------------------
// CLASS SKELETON (no hooks)
// ----------------------------
// class Ratings extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       reviews : {}
//     };
//     this.fetchReviews = this.fetchReviews.bind(this);
//   }

//   componentDidMount() {
//     this.fetchReviews(16056);
//   }

//   fetchReviews(product_id) {
//     axios.get(`/api/reviews?product_id=${product_id}`)
//       .then(response => {
//         this.setState({
//           reviews : response.data
//         });
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }

//   render() {
//     return (
//       <div>test</div>
//     )
//   }
// }