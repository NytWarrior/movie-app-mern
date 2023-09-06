import axiosClient from "../axios/axios.client";
import tmbdEndpoints from "./tmbd.endpoint";

const tmbdApi = {
    MediaList: async ({ mediaType, mediaCategory, page }) => await axiosClient.get(
        tmbdEndpoints.MediaList({ mediaType, mediaCategory, page })
    ),
    MediaDetail: async ({ mediaType, page }) => await axiosClient.get(
        tmbdEndpoints.mediaDetail({ mediaType, page })
    ),
    MediaGenres: async ({ mediaType }) => await axiosClient.get(
        tmbdEndpoints.mediaGenres({ mediaType })
    ),
    MediaCredits: async ({ mediaType, mediaId }) => await axiosClient.get(
        tmbdEndpoints.mediaCredits({ mediaType, mediaId })
    ),
    MediaVideos: async ({ mediaType, mediaId }) => await axiosClient.get(
        tmbdEndpoints.mediaVideos({ mediaType, mediaId })
    ),
    MediaImages: async ({ mediaType, mediaId }) => await axiosClient.get(
        tmbdEndpoints.mediaImages({ mediaType, mediaId })
    ),
    MediaRecommend: async ({ mediaType, mediaId }) => await axiosClient.get(
        tmbdEndpoints.mediaRecommend({ mediaType, mediaId })
    ),
    MediaSearch: async ({ mediaType, query, page }) => await axiosClient.get(
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