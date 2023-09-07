import axiosClient from "../axios/axios.client";
import tmbdEndpoints from "./tmbd.endpoint";

const tmbdApi = {
    mediaList: async ({ mediaType, mediaCategory, page }) => await axiosClient.get(
        tmbdEndpoints.MediaList({ mediaType, mediaCategory, page })
    ),
    mediaDetail: async ({ mediaType, page }) => await axiosClient.get(
        tmbdEndpoints.mediaDetail({ mediaType, page })
    ),
    mediaGenres: async ({ mediaType }) => await axiosClient.get(
        tmbdEndpoints.mediaGenres({ mediaType })
    ),
    mediaCredits: async ({ mediaType, mediaId }) => await axiosClient.get(
        tmbdEndpoints.mediaCredits({ mediaType, mediaId })
    ),
    mediaVideos: async ({ mediaType, mediaId }) => await axiosClient.get(
        tmbdEndpoints.mediaVideos({ mediaType, mediaId })
    ),
    mediaImages: async ({ mediaType, mediaId }) => await axiosClient.get(
        tmbdEndpoints.mediaImages({ mediaType, mediaId })
    ),
    mediaRecommend: async ({ mediaType, mediaId }) => await axiosClient.get(
        tmbdEndpoints.mediaRecommend({ mediaType, mediaId })
    ),
    mediaSearch: async ({ mediaType, query, page }) => await axiosClient.get(
        tmbdEndpoints.mediaSearch({ mediaType, query, page })
    ),
    personDetail: async ({ personId }) => await axiosClient.get(
        tmbdEndpoints.personDetail({ personId })
    ),
    personMedias: async ({ personId }) => await axiosClient.get(
        tmbdEndpoints.personMedias({ personId })
    ),
};

export default tmbdApi;