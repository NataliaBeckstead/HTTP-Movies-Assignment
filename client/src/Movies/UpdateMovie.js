import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const UpdateMovie = ({ movies, setMovieList }) => {
	const { id } = useParams();
	const history = useHistory();
	const [movieToEdit, setMoveieToEdit] = useState({
		title: "",
		director: "",
		metascore: "",
		stars: []
    });
    
	useEffect(() => {
		const movie = movies.find(movie => `${movie.id}` === id);
		if (movie) setMoveieToEdit(movie);
	}, [id, movies]);

	const handleChange = e => {
		setMoveieToEdit({
			...movieToEdit,
			[e.target.name]:
				e.target.name === "stars" ? e.target.value.split(", ") : e.target.value
		});
	};

	const handleSubmit = e => {
		e.preventDefault();
		axios
			.put(`http://localhost:5000/api/movies/${id}`, movieToEdit)
			.then(res => {
				history.push("/");
				setMovieList(
					movies.map(movie => {
						return `${movie.id}` === id ? res.data : movie;
					})
				);
			})
			.catch(err => console.log(err.response));
	};

	return (
		<div className="update-form">
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="title"
					placeholder="Title"
					value={movieToEdit.title}
					onChange={handleChange}
				/>
				<input
					type="text"
					name="director"
					placeholder="Director"
					value={movieToEdit.director}
					onChange={handleChange}
				/>
				<input
					type="text"
					name="metascore"
					placeholder="Metascore"
					value={movieToEdit.metascore}
					onChange={handleChange}
				/>
				<input
					type="text"
					name="stars"
					placeholder="Stars (Seperate with , )"
					value={movieToEdit.stars.join(", ")}
					onChange={handleChange}
				/>
				<button type="submit">Save Changes</button>
			</form>
		</div>
	);
};

export default UpdateMovie;