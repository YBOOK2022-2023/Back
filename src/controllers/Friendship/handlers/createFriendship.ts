import { PrismaClient } from '@prisma/client';
import { integer } from 'aws-sdk/clients/cloudfront';
import { RequestHandler } from "express";

const createFriendship : RequestHandler =  async (req, res, next) =>{
    const userEmail: string = res.locals.user.email;
    const toID: integer = parseInt(req.body.toID);
    
    const prisma = new PrismaClient()

    async function main() {
        const user = await prisma.user.findUnique({
            where: {
              email: userEmail,
            }
          })
          if(user){
            const friendship = await prisma.friendship.create({
                data: {
                    fromId: user.id,
                    toId: toID
                },
              })
              res.json(friendship);
          }
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