import express from "express";
import { body } from "express-validator";
import favouriteController from "../controller/favourite.controller.js";
import userController from "../controller/user.controller.js";
import requestHandler from "../handlers/request.handler.js";
import userModel from "../models/user.model.js";
import tokenMiddleware from "../middlewares/token.middleware.js";

const router = express.Router();

router.post(
    "/signup",
    body("username")
        .exists().withMessage("Username is required")
        .isLength({ min: 8 }).withMessage("username minimum 8 characters")
        .custom(async value => {
            const user = await userModel.findOne({ username: value });
            if (user) return Promise.reject("Username already taken!");
        }),
    body("password")
        .exists().withMessage("Password is required")
        .isLength({ min: 8 }).withMessage("Password minimum 8 characters"),
    body("confirmPassword")
        .exists().withMessage("Confirm Password is required")
        .isLength({ min: 8 }).withMessage("Confirm Password minimum 8 characters")
        .custom((value, { req }) => {
            if (value !== req.body.password) throw new Error("Confirm Password not matched!!")
            return true;
        }),
    body("displayName")
        .exists().withMessage("DisplayName is required")
        .isLength({ min: 8 }).withMessage("DisplayName minimum 8 characters"),
    requestHandler.validate,
    userController.signup
);

router.post(
    "signin",
    body("username")
        .exists().withMessage("Username is required")
        .isLength({ min: 8 }).withMessage("username minimum 8 characters"),
    body("password")
        .exists().withMessage("Password is required")
        .isLength({ min: 8 }).withMessage("Password minimum 8 characters"),
    requestHandler.validate,
    userController.signin
);

router.put(
    "/update-password",
    tokenMiddleware.auth,
    body("password")
        .exists().withMessage("Password is required")
        .isLength({ min: 8 }).withMessage("Password minimum 8 characters"),
    body("newPassword")
        .exists().withMessage("New Password is required")
        .isLength({ min: 8 }).withMessage("New Password minimum 8 characters"),
    body("confirmNewPassword")
        .exists().withMessage("Confirm New Password is required")
        .isLength({ min: 8 }).withMessage("Confirm New Password minimum 8 characters")
        .custom((value, { req }) => {
            if (value !== req.body.newPassword) throw new Error("Confirm New Password not matched!!")
            return true;
        }),
    requestHandler.validate,
    userController.updatePassword
);

router.get(
    "/info",
    tokenMiddleware.auth,
    userController.getInfo
);

router.get(
    "/favourites",
    tokenMiddleware.auth,
    favouriteController.getFavouritesOfUser
);

router.post(
    "/favourites",
    tokenMiddleware.auth,
    body("mediaType")
        .exists().withMessage("MediaType is required")
        .custom(type => ["movie", "tv"].includes(type)).withMessage("MediaType invalid"),
    body("mediaId")
        .exists().withMessage("MediaId is required")
        .isLength({ min: 1 }).withMessage("MidiaId can't be empty"),
    body("mediaTitle")
        .exists().withMessage("MediaTitle is required"),
    body("mediaPoster")
        .exists().withMessage("MediaPoster is required"),
    body("mediaRate")
        .exists().withMessage("MediaRate is required"),
    requestHandler.validate,
    favouriteController.addFavourite
);

router.delete(
    "/favourites/:favouriteId",
    tokenMiddleware.auth,
    favouriteController.removeFavourite
);

export default router;
