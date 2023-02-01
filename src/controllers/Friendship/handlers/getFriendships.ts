import { PrismaClient } from '@prisma/client';
import { integer } from 'aws-sdk/clients/cloudfront';
import { RequestHandler } from "express";

const getFriendships : RequestHandler =  async (req, res, next) =>{
    const userEmail: string = res.locals.user.email;
    
    const prisma = new PrismaClient()

    async function main() {
        const user = await prisma.user.findUnique({
            where: {
              email: userEmail,
            },
            include: {
                posts: true,
                postLikes: true,
                postComment: true,
                fromFriendship: true,
                toFrienship: true,
                blockedUsers :true,
                blockedByUsers:true
            }
          })
          if(user){
            const friendships = await prisma.friendship.findMany({
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
                },
                include:{
                    from:{
                        select:{
                            id: true,
                            firstname: true,
                            lastname: true,
                            avatarS3Key: true,
                        },
                    } ,
                    to:{
                        select:{
                            id: true,
                            firstname: true,
                            lastname: true,
                            avatarS3Key: true,
                        },
                    }
                }
              })
              const friendshipPending=await prisma.friendship.findMany({
                where:{
                    AND:[
                        {
                            status: 'PENDING'
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
                },
                include:{
                    from:{
                        select:{
                            id: true,
                            firstname: true,
                            lastname: true,
                            avatarS3Key: true,
                        },
                    } ,
                    to:{
                        select:{
                            id: true,
                            firstname: true,
                            lastname: true,
                            avatarS3Key: true,
                        },
                    }
                }
              })
             
                const friendshipCount = await prisma.friendship.count({
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
            
             
              const friendshipsWithUsers = [];
              friendshipsWithUsers.push({user: user,friendships: friendships,friendshipPending:friendshipPending,count:friendshipCount});
  
              res.json(friendshipsWithUsers);
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

export default getFriendships;