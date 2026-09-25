function RegionFilter({
    selectedRegion,
    onRegionChange
}) {

    return (
        <div>

            <label>
                Region:
            </label>

            <select
                value={selectedRegion}
                onChange={(event) =>
                    onRegionChange(event.target.value)
                }
            >

                <option value="all">
                    All Regions
                </option>

                <option value="ap-south-1">
                    Mumbai
                </option>

                <option value="us-east-1">
                    US East
                </option>

            </select>

        </div>
    );
}

export default RegionFilter;