import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Material UI for styling
import Dividers from '@material-ui/core/Divider'


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

  // map actors for form
  const handleStar = index => e => {
    setUpdatedMovie({...updatedMovie, stars: updatedMovie.stars.map((star, starIndex) => {
        return starIndex === index ? e.target.value : star;
      })});
  };

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
    <div className="update-form">
      <h2>{updatedMovie.title}</h2>
      <Dividers />
      <form onSubmit={onSubmitHandler}>
        <p><label>Title: </label>
          <input name='title' placeholder={updatedMovie.title} value={updatedMovie.title}
                 onChange={onChangeHandler}/></p>

        <p><label>Director: </label>
          <input name='director' placeholder={updatedMovie.director} value={updatedMovie.director}
                 onChange={onChangeHandler}/></p>

        <p><label>Metascore: </label>
          <input name='metascore' placeholder={updatedMovie.metascore} value={updatedMovie.metascore}
                 onChange={onChangeHandler}/></p>

        <p><label>Starring: </label>
          {/*<input name='stars' placeholder={updatedMovie.stars} value={updatedMovie.stars}*/}
          {/*       onChange={onChangeHandler}/></p>*/}

          {/*Properly map through and list the actors*/}
          {updatedMovie.stars.map((starName, index) => {
            return <input type="text"
                          placeholder="star"
                          value={starName}
                          key={index}
                          onChange={handleStar(index)}/>;
          })}
        </p>
        <p>
          <button onClick={onSubmitHandler}>Update Movie</button>
        </p>
      </form>
    </div>
  )
};
export default UpdateForm;