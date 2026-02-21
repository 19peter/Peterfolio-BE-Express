const { DynamoDBClient, CreateTableCommand, ListTablesCommand } = require("@aws-sdk/client-dynamodb");
const dotenv = require("dotenv");

dotenv.config();

const client = new DynamoDBClient({
    region: process.env.AWS_REGION || "us-east-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

const createTableIfNotExists = async (tableName) => {
    try {
        const { TableNames } = await client.send(new ListTablesCommand({}));
        if (TableNames.includes(tableName)) {
            console.log(`Table ${tableName} already exists. Skipping creation.`);
            return;
        }

        console.log(`Creating table: ${tableName}...`);
        const params = {
            TableName: tableName,
            KeySchema: [
                { AttributeName: "id", KeyType: "HASH" }  // Partition key
            ],
            AttributeDefinitions: [
                { AttributeName: "id", AttributeType: "S" } // String type
            ],
            BillingMode: "PAY_PER_REQUEST" // Free tier friendly
        };
        await client.send(new CreateTableCommand(params));
        console.log(`Successfully created table: ${tableName}`);
    } catch (error) {
        console.error(`Error managing table ${tableName}:`, error);
    }
};

const runInit = async () => {
    console.log("Initializing DynamoDB Tables for Peterfolio...");
    await createTableIfNotExists("Peterfolio-CV");
    await createTableIfNotExists("Peterfolio-Blogs");
    console.log("Initialization complete!");
};

runInit();
