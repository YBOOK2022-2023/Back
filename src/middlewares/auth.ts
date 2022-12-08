import { RequestHandler } from "express";
import { users } from "../models/User";

const AuthMiddleware: RequestHandler = (req, res, next)=> {
    try{
        const username = req.headers['user-id']
        const password = req.headers['user-pwd']

        if(!(username && password)) throw new Error('missing_auth_parameters')

        const userFound = users.find((user) => user.firstname === username && user.pwd === password)

        if(!userFound) throw new Error('bad_auth')
        next()
    } catch(error){
        next(error)
    }
}

export default AuthMiddleware