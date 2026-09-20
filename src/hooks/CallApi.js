const KITSU_API =`https://kitsu.io/api/edge`;



const cache = new Map() 
const CACHE_TTL = 5 * 60 * 1000

async function fetchWithRetry(url , options , maxRetries = 3){
   const MainErrors = [426 , 500 , 502 , 503 , 504]
      for(let attempt = 0 ; attempt < maxRetries ; attempt++){

   try{ 

      const resp = await fetch(url , options)

      if(resp.ok){
         return resp
      }
      if(MainErrors.includes(resp.status) && attempt < maxRetries - 1){
         const interval = 1000 * Math.pow(2 , attempt)
           console.warn(`Kitsu ${resp.status}. Retry ${attempt + 1}/${maxRetries} in ${interval}ms` );
         await new Promise((r) => setTimeout(r , interval))
         continue;


      }
      return resp;
      


   }
   catch(error){
      if(attempt < maxRetries - 1){
          const interval = 1000 * Math.pow(2 , attempt);
         console.warn(`Kitsu ${resp.status}. Retry ${attempt + 1}/${maxRetries} in ${interval}ms` );
         await new Promise((r) => setTimeout(r , interval))
         continue;

      }
      throw err;

   }
      }
}

export async function fetchData(query){
    if(!query.trim()){
      throw new Error("Query is Required")

    }
    const key = query.trim().toLowerCase()

    const cached = cache.get(query)
    if(cached && Date.now() - cached.timeStamp < CACHE_TTL){
      console.log("cache hit ")
      return cached.data

    }

    const url = `${KITSU_API}/anime?filter[text]=${encodeURIComponent(query)}&page[limit]=10&include=categories`

    const resp = await fetchWithRetry(url ,{
       headers: {
            Accept: "application/vnd.api+json",},    })
      
   if(!resp.ok){
      const error = new Error(`KITSU API ERROR : ${resp.status}`)
      error.status = resp.status
      error.statusText = resp.statusText
      throw error;

   }
   const json = await resp.json();
   console.log(` json : ${json}`)


   const CategoriesMap = new Map();
   (json.included || []).map(item => 
      {if(item.type === "categories"){
         CategoriesMap.set(item.id , item.attributes.title)

      }}
   )
   console.log(CategoriesMap)


   const enrichedData = (json.data || []).map(anime =>{
      const catagoryId = (anime.relationships?.categories?.data || [])
      const categoryNames =catagoryId.map((c) => CategoriesMap.get(c.id)).filter(Boolean)

      return({
         ...anime,
         attributes : {
            ...anime.attributes,
            genres : categoryNames
         }
      })
   })
   console.log(enrichedData)


   const results = [{
      data : enrichedData,
      meta : (json.meta || {})
   }]
   cache.set(key , {data : results, timeStamp : Date.now()})

   console.log(results)


   return results



}

function clearCatch(){
   cache.clear()
}




































// ============================================
// CallApi.js — Kitsu API with Retry + Cache
// ============================================

// const KITSU_API = "https://kitsu.io/api/edge";

// // ========== CACHE ==========
// // Simple in-memory cache. Key = query, Value = { data, timestamp }
// const cache = new Map();
// const CACHE_TTL = 5 * 60 * 1000; // 5 minutes (Kitsu rate limit strict hai)

// // ========== RETRY LOGIC ==========
// // Retries on 429 (rate limit) and 5xx (server errors) with exponential backoff
// async function fetchWithRetry(url, options, maxRetries = 3) {
//     const retryableStatuses = [429, 500, 502, 503, 504];

//     for (let attempt = 0; attempt < maxRetries; attempt++) {
//         try {
//             const res = await fetch(url, options);

//             // Success — return immediately
//             if (res.ok) return res;

//             // Retryable error — wait and try again
//             if (retryableStatuses.includes(res.status) && attempt < maxRetries - 1) {
//                 const waitTime = 1000 * Math.pow(2, attempt); // 1s, 2s, 4s
//                 console.warn(
//                     `Kitsu ${res.status}. Retry ${attempt + 1}/${maxRetries} in ${waitTime}ms`
//                 );
//                 await new Promise((r) => setTimeout(r, waitTime));
//                 continue;
//             }

//             // Non-retryable error — return as-is so caller can handle
//             return res;
//         } catch (err) {
//             // Network error — retry
//             if (attempt < maxRetries - 1) {
//                 const waitTime = 1000 * Math.pow(2, attempt);
//                 console.warn(`Network error. Retry ${attempt + 1}/${maxRetries} in ${waitTime}ms`);
//                 await new Promise((r) => setTimeout(r, waitTime));
//                 continue;
//             }
//             throw err;
//         }
//     }
// }

// // ========== MAIN FETCH FUNCTION ==========
// // Returns: { data: [...], meta: { count } }
// // Throws: Error with .status property for HTTP errors
// export async function fetchData(query) {
//     if (!query?.trim()) {
//         throw new Error("Query is required");
//     }

//     const key = query.trim().toLowerCase();

//     // 1. Check cache first
//     const cached = cache.get(key);
//     if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
//         console.log("📦 Cache hit:", query);
//         return cached.data;
//     }

//     // 2. Build URL — include categories for genres
//     const url = `${KITSU_API}/anime?filter[text]=${encodeURIComponent(
//         query
//     )}&page[limit]=10&include=categories`;

//     // 3. Fetch with retry
//     const res = await fetchWithRetry(url, {
//         headers: {
//             Accept: "application/vnd.api+json",
//         },
//     });

//     // 4. Handle HTTP errors
//     if (!res.ok) {
//         const error = new Error(`Kitsu API error: ${res.status}`);
//         error.status = res.status;
//         error.statusText = res.statusText;
//         throw error;
//     }

//     // 5. Parse JSON
//     const json = await res.json();

//     // 6. Kitsu returns categories in `included` array, not in attributes.
//     //    Merge them into each anime object so UI can access anime.categories.
//     const categoriesMap = new Map();
//     (json.included || []).forEach((item) => {
//         if (item.type === "categories") {
//             categoriesMap.set(item.id, item.attributes.title);
//         }
//     });

//     const enrichedData = (json.data || []).map((anime) => {
//         const categoryIds = anime.relationships?.categories?.data || [];
//         const categoryNames = categoryIds
//             .map((c) => categoriesMap.get(c.id))
//             .filter(Boolean);

//         return {
//             ...anime,
//             attributes: {
//                 ...anime.attributes,
//                 genres: categoryNames, // Add genres array to attributes
//             },
//         };
//     });

//     const result = {
//         data: enrichedData,
//         meta: json.meta || {},
//     };

//     // 7. Cache it
//     cache.set(key, { data: result, timestamp: Date.now() });

//     return result;
// }

// // Optional: Clear cache manually (useful for debugging)
// export function clearCache() {
//     cache.clear();
// }