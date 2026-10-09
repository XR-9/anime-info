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
    const [loading , setLoading] = useState(false)
    const [error , setError] = useState("")
    const [page , setPage] = useState({})


    return(<>
    <searchContext.Provider value = {{ loading , setLoading , error , setError , page , setPage }}>
        {children}
    </searchContext.Provider>
    </>)
}