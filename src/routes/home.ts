import { PrismaClient } from '@prisma/client';
import { RequestHandler } from "express";

const homeView : RequestHandler =  async (req, res, next) =>{
    res.json('home');
}

export default homeView;