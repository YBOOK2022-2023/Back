import { RequestHandler } from "express";
import { PrismaClient } from '@prisma/client';

const getPost : RequestHandler = (req, res, next) => {
    var token = req.headers['authorization'];
    var idPost = parseInt(req.params.id);

    const prisma = new PrismaClient()

    async function main() {
        const postComments = await prisma.postComment.findMany({
            where: {
                postId: idPost,
            },
          })
          res.json(postComments);
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

export default getPost