import responseHandler from "../handlers/response.handler.js";
import tokenMiddleware from "../middlewares/token.middleware.js";
import tmbdApi from "../tmbd/tmbd.api.js";
import userModel from "../models/user.model.js";
import favouriteModel from "../models/favourite.model.js";
import reviewModel from "../models/review.model.js";

const getList = async (req, res) => {
    try {
        const { page } = req.query;
        const { mediaType, mediaCategory } = req.params;

        const response = await tmbdApi.mediaList({ mediaType, mediaCategory, page });
        return responseHandler.ok(res, response);
    } catch {
        responseHandler.error(res);
    }
};

const getGenres = async (req, res) => {
    try {
        const { mediaType } = req.params;

        const response = await tmbdApi.mediaGenres({ mediaType });
        return responseHandler.ok(res, response);
    } catch {
        responseHandler.error(res);
    }
};

const search = async (req, res) => {
    try {
        const { mediaType } = req.params;
        const { query, page } = req.query;

        const response = await tmbdApi.mediaSearch({
            query,
            page,
            mediaType: mediaType === "people" ? "person" : mediaType
        });
        return responseHandler.ok(res, response);
    } catch {
        responseHandler.error(res);
    }
};

const getDetail = async (req, res) => {
    try {
        const { mediaType, mediaId } = req.params;

        const params = { mediaType, mediaId };

        const media = await tmbdApi.mediaDetail(params);
        media.credits = await tmbdApi.mediaCredits(params);

        const videos = await tmbdApi.mediaVideos(params);
        media.videos = videos;

        const recommend = await tmbdApi.mediaRecommend(params);
        media.recommend = recommend.results;

        media.images = await tmbdApi.mediaImages(params);

        const tokenDecoded = tokenMiddleware.tokenDecode(req);

        if (tokenDecoded) {
            const user = await userModel.findById(tokenDecoded.data);

            if (user) {
                const isFavourite = await favouriteModel.findOne({ user: user.id, mediaId });
                media.isFavourite = isFavourite !== null;
            }
        }

        media.reviews = await reviewModel.find({ mediaId }).populate("user").sort("-createdAt");

        responseHandler.ok(res, media);
    } catch {
        responseHandler.error(res);
    }
}

export default { getList, getGenres, search, getDetail };