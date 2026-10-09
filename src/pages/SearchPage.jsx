import { useEffect, useRef, useState } from "react";
import SearchBar from "../Components/media/SearchBar";
import "./SearchPage.css";
import{ fetchPage } from "../hooks/CallApi";
import MediaGrid from "../Components/media/MediaGrid";
import Pagination from "../Components/media/Pagination";
import { useSearch } from "../context/searchContext";
import MediaCardSkeleton from "../Components/ui/MediaCardSkeleton";
import { useNavigate, useSearchParams } from "react-router-dom";
import EmptyState from "../Components/ui/EmptyState";
import NotFound from "../Components/ui/NotFound";

function SearchPage({ setAllData }) {
    const limit = 15
    const [searchParams , setSearchParams] = useSearchParams();
    const query = searchParams.get("q") || ""
    const {page,  error , setError , loading , setLoading , setPage , } = useSearch()
    const currentPage = parseInt(searchParams.get("page") || "1" , 10)
    const [emptystate , Isempty] = useState(false)
    console.log(currentPage)
    const navigate = useNavigate();

    let abortRef = useRef(null)
    useEffect(() => {
        if(!query.trim()){
            setPage({});
            setError("")
            setLoading(false)
            return;

        }

        if(abortRef.current) abortRef.current.abort()
        let controller = new AbortController();
        abortRef.current = controller;

        const timeId = setTimeout(async () => {
            setPage({})
            setError("")
            setLoading(true)

            try{
                 const page1 = await fetchPage(query , 1 , controller.signal)
                 console.log(page1)
                setPage({1 : page1})
                setLoading(false)
                if(page1.data.length <= 0) Isempty(prev => !prev)

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
        } ,1)

        return () => {clearTimeout(timeId)
            abortRef.current.abort()
        }

    } , [query])

useEffect(() => {
    if (!page[currentPage]) {
        if (!page[1]) return;
        fetchPage(query, currentPage)
            .then((result) => {
                setPage((prev) => ({ ...prev, [currentPage]: result }))
            })
            .catch((err) => { if (err.name !== "AbortError") handleError(err) })
    }

    const totalPage = Math.ceil((page[1]?.totalCount || 0) / limit)
    const nextPage = currentPage + 1;

    if (nextPage <= totalPage && !page[nextPage]) {
        fetchPage(query, nextPage)
            .then(result => setPage(prev => ({ ...prev, [nextPage]: result })))
            .catch((err) => { if (err.name !== "AbortError") return handleError(err) })
    }
}, [currentPage, page])


    useEffect(() => {
        if(page[currentPage]?.data){
            setAllData(page[currentPage]?.data)

        }
    }, [page , currentPage ])

 const handleError = (err) => {
  console.log("working");
  setLoading(false);

  const status = err?.status;

   if (status === 429) {
    setError({
      status: 429,
      title: "Too many requests",
      description: "Please wait a moment and try again.",
    });
  } else if (status >= 500) {
    setError({
      status,
      title: "Server error",
      description: "Kitsu's server is having issues. Please try again later.",
    });
  } else if (!status) {
    setError({
      status: "—",
      title: "Network error",
      description: "Please check your connection and try again.",
    });
  } else {
    setError({
      status,
      title: "Something went wrong",
      description: `Unexpected error (Code: ${status}).`,
    });
  }
};


    const handlePageChange = (nextpage) => {
        const newParams =new URLSearchParams(searchParams)
        newParams.set("page" , nextpage)
        setSearchParams(newParams)
        
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
           
            {!error && dataItems?.length > 0 && (<>
            <MediaGrid data = {dataItems} totalCount = {(page[1]?.totalCount || 0 )} totalPage = {totalPage} currentPage = {currentPage} />
            <Pagination 
            currentPage={currentPage}
            totalPage = {totalPage}
            onPageChange={handlePageChange}
           />
            </>)}
            {!loading && !error && (dataItems === undefined || dataItems?.length === 0) && (
                <EmptyState
                    query={query}
                    onSuggestionClick={(s) => {
                        const p = new URLSearchParams(searchParams);
                        p.set("q", s);
                        p.set("page", "1");
                        setSearchParams(p);
                    }}
                />
            )}
           {error && <NotFound
            code={error.status}
            title = {error.title}
            description={error.Description}
            onGoBack={() => {navigate(-1)
                setError({})}
            }
            onGoHome ={() => {navigate("/")
                setError({})
            }
            }
            />}


        </div>
    );
}

export default SearchPage;