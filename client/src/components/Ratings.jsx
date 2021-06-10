/*
let [reviewsMeta, makeReviewsMeta] = useState({})

useEffect(() => {
    let config = {
      headers: {Authorization: API_KEY}
    }
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews/meta?product_id=${productID}`, config)
      .then(response => {
        makeReviewsMeta(response.data)
      })
      .catch(error => {
        console.log(error)
      });
  }, [])

*/