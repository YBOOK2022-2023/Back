import { RequestHandler } from "express";
import { PrismaClient } from '@prisma/client';
import { integer } from "aws-sdk/clients/cloudfront";

const getPost : RequestHandler = (req, res, next) => {
    var idPost : integer = parseInt(req.params.id);

    const prisma = new PrismaClient()

    async function main() {
        const post = await prisma.post.findUnique({
            where: {
              id: idPost,
            },
          })
          res.json(post);
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