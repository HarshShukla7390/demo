import { Router } from 'express';
const router = Router();

import { getPosts, createPost, getPost, getComments, createComment } from '../controllers/post.controller';

router.route('/')
      .get(getPosts)
      .post(createPost);

router.route('/:id')
      .get(getPost)

router.route('/:id/comments')
      .get(getComments)

router.route('/comment')
      .post(createComment)


export default router;  