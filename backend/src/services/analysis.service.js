const resourceRepository =
    require("../repositories/resource.repository");

const costSnapshotRepository =
    require("../repositories/costSnapshot.repository");

const {
    calculateMonthlyCost
} = require("../engines/cost.engine");


// =====================================================
// GET COST SUMMARY
// =====================================================

const getSummary = async (userId) => {

    const resources =
        await resourceRepository.getResourcesByUser(
            userId,
            {},
            0,
            1000
        );

    let totalMonthlyCost = 0;

    const services = new Set();
    const regions = new Set();

    const costBreakdown = [];
    const costByType = {};


    for (const resource of resources) {

        if (
            typeof resource.hourlyPrice !== "number"
        ) {
            continue;
        }


        const monthlyCost =
            calculateMonthlyCost({
                hourlyPrice:
                    resource.hourlyPrice
            });


        totalMonthlyCost += monthlyCost;


        // Services

        if (resource.service) {
            services.add(resource.service);
        }


        // Regions

        if (resource.region) {
            regions.add(resource.region);
        }


        // Cost by resource type

        if (
            !costByType[
                resource.resourceType
            ]
        ) {
            costByType[
                resource.resourceType
            ] = 0;
        }


        costByType[
            resource.resourceType
        ] += monthlyCost;


        // Cost breakdown

        costBreakdown.push({

            resourceId:
                resource._id,

            name:
                resource.name,

            resourceType:
                resource.resourceType,

            region:
                resource.region,

            monthlyCost:
                Number(
                    monthlyCost.toFixed(2)
                )

        });

    }


    const costByTypeArray =
        Object.entries(costByType)
            .map(
                ([resourceType, monthlyCost]) => ({

                    resourceType,

                    monthlyCost:
                        Number(
                            monthlyCost.toFixed(2)
                        )

                })
            );


    const summary = {

        totalMonthlyCost:
            Number(
                totalMonthlyCost.toFixed(2)
            ),

        currency: "USD",

        resourceCount:
            resources.length,

        serviceCount:
            services.size,

        regionCount:
            regions.size,

        costBreakdown,

        costByType:
            costByTypeArray

    };


    // =================================================
    // CREATE COST SNAPSHOT
    // =================================================

    await costSnapshotRepository.createSnapshot({

        user: userId,

        date: new Date(),

        totalCost:
            summary.totalMonthlyCost,

        currency: "USD"

    });


    return summary;

};


// =====================================================
// COST BY SERVICE
// =====================================================

const getCostByService = async (userId) => {

    const resources =
        await resourceRepository.getResourcesByUser(
            userId,
            {},
            0,
            1000
        );


    const serviceCosts = {};


    for (const resource of resources) {

        if (!resource.service) {
            continue;
        }


        if (
            typeof resource.hourlyPrice !== "number"
        ) {
            continue;
        }


        const monthlyCost =
            calculateMonthlyCost({

                hourlyPrice:
                    resource.hourlyPrice

            });


        if (
            !serviceCosts[
                resource.service
            ]
        ) {

            serviceCosts[
                resource.service
            ] = 0;

        }


        serviceCosts[
            resource.service
        ] += monthlyCost;

    }


    return Object.entries(serviceCosts)
        .map(
            ([service, monthlyCost]) => ({

                service,

                monthlyCost:
                    Number(
                        monthlyCost.toFixed(2)
                    )

            })
        );

};


// =====================================================
// COST BY REGION
// =====================================================

const getCostByRegion = async (userId) => {

    const resources =
        await resourceRepository.getResourcesByUser(
            userId,
            {},
            0,
            1000
        );


    const regionCosts = {};


    for (const resource of resources) {

        if (!resource.region) {
            continue;
        }


        if (
            typeof resource.hourlyPrice !== "number"
        ) {
            continue;
        }


        const monthlyCost =
            calculateMonthlyCost({

                hourlyPrice:
                    resource.hourlyPrice

            });


        if (
            !regionCosts[
                resource.region
            ]
        ) {

            regionCosts[
                resource.region
            ] = 0;

        }


        regionCosts[
            resource.region
        ] += monthlyCost;

    }


    return Object.entries(regionCosts)
        .map(
            ([region, monthlyCost]) => ({

                region,

                monthlyCost:
                    Number(
                        monthlyCost.toFixed(2)
                    )

            })
        )
        .sort(
            (a, b) =>
                b.monthlyCost -
                a.monthlyCost
        );

};


// =====================================================
// COST TRENDS
// =====================================================

const getCostTrends = async (userId) => {

    // Last 30 days

    const endDate = new Date();

    const startDate = new Date();

    startDate.setDate(
        startDate.getDate() - 30
    );


    const snapshots =
        await costSnapshotRepository
            .getSnapshotsByUser(
                userId,
                startDate,
                endDate
            );


    return snapshots.map(
        (snapshot) => ({

            date:
                snapshot.date,

            totalCost:
                snapshot.totalCost,

            currency:
                snapshot.currency

        })
    );

};


module.exports = {

    getSummary,

    getCostByService,

    getCostByRegion,

    getCostTrends

};