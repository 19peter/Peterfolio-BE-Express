const cvModel = require('../models/cvModel');

const getCv = async () => {
    return await cvModel.getCvData();
};

const updateCv = async (newCvData) => {
    if (!newCvData) {
        throw new Error("Missing CV data");
    }
    return await cvModel.updateCvData(newCvData);
};

module.exports = {
    getCv,
    updateCv
};
