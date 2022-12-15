import { RequestHandler } from "express";

const getConversation : RequestHandler = (req, res, next) => {
    var token = req.headers['authorization'];
    try {
        
    } catch (error) {
        next(error)
    }
}

export default getConversation