const { ScanCommand, GetCommand, PutCommand, DeleteCommand } = require("@aws-sdk/lib-dynamodb");
const { v4: uuidv4 } = require('uuid');
const { dynamoClient } = require("../config/dynamoClient");

const TABLE_NAME = "Peterfolio-Blogs";

const getAllBlogs = async () => {
    try {
        const { Items } = await dynamoClient.send(new ScanCommand({ TableName: TABLE_NAME }));
        return Items || [];
    } catch (error) {
        console.error("Error scanning Blogs from Dynamo:", error);
        throw error;
    }
};

const getBlogById = async (id) => {
    try {
        const params = {
            TableName: TABLE_NAME,
            Key: { id }
        };
        const { Item } = await dynamoClient.send(new GetCommand(params));
        return Item;
    } catch (error) {
        console.error(`Error fetching Blog ${id} from Dynamo:`, error);
        throw error;
    }
};

const createBlog = async (blogData) => {
    try {
        const newBlog = {
            id: uuidv4(),
            ...blogData,
            createdAt: new Date().toISOString()
        };

        const params = {
            TableName: TABLE_NAME,
            Item: newBlog
        };

        await dynamoClient.send(new PutCommand(params));
        return newBlog;
    } catch (error) {
        console.error("Error creating Blog in Dynamo:", error);
        throw error;
    }
};

const updateBlog = async (id, blogData) => {
    try {
        // We will fetch it first, merge, and put it to simulate standard document replacement
        const existing = await getBlogById(id);
        if (!existing) return null;

        const updatedBlog = {
            ...existing,
            ...blogData,
            id, // protect partition key
            updatedAt: new Date().toISOString()
        };

        const params = {
            TableName: TABLE_NAME,
            Item: updatedBlog
        };

        await dynamoClient.send(new PutCommand(params));
        return updatedBlog;
    } catch (error) {
        console.error(`Error updating Blog ${id} in Dynamo:`, error);
        throw error;
    }
};

const deleteBlog = async (id) => {
    try {
        const params = {
            TableName: TABLE_NAME,
            Key: { id }
        };
        await dynamoClient.send(new DeleteCommand(params));
        return true;
    } catch (error) {
        console.error(`Error deleting Blog ${id} in Dynamo:`, error);
        throw error;
    }
};

module.exports = {
    getAllBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog
};
