import { PrismaClient } from '@prisma/client';
import { integer } from 'aws-sdk/clients/cloudfront';
import { RequestHandler } from "express";

const getFriendshipsCount : RequestHandler =  async (req, res, next) =>{
    const userEmail: string = res.locals.user.email;
    
    const prisma = new PrismaClient()

    async function main() {
        const user = await prisma.user.findUnique({
            where: {
              email: userEmail,
            },
          })
          if(user){
            const friendships = await prisma.friendship.count({
                where:{
                    AND:[
                        {
                            status: 'ACCEPTED'
                        },
                        {
                           OR:[
                                {
                                    fromId: user.id
                                },
                                {
                                    toId: user.id
                                }
                           ] 
                        }
                    ]
                }
              })
              res.json(friendships);
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

export default getFriendshipsCount;