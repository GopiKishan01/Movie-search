import React, { useState } from "react";
import "./App.css";

const API_KEY = "3c2488c4"; 

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const searchMovies = async () => {
    if (query.trim() === "") return;

    try {
      const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
        setError("");
      } else {
        setMovies([]);
        setError("No results found.");
      }
    } catch (err) {
      setError("Error fetching data.");
      console.error(err);
    }
  };

  return (
    <div className="App">
      <h1>Movie Search App</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter movie name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={searchMovies}>Search</button>
      </div>

      {error && <p>{error}</p>}

      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie-card">
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200x300"}
              alt={movie.Title}
            />
            <h3>{movie.Title} ({movie.Year})</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
