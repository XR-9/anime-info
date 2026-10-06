import { createContext, useContext , useState } from "react";


const searchContext = createContext(null)


export function useSearch(){
    const context = useContext(searchContext)

    if(context === null){
        console.log("context must used in searchContextProvdier")
    }
    return context;
}

export function SearchContextProvider({children}){
    const [query, setQuery] = useState("");
    const [loading , setLoading] = useState(false)
    const [error , setError] = useState("")
    const [page , setPage] = useState({})
    const [currentPage , setCurrentPage] = useState(1)


    return(<>
    <searchContext.Provider value = {{query ,setQuery , loading , setLoading , error , setError , page , setPage , currentPage , setCurrentPage}}>
        {children}
    </searchContext.Provider>
    </>)
}