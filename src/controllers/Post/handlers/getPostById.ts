import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";

const getPostById: RequestHandler=(req, res, next) => {
  const userEmail: string = res.locals.user.email;
    
     const prisma = new PrismaClient();
     
    async function main() {
        const user = await prisma.user.findUnique({
            where: {
              email: userEmail,
            },
          })
        if(user){
            const user_Id = user.id;
            const post =await prisma.post.findMany({
                where: {
                    userId: user_Id,
                },
                include: {
                    user:true,
                    postLikes: true,
                    postComments: true,
                    postAttachments: true,
                    
                }

            })
        res.json(post);
        } 

    }
    main()
    .then(async() => {
        await prisma.$disconnect();
    })
    .catch(async(e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    }); 
};

export default getPostById