import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from "./Movies/UpdateMovie";
import AddMovie from "./Movies/AdMovie";
import axios from 'axios';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  const removeMovie = id => {
		setMovieList(movieList.filter(movie => movie.id !== id));
	};

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <Link to="/add-movie">Add Movie</Link>
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} removeMovie={removeMovie} />
      </Route>

      <Route path="/update-movie/:id">
				<UpdateMovie movies={movieList} setMovieList={setMovieList} />
			</Route>

      <Route path="/add-movie">
				<AddMovie setMovieList={setMovieList} />
			</Route>

    </>
  );
};

export default App;
