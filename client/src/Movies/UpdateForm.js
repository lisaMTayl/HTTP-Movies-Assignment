import React, { useState, useEffect } from 'react';
import axios from 'axios';


// component to update movie data
const UpdateForm = props => {

  const movieId = props.match.params.id;

  const [updatedMovie, setUpdatedMovie] = useState({
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: []
});


  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${movieId}`)
      .then(res => {
        console.log("Movie info received: ", res.data);
        setUpdatedMovie(res.data)
      })
      .catch(error => console.log("Error when receiving movie info: ", error))
  }, [movieId]);


  const onChangeHandler = event => {
    setUpdatedMovie({
      ...updatedMovie,
      [event.target.name]: event.target.value
    })
  };

  // put request to server
  const onSubmitHandler = event => {
    event.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movieId}`, updatedMovie)
      .then(res => {
        console.log("Put movie info: ", res);
        setUpdatedMovie({
          id: '',
          title: '',
          director: '',
          metascore: '',
          stars: []
        });
        props.history.push('/')
      })
      .catch(error => console.log("Put movie error: ", error))
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <label>Title</label>
      <input name='title' placeholder={updatedMovie.title} value={updatedMovie.title} onChange={onChangeHandler}/>

      <label>Director</label>
      <input name='director' placeholder={updatedMovie.director} value={updatedMovie.director} onChange={onChangeHandler} />

      <label>Metascore</label>
      <input name='metascore' placeholder={updatedMovie.metascore} value={updatedMovie.metascore} onChange={onChangeHandler} />

      <label>Starring</label>
      <input name='stars' placeholder={updatedMovie.stars} value={updatedMovie.stars} onChange={onChangeHandler}/>

      <button onClick={onSubmitHandler}>Update</button>
    </form>
  )
};
export default UpdateForm;