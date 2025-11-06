import React from 'react';
import { useEffect, useState } from 'react';

const Movie = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch('http://localhost/headless_wordpress/server/wp-json/wp/v2/movie')
        .then((res) => res.json())
        .then((data) => setMovies(data))
        .catch((err) => console.error(err));
    }, []);

    return (
        <div style={{ padding: "40px" }}>
            <h1>Movies</h1>
            <div style={{ display: "grid", gap: "20px" }}>
                {movies.map((movie) => (
                <div key={movie.id} style={{ border: "1px solid #ccc", padding: "20px" }}>
                    <h2 dangerouslySetInnerHTML={{ __html: movie.title.rendered }} />
                    <div dangerouslySetInnerHTML={{ __html: movie.content.rendered }} />
                </div>
                ))}
            </div>
        </div> 
    );
};

export default Movie;