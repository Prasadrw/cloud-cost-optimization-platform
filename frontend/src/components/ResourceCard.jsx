function ResourceCard({
    resource,
    onEdit,
    onDelete
}) {

    return (
        <div>

            <h3>
                {resource.name}
            </h3>

            <p>
                Resource ID: {resource.resourceId}
            </p>

            <p>
                Type: {resource.resourceType}
            </p>

            <p>
                Region: {resource.region}
            </p>

            <p>
                Hourly Price: ${resource.hourlyPrice}
            </p>

            <p>
                Estimated Monthly Cost: $
                {resource.estimatedMonthlyCost}
            </p>

            <button
                onClick={() => onEdit(resource)}
            >
                Edit
            </button>

            <button
                onClick={() => onDelete(resource._id)}
            >
                Delete
            </button>

        </div>
    );
}

export default ResourceCard;