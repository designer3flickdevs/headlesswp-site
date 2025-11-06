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
            <h1 className="text-3xl font-bold text-white mb-6">Movies</h1>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {movies.map((movie) => {
                        const content = movie.content?.rendered || "";
                        const shortContent = content.replace(/<[^>]+>/g, "").slice(0, 120) + "..."; // strip HTML & limit length

                        return (
                            <div
                            key={movie.id}
                            className="border border-gray-700 p-6 rounded-xl bg-gray-800 hover:bg-gray-700 transition-all"
                            >
                            <h2
                                className="text-[24px] font-semibold text-white mb-3"
                                dangerouslySetInnerHTML={{ __html: movie.title.rendered }}
                            />
                            <p className="text-[16px] text-gray-300 leading-relaxed mb-4">
                                {shortContent}
                            </p>

                            <a
                                href={`/movie/${movie.slug}`}
                                className="inline-block mt-auto text-sm font-medium text-blue-400 hover:text-blue-300 border border-blue-400 px-4 py-2 rounded-lg transition-all"
                            >
                                Learn More →
                            </a>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default Movie;