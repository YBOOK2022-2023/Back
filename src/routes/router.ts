import express from 'express';
import {Request, Response, NextFunction} from 'express';
import postController from '../controllers/Post';
import userController from '../controllers/User';
import frienshipController from '../controllers/Friendship';
import cognitoAuth from '../middlewares/cognitoAuth';
import homeView from './home';

const router = express.Router();

router.get('/', homeView);

router.use(cognitoAuth)

router.get('/token', cognitoAuth);

router.get('/user', userController.getUser);
router.post('/user', userController.createUser);


router.get('/post/:id', postController.getPost);
router.get('/postlike/:id', postController.getPostLike);
router.get('/postcomment/:id', postController.getPostComment);
router.post('/post', postController.createPost);
router.post('/postlike/:postId', postController.createPostLike);
router.post('/postcomment/:postId', postController.createPostComment);

router.post('/friendship/:toID', frienshipController.createFriendship);

export default router