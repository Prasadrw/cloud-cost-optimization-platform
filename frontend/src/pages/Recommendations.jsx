import useRecommendations
    from "../hooks/useRecommendations";

import RecommendationCard
    from "../components/RecommendationCard";

import LoadingState
    from "../components/LoadingState";

import ErrorState
    from "../components/ErrorState";

import EmptyState
    from "../components/EmptyState";


function Recommendations() {

    const {
        recommendations,
        totalRecommendations,
        totalPotentialSavings,
        loading,
        error,
        fetchRecommendations
    } = useRecommendations();


    if (loading) {

        return <LoadingState />;

    }


    if (error) {

        return (

            <ErrorState
                message={error}
                onRetry={fetchRecommendations}
            />

        );

    }


    return (

        <div>

           <div className="page-header">
    <h1>Cost Optimization Recommendations</h1>
    <p>
        Review recommendations and identify opportunities to reduce cloud costs.
    </p>
</div>


            <div>

                <div>

                    <h2>
                        Recommendations
                    </h2>

                    <p>
                        {totalRecommendations}
                    </p>

                </div>


                <div>

                    <h2>
                        Potential Monthly Savings
                    </h2>

                    <p>
                        ${totalPotentialSavings}
                    </p>

                </div>

            </div>


            <h2>
                Recommendations
            </h2>


            {recommendations.length === 0 ? (

                <EmptyState
                    message="No optimization recommendations available."
                />

            ) : (

                <div>

                    {recommendations.map(
                        (recommendation) => (

                            <RecommendationCard
                                key={
                                    recommendation.resourceId
                                }
                                recommendation={
                                    recommendation
                                }
                            />

                        )
                    )}

                </div>

            )}

        </div>

    );

}


export default Recommendations;