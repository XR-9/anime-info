import { useSearchParams } from "react-router-dom";
import "./SearchBar.css";
import { useEffect, useState } from "react";

function SearchBar() {
    const [searchParams  , setSearchParams] = useSearchParams();
    const newquery = searchParams.get("q") || ""
    const currentPage = searchParams.get("page") || "1"
    const [input , setInput] = useState(newquery)

    useEffect(() => {
        setInput(newquery)
    } , [newquery])

    useEffect(() =>{
        if(input === newquery) return;

        const timerId = setTimeout(() =>{
            const newParams = new URLSearchParams(searchParams);
            if(input.trim()){
                newParams.set("q" , input)
                newParams.set("page" , "1")
            }
            else{
                newParams.delete("q")
                newParams.delete("page")
            }
            setSearchParams(newParams , {replace :true})
        } ,500

        )
        return(() =>{
            clearTimeout(timerId)
        
    })
    }
     , [input])

    const handleClear = () => {
        setInput("")
        const newParams = new URLSearchParams(searchParams)
        newParams.delete("q")
        newParams.delete("page")
        setSearchParams(newParams , {replace : true})

    }

    return (
        <div className="search-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-search search-icon">
	<path stroke="none" d="M0 0h24v24H0z" fill="none" />
	<path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
	<path d="M21 21l-6 -6" />
</svg>

            <input
                type="text"
                className="searchInput"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Search Anime"
            />

            {input && (
                <button className="clear-btn" onClick={handleClear}>
                    ×
                </button>
            )}
        </div>
    );
}

export default SearchBar;