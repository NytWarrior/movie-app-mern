const baseUrl = process.env.tmdb_BASE_URL;
const key = process.env.tmdb_KEY;

const getUrl = (endpoint, params) => {
    const qs = new URLSearchParams(params);

    return `${baseUrl}${endpoint}?api_key=${key}&${qs}`;
};

export default { getUrl };