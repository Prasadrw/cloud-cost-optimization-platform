import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function CostByRegionChart({ data }) {

    if (!data || data.length === 0) {
        return (
            <div>
                <h2>Cost By Region</h2>
                <p>No regional cost data available.</p>
            </div>
        );
    }

    return (
        <div>

            <h2>
                Cost By Region
            </h2>

            <ResponsiveContainer
                width="100%"
                height={300}
            >

                <BarChart data={data}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        dataKey="region"
                    />

                    <YAxis />

                    <Tooltip />

                    <Bar
                        dataKey="monthlyCost"
                        name="Monthly Cost"
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>
    );
}

export default CostByRegionChart;