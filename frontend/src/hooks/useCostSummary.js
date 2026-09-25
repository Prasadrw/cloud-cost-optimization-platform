import { useEffect, useState } from "react";

import { getCostSummary } from "../services/cost.service";


function useCostSummary() {

    const [summary, setSummary] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);


    const fetchCostSummary = async () => {

        setLoading(true);
        setError(null);

        try {

            const response = await getCostSummary();

            setSummary(response.data);

        } catch (error) {

            console.error(error);

            setError(
                error.message ||
                "Failed to load cost summary"
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        fetchCostSummary();

    }, []);


    return {
        summary,
        loading,
        error,
        fetchCostSummary
    };
}


export default useCostSummary;