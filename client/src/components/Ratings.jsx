import React, { useState, useEffect } from "react";
import axios from "axios";

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

var Ratings = () => {

  let [reviews, makeReviews] = useState({});

  useEffect(() => {
    axios.get('/api/')
  })



  return (
    <div>hello bb</div>
  )

}


export default Ratings;