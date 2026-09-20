import { useEffect, useState } from "react";
import SearchBar from "../Components/media/SearchBar";
import "./SearchPage.css";
import Loader from "../Components/ui/Loader";
// import EmptyState from "../Components/ui/EmptyState";
import{ fetchData } from "../hooks/CallApi";
import Errormessage from "../Components/ui/ErrorMessage";
import MediaGrid from "../Components/media/MediaGrid";

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
            console.log("useEFfect working")
        } , 1000)
        return () => clearTimeout(timeId)

    } , [query])


async function result(){
        setLoading(true)
        setError("")

            try{
                console.log("data going to retreive")
                const data = await fetchData(query);
                console.log(data)
                console.log("data retreived")
                setResponse(data)

            }
            catch(error){
                    const status = error.status;

                    // Agar status hai, toh HTTP error tha (404, 429, etc.)
                    if (status === 404) {
                        setError("Anime not found. Try a different search term.");
                    } else if (status === 429) {
                        setError("Too many requests. Please wait a moment.");
                    } else if (status >= 500) {
                        setError("Kitsu's server is having issues. Please try again later.");
                    }
                    // Agar status nahi hai, toh network error tha (TypeError)
                    else if (!status) {
                        setError("Network error. Please check your connection.");
                    }
                    else {
                        setError(`Something went wrong (Error: ${status})`);
                    }
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
            {error && <Errormessage message= {error} />}
            {!error && response && <MediaGrid response = {response}></MediaGrid>}
            {response && (<img 
                    src={response[0].data[0].attributes.coverImage.original} 
                    loading="lazy"
                />)}
            {response && (<img 
                    src={response[0].data[0].attributes.posterImage.original} 
                    loading="lazy"
                />)}
            




        </div>
    );
}

export default SearchPage;