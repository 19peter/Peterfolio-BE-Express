import express from 'express';
const router = express.Router();
import * as blogController from '../controllers/blogController.js';
import auth from '../middleware/auth.js';

router.get('/', blogController.getAllBlogs);
router.get('/admin', auth, blogController.getAllBlogsAdmin);
router.get('/:id', blogController.getBlogById);
router.post('/', auth, blogController.createBlog);
router.put('/:id', auth, blogController.updateBlog);
router.patch('/:id/toggle-visibility', auth, blogController.toggleBlogVisibility);
router.delete('/:id', auth, blogController.deleteBlog);

export default router;
