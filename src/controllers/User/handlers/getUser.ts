import { RequestHandler } from "express";
import { getModelUser, users } from "../../../models/User";
export type UserRouteParams = {
    id: string
}
const getUser : RequestHandler<UserRouteParams> = (req, res, next) => {
    try {
        const user = getModelUser(parseInt(req.params.id))
        if(!user) throw new Error('not_found')

        res.json(user)
    } catch (error) {
        next(error)
    }
}

export default getUser