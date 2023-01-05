import { PrismaClient } from '@prisma/client';
import { RequestHandler } from "express";

const createPost : RequestHandler =  async (req, res, next) =>{
    const userEmail = res.locals.user;
    
    const prisma = new PrismaClient()

    async function main() {
        const user = await prisma.user.findUnique({
            where: {
              email: userEmail,
            },
          })

          console.log(user);

        // const post = await prisma.post.create({
        //     data: {
        //         htmlContent: "le post de l'année",
        //         userId: 1,
        //     },
        //   })
        //   res.json(post);
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