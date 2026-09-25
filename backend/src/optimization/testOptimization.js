const {
    checkUnderutilizedEc2
} = require("./rules/underutilizedEc2.rule");

const resource = {
    _id: "123",
    service: "EC2",
    cpuUtilization: 10,
    monthlyCost: 100
};

const result =
    checkUnderutilizedEc2(resource);

console.log(result);