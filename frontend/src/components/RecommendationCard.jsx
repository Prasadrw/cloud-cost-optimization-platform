function RecommendationCard({
    recommendation
}) {

    return (

        <div>

            <h3>
                {recommendation.resourceName}
            </h3>

            <p>
                Type: {recommendation.resourceType}
            </p>

            <p>
                Region: {recommendation.region}
            </p>

            <p>
                Severity: {recommendation.severity}
            </p>

            <p>
                {recommendation.message}
            </p>

            <p>
                Recommendation:
                {" "}
                {recommendation.recommendation}
            </p>

            <p>
                Potential Monthly Savings: $
                {recommendation.potentialMonthlySavings}
            </p>

        </div>

    );

}


export default RecommendationCard;