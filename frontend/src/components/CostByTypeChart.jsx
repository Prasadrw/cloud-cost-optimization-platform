import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";


function CostByTypeChart({ data }) {

    if (!data || data.length === 0) {

        return (
            <p>
                No cost data available for chart.
            </p>
        );

    }


    return (

        <div>

            <h2>
                Monthly Cost by Resource Type
            </h2>


            <ResponsiveContainer
                width="100%"
                height={300}
            >

                <BarChart data={data}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        dataKey="resourceType"
                    />

                    <YAxis />

                    <Tooltip />

                    <Bar
                        dataKey="monthlyCost"
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>

    );
}


export default CostByTypeChart;