import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import SearchButton from "../components/Search-button";
import FilmCard from "../components/FilmCard";
import FilmDetail from "../components/FilmDetail";
import styles from '../styles/App.module.css';

const FilmFinder = () => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [selectedFilm, setSelectedFilm] = useState();
  const [filmDetail, setFilmDetail] = useState();

  useEffect(() => {
  }, []);

  const search = searchInput => {
    setLoading(true);
    setErrorMessage(null);
    const body = { searchInput }
    fetch(`http://localhost:3000/api/search`, { body: JSON.stringify(body), method: 'POST' })
    .then(response => response.json())
    .then(jsonResponse => {
      if (jsonResponse.data.Response === 'True') {
        setFilms(jsonResponse.data.Search);
        setLoading(false);
      } else {
        setErrorMessage(jsonResponse.Error);
        setLoading(false);
      }
    })
  }

  const onClose = () => {
    setSelectedFilm(null);
    setFilmDetail(null);
  }

  const searchFilmDetail = imdbId => {
      setLoading(true);
      setErrorMessage(null);
      const body = { imdbId }
      fetch(`http://localhost:3000/api/searchDetail`, { body: JSON.stringify(body), method: 'POST' })
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.data.Response === 'True') {
          setFilmDetail(jsonResponse.data);
          setLoading(false);
        } else {
          setErrorMessage(jsonResponse.Error);
          setLoading(false);
        }
      })
  }

  const renderSelectedFilm = () => {
    if (filmDetail) {
          return (
              <FilmDetail film={filmDetail} onClose={onClose}/>
          )
    }
  }

  return (
    <div>
      <header className={styles.fixedSearch}>
        <Header text="filmjack"/>
        <SearchButton search={search}/>
      </header>
      <div className={styles.resultWindow}>
        {loading && !errorMessage ? (
          <span>loading...</span>
        ) : errorMessage ? (
          <div>{errorMessage}</div>
        ) : (
            films.map((film, index) => (
              <ul className={styles.filmCardContainers} key={index} >
                <li className={styles.listItem}onClick={() => {
                  setSelectedFilm(film);
                  searchFilmDetail(film.imdbID);
                }}>
                    <FilmCard film={film}/>
                </li>
              </ul>
            ))
        )}
          {renderSelectedFilm()}
      </div>
    </div>
  );
};

export default FilmFinder;
