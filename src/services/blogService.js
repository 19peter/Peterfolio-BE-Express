import * as blogModel from '../models/blogModel.js';

const getAllBlogs = async () => {
    return await blogModel.getAllBlogs();
};

const getVisibleBlogs = async () => {
    const allBlogs = await blogModel.getAllBlogs();
    return allBlogs.filter(blog => blog.isVisible !== false);
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
    // Set isVisible to true by default for new blogs
    const dataWithVisibility = { ...blogData, isVisible: true };
    return await blogModel.createBlog(dataWithVisibility);
};

const updateBlog = async (id, blogData) => {
    const blog = await blogModel.updateBlog(id, blogData);
    if (!blog) throw new Error("Blog not found");
    return blog;
};

const toggleBlogVisibility = async (id) => {
    const blog = await blogModel.getBlogById(id);
    if (!blog) throw new Error("Blog not found");

    // If isVisible is undefined, treat it as true (legacy post), so new state is false.
    // If it's true, new state is false. If it's false, new state is true.
    const newVisibility = blog.isVisible === false ? true : false;

    return await blogModel.updateBlog(id, { isVisible: newVisibility });
};

const deleteBlog = async (id) => {
    const success = await blogModel.deleteBlog(id);
    if (!success) throw new Error("Blog not found");
    return success;
};

export {
    getAllBlogs,
    getVisibleBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    toggleBlogVisibility,
    deleteBlog
};
