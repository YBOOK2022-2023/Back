import { PrismaClient } from '@prisma/client';
import { RequestHandler } from "express";

const createPostComment : RequestHandler =  async (req, res, next) =>{
    const userEmail: string = res.locals.user.email;
    const reqText: string = req.body.text;
    var postID = parseInt(req.params.postId);

    if(!reqText){
        throw new Error('missing text');
    }
    
    const prisma = new PrismaClient()

    async function main() {
        const user = await prisma.user.findUnique({
            where: {
              email: userEmail,
            },
          })
          if(user){
            const postComment = await prisma.postComment.create({
                data: {
                    userId: user.id,
                    postId: postID,
                    text: reqText
                },
              })
              res.json(postComment);
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

export default createPostComment;