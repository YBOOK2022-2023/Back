import { PrismaClient } from '@prisma/client';
import { integer } from 'aws-sdk/clients/cloudfront';
import { RequestHandler } from "express";

const putFriendship : RequestHandler =  async (req, res, next) =>{
    const userEmail: string = res.locals.user.email;
    const friendshipId: integer = parseInt(req.params.friendshipId);
    const statusReq = req.body.status;
    console.log(statusReq);
    console.log(friendshipId)
    if(!statusReq){
        throw new Error('missing friendship status');
    }
    
    const prisma = new PrismaClient()

    async function main() {
        const user = await prisma.user.findUnique({
            where: {
              email: userEmail,
            },
          })
          if(user){
            const idFriendship = await prisma.friendship.findFirst({
                where: {
                  id: friendshipId,
                },
              });
              if(idFriendship){
                const friendship = await prisma.friendship.update({
                    where: {
                        id: idFriendship.id
                    },
                    data:{
                        status: statusReq
                    }
                  });
                  res.json(friendship);
              }
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

export default putFriendship;