const { GetCommand, PutCommand } = require("@aws-sdk/lib-dynamodb");
const { dynamoClient } = require("../config/dynamoClient");

const TABLE_NAME = "Peterfolio-CV";
const CV_ID = "main"; // Singleton logic: Always get/update the exact same document ID.

const getCvData = async () => {
    try {
        const params = {
            TableName: TABLE_NAME,
            Key: {
                "main": CV_ID
            }
        };
        const { Item } = await dynamoClient.send(new GetCommand(params));
        return Item || null; // Will return null if Dynamo has no main record yet
    } catch (error) {
        console.error("Error fetching CV from Dynamo:", error);
        throw error;
    }
};

const updateCvData = async (cvData) => {
    try {
        const itemToSave = {
            id: CV_ID,
            ...cvData
        };

        const params = {
            TableName: TABLE_NAME,
            Item: itemToSave
        };

        await dynamoClient.send(new PutCommand(params));
        return itemToSave;
    } catch (error) {
        console.error("Error saving CV to Dynamo:", error);
        throw error;
    }
};

module.exports = {
    getCvData,
    updateCvData
};
