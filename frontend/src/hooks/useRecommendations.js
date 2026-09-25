import { useEffect, useState } from "react";

import {
    getRecommendations
} from "../services/recommendation.service";


function useRecommendations() {

    const [recommendations, setRecommendations] =
        useState([]);

    const [totalRecommendations, setTotalRecommendations] =
        useState(0);

    const [totalPotentialSavings, setTotalPotentialSavings] =
        useState(0);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState(null);


    const fetchRecommendations = async () => {

        setLoading(true);
        setError(null);

        try {

            const response =
                await getRecommendations();

            const data =
                response.data;

            setRecommendations(
                data.recommendations || []
            );

            setTotalRecommendations(
                data.totalRecommendations || 0
            );

            setTotalPotentialSavings(
                data.totalPotentialSavings || 0
            );

        } catch (error) {

            console.error(error);

            setError(
                error.message ||
                "Failed to load recommendations"
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        fetchRecommendations();

    }, []);


    return {

        recommendations,

        totalRecommendations,

        totalPotentialSavings,

        loading,

        error,

        fetchRecommendations

    };

}


export default useRecommendations;