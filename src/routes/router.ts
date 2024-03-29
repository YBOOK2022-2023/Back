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
router.get('/user/:id', userController.getUserById);
router.post('/user', userController.createUser);
router.get('/usersearch/:searchUser', userController.getResearchUser);

router.get('/posts', postController.getPostsHome);
router.get('/postsbyuser', postController.getPostById);
router.get('/postprofile', postController.getProfilePosts);
router.post('/post', postController.createPost);

router.post('/postlike/:postId', postController.createPostLike);
router.get('/postcomment/:postId', postController.getPostComments);
router.post('/postcomment/:postId', postController.createPostComment);


router.get('/friendship', frienshipController.getFriendships);
router.get('/friendship/count', frienshipController.getFriendshipsCount);
router.post('/friendship', frienshipController.createFriendship);
router.put('/friendship/:friendshipId', frienshipController.putFriendship);

export default router