import { PrismaClient } from '@prisma/client';
import { RequestHandler } from "express";

const getUser : RequestHandler = (req, res, next) => {
    var userEmail = res.locals.user.email;
    
    console.log(userEmail);
    const prisma = new PrismaClient()

    async function main() {
        const user = await prisma.user.findUnique({
            where: {
              email: userEmail,
            },
          })
          res.json(user);
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

export default getUser