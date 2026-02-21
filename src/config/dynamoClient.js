const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");
const dotenv = require("dotenv");

dotenv.config();

// Create the DynamoDB client with credentials from env (or IAM role if hosted)
const client = new DynamoDBClient({
    region: process.env.AWS_REGION || "eu-central-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

// Wrap the client with DynamoDBDocumentClient for automatic marshalling/unmarshalling of JS objects
const marshallOptions = {
    convertEmptyValues: false,
    removeUndefinedValues: true,
    convertClassInstanceToMap: false,
};

const unmarshallOptions = {
    wrapNumbers: false,
};

const dynamoClient = DynamoDBDocumentClient.from(client, {
    marshallOptions,
    unmarshallOptions,
});

module.exports = { dynamoClient };
