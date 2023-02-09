import { PrismaClient } from '@prisma/client';
import { RequestHandler } from "express";

const createPostLike : RequestHandler =  async (req, res, next) =>{
    const userEmail: string = res.locals.user.email;
    var postID = parseInt(req.params.postId);
    
    const prisma = new PrismaClient()

    async function main() {
        const user = await prisma.user.findUnique({
            where: {
              email: userEmail,
            },
          })
          if(user){
            const postLike = await prisma.postLike.create({
                data: {
                    userId: user.id,
                    postId: postID,
                },
              })
              res.json(postLike);
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

export default createPostLike;