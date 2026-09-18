export async function fetchData(query){
   return await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=10`)
   

}