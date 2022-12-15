import { PrismaClient } from '@prisma/client';
import { RequestHandler } from "express";

const createPostComment : RequestHandler =  async (req, res, next) =>{
    var token = req.headers['authorization'];
    var postID = parseInt(req.params.postId);
    var postText = req.body.text;

    if(!postText){
        throw new Error('missing text');
    }
    
    const prisma = new PrismaClient()

    async function main() {
        const postComment = await prisma.postComment.create({
            data: {
                userId: 1,
                postId: postID,
                text: postText
            },
          })
          res.json(postComment);
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