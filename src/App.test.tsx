import { render, screen } from '@testing-library/react';
import baseURL from './api/baseURL';
import App, { fetByParams } from './App';

describe('render home', () => {

    test('renders Empty', () => {
        render(<App />);
        const linkElement = screen.getByText(/Empty/i);
        expect(linkElement).toBeInTheDocument();
    });

    test('render input box', () => {
        render(<App />);
        const InputElement = screen.getByRole('searchbox');
        expect(InputElement).toBeInTheDocument();
    });

    test('render select box', () => {
        render(<App />);
        const InputElement = screen.getByTestId('select-option');
        expect(InputElement).toBeInTheDocument();
    });

    test('render link tag', () => {
        render(<App />);
        const InputElement = screen.getByTestId('home-button');
        expect(InputElement).toHaveStyle(`color: blue`)
    });

});

describe('api result', () => {

    // test('renders Empty param', async () => {
    //     const data = await fetByParams(baseURL);
    //     console.log('1->log->', data);
    //     expect(data).toEqual([]);
    // });

    let mockResult = {
        "Search": [
            {
                "Title": "Avatar",
                "Year": "2009",
                "imdbID": "tt0499549",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg"
            },
            {
                "Title": "Avatar: The Last Airbender",
                "Year": "2005–2008",
                "imdbID": "tt0417299",
                "Type": "series",
                "Poster": "https://m.media-amazon.com/images/M/MV5BODc5YTBhMTItMjhkNi00ZTIxLWI0YjAtNTZmOTY0YjRlZGQ0XkEyXkFqcGdeQXVyODUwNjEzMzg@._V1_SX300.jpg"
            },
            {
                "Title": "Avatar: The Way of Water",
                "Year": "2022",
                "imdbID": "tt1630029",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_SX300.jpg"
            },
            {
                "Title": "The King's Avatar",
                "Year": "2019",
                "imdbID": "tt10732794",
                "Type": "series",
                "Poster": "https://m.media-amazon.com/images/M/MV5BOGMxZDc1N2ItODI3NS00MDIwLWJkYzAtMTgyMDZlN2FlNGYzXkEyXkFqcGdeQXVyMjQ0OTYxOTc@._V1_SX300.jpg"
            },
            {
                "Title": "The King's Avatar",
                "Year": "2017–",
                "imdbID": "tt6859260",
                "Type": "series",
                "Poster": "https://m.media-amazon.com/images/M/MV5BZjIyMjE5ZDYtMTQxNC00NTEzLTgwYzYtMmM0NDg3OWFlYWM5XkEyXkFqcGdeQXVyNjMxNzQ2NTQ@._V1_SX300.jpg"
            },
            {
                "Title": "Avatar: The Last Airbender - The Legend of Aang",
                "Year": "2006",
                "imdbID": "tt0959552",
                "Type": "game",
                "Poster": "https://m.media-amazon.com/images/M/MV5BNjUwNzA5Nzc4N15BMl5BanBnXkFtZTgwNjM1ODY4MDE@._V1_SX300.jpg"
            },
            {
                "Title": "Avatar: The Game",
                "Year": "2009",
                "imdbID": "tt1517155",
                "Type": "game",
                "Poster": "https://m.media-amazon.com/images/M/MV5BMTYxODI2OTI4MF5BMl5BanBnXkFtZTcwNjI1NzMwMw@@._V1_SX300.jpg"
            },
            {
                "Title": "Avatar: The Last Airbender - The Legend So Far",
                "Year": "2005",
                "imdbID": "tt1605838",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BZGQ1ZTNmNzItNGYyMC00MDk2LWJiZDAtZTkwZDFlNWJlYTVjXkEyXkFqcGdeQXVyODUxNDExNTg@._V1_SX300.jpg"
            },
            {
                "Title": "The King's Avatar: For the Glory",
                "Year": "2019",
                "imdbID": "tt10736726",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BMzFkZTMzOGUtOGM3NS00YzI2LTllMjgtODk0NDhkNWRiMTMzXkEyXkFqcGdeQXVyNzI1NzMxNzM@._V1_SX300.jpg"
            },
            {
                "Title": "Avatar: Creating the World of Pandora",
                "Year": "2010",
                "imdbID": "tt1599280",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BYjk4ZDAxN2MtYjhlNy00MzJhLWI1MGYtYjY5ZGJlY2YwMzNlXkEyXkFqcGdeQXVyNTc0NjY1ODk@._V1_SX300.jpg"
            }
        ],
        "totalResults": "101",
        "Response": "True"
    }

    test('renders with text', async () => {
        const data = await fetByParams('https://www.omdbapi.com/?apikey=ee1801df&s=avatar');
        expect(data).toEqual(mockResult);
    });

});