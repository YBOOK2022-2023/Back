import express from 'express';
import {Request, Response, NextFunction} from 'express';

const HelloRoute = express.Router();

HelloRoute.get('/', (req, res, next) =>{
    res.json({message: `Hello World`})
})

export default HelloRoute