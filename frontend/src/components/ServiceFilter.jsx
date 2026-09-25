function ServiceFilter({
    selectedService,
    onServiceChange
}) {

    return (
        <div>

            <label>
                Service:
            </label>

            <select
                value={selectedService}
                onChange={(event) =>
                    onServiceChange(event.target.value)
                }
            >

                <option value="all">
                    All Services
                </option>

                <option value="EC2">
                    EC2
                </option>

                <option value="S3">
                    S3
                </option>

                <option value="RDS">
                    RDS
                </option>

            </select>

        </div>
    );
}

export default ServiceFilter;