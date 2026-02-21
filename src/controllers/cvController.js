import * as cvService from '../services/cvService.js';

const getCvData = async (req, res, next) => {
    try {
        const data = await cvService.getCv();
        res.status(200).json(data || {});
    } catch (error) {
        console.error("Error in getCvData controller:", error);
        next(error);
    }
};

const updateCvData = async (req, res, next) => {
    try {
        const newData = req.body;
        const updatedData = await cvService.updateCv(newData);
        res.status(200).json(updatedData);
    } catch (error) {
        console.error("Error in updateCvData controller:", error);
        res.status(400); // Bad Request
        next(error);
    }
};

export {
    getCvData,
    updateCvData
};
