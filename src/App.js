import React, { useState } from "react";
import Axios from "axios";
import "./App.css";

const App = () => {
	const [pokemon, setPokemon] = useState("pikachu");
	const [pokemonData, setPokemonData] = useState([]);
	const [pokemonType, setPokemonType] = useState("");

	const getPokemon = async () => {
		const toArray = [];
		try {
			const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
			const res = await Axios.get(url);
			toArray.push(res.data);
			setPokemonType(res.data.types[0].type.name);
			setPokemonData(toArray);
			console.log(res);
		} catch (e) {
			console.log(e);
		}
	};

	const handleChange = (e) => {
		setPokemon(e.target.value.toLowerCase());
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		getPokemon();
	};

	return (
		<div className="App">
			<form onSubmit={handleSubmit}>
				<label>
					<input
						type="text"
						onChange={handleChange}
						placeholder="Escribe el pokénombre/ID"
					></input>
				</label>
			</form>
			{pokemonData.map((data) => {
				return (
					<div className="container">
						<img alt="pokemon-img" src={data.sprites["front_default"]} />
						<div className="divTable">
							<div className="divTableBody">
								<div className="divTableRow">
									<div className="divTableCell">ID</div>
									<div className="divTableCell">
										{""}
										{data.id}
									</div>
								</div>
								<div className="divTableRow">
									<div className="divTableCell">Nombre</div>
									<div className="divTableCell">
										{""}
										{data.name}
									</div>
								</div>
								<div className="divTableRow">
									<div className="divTableCell">Tipo</div>
									<div className="divTableCell">{pokemonType}</div>
								</div>
								<div className="divTableRow">
									<div className="divTableCell">Altura</div>
									<div className="divTableCell">
										{""}
										{Math.round(data.height * 10) + "cm"}
									</div>
								</div>
								<div className="divTableRow">
									<div className="divTableCell">Peso</div>
									<div className="divTableCell">
										{""}
										{Math.round(data.weight / 10) + "kg"}
									</div>
								</div>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default App;
