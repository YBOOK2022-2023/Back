import { PrismaClient } from '@prisma/client';
import { RequestHandler } from "express";

const createFriendship : RequestHandler =  async (req, res, next) =>{
    var toID = parseInt(req.params.toID);
    
    const prisma = new PrismaClient()

    async function main() {
        const friendship = await prisma.friendship.create({
            data: {
                fromId: 1,
                toId: toID
            },
          })
          res.json(friendship);
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

export default createFriendship;