import React, { useState, useEffect } from "react";
import axios from "axios";
import ReviewTiles from "./ReviewTiles.jsx";

var Ratings = () => {

  // PRODUCT ID IS HARDCODED IN. USE A AXIOS CALL TO GET THEM OR GET THEM FROM THE MAIN STORE IF USING REDUX
  let [productID, makeProductID] = useState(16056)
  let [reviews, makeReviews] = useState([]);


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

  // Right now, this function is mapping over the entire review array. We need to limit it to an array of 2 (think over the process)
  return (
    <div>
      {reviews.map((review, index) => (
        <ReviewTiles review={review} key={index} />
      ))}
    </div>
  )

}

export default Ratings;

// CLASS VERSION (no hooks) :
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