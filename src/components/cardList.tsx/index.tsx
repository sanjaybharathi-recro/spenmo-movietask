import React, { useContext } from "react";
import { ContentContext, ContentListItem } from "../../App";
import { ArrayVal, bindLStoState } from "../../utils";

const RenderFav = ({ imdbID, onClick }: { imdbID: string, onClick: React.MouseEventHandler }) => {
    let favItems: ContentListItem[] = JSON.parse(localStorage.getItem('fav-items') || '[]')
    if (ArrayVal(favItems) && favItems.find(fav => fav.imdbID === imdbID)) return <FavIcon onClick={onClick} />;
    else return <UnFavIcon onClick={onClick} />;
}

const CardListItem = (content: ContentListItem) => {
    let { Poster, Title, Year, imdbID } = content;

    const { contentList, setImdbData } = useContext(ContentContext);

    const callBack = () => {
        let favItems: ContentListItem[] = JSON.parse(localStorage.getItem('fav-items') || '[]');

        let modifiedFav: any = []
        if (ArrayVal(favItems) && !!favItems.find(fav => fav.imdbID === imdbID)) {
            modifiedFav = favItems.filter(fav => fav.imdbID !== imdbID);
        } else {
            modifiedFav = [...favItems, content];
        }
        localStorage.setItem('fav-items', JSON.stringify(modifiedFav));
        setImdbData({ contentList: (bindLStoState(contentList)) });
    };

    return <div className="content-item" data-testid='content-item'>
        <img src={Poster !== "N/A" ? Poster : 'https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg'} alt={Title} />
        <div className="FJCBAIS">
            <h4>{Title}</h4>
            <RenderFav imdbID={imdbID} onClick={() => callBack()} />
        </div>
        <p>Year : {Year}</p>
    </div>
}

export default React.memo(CardListItem);

export const UnFavIcon = ({ onClick }: { onClick: React.MouseEventHandler }) => {
    return <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000" height="800px" width="800px" version="1.1" id="Layer_1" viewBox="0 0 455 455" xmlSpace="preserve">
        <path d="M326.632,10.346c-38.733,0-74.991,17.537-99.132,46.92c-24.141-29.384-60.398-46.92-99.132-46.92  C57.586,10.346,0,67.931,0,138.714c0,55.426,33.05,119.535,98.23,190.546c50.161,54.647,104.728,96.959,120.257,108.626l9.01,6.769  l9.01-6.768c15.529-11.667,70.098-53.978,120.26-108.625C421.949,258.251,455,194.141,455,138.714  C455,67.931,397.414,10.346,326.632,10.346z M334.666,308.974c-41.259,44.948-85.648,81.283-107.169,98.029  c-21.52-16.746-65.907-53.082-107.166-98.03C61.236,244.592,30,185.717,30,138.714c0-54.24,44.128-98.368,98.368-98.368  c35.694,0,68.652,19.454,86.013,50.771l13.119,23.666l13.119-23.666c17.36-31.316,50.318-50.771,86.013-50.771  c54.24,0,98.368,44.127,98.368,98.368C425,185.719,393.763,244.594,334.666,308.974z" />
    </svg>
}

export const FavIcon = ({ onClick }: { onClick: React.MouseEventHandler }) => {
    return <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000" height="800px" width="800px" version="1.1" id="Layer_1" viewBox="0 0 455 455" xmlSpace="preserve">
        <path d="M326.632,10.346c-38.733,0-74.991,17.537-99.132,46.92c-24.141-29.383-60.399-46.92-99.132-46.92  C57.586,10.346,0,67.931,0,138.714c0,55.426,33.049,119.535,98.23,190.546c50.162,54.649,104.729,96.96,120.257,108.626l9.01,6.769  l9.009-6.768c15.53-11.667,70.099-53.979,120.26-108.625C421.95,258.251,455,194.141,455,138.714  C455,67.931,397.414,10.346,326.632,10.346z" />
    </svg>
}
