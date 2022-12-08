import express from 'express';
import {Request, Response, NextFunction} from 'express';
import User from '../controllers/User';
import checkToken from '../controllers/User/handlers/checkToken';
import cognitoAuth from '../middlewares/cognitoAuth';

const router = express.Router();

// router.use(cognitoAuth)

router.get('/checktoken/:userPoolId&:clientId', checkToken)

export default router