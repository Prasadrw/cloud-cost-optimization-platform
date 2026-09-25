const CostSnapshot =
    require("../models/costSnapshot.model");


// =====================================================
// CREATE SNAPSHOT
// =====================================================

const createSnapshot = async (
    snapshotData
) => {

    return await CostSnapshot.create(
        snapshotData
    );

};


// =====================================================
// GET SNAPSHOTS
// =====================================================

const getSnapshotsByUser = async (
    userId,
    startDate,
    endDate
) => {

    return await CostSnapshot.find({

        user: userId,

        date: {
            $gte: startDate,
            $lte: endDate
        }

    })
    .sort({
        date: 1
    });

};


module.exports = {

    createSnapshot,

    getSnapshotsByUser

};