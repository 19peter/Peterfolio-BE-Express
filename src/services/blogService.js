const blogModel = require('../models/blogModel');

const getAllBlogs = async () => {
    return await blogModel.getAllBlogs();
};

const getBlogById = async (id) => {
    const blog = await blogModel.getBlogById(id);
    if (!blog) throw new Error("Blog not found");
    return blog;
};

const createBlog = async (blogData) => {
    if (!blogData.title || !blogData.content) {
        throw new Error("Title and content are required");
    }
    return await blogModel.createBlog(blogData);
};

const updateBlog = async (id, blogData) => {
    const blog = await blogModel.updateBlog(id, blogData);
    if (!blog) throw new Error("Blog not found");
    return blog;
};

const deleteBlog = async (id) => {
    const success = await blogModel.deleteBlog(id);
    if (!success) throw new Error("Blog not found");
    return success;
};

module.exports = {
    getAllBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog
};
