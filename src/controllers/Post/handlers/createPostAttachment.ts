import { PrismaClient } from '@prisma/client';
import { RequestHandler } from "express";

const createPostAttachment : RequestHandler =  async (req, res, next) =>{
    var token = req.headers['authorization'];
    var postID = parseInt(req.params.postId);
    
    const prisma = new PrismaClient()

    async function main() {
        const postAttachment = await prisma.postAttachment.create({
            data: {
                postId: postID,
                type: 'PICTURE',
                s3Key: 'test'
            },
          })
          res.json(postAttachment);
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

export default createPostAttachment;