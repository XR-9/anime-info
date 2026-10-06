import { useEffect, useRef, useState } from "react";
import SearchBar from "../Components/media/SearchBar";
import "./SearchPage.css";
import{ fetchPage } from "../hooks/CallApi";
import Errormessage from "../Components/ui/ErrorMessage";
import MediaGrid from "../Components/media/MediaGrid";
import Pagination from "../Components/media/Pagination";
import { useSearch } from "../context/searchContext";
import MediaCardSkeleton from "../Components/ui/MediaCardSkeleton";

function SearchPage({ setAllData }) {
    const limit = 15
    const {page, setCurrentPage , query , currentPage , error , setError , loading , setLoading , setPage , } = useSearch()
    

    let abortRef = useRef(null)
    useEffect(() => {
        if(!query.trim()){
            setPage({});
            setError("")
            setCurrentPage(1)
            setLoading(false)
            return;

        }

        if(abortRef.current) abortRef.current.abort()
        let controller = new AbortController();
        abortRef.current = controller;

        const timeId = setTimeout(async () => {
            setPage({});
            setError("")
            setCurrentPage(1)
            setLoading(true)

            try{
                 const page1 = await fetchPage(query , 1 , controller.signal)
                 console.log(page1)
                setPage({1 : page1})
                setLoading(false)
                if(page1.data.length <= 0)setError("Anime not found. Try a different search term.");

                if(page1.totalCount > limit){
                    fetchPage(query , 2 , controller.signal).then((page2) => {
                        if(!controller.signal.aborted){
                            setPage(prev => ({...prev ,2 : page2}))
                            console.log(`page 2 prefetched`)
                        }
                    }).catch(() => {})
                }

            }catch(err){
                if(err.name === "AbortError") return;
                console.log(err)
                handleError(err)
            }
        } ,500)

        return () => {clearTimeout(timeId)
            abortRef.current.abort()
        }

    } , [query])

    useEffect(() => {
        if(!page[currentPage] ) return ;

        const totalPage = Math.ceil((page[1]?.totalCount || 0)/ limit)
        const nextPage = currentPage + 1;


        if(nextPage <= totalPage && !page[nextPage]){
            try{
            fetchPage(query , nextPage).
            then(result => setPage(prev => ({...prev , [nextPage] : result})))
            .catch((err) => {if(err.name !== "AbortError") return handleError(err)})

        }
        catch(err){
            handleError(err)

        }

        }

    } , [query , currentPage , page])

    useEffect(() => {
        setAllData(page[currentPage]?.data)
    }, [page])

    const handleError = (err) =>{
        console.log("working")
        setLoading(false)
    const status = err.status;
    if (status === 404) setError("Anime not found. Try a different search term.");
    else if (status === 429) setError("Too many requests. Please wait a moment.");
    else if (status >= 500) setError("Kitsu's server is having issues. Please try again later.");
    else if (!status) setError("Network error. Please check your connection.");
    else setError(`Something went wrong (Error: ${status})`);
    };



    const handlePageChange = async (nextpage) => {

        console.log("click ->", nextpage, "cached?", !!page[nextpage], "keys:", Object.keys(page))
        setCurrentPage(nextpage)

        if(!page[nextpage]) {
            setLoading(true);

            try{
            fetchPage(query , nextpage).
            then(result => {setPage(prev => ({...prev , [nextpage] : result}))
                            console.log(`page ${nextpage} prefetched`)} ).catch((err) => {if(err.name !== "AbortError") return handleError(err)})



        }
        catch(error){
            if(error !== "AbortError") handleError(error)

        }
        finally{
            setLoading(false)
        }

        }
        
    }




    const dataItems = page[currentPage]?.data
    const totalPage = Math.ceil((page[1]?.totalCount || 0 )/ limit)

    return (
        <div className="search-page">
            <h2>Search the Content you love</h2>
            <p className="subtitle">
                Thousands of anime, one search away
            </p>

            <SearchBar />

            {loading && <MediaCardSkeleton count={10} />}
            {error && <Errormessage message= {error} />}
           
            {!error && dataItems?.length > 0 && (<>
            <MediaGrid data = {dataItems} totalCount = {(page[1]?.totalCount || 0 )} totalPage = {totalPage} currentPage = {currentPage} />
            <Pagination 
            currentPage={currentPage}
            totalPage = {totalPage}
            onPageChange={handlePageChange}
           />
            </>)}


        </div>
    );
}

export default SearchPage;