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

router.get('/posts', postController.getPostsHome);
router.post('/post', postController.createPost);
router.post('/postlike/:postId', postController.createPostLike);
router.get('/postcomment/:id', postController.getPostComments);
router.post('/postcomment/:postId', postController.createPostComment);


router.get('/friendship', frienshipController.getFriendships);
router.get('/friendship/count', frienshipController.getFriendshipsCount);
router.post('/friendship/:toID', frienshipController.createFriendship);
router.put('/friendship/:fromID', frienshipController.putFriendship);

export default router