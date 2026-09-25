import { api } from "./api";

export const getCostByService = async () => {
    return await api.get("/analysis/services");
};

export const getCostByRegion = async () => {
    return await api.get("/analysis/regions");
};

export const getCostTrends = async () => {
    return await api.get("/analysis/trends");
};