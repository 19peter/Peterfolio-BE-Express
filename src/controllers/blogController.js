import * as blogService from '../services/blogService.js';

const getAllBlogs = async (req, res, next) => {
    try {
        const blogs = await blogService.getAllBlogs();
        res.status(200).json(blogs);
    } catch (error) {
        console.error("Error in getAllBlogs controller:", error);
        next(error);
    }
};

const getBlogById = async (req, res, next) => {
    try {
        const blog = await blogService.getBlogById(req.params.id);
        res.status(200).json(blog);
    } catch (error) {
        console.error(`Error in getBlogById controller for ID ${req.params.id}:`, error);
        res.status(404);
        next(error);
    }
};

const createBlog = async (req, res, next) => {
    try {
        const newBlog = await blogService.createBlog(req.body);
        res.status(201).json(newBlog);
    } catch (error) {
        console.error("Error in createBlog controller:", error);
        res.status(400);
        next(error);
    }
};

const updateBlog = async (req, res, next) => {
    try {
        const updatedBlog = await blogService.updateBlog(req.params.id, req.body);
        res.status(200).json(updatedBlog);
    } catch (error) {
        console.error(`Error in updateBlog controller for ID ${req.params.id}:`, error);
        res.status(404);
        next(error);
    }
};

const deleteBlog = async (req, res, next) => {
    try {
        await blogService.deleteBlog(req.params.id);
        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        console.error(`Error in deleteBlog controller for ID ${req.params.id}:`, error);
        res.status(404);
        next(error);
    }
};

export {
    getAllBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog
};
