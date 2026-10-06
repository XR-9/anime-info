import { createContext, useContext, useState  } from "react";

export const favContext = createContext(null);

export function usefav(){
    let context = useContext(favContext)
    if(context == null){
        console.error("context should be in favcontextprovider")
    }
    return context;
}


export function FavContextProvider({children}){
    const [favId , setFavId] = useState(()=> {
        const saved = localStorage.getItem('favIds')
        return  saved ? JSON.parse(saved) : []
    })


    const toggleFav = (animeId) => {
        setFavId((prev) => {
            const isFav = prev.includes(animeId);
            let newFav = isFav ? prev.filter((id)=> id !==animeId): [...prev , animeId]

            localStorage.setItem('favIds', JSON.stringify(newFav))
            return newFav

        })
    }

    return(<favContext.Provider value={{favId , toggleFav}}>
        {children}

    </favContext.Provider>
    )
}