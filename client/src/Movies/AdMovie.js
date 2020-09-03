import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const AddMovie = ({ setMovieList }) => {
	const history = useHistory();
	const [inputValues, setInputValues] = useState({
		title: "",
		director: "",
		metascore: "",
		stars: []
	});

	const handleChange = e => {
		setInputValues({
			...inputValues,
			[e.target.name]:
				e.target.name === "stars" ? e.target.value.split(", ") : e.target.value
		});
	};

	const handleSubmit = e => {
		e.preventDefault();
		axios
			.post(`http://localhost:5000/api/movies`, inputValues)
			.then(res => {
				setMovieList(res.data);
				setInputValues({
					title: "",
					director: "",
					metascore: "",
					stars: []
				});
				history.push("/");
			})
			.catch(err => console.log(err.response));
	};

	return (
		<div className="add-form">
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="title"
					placeholder="Title"
					value={inputValues.title}
					onChange={handleChange}
				/>
				<input
					type="text"
					name="director"
					placeholder="Director"
					value={inputValues.director}
					onChange={handleChange}
				/>
				<input
					type="text"
					name="metascore"
					placeholder="Metascore"
					value={inputValues.metascore}
					onChange={handleChange}
				/>
				<input
					type="text"
					name="stars"
					placeholder="Stars (Seperate with , )"
					value={inputValues.stars.join(", ")}
					onChange={handleChange}
				/>
				<button type="submit">Add Movie</button>
			</form>
		</div>
	);
};

export default AddMovie;