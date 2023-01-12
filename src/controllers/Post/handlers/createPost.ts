import { PrismaClient } from '@prisma/client';
import { RequestHandler } from "express";

const createPost : RequestHandler =  async (req, res, next) =>{
    const userEmail: string = res.locals.user.email;
    const reqHtml: string = req.body.htmlContent;
    if(!reqHtml){
        throw new Error('missing html Content');
    }
    const prisma = new PrismaClient()

    async function main() {
        const user = await prisma.user.findUnique({
            where: {
              email: userEmail,
            },
          })
          if(user){
            const post = await prisma.post.create({
                data: {
                    htmlContent: reqHtml,
                    userId: user.id,
                },
              })
              res.json(post);
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

export default createPost;