const KITSU_API = `https://kitsu.io/api/edge`;
const LIMIT = 15;

const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000;


async function fetchWithRetry(url, options, maxRetries = 3) {
  const MainErrors = [426, 500, 502, 503, 504];
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const resp = await fetch(url, options);
      if (resp.ok) return resp;
      if (MainErrors.includes(resp.status) && attempt < maxRetries - 1) {
        const interval = 1000 * Math.pow(2, attempt);
        await new Promise((r) => setTimeout(r, interval));
        continue;
      }
      return resp;
    } catch (error) {
      if (error.name === "AbortError") throw error;
      if (attempt < maxRetries - 1) {
        const interval = 1000 * Math.pow(2, attempt);
        await new Promise((r) => setTimeout(r, interval));
        continue;
      }
      throw error;
    }
  }
}

export async function fetchPage(query, page, signal) {
  if (!query.trim()) throw new Error("Query is Required");

  const key = `${query.trim().toLowerCase()}_p${page}`;

  const cached = cache.get(key);
  if (cached && Date.now() - cached.timeStamp < CACHE_TTL) {
    console.log(`Cache hit: page ${page}`);
    return cached.data;
  }

  const url = `${KITSU_API}/anime?filter[text]=${encodeURIComponent(query)}&page[size]=${LIMIT}&page[number]=${page}&include=categories`;

  const resp = await fetchWithRetry(url, {
    headers: { Accept: "application/vnd.api+json" },
    signal,
  });

  if (!resp.ok) {
    const error = new Error(`KITSU API ERROR : ${resp.status}`);
    error.status = resp.status;
    throw error;
  }

  const json = await resp.json();


  // ----------if you need exact data from search ----------------------
  //  let filterdData = json.data.filter((exp) => exp.attributes.canonicalTitle.toLowerCase().includes(query.toLowerCase()))
  //  delete json.data;
  //  const data = `data`
  //  json[data] = filterdData
   

  const CategoriesMap = new Map();
  (json.included || []).forEach((item) => {
    if (item.type === "categories") {
      CategoriesMap.set(item.id, item.attributes.title);
    }
  });

  const enrichedData = (json.data || []).map((anime) => {
    const categoryIds = anime.relationships?.categories?.data || [];
    const categoryNames = categoryIds
      .map((c) => CategoriesMap.get(c.id))
      .filter(Boolean);

    return {
      ...anime,
      attributes: {
        ...anime.attributes,
        genres: categoryNames,
      },
    };
  });

  const result = {
    data: enrichedData,
    totalCount: json.meta?.count || 0,
    page,
  };

  cache.set(key, { data: result, timeStamp: Date.now() });
  return result;
}

export function clearCache() {
  cache.clear();
}