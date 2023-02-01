import { PrismaClient } from '@prisma/client';
import { RequestHandler } from "express";

const getResearchUser : RequestHandler = (req, res, next) => {
    var userEmail : string = res.locals.user.email;
    var searchString : string = req.params.searchUser;
    const prisma = new PrismaClient()

    async function main() {
        const user = await prisma.user.findUnique({
            where: {
              email: userEmail,
            }
          })
          if(user){
            const users= await prisma.user.findMany({
                where:{
                     OR:[
                            {  
                                firstname: {
                                    contains: searchString,
                                    mode: 'insensitive'
                                    },
                            },
                            { 
                                lastname: { 
                                    contains: searchString 
                                    ,mode: 'insensitive'
                                } 
                            }
                            ,]
                        ,NOT:{
                            OR:[
                                {
                                    fromFriendship:{
                                      some:{
                                        OR:[
                                            {
                                                fromId: user.id
                                            },
                                            {
                                                toId: user.id
                                            }
                                       ] 
                                      }
                                    }
                                },{
                                    toFrienship:{
                                        some:{
                                            OR:[
                                                {
                                                    fromId: user.id
                                                },
                                                {
                                                    toId: user.id
                                                }
                                           ] 
                                        }
                                    }
                                }
                            ]    
                        }
                    }
                       
            })
            res.json(users);
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

export default getResearchUser;