import mongoose from "mongoose";
import crypto from "crypto";
import modelOptions from "./model.options";

const userSchema = new mongoose.Scchema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    displayName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    salt: {
        type: String,
        required: true,
        select: false
    }
}, modelOptions)

userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.password = crypto.pbkdf2Sync(
        password,
        this.salt,
        1000,
        64,
        "sha512"
    ).toString("hex");
};

userSchema.methods.validPassword = function (password) {
    const hash = crypto.pbkdf2Sync(
        password,
        this.salt,
        1000,
        64,
        "sha512"
    ).toString("hex");

    return this.password === hash;
};

const userSchema = mongoose.model("USer", userSchema);
export default userModel;