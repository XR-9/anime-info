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


    const toggleFav = (animeId , anime) => {
        let main = {Id : animeId ,
            Anime : anime
        }
        setFavId((prev) => {
            const isFav = prev?.some(r =>r.Id === animeId)
            console.log(isFav)
            let newFav = isFav ? prev.filter((p)=> p.Id !==animeId): [...prev , main]

            localStorage.setItem('favIds', JSON.stringify(newFav))
            return newFav

        })
    }

    return(<favContext.Provider value={{favId , toggleFav}}>
        {children}

    </favContext.Provider>
    )
}