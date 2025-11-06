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
        <div className="p-10 bg-gray-900 min-h-screen">
            <h1 className="text-3xl font-bold text-white mb-6">🎬 Movies</h1>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {movies.map((movie) => (
                <div
                    key={movie.id}
                    className="border border-gray-700 p-6 rounded-xl bg-gray-800 hover:bg-gray-700 transition-all"
                >
                    <h2
                    className="text-[24px] font-semibold text-white mb-3"
                    dangerouslySetInnerHTML={{ __html: movie.title.rendered }}
                    />
                    <div
                    className="text-[16px] text-gray-300 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: movie.content.rendered }}
                    />
                </div>
                ))}
            </div>
        </div>
    );
};

export default Movie;