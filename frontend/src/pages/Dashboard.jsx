import { useEffect, useState } from "react";
import "./Dashboard.css";

import { getCostSummary } from "../services/cost.service";

import {
    getCostByService,
    getCostTrends,
    getCostByRegion
} from "../services/analysis.service";

import CostCard from "../components/CostCard";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";

import CostByTypeChart from "../components/CostByTypeChart";
import CostTrendChart from "../components/CostTrendChart";
import CostByRegionChart from "../components/CostByRegionChart";


function Dashboard() {

    const [costData, setCostData] = useState(null);

    const [serviceCosts, setServiceCosts] = useState([]);

    const [trendData, setTrendData] = useState([]);

    const [regionCosts, setRegionCosts] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);


    // =====================================================
    // FETCH DASHBOARD DATA
    // =====================================================

    const fetchCostData = async () => {

        setLoading(true);
        setError(null);

        try {

            const [
                summaryResponse,
                serviceResponse,
                regionResponse,
                trendResponse
            ] = await Promise.all([

                getCostSummary(),

                getCostByService(),

                getCostByRegion(),

                getCostTrends()

            ]);


            // =========================
            // SUMMARY
            // =========================

            setCostData(
                summaryResponse.data
            );


            // =========================
            // SERVICE COSTS
            // =========================

            setServiceCosts(
                serviceResponse.data || []
            );


            // =========================
            // REGION COSTS
            // =========================

            setRegionCosts(
                regionResponse.data || []
            );


            // =========================
            // COST TRENDS
            // =========================

            setTrendData(
                trendResponse.data || []
            );

        } catch (error) {

            console.error(
                "Dashboard error:",
                error
            );

            setError(
                error.message ||
                "Failed to load dashboard data"
            );

        } finally {

            setLoading(false);

        }

    };


    // =====================================================
    // LOAD DASHBOARD
    // =====================================================

    useEffect(() => {

        fetchCostData();

    }, []);


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return <LoadingState />;

    }


    // =====================================================
    // ERROR
    // =====================================================

    if (error) {

        return (

            <ErrorState
                message={error}
                onRetry={fetchCostData}
            />

        );

    }


    // =====================================================
    // EMPTY
    // =====================================================

    if (!costData) {

        return (

            <EmptyState
                message="No cost data available."
            />

        );

    }


    // =====================================================
    // DASHBOARD UI
    // =====================================================

    return (

        <div className="dashboard-page">


            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <div className="dashboard-header">

                <h1>
                    Cloud Cost Dashboard
                </h1>

                <p>
                    Monitor your cloud spending and identify
                    opportunities to optimize costs.
                </p>

            </div>


            {/* =================================================
                SUMMARY CARDS
            ================================================= */}

            <div className="dashboard-summary">

                <CostCard
                    title="Monthly Cost"
                    value={`${
                        costData.currency || "USD"
                    } ${
                        costData.totalMonthlyCost || 0
                    }`}
                />


                <CostCard
                    title="Resources"
                    value={
                        costData.resourceCount || 0
                    }
                />


                <CostCard
                    title="Services"
                    value={
                        costData.serviceCount || 0
                    }
                />


                <CostCard
                    title="Regions"
                    value={
                        costData.regionCount || 0
                    }
                />

            </div>


            {/* =================================================
                COST TRENDS
            ================================================= */}

            <div className="dashboard-section">

                <div className="dashboard-section-header">

                    <h2>
                        Cost Trends
                    </h2>

                </div>


                {trendData.length === 0 ? (

                    <div className="dashboard-empty">

                        No cost trend data available.

                    </div>

                ) : (

                    <div className="dashboard-chart">

                        <CostTrendChart
                            data={trendData}
                        />

                    </div>

                )}

            </div>


            {/* =================================================
                COST BY SERVICE
            ================================================= */}

            <div className="dashboard-section">

                <div className="dashboard-section-header">

                    <h2>
                        Cost By Service
                    </h2>

                </div>


                {serviceCosts.length === 0 ? (

                    <div className="dashboard-empty">

                        No service cost data available.

                    </div>

                ) : (

                    <div className="service-grid">

                        {serviceCosts.map(
                            (item) => (

                                <div
                                    className="service-item"
                                    key={item.service}
                                >

                                    <h3>
                                        {item.service}
                                    </h3>

                                    <p>
                                        Monthly Cost: $
                                        {item.monthlyCost}
                                    </p>

                                </div>

                            )
                        )}

                    </div>

                )}

            </div>


            {/* =================================================
                COST BY REGION
            ================================================= */}

            <div className="dashboard-section">

                <div className="dashboard-section-header">

                    <h2>
                        Cost By Region
                    </h2>

                </div>


                {regionCosts.length === 0 ? (

                    <div className="dashboard-empty">

                        No region cost data available.

                    </div>

                ) : (

                    <>

                        <div className="dashboard-chart">

                            <CostByRegionChart
                                data={regionCosts}
                            />

                        </div>


                        <div className="region-grid">

                            {regionCosts.map(
                                (item) => (

                                    <div
                                        className="region-item"
                                        key={item.region}
                                    >

                                        <h3>
                                            {item.region}
                                        </h3>

                                        <p>
                                            Monthly Cost: $
                                            {item.monthlyCost}
                                        </p>

                                    </div>

                                )
                            )}

                        </div>

                    </>

                )}

            </div>


            {/* =================================================
                COST BY RESOURCE TYPE
            ================================================= */}

            <div className="dashboard-section">

                <div className="dashboard-section-header">

                    <h2>
                        Cost By Resource Type
                    </h2>

                </div>


                {costData.costByType &&
                costData.costByType.length > 0 ? (

                    <>

                        <div className="dashboard-chart">

                            <CostByTypeChart
                                data={
                                    costData.costByType
                                }
                            />

                        </div>


                        <div className="resource-type-grid">

                            {costData.costByType.map(
                                (item) => (

                                    <div
                                        className="resource-type-item"
                                        key={
                                            item.resourceType
                                        }
                                    >

                                        <h3>
                                            {
                                                item.resourceType
                                            }
                                        </h3>

                                        <p>
                                            Monthly Cost: $
                                            {
                                                item.monthlyCost
                                            }
                                        </p>

                                    </div>

                                )
                            )}

                        </div>

                    </>

                ) : (

                    <div className="dashboard-empty">

                        No resource type cost data available.

                    </div>

                )}

            </div>


            {/* =================================================
                COST BREAKDOWN
            ================================================= */}

            <div className="dashboard-section">

                <div className="dashboard-section-header">

                    <h2>
                        Cost Breakdown
                    </h2>

                </div>


                {!costData.costBreakdown ||
                costData.costBreakdown.length === 0 ? (

                    <div className="dashboard-empty">

                        No cost breakdown available.

                    </div>

                ) : (

                    <div className="cost-breakdown">

                        {costData.costBreakdown.map(
                            (item) => (

                                <div
                                    className="cost-breakdown-item"
                                    key={
                                        item.resourceId
                                    }
                                >

                                    <div>

                                        <div className="cost-breakdown-label">
                                            Resource
                                        </div>

                                        <div className="cost-breakdown-name">
                                            {item.name}
                                        </div>

                                    </div>


                                    <div>

                                        <div className="cost-breakdown-label">
                                            Type
                                        </div>

                                        <div className="cost-breakdown-value">
                                            {
                                                item.resourceType
                                            }
                                        </div>

                                    </div>


                                    <div>

                                        <div className="cost-breakdown-label">
                                            Region
                                        </div>

                                        <div className="cost-breakdown-value">
                                            {item.region}
                                        </div>

                                    </div>


                                    <div>

                                        <div className="cost-breakdown-label">
                                            Monthly Cost
                                        </div>

                                        <div className="cost-breakdown-value">
                                            $
                                            {
                                                item.monthlyCost
                                            }
                                        </div>

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                )}

            </div>


        </div>

    );

}


export default Dashboard;