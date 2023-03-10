import { useEffect, useState } from "react"
import { ContentListItem } from "../App"

export const ArrayVal = (arr: any) => !!arr && Array.isArray(arr) && !!arr.length
export const ObjectVal = (obj: any) => !!obj && !!Object.keys(obj).length

export const useBindFavState = (props: ContentListItem[]) => {

    const [contentList, setContentList] = useState(props);

    useEffect(() => {

        let favItems: ContentListItem[] = JSON.parse(localStorage.getItem('fav-items') || '[]')
        if (ArrayVal(favItems)) {
            let items: ContentListItem[] = [...props].map((content) => {
                if (!!favItems.find(fav => fav.imdbID === content.imdbID)) {
                    content.isFav = true;
                }
                return content;
            });
            setContentList(items)
        }

    }, [props]);

    return {contentList, setContentList};

}

export const useGetFavItems = () => {
    let favItems: ContentListItem[] = JSON.parse(localStorage.getItem('fav-items') || '[]')
    if (ArrayVal(favItems)) return favItems;
    else return [];
}

export const bindLStoState = (list: ContentListItem[]) => {

    let favItems: ContentListItem[] = JSON.parse(localStorage.getItem('fav-items') || '[]')
    if (ArrayVal(favItems)) {
        let items: ContentListItem[] = [...list].map((content) => {
            if (!!favItems.find(fav => fav.imdbID === content.imdbID)) {
                content.isFav = true;
            }
            return content;
        })
        return items;
    }
    else return []
}