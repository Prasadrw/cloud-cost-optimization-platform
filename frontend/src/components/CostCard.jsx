function CostCard({ title, value }) {

    return (
        <div className="cost-card">

            <div className="cost-card-title">
                {title}
            </div>

            <div className="cost-card-value">
                {value}
            </div>

        </div>
    );
}

export default CostCard;