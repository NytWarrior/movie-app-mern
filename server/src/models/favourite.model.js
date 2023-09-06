import mongoose from "mongoose";
import modelOptions from "./model.options";

export default mongoose.model(
    "Favourite",
    mongoose.Schema({
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        MediaType: {
            type: String,
            enum: ["tv", "movie"],
            required: true
        },
        mediaId: {
            type: String,
            required: true
        },
        mediaTitle: {
            type: String,
            required: true
        },
        mediaPoster: {
            type: String,
            required: true
        },
        mediaRate: {
            type: String,
            required: true
        }
    }, modelOptions)
);