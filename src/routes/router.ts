import express from 'express';
import {Request, Response, NextFunction} from 'express';
import User from '../controllers/User';
import checkToken from '../controllers/User/handlers/checkToken';
import AuthMiddleware from '../middlewares/auth';

const router = express.Router();

// HelloRoute.use(AuthMiddleware)

router.get('/checktoken/:userPoolId&:clientId', checkToken)

export default router