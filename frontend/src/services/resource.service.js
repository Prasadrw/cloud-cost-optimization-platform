import { api } from "./api";

export const getResources = async (params = {}) => {

    const query = new URLSearchParams();

    if (params.search) {
        query.append("search", params.search);
    }

    if (params.resourceType) {
        query.append("resourceType", params.resourceType);
    }

    if (params.region) {
        query.append("region", params.region);
    }

    if (params.status) {
        query.append("status", params.status);
    }

    if (params.page) {
        query.append("page", params.page);
    }

    if (params.limit) {
        query.append("limit", params.limit);
    }

    const queryString = query.toString();

    const endpoint = queryString
        ? `/resources?${queryString}`
        : "/resources";

    return await api.get(endpoint);
};


export const createResource = async (resourceData) => {

    return await api.post(
        "/resources",
        resourceData
    );

};

export const updateResource = async (resourceId, resourceData) => {

    return await api.put(
        `/resources/${resourceId}`,
        resourceData
    );

};


export const deleteResource = async (resourceId) => {

    return await api.delete(
        `/resources/${resourceId}`
    );

};