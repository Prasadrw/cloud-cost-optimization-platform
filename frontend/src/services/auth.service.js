import { api } from "./api";

export const registerUser = async (userData) => {
    return await api.post(
        "/auth/register",
        userData
    );
};

export const loginUser = async (userData) => {

    const response = await api.post(
        "/auth/login",
        userData
    );

    const token = response.data.token;

    localStorage.setItem("token", token);

    return response;
};