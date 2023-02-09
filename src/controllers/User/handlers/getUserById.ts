import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";

const getUserById : RequestHandler = (req, res, next) => {
    var userId : number = parseInt(req.params.id);
    var userEmail : string = res.locals.user.email;
    const prisma = new PrismaClient()

    async function main() {
        const user = await prisma.user.findUnique({
            where: {
              id: userId,
            },
            include: {
                posts: true,
                postLikes: true,
                postComment: true,
                fromFriendship: true,
                toFrienship: true
            }
          })
          res.json(user);
    }

    main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
}

export default getUserById