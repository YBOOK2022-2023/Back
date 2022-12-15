import { PrismaClient } from '@prisma/client';
import { RequestHandler } from "express";

const createPostLike : RequestHandler =  async (req, res, next) =>{
    var token = req.headers['authorization'];
    var postID = parseInt(req.params.postId);
    
    const prisma = new PrismaClient()

    async function main() {
        const postLike = await prisma.postLike.create({
            data: {
                userId: 1,
                postId: postID,
            },
          })
          res.json(postLike);
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