import { useEffect, useState } from "react";
import SearchBar from "../Components/media/SearchBar";
import "./SearchPage.css";
import Loader from "../Components/ui/Loader";
// import EmptyState from "../Components/ui/EmptyState";
import{ fetchData } from "../hooks/CallApi";
import Errormessage from "../Components/ui/ErrorMessage";

function SearchPage() {
    const [query, setQuery] = useState("");
    const [response , setResponse] = useState(null)
    const [loading , setLoading] = useState(false)
    const [error , setError] = useState("")



    useEffect(() => {

        const timeId = setTimeout(async () => {
            if (!query){
                setResponse(null);
                setError("")
                return;
            }
            await result();
        } , 1000)
        return () => clearTimeout(timeId)

    } , [query])


async function result(){
        setLoading(true)
        setError("")
            try{
                const res = await fetchData(query);

                if(!res.ok){
                    if (res.status === 404) {
                    setError("Anime not found. Try a different search term.");
                    } else if (res.status === 429) {
                        setError("Too many requests. Please wait a moment.");
                    } else if (res.status >= 500) {
                        setError("The server is currently down. Please try again later.");
                        console.log(res.status)
                    } else {
                        setError(`Something went wrong (Error: ${res.status})`);
                    }
                    return;
                }

                const data = await res.json()
                setResponse(data)

            }
            catch(error){
                setError("Network error. Please check your connection.")
            }
            finally{
                setLoading(false)
            }

    }

    return (
        <div className="search-page">
            <h2>Search the Content you love</h2>
            <p className="subtitle">
                Thousands of anime, one search away
            </p>

            <SearchBar query={query} setQuery={setQuery} />
            {loading && <Loader />}
            {error && <Errormessage message= {error} onretry={result} />}
            




        </div>
    );
}

export default SearchPage;