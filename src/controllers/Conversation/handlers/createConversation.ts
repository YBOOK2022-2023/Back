import { PrismaClient } from '@prisma/client';
import { RequestHandler } from "express";

const createConversation : RequestHandler =  async (req, res, next) =>{
    var token = req.headers['authorization'];
    
    console.log(token)
    const prisma = new PrismaClient()

    async function main() {
        // const user = await prisma.conversation.create({
        //     data: {
        //         firstname: 'Alice',
        //         lastname: "Test",
        //         email: 'alice@prisma.io',
        //     },
        //   })
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

export default createConversation;