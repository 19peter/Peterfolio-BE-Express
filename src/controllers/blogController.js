import * as blogService from '../services/blogService.js';

const getAllBlogs = async (req, res, next) => {
    try {
        const blogs = await blogService.getVisibleBlogs();
        res.status(200).json(blogs);
    } catch (error) {
        console.error("Error in getAllBlogs controller:", error);
        next(error);
    }
};

const getAllBlogsAdmin = async (req, res, next) => {
    try {
        const blogs = await blogService.getAllBlogs();
        res.status(200).json(blogs);
    } catch (error) {
        console.error("Error in getAllBlogsAdmin controller:", error);
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

const toggleBlogVisibility = async (req, res, next) => {
    try {
        const updatedBlog = await blogService.toggleBlogVisibility(req.params.id);
        res.status(200).json(updatedBlog);
    } catch (error) {
        console.error(`Error in toggleBlogVisibility controller for ID ${req.params.id}:`, error);
        res.status(404);
        next(error);
    }
};

const getBlogSharePreview = async (req, res, next) => {
    try {
        const blog = await blogService.getBlogById(req.params.id);

        // Construct frontend URL (prefer production, fallback to origin or placeholder)
        const frontendUrl = process.env.FRONTEND_URL || 'https://peterfolio-fe.vercel.app';
        const postUrl = `${frontendUrl}/blog/${blog.id}`;

        // Use thumbnail if available, otherwise default to fallback. 
        // Ensure the URL is absolute for social crawlers.
        let imageUrl = blog.thumbnail || `${frontendUrl}/og-image.png`;
        if (imageUrl && !imageUrl.startsWith('http')) {
            imageUrl = `${frontendUrl}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
        }

        // Simple description from content (strip markdown/truncate)
        const description = blog.content ? blog.content.substring(0, 160).replace(/[#*`]/g, '') + '...' : 'Read more on Peterfolio';

        res.set('Content-Type', 'text/html');
        // Simple escaping for title to prevent breaking HTML
        const safeTitle = blog.title.replace(/</g, "&lt;").replace(/>/g, "&gt;");

        res.status(200).send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="refresh" content="0; url=${postUrl}">
    <title>${safeTitle}</title>
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="article">
    <meta property="og:url" content="${postUrl}">
    <meta property="og:title" content="${safeTitle}">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="${imageUrl}">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="${postUrl}">
    <meta property="twitter:title" content="${safeTitle}">
    <meta property="twitter:description" content="${description}">
    <meta property="twitter:image" content="${imageUrl}">

    <script>
        // JavaScript redirect as primary method
        window.location.replace("${postUrl}");
    </script>
</head>
<body>
    <p>Redirecting to <a href="${postUrl}">${safeTitle}</a>...</p>
</body>
</html>
        `);
    } catch (error) {
        console.error(`Error in getBlogSharePreview for ID ${req.params.id}:`, error);
        res.status(404).send('Post not found');
    }
};

export {
    getAllBlogs,
    getAllBlogsAdmin,
    getBlogById,
    createBlog,
    updateBlog,
    toggleBlogVisibility,
    deleteBlog,
    getBlogSharePreview
};
