import { api } from "./api";

export const getCostSummary = async () => {
    return await api.get("/analysis/summary");
};