import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function CostTrendChart({ data }) {

    if (!data || data.length === 0) {
        return (
            <div>
                <h2>Cost Trends</h2>
                <p>No cost trend data available.</p>
            </div>
        );
    }

    const formattedData = data.map((item) => ({
        ...item,
        date: new Date(item.date).toLocaleDateString(
            "en-US",
            {
                month: "short",
                day: "numeric"
            }
        )
    }));

    return (
        <div>
            <h2>Cost Trends</h2>

            <ResponsiveContainer
                width="100%"
                height={300}
            >
                <LineChart data={formattedData}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="date" />

                    <YAxis />

                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="totalCost"
                        stroke="#2563eb"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                    />

                </LineChart>
            </ResponsiveContainer>

        </div>
    );
}

export default CostTrendChart;