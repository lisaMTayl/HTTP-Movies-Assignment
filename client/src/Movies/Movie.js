import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import UpdateForm from "./UpdateForm";

export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };


  updateHandler = () => {
    // routes to updated movie
    this.props.history.push(`/update-movie/${this.props.match.params.id}`)
  };


  deleteHandler = () => {
    const movieToDelete = this.props.match.params.id;
    axios
      // delete selected movie
      .delete(`http://localhost:5000/api/movies/${movieToDelete}`, movieToDelete)

      // routes to list with deleted movie
      .then(res => {
        console.log("Movie to delete info: ", res);
        this.props.history.push(`/`)
      })
      .catch(error => console.log("Error receiving movie to delete: ", error))
  };

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        {/*add button to open movie updating form*/}
        <button onClick={this.updateHandler}>Edit</button>

        {/*add button to delete movie*/}
        <button onClick={this.deleteHandler}>Delete</button>
      </div>
    )
  }
}
