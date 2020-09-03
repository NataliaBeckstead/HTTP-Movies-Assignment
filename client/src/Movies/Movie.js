import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch, useHistory } from 'react-router-dom';
import MovieCard from './MovieCard';

function Movie({ addToSavedList, removeMovie }) {
  const history = useHistory();
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const deleteMovie = id => {
		axios
			.delete(`http://localhost:5000/api/movies/${id}`)
			.then(res => {
				removeMovie(res.data);
				history.push("/");
			})
			.catch(err => console.log(err.response));
	};

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />

      <div className='save-button' onClick={saveMovie}>
        Save
      </div>
      <div
				className="edit-button"
				onClick={() => history.push(`/update-movie/${match.params.id}`)}
			>
				Edit
			</div>
			<div
				className="delete-button"
				onClick={() => deleteMovie(match.params.id)}
			>
				Delete
			</div>
    </div>
  );
}

export default Movie;
