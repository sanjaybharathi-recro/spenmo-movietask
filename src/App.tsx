import React, { createContext, useEffect, useState } from 'react';
import baseURL from './api/baseURL';
import './App.css';
import CardListItem from './components/cardList.tsx';
import { ArrayVal, bindLStoState, ObjectVal, useGetFavItems } from './utils';

export interface ContentListItem {
  Poster: string,
  Title: string,
  Type: string
  Year: string,
  imdbID: string,
  isFav?: boolean
}

export interface contextDataType {
  contentList: ContentListItem[],
  setImdbData: (value: any) => void
}

export interface ImdbDataType {
  contentList: ContentListItem[]
}

export const ContentContext = createContext<contextDataType>({
  setImdbData: () => { },
  contentList: [],
});

export const fetByParams = (url: string) => {
  return fetch(url).then((response) => response.json()).then(result => {
    return result;
    // if (ObjectVal(result) && result.Response === 'True') {
    //   // setImdbData({ contentList: (bindLStoState(result.Search)) });
    //   return bindLStoState(result.Search)
    // } else {
    //   // setImdbData({ contentList: ([]) });
    //   return []
    // }
  });
}

const App = () => {

  const [ImdbData, setImdbData] = useState({ contentList: [] } as ImdbDataType);
  const [searchText, setSearchText] = useState('' as string);
  const [searchType, setSearchType] = useState('' as '' | "movie" | "series" | "episode");

  const favItems = useGetFavItems();

  const [currentPage, setCurrentPage] = useState('home' as 'home' | 'favorites');


  const fetchContent = async () => {

    const getUrl = () => {
      let baseUrl = baseURL;
      if (searchText) {
        baseUrl += `&s=${searchText}`
      }
      if (searchType) {
        baseUrl += `&type=${searchType}`
      }
      return baseUrl
    }

    let result = await fetByParams(getUrl())
    setImdbData({ contentList: bindLStoState(result.Search) });
  };

  const handleSelectChange = (e: any) => setSearchType(e.target.value);

  return (
    <>
      <ContentContext.Provider value={{ ...ImdbData, setImdbData }}>
        <header>
          <a role={'button'} data-testId='home-button' style={{ color: currentPage === 'home' ? 'blue' : ' ' }} onClick={() => setCurrentPage('home')}>Home</a>
          <a role={'button'} data-testId='favorites-button' style={{ color: currentPage === 'favorites' ? 'blue' : ' ' }} onClick={() => setCurrentPage('favorites')}>Favorites</a>
        </header>
        <main>
          {currentPage === 'home' ? <>
            <section className="search-container">
              <input value={searchText} type={'search'} onChange={(e) => setSearchText(e.target.value)} placeholder='Enter movies, series, episodes...' />
              <select value={searchType} data-testid='select-option' onChange={(e) => handleSelectChange(e)}>
                <option value="">All</option>
                <option value="movie">Movies</option>
                <option value="series">Series</option>
                <option value="episode">Episode</option>
              </select>
              <button onClick={fetchContent}>Search</button>
            </section>
            <section className="content-list-container">
              {
                ArrayVal(ImdbData.contentList) ? ImdbData.contentList.map((content) => {
                  return <CardListItem {...content} />
                }) : <>Empty</>
              }
            </section>
          </> : <>
            <section className="fav-content-list-container">
              {
                ArrayVal(favItems) ? favItems.map((content) => {
                  return <CardListItem {...content} />
                }) : <>No data found</>
              }
            </section>
          </>}
        </main>
      </ContentContext.Provider>
    </>
  );
}

export default App;
