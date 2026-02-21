import express from 'express';
const router = express.Router();
import * as blogController from '../controllers/blogController.js';
import auth from '../middleware/auth.js';

router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getBlogById);
router.post('/', auth, blogController.createBlog);
router.put('/:id', auth, blogController.updateBlog);
router.delete('/:id', auth, blogController.deleteBlog);

export default router;
