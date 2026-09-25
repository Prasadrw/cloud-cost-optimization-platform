import { useEffect, useState } from "react";

import {
    getResources,
    createResource,
    updateResource,
    deleteResource
} from "../services/resource.service";


function useResources() {

    const [resources, setResources] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 5,
    totalPages: 0
});

const fetchResources = async (params = {}) => {

    setLoading(true);
    setError(null);

    try {

        const response = await getResources(params);

        setResources(response.data);

        setPagination(response.pagination);

    } catch (error) {

        console.error(error);

        setError(
            error.message ||
            "Failed to load resources"
        );

    } finally {

        setLoading(false);

    }
};

    useEffect(() => {

        fetchResources();

    }, []);


    const addResource = async (resourceData) => {

        try {

            const response = await createResource(resourceData);

            setResources((previousResources) => [
                ...previousResources,
                response.data
            ]);

            return response.data;

        } catch (error) {

            console.error(error);

            setError(
                error.message ||
                "Failed to create resource"
            );

            throw error;
        }
    };

    const updateResourceById = async (
    resourceId,
    resourceData
) => {

    try {

        const response = await updateResource(
            resourceId,
            resourceData
        );

        setResources((previousResources) =>
            previousResources.map((resource) =>
                resource._id === resourceId
                    ? response.data
                    : resource
            )
        );

        return response.data;

    } catch (error) {

        console.error(error);

        setError(
            error.message ||
            "Failed to update resource"
        );

        throw error;
    }
};

const removeResource = async (resourceId) => {

    try {

        await deleteResource(resourceId);

        setResources((previousResources) =>
            previousResources.filter(
                (resource) =>
                    resource._id !== resourceId
            )
        );

    } catch (error) {

        console.error(error);

        setError(
            error.message ||
            "Failed to delete resource"
        );

        throw error;
    }
};

    return {
    resources,
    loading,
    error,
    addResource,
    updateResourceById,
    removeResource,
    fetchResources,
    pagination
};

}


export default useResources;