import privateClient from "../client/private.client";
import publicClient from "../client/public.client";

const userEndpoints = {
    sigin: "user/signin",
    signup: "user/signup",
    getInfo: "user/info",
    passwordUpdate: "user/update-password",
};

const userApi = {
    signin: async ({ username, password }) => {
        try {
            const response = await publicClient.post(
                userEndpoints.sigin,
                { username, password }
            );
            return { response };
        } catch (error) {
            return { error };
        }
    },

    signup: async ({ username, password, confirmPassword, displayName }) => {
        try {
            const response = await publicClient.post(
                userEndpoints.signup,
                { username, password, confirmPassword, displayName }
            );
            return { response };
        } catch (error) {
            return { error };
        }
    },

    getInfo: async () => {
        try {
            const response = await publicClient.get(userEndpoints.getInfo);
            return { response };
        } catch (error) {
            return { error };
        }
    },

    passwordUpdate: async ({ username, newPassword, confirmPassword }) => {
        try {
            const response = await publicClient.put(
                userEndpoints.signup,
                { username, newPassword, confirmPassword }
            );
            return { response };
        } catch (error) {
            return { error };
        }
    }
};

export default userApi;